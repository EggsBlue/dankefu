package cn.dankefu.web.handler.admin;

import cn.dankefu.dto.Result;
import cn.dankefu.web.Handler;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Fail;
import org.nutz.mvc.annotation.Param;

/**
 * 登陆控制器
 * author: 蛋蛋的忧伤
 * date: 2018/5/8  21:21
 */
@At("/login")
@IocBean
@Fail("http:500")
public class LoginController extends Handler {


    /**
     * 登陆
     * @param userName
     * @param password
     * @return
     */
    @At("/do")
    public Result login(@Param("userName")String userName,@Param("password")String password){
        if(Strings.isBlank(userName)){
            return Result.ERROR("账号不可为空");
        }
        if(Strings.isBlank(password)){
            return Result.ERROR("密码不可为空");
        }

        UsernamePasswordToken token = new UsernamePasswordToken(userName,password);
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);
            return Result.SUCCESS();
        } catch (LockedAccountException e1) {
            log.error(e1);
            return Result.ERROR("账号已锁定");
        } catch (UnknownAccountException e2) {
            log.error(e2);
            return Result.ERROR("账号不存在");
        } catch (AuthenticationException e3) {
            log.error(e3);
            return Result.ERROR("用户名或密码错误");
        } catch (Exception e4) {
            log.error(e4);
            return Result.ERROR("登陆失败,用户名或密码错误");
        }
    }

}
