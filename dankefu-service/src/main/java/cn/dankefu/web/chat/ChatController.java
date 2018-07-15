package cn.dankefu.web.chat;

import cn.dankefu.handler.Handler;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Ok;

import javax.servlet.http.HttpServletRequest;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/23 0023 19:59
 */
@IocBean
@At("/chat")
public class ChatController extends Handler {

    @At("")
    @Ok("beetl:/service/chat/index3.html")
    public void home(HttpServletRequest request){



    }
}
