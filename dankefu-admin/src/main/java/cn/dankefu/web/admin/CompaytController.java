package cn.dankefu.web.admin;

import cn.dankefu.bean.Sys_unit;
import cn.dankefu.dto.Result;
import cn.dankefu.handler.Handler;
import cn.dankefu.service.SysUnitService;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.adaptor.JsonAdaptor;
import org.nutz.mvc.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 企业设置
 * author: 蛋蛋的忧伤
 * date: 2018/5/27 0027 20:38
 */
@At("/compay")
@IocBean
public class CompaytController extends Handler {

   @Inject
   private SysUnitService sysUnitService;

   @At("")
   @Ok("beetl:/admin/compay/index.html")
   @RequiresAuthentication
   public void index(@Attr("unitId")String unitId, HttpServletRequest request){
       request.setAttribute("u", sysUnitService.fetch(unitId));
   }


   @At("/save")
   @Ok("json")
   @POST
   @AdaptBy(type=JsonAdaptor.class)
   @RequiresAuthentication
   public Object save(@Param("..")Sys_unit sys_unit){
      try {
         sysUnitService.updateIgnoreNull(sys_unit);
         return success();
      }catch (Exception e){
         log.error(e);
         return error("系统繁忙,请稍后再试");
      }
   }

}
