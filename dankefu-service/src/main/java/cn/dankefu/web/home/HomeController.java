package cn.dankefu.web.home;

import cn.dankefu.handler.Handler;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;


/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/8  21:21
 */
@IocBean
@Fail("http:500")
@At({"/","/home"})
public class HomeController extends Handler {

    @At("")
    @Ok("re")
    public String home(){
        Subject subject = SecurityUtils.getSubject();
        if (!subject.isAuthenticated()){
            return "redirect:/prev/login";
        }
        return "beetl:/service/system/home.html";
    }



    @At("/logout")
    @Ok(">>:/prev/login")
    public void logout(){
        SecurityUtils.getSubject().logout();
    }
}
