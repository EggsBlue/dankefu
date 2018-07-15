package cn.dankefu.websocket;

import cn.dankefu.Dankefu;
import cn.dankefu.WaitingQueue;
import cn.dankefu.bean.*;
import cn.dankefu.packet.SocketMsg;
import cn.dankefu.service.ChannelWebService;
import cn.dankefu.service.ChatHistoryService;
import cn.dankefu.service.ChatService;
import cn.dankefu.service.SysUserService;
import cn.dankefu.utils.SocketMsgUtils;
import cn.dankefu.websocket.handler.*;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.json.Json;
import org.nutz.lang.*;
import org.nutz.lang.util.NutMap;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.nutz.mapl.Mapl;
import org.tio.core.ChannelContext;
import org.tio.core.Tio;
import org.tio.http.common.HttpRequest;
import org.tio.http.common.HttpResponse;
import org.tio.utils.lock.SetWithLock;
import org.tio.websocket.common.WsRequest;
import org.tio.websocket.server.handler.IWsMsgHandler;

import java.util.Date;
import java.util.Map;

/**
 * WebSocket请求分发
 *@Author: 蛋蛋 [TopCoderMyDream@gmail.com,https://github.com/TopCoderMyDream]
 *@Time:2017/12/12 13:57
 */
@IocBean(create = "init")
public class Accepter implements IWsMsgHandler {
	Log log = Logs.get();

	@Inject
	private ReqServiceHandler reqServiceHandler;

	@Inject
	private ChatService chatService;

	@Inject
    private SysUserService sysUserService;

	@Inject
    private ChannelWebService channelWebService;

	@Inject
	private WaitingQueue waitingQueue;

	@Inject
    private ChatHistoryService chatHistoryService;

	private NutMap handlers = new NutMap();

	public void init(){
		handlers.addv(String.valueOf(Type.CLIENT_REQ_SERVICE), reqServiceHandler);
	}

	/**
	 * 握手
	 * @param request
	 * @param httpResponse
	 * @param channelContext
	 * @return
	 * @throws Exception
	 */
	@Override
	public HttpResponse handshake(HttpRequest request, HttpResponse httpResponse, ChannelContext channelContext) throws Exception {
		log.debug("握手参数::");
		Map<String, Object[]> params = request.getParams();
		for (String s : params.keySet()) {
			log.debug(s+"--"+params.get(s).length+"---"+params.get(s)[0]);
		}

		//鉴权
		String guest_id = request.getParam("guest_id");
		String service_id = request.getParam("service_id");
        String type = request.getParam("type");
        if(Strings.isBlank(guest_id) && Strings.isBlank(service_id)){
			log.debug("guest_id和service_id参数全部为空，握手不通过");
			return null;
		}
		if(Strings.isNotBlank(guest_id)){
            Chat chat = chatService.fetch(guest_id);
            if(Lang.isEmpty(chat)){
                log.debugf("未查询到对应的chat数据，握手不通过。 guest_id:%s",guest_id);
                return null;
            }
            Tio.bindToken(channelContext,chat.getId());

            //生成来访记录
            Chat_history history = new Chat_history();
            history.setUnitId(chat.getUnitId());
            history.setChatId(chat.getId());
            history.setName(chat.getName());
            history.setSource(type);
            history.setUserAgent(request.getUserAgent());
            history.setAppraise(false);
			history = chatHistoryService.insert(history);

			channelContext.setAttribute(Dankefu.CLIENTCHATATTR,chat);
			channelContext.setAttribute(Dankefu.CLIENTCURRSESSIONATTR,history);
		}else{
            Sys_user servicer = sysUserService.fetch(service_id);
            if(Lang.isEmpty(servicer)){
                log.warnf("servicer不存在，service_id:%s",service_id);
                return null;
            }
            servicer.setLoginCount(0);
            servicer.setPassword(null);
            servicer.setSalt(null);
            servicer.setLoginIp(null);
            servicer.setCreateTime(null);
            servicer.setLoginAt(null);
            channelContext.setAttribute(Dankefu.SERVICERATTR,servicer);
            Tio.bindUser(channelContext,service_id);
            Tio.bindGroup(channelContext, Dankefu.SERVICERGROUPNAME);
        }

		return httpResponse;
	}

	@Override
	public void onAfterHandshaked(HttpRequest httpRequest, HttpResponse httpResponse, ChannelContext channelContext) throws Exception {
		log.debug("握手成功。。");
	}

	@Override
	public Object onBytes(WsRequest wsRequest, byte[] bytes, ChannelContext channelContext) throws Exception {
		String ss = new String(bytes, "utf-8");
		SocketMsg socketMsg = Json.fromJson(SocketMsg.class, ss);
		MsgHandlerInterface msgHandler = (MsgHandlerInterface) handlers.get(socketMsg.getAction());
		if(msgHandler!=null){
			msgHandler.handler(socketMsg.getBody().toString(),channelContext);
		}else{
			return null;
		}

		return null;
	}

	@Override
	public Object onClose(WsRequest wsRequest, byte[] bytes, ChannelContext channelContext) throws Exception {
		Tio.remove(channelContext, "receive close flag");
		Object servicer = channelContext.getAttribute("servicer");
		if(servicer !=null){
			log.debugf("客服【%s】下线了",((Sys_user)servicer).getUserName());
			//TODO 通知当前服务的访客
		}else{
			Chat chat =(Chat) channelContext.getAttribute("chat");
            Chat_history curr_sess =(Chat_history) channelContext.getAttribute("curr_session");

            log.debugf("访客【%s】下线了",chat.getName());

			//通知对应客服人员
            String sysUserId = chat.getSysUserId();
            if(Strings.isNotBlank(sysUserId)){
                SetWithLock<ChannelContext> channelContextsByUserid = Tio.getChannelContextsByUserid(WebSocketServer.groupContext, sysUserId);
                if(Lang.isNotEmpty(channelContextsByUserid) && channelContextsByUserid.getObj().size()>0){
                    channelContextsByUserid.getLock().readLock().lock();
                    ChannelContext context = channelContextsByUserid.getObj().iterator().next();
                    Tio.send(context,SocketMsgUtils.makeWsResponse(Type.SERVICER_RESP_LEAVE,NutMap.NEW().addv("chat",chat).addv("time",Times.format("MM-dd HH:mm",new Date())).addv("curr_session",curr_sess)));
                    channelContextsByUserid.getLock().readLock().unlock();
                }
            }

            //有人离开，排队的人向前一步走
            ChannelContext poolContext = waitingQueue.pool();
            if(Lang.isNotEmpty(poolContext) &&  poolContext!=channelContext){
                reqServiceHandler.attemper(poolContext);
            }

            log.debugf("有人下线，当前队列排队数量:%s个",waitingQueue.getWaitCount());
		}

		return null;
	}

	@Override
	public Object onText(WsRequest wsRequest, String text, ChannelContext channelContext) throws Exception {
	    log.debug("firt recice text:"+text);
		String action =(String) Mapl.cell(Json.fromJson(text), "action");
		if(Strings.isNotBlank(action)){
			MsgHandlerInterface msgHandler = (MsgHandlerInterface) handlers.get(action);
			if(msgHandler != null){
				msgHandler.handler(text,channelContext);
				return null;
			}
		}
		log.debugf("非法请求,内容:%s",text);
		return null;
	}



}
