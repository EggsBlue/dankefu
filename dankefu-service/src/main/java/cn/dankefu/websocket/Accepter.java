package cn.dankefu.websocket;

import cn.dankefu.packet.SocketMsg;
import cn.dankefu.utils.SocketMsgUtils;
import cn.dankefu.websocket.handler.*;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.json.Json;
import org.nutz.lang.Strings;
import org.nutz.lang.util.NutMap;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.nutz.mapl.Mapl;
import org.nutz.mvc.Mvcs;
import org.tio.core.ChannelContext;
import org.tio.core.ChannelContextFilter;
import org.tio.core.Tio;
import org.tio.http.common.HttpRequest;
import org.tio.http.common.HttpResponse;
import org.tio.utils.lock.SetWithLock;
import org.tio.websocket.common.WsRequest;
import org.tio.websocket.server.handler.IWsMsgHandler;

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
	private MobileWebServiceMessageHandler mobileWebServiceMessageHandler;

	private NutMap handlers = new NutMap();

	public void init(){
		handlers.addv(String.valueOf(Type.MOBILEWEB_SERVICE_MSG),mobileWebServiceMessageHandler);
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
//		String sessionId = request.getParam("sessionId");
//		String id = request.getParam("id");
//		if(Strings.isBlank(sessionId) || Strings.isBlank(id)){
//			log.debug("用户未登录!");
//			return null;
//		}
//		User user = userDao.findbyid(Integer.valueOf(id));
//		if(user == null){
//			log.debug("用户不存在!");
//			return null;
//		}

//		Session session = ShiroSessionListener.get(sessionId);
//		if(session == null){
//			log.debug("用户未登录!");
//			return null;
//		}
//
//		//绑定用户
//		channelContext.setAttribute("userName",user.getUsername());
//		Aio.bindUser(channelContext,id);
//		//绑定群组
//		bindGroup(Integer.valueOf(id),channelContext);
//
//		//上线
//		userDao.online(Integer.valueOf(id));
//		//上线通知
//		onLineMsg(user.getUsername(),channelContext);
		return httpResponse;
	}

	@Override
	public void onAfterHandshaked(HttpRequest httpRequest, HttpResponse httpResponse, ChannelContext channelContext) throws Exception {

	}

	@Override
	public Object onBytes(WsRequest wsRequest, byte[] bytes, ChannelContext channelContext) throws Exception {
		String ss = new String(bytes, "utf-8");
//		log.info("收到byte消息:{},{}", bytes, ss);
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
		//下线
		String userid = channelContext.getUserid();
//		if(!Strings.isBlank(userid)){
//			userDao.hide(Integer.valueOf(userid));
//		}
		return null;
	}

	@Override
	public Object onText(WsRequest wsRequest, String text, ChannelContext channelContext) throws Exception {
		String action =(String) Mapl.cell(Json.fromJson(text), "action");
		if(!Strings.isBlank(action) && !"".equalsIgnoreCase(action)){
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
