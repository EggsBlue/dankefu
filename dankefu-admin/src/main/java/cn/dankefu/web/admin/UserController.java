package cn.dankefu.web.admin;

import cn.dankefu.bean.Sys_unit;
import cn.dankefu.bean.Sys_user;
import cn.dankefu.handler.Handler;
import cn.dankefu.service.SysUserService;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.nutz.dao.Chain;
import org.nutz.dao.Cnd;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;
import org.nutz.mvc.adaptor.JsonAdaptor;
import org.nutz.mvc.annotation.*;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/8  21:21
 */
@At("/user")
@IocBean
@Fail("http:500")
public class UserController extends Handler {
    @Inject
    private SysUserService sysUserService;

    @At("/pwd/update")
    @Ok("json")
    @POST
    @AdaptBy(type= JsonAdaptor.class)
    @RequiresAuthentication
    public Object save(@Param("oldPwd") String oldPwd,@Param("newPwd")String newPwd,@Param("conformPwd")String conformPwd,@Attr("uid")String uid){
        try {
            Sys_user user = sysUserService.fetch(uid);
            if(Strings.isBlank(oldPwd)){
                return error("请填写原密码");
            }
            if(Strings.isBlank(newPwd)){
                return error("请填写新密码");
            }
            if(Strings.isBlank(conformPwd)){
                return error("请填写确认密码");
            }

            if(!newPwd.equals(conformPwd)){
                return error("两次密码填写不一致");
            }

            String oldPwd_ = new Sha256Hash(oldPwd, user.getSalt(), 1024).toHex();
            if(!oldPwd_.equals(user.getPassword())){
                return error("原密码不正确");
            }
            sysUserService.update(Chain.make("password", new Sha256Hash(newPwd, user.getSalt(), 1024).toHex()), Cnd.where("id","=",user.getId()));
            return success();
        }catch (Exception e){
            log.error(e);
            return error("系统繁忙,请稍后再试");
        }
    }

}
