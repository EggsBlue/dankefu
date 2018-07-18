package cn.dankefu.websocket.handler;

import cn.dankefu.Dankefu;
import cn.dankefu.WaitingQueue;
import cn.dankefu.bean.*;
import cn.dankefu.enums.ChatRecordTypeEnum;
import cn.dankefu.enums.ChatRecordsDisplayEnum;
import cn.dankefu.enums.ChatRecordsMsgTypeEnum;
import cn.dankefu.service.*;
import cn.dankefu.utils.TioWebSocketUtils;
import cn.dankefu.websocket.MsgHandlerInterface;
import cn.dankefu.websocket.Type;
import cn.dankefu.websocket.WebSocketServer;
import org.nutz.dao.Chain;
import org.nutz.dao.Cnd;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.json.Json;
import org.nutz.lang.*;
import org.nutz.lang.util.NutMap;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.tio.core.ChannelContext;
import org.tio.core.Tio;
import org.tio.utils.lock.SetWithLock;

import java.util.*;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * 请求服务，客服调度、分配
 *
 * @Author: 蛋蛋
 * @Time:2017/11/28 10:47
 */
@IocBean
public class ReqServiceHandler implements MsgHandlerInterface {
    Log log = Logs.get();

    @Inject
    private ChatService chatService;

    @Inject
    private ChatHistoryService chatHistoryService;

    @Inject
    private ReqServiceHandler reqServiceHandler;

    @Inject
    private SysUserService sysUserService;

    @Inject
    private ChannelWebService channelWebService;

    @Inject
    private ChatRecordsService chatRecordsService;


    @Inject
    private WaitingQueue waitingQueue;

    @Override
    public Object handler(String text, ChannelContext context) {
        log.debug("收到消息：：：" + text);
        NutMap data = Json.fromJson(NutMap.class, text);
        Chat chat = chatService.fetch(data.getString("guest_id"));
        if (chat == null) {
            log.error("未查询到chat记录");
            return null;
        }
        Chat_history history = chatHistoryService.fetch(Cnd.where("chatId", "=", chat.getId()).orderBy("createTime", "desc"));
        if (history == null) {
            log.error("未查询到chat_history记录");
            return null;
        }
        attemper(context);

        return null;
    }


    public void attemper(ChannelContext context){
        if(Lang.isEmpty(context) || context.isClosed() || context.isRemoved()){
            log.debug("通道上下文不可用");
            return;
        }
        log.debug("拿到一个可用的连接通道");
        Chat chat = (Chat) context.getAttribute(Dankefu.CLIENTCHATATTR);
        Chat_history history = (Chat_history) context.getAttribute(Dankefu.CLIENTCURRSESSIONATTR);
        //是否在工作时间
        Channel_web channel_web = channelWebService.fetchLinks(channelWebService.fetch(Cnd.where("unitId", "=", chat.getUnitId()).and("type", "=",chat.getSource())), "channel_worktime");
        final boolean[] is_all_busy = {false};
        if(Lang.isNotEmpty(channel_web)){
            Channel_worktime worktime = channel_web.getChannel_worktime();
            boolean is_work = true;

            if (Lang.isNotEmpty(worktime)) {
                is_work = channelWebService.isWork(worktime);
                if (!is_work) {
                    log.debug("不在工作时间段");
                    // 不在工作时间提醒
                    history.setRestTime(true);
                    chatHistoryService.update(Chain.make("isRestTime",true),Cnd.where("id","=",history.getId()));
                    Tio.send(context,TioWebSocketUtils.makeWsResponse(Type.CLIENT_RESP_RESTTIME,NutMap.NEW()));
                    return;
                }
            }
        }

        SetWithLock<ChannelContext> groups = Tio.getChannelContextsByGroup(WebSocketServer.GROUPCONTEXT, Dankefu.SERVICERGROUPNAME);
        List<ChannelContext> onlineServicers = new ArrayList<>();
        boolean isNoone = false;
        if (Lang.isEmpty(groups) ||groups.size() == 0) {
            isNoone = true;
        } else {
            final int[] t_busy_count = {0};
            Lang.each(groups, new Each<Object>() {
                @Override
                public void invoke(int index, Object ele, int length) throws ExitLoop, ContinueLoop, LoopException {
                    SetWithLock<ChannelContext> set= (SetWithLock<ChannelContext>)  ele;
                    if(set.getObj().size()>0){
                        set.getLock().readLock().lock();
                        ChannelContext ele_ =  set.getObj().iterator().next();
                        Sys_user user = (Sys_user) ele_.getAttribute(Dankefu.SERVICERATTR);
                        if (user.getNow_service_count() >= user.getMaxServiceCount()) {
                            t_busy_count[0]++;
                        }else{
                            onlineServicers.add(ele_);
                        }
                        set.getLock().readLock().unlock();
                    }
                }
            });
            if (t_busy_count[0] == groups.size()) {
                is_all_busy[0] = true;
            }
        }

        if(isNoone){ //暂时无客服在线
            Tio.send(context,TioWebSocketUtils.makeWsResponse(Type.CLIENT_RESP_NOONESERVICER,NutMap.NEW().addv("time",Times.format("MM-dd HH:mm",new Date()))));
            //默认不在线引导用户留言
            Tio.send(context,TioWebSocketUtils.makeWsResponse(Type.CLIENT_RESP_INVITINGMESSAGE,NutMap.NEW()));  //邀请留言
        }else{
            if (is_all_busy[0]) { // 客服全忙
                history.setBusy(true);
                chatHistoryService.update(Chain.make("isBusy",true),Cnd.where("id","=",history.getId()));
                //进入排队队列
                waitingQueue.offer(context);
                log.debugf("客服繁忙，当前队列排队数量:%s个",waitingQueue.getWaitCount());
                //提醒访客
                Tio.send(context,TioWebSocketUtils.makeWsResponse(Type.CLIENT_RESP_WAITING,NutMap.NEW().addv("waitingCount",waitingQueue.getWaitCount()-1).addv("time",Times.format("MM-dd HH:mm",new Date()))));
            }else{// 分配客服
                //找最近一次的服务记录
                ChannelContext servicer = null;
                Chat_history last_history = chatHistoryService.fetch(Cnd.where("chatId", "=", chat.getId()).and("sysUserId", "not is", null).orderBy("createTime", "desc"));
                if(last_history!=null){
                    SetWithLock<ChannelContext> contexts = Tio.getChannelContextsByUserid(WebSocketServer.GROUPCONTEXT, history.getSysUserId());
                    servicer = TioWebSocketUtils.getInSetWithLock(contexts);
                }
                if(servicer == null){  //历史服务客服不在线或压根没有
                    //寻找当前在线中服务数最少的客服
                    for(int i=0; i<onlineServicers.size()-1; i++){
                        for (int j=0; j<onlineServicers.size()-1-i; j++){
                            ChannelContext i1 = onlineServicers.get(i);
                            ChannelContext j1 = onlineServicers.get(j);
                            Sys_user i1_obj = (Sys_user) i1.getAttribute();
                            Sys_user j1_obj = (Sys_user) j1.getAttribute();
                            ChannelContext temp = i1;
                            if(i1_obj.getNow_service_count() > j1_obj.getNow_service_count()){
                                i1 = j1;
                                j1 = temp;
                            }
                        }
                    }
                    servicer = onlineServicers.get(0);
                }

                if(servicer == null){  //依然没有可以提供服务的客服，排队去吧
                    history.setBusy(true);
                    chatHistoryService.update(Chain.make("isBusy",true),Cnd.where("id","=",history.getId()));
                    //进入排队队列
                    waitingQueue.offer(context);
                    log.debugf("客服繁忙，当前队列排队数量:%s个",waitingQueue.getWaitCount());
                    //提醒访客
                    Tio.send(context,TioWebSocketUtils.makeWsResponse(Type.CLIENT_RESP_WAITING,NutMap.NEW().addv("waitingCount",waitingQueue.getWaitCount()-1)));
                }else{//接入成功
                    Sys_user user =(Sys_user) servicer.getAttribute(Dankefu.SERVICERATTR);
                    String msg = String.format("客服【%s】为您服务!",user.getUserName());
                    String time = Times.format("MM-dd HH:mm",new Date());

                    chat.setSysUserId(user.getId());
                    chat.setLastTime(new Date());
                    chat.setStatus("online");
                    history.setSysUserId(user.getId());
                    history.setPersonService(true);
                    chatService.update(chat);
                    chatHistoryService.update(history);

                    chatRecordsService.insert(chat.getId(),history.getId(),ChatRecordTypeEnum.CHAT.getType(),ChatRecordsMsgTypeEnum.TEXT.getType(),ChatRecordsDisplayEnum.normal.getType(),
                            new Date(),user.getId(),chat.getId(),msg,chat.getSource(),user.getId());

                    Tio.send(context,TioWebSocketUtils.makeWsResponse(Type.CLIENT_RESP_JOIN,NutMap.NEW().addv("servicer",servicer.getAttribute(Dankefu.SERVICERATTR)).addv("history",history).addv("msg",msg).addv("time",time)));
                    Tio.send(servicer,TioWebSocketUtils.makeWsResponse(Type.SERVICER_RESP_JOIN,NutMap.NEW().addv(Dankefu.CLIENTCURRSESSIONATTR,chat)));
                }
            }
        }

    }


}
