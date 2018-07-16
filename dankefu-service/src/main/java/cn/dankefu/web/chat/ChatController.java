package cn.dankefu.web.chat;

import cn.dankefu.Dankefu;
import cn.dankefu.bean.Chat;
import cn.dankefu.bean.Chat_history;
import cn.dankefu.dto.Result;
import cn.dankefu.handler.Handler;
import cn.dankefu.service.ChatService;
import cn.dankefu.utils.TioWebSocketUtils;
import cn.dankefu.websocket.WebSocketServer;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Attr;
import org.nutz.mvc.annotation.Ok;
import org.tio.core.ChannelContext;
import org.tio.core.Tio;
import org.tio.utils.lock.SetWithLock;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedList;
import java.util.List;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/23 0023 19:59
 */
@IocBean
@At("/chat")
public class ChatController extends Handler {

    @Inject
    private ChatService chatService;



    @At("")
    @Ok("beetl:/service/chat/index3.html")
    public void home(HttpServletRequest request){



    }

    @At("/list")
    @Ok("json")
    public Result list(@Attr("uid")String uid){
        List<Chat> list = chatService.getChatList(uid);
        if(list==null || list.size() == 0){
            return success();
        }

        List<Chat> onlines = new LinkedList<>();
        List<Chat> historys = new LinkedList<>();
        list.forEach(chat -> {
            SetWithLock<ChannelContext> channelContexts = Tio.getChannelContextsByToken(WebSocketServer.GROUPCONTEXT, chat.getId());
            ChannelContext context = TioWebSocketUtils.getInSetWithLock(channelContexts);
            if(context!=null && !context.isRemoved() && !context.isClosed()){
                chat.setCurr_session((Chat_history) context.getAttribute(Dankefu.CLIENTCURRSESSIONATTR));
                chat.setStatus("online");
                onlines.add(chat);
            }else{
                historys.add(chat);
            }
        });

        return success().setData(new NutMap("onlines",onlines).addv("historys",historys));
    }

}
