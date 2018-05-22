package cn.dankefu.web.system;

import cn.dankefu.handler.Handler;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/8  21:21
 */
@At("/user")
@IocBean
@Fail("http:500")
public class UserController extends Handler {


}
