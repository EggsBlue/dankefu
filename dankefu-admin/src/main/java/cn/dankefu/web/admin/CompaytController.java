package cn.dankefu.web.admin;

import cn.dankefu.handler.Handler;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Ok;

import javax.servlet.http.HttpServletRequest;

/**
 * 企业设置
 * author: 蛋蛋的忧伤
 * date: 2018/5/27 0027 20:38
 */
@At("/compay")
@IocBean
public class CompaytController extends Handler {

   @At("")
   @Ok("beetl:/admin/compay/index.html")
   public void index(HttpServletRequest request){
   }

}
