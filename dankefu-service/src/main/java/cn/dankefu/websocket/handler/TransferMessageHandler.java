package cn.dankefu.websocket.handler;

import cn.dankefu.Dankefu;
import cn.dankefu.bean.Chat;
import cn.dankefu.bean.Chat_history;
import cn.dankefu.bean.Sys_user;
import cn.dankefu.enums.ChatRecordsDisplayEnum;
import cn.dankefu.service.ChatRecordsService;
import cn.dankefu.service.SysUserService;
import cn.dankefu.utils.TioWebSocketUtils;
import cn.dankefu.websocket.MsgHandlerInterface;
import cn.dankefu.websocket.Type;
import cn.dankefu.websocket.WebSocketServer;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.json.Json;
import org.nutz.lang.Strings;
import org.nutz.lang.Times;
import org.nutz.lang.util.NutMap;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.tio.core.ChannelContext;
import org.tio.core.Tio;
import org.tio.utils.lock.SetWithLock;

import java.util.Date;

/**
 * 处理并中转消息给访客/客服
 * @author 蛋蛋
 * @time 2018年07月19日21:38:55
 */
@IocBean
public class TransferMessageHandler implements MsgHandlerInterface {
    Log log = Logs.get();


    @Inject
    private SysUserService sysUserService;

    @Inject
    private ChatRecordsService chatRecordsService;

    @Override
    public Object handler(String text, ChannelContext context) {
        try {
            NutMap data = Json.fromJson(NutMap.class, text);
            Chat chat = (Chat) context.getAttribute(Dankefu.CLIENTCHATATTR);
            Chat_history history = (Chat_history) context.getAttribute(Dankefu.CLIENTCURRSESSIONATTR);
            Sys_user serviced =  (Sys_user) context.getAttribute(Dankefu.SERVICERATTR);

            String msgTo = data.getString("msgTo"); //接收人
            String recordType = data.getString("recordType");//消息类型
            String msgType = data.getString("msgType");//消息内容类型
            String prevTime = data.getString("prevTime");//展示方式
            String content = data.getString("content");//展示方式
            String unitId = data.getString("unitId");//单位id

            NutMap packet = NutMap.NEW();
            packet.setv("chatHistoryId",history.getId());
            packet.setv("chatId",chat.getId());
            packet.setv("content",content);
            packet.setv("msgTo",msgTo);
            packet.setv("msgType",msgType);
            packet.setv("prevTime",prevTime);
            packet.setv("recordType",recordType);
            packet.setv("source",chat.getSource());
            String userid = null;

            if(chat!=null){//客户端发送的消息
                Sys_user user = null;
                if("robot".equals(msgTo)){
                    //找机器人的,机器人回复一下...
                }else{
                    user = sysUserService.fetch(msgTo);
                    //先检测一下客服是否在线
                    SetWithLock<ChannelContext> contexts = Tio.getChannelContextsByUserid(WebSocketServer.GROUPCONTEXT, msgTo);
                    ChannelContext  servicer = TioWebSocketUtils.getInSetWithLock(contexts);
                    if(servicer ==null || servicer.isClosed() || servicer.isRemoved()){//对话客服已下线
                        Tio.send(context,TioWebSocketUtils.makeWsResponse(Type.CLIENT_RESP_SERVICEROFLINE,null));
                    }else{ //中转消息到客服
                        packet.setv("msgFrom",chat.getId());
                        packet.setv("sys_user_id",user.getId());
                        Tio.send(servicer,TioWebSocketUtils.makeWsResponse(Type.SERVICER_RESP_RECEIVEMSG,packet));
                    }
                    userid = user.getId();
                }
            }else{//服务端发送的消息
                SetWithLock<ChannelContext> contexts = Tio.getChannelContextsByToken(WebSocketServer.GROUPCONTEXT, msgTo);
                ChannelContext  client = TioWebSocketUtils.getInSetWithLock(contexts);
                packet.setv("msgFrom",serviced.getId());
                packet.setv("sys_user_id",serviced.getId());
                Tio.send(client,TioWebSocketUtils.makeWsResponse(Type.CLIENT_RESP_RECEIVEMSG,packet));
                userid = serviced.getId();
            }
            //记录消息
            Date dPrevTime = null;
            if(Strings.isNotBlank(prevTime)){
                dPrevTime = Times.parse("yyyyMMdd HH:mm:ss",prevTime);
            }
            chatRecordsService.insert(chat.getId(),history.getId(),recordType,msgType, ChatRecordsDisplayEnum.normal.getType(),dPrevTime,chat.getId(),msgTo,content,chat.getSource(),userid,unitId );
        }catch (Exception e){
            log.error(e);
        }
        return null;
    }
}
