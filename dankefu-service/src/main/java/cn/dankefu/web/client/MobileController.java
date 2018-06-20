package cn.dankefu.web.client;

import cn.dankefu.handler.Handler;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Ok;

import javax.servlet.http.HttpServletRequest;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/23 0023 20:19
 */
@IocBean
@At("/mobile")
public class MobileController  extends Handler {

    @At("")
    @Ok("beetl:/service/client/mobile/index.html")
    public void home(HttpServletRequest request){
    }

}
