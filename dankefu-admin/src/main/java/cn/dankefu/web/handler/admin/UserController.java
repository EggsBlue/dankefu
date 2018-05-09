package cn.dankefu.web.handler.admin;

import cn.dankefu.web.Handler;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Ok;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/8  21:21
 */
@At("/user")
@IocBean
@Fail("http:500")
public class UserController extends Handler {

    @At("/login")
    public void login(){

    }

}
