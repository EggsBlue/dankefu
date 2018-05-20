package cn.dankefu.web.handler.admin;

import cn.dankefu.dto.Result;
import cn.dankefu.service.SysUserService;
import cn.dankefu.web.Handler;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;
import org.nutz.mvc.annotation.*;

/**
 * 登陆控制器
 * author: 蛋蛋的忧伤
 * date: 2018/5/8  21:21
 */
@At("/prev")
@IocBean
@Fail("http:500")
public class PrevController extends Handler {

    @Inject
    private SysUserService sysUserService;


    @At("/login")
    @Ok("re")
    @Filters
    public String login(){
        Subject subject = SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            return "redirect:/home";
        }else{
            return "beetl:/admin/system/login.html";
        }
    }

    @At("/register")
    @Ok("re")
    @Filters
    public String register(){
//        Subject subject = SecurityUtils.getSubject();
//        if (subject.isAuthenticated()) {
//            return "redirect:/home";
//        }else{
            return "beetl:/admin/system/register.html";
//        }
    }

    /**
     * 登陆
     * @param userName
     * @param password
     * @return
     */
    @At("/doLogin")
    @Ok("json")
    public Result doLogin(@Param("userName")String userName,@Param("password")String password){
        if(Strings.isBlank(userName)){
            return Result.ERROR("请填写账号");
        }
        if(Strings.isBlank(password)){
            return Result.ERROR("请填写密码");
        }

        UsernamePasswordToken token = new UsernamePasswordToken(userName,password);
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);
            return success();
        } catch (LockedAccountException e1) {
            log.error(e1);
            return error("登陆失败,账号已锁定");
        } catch (UnknownAccountException e2) {
            log.error(e2);
            return error("登陆失败,用户名不存在");
        } catch (AuthenticationException e3) {
            log.error(e3);
            return error("登陆失败,密码错误");
        } catch (Exception e4) {
            log.error(e4);
            return error("登陆失败");
        }
    }


    /**
     * 注册
     * @param userName
     * @param password
     * @param email
     * @param compayName
     * @return
     */
    @At("/doReg")
    @Ok("json")
    @Filters
    public Result doReg(@Param("userName")String userName,@Param("password")String password,@Param("email")String email,@Param("compayName")String compayName){
        if(Strings.isBlank(userName)){
            return error("请填写账号");
        }
        if(Strings.isBlank(password)){
            return error("请填写密码");
        }

        if(password.length() < 6){
            return error("密码长度太短了");
        }
        if(Strings.isBlank(compayName)){
            return error("请填写公司名");
        }

        if(Strings.isBlank(email)){
            return error("请输入邮箱");
        }
        if(!Strings.isEmail(email)){
            return error("请输入正确的邮箱");
        }
        return sysUserService.register(userName,password,email,compayName);
    }
}
