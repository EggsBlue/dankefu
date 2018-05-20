package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Sys_menu;
import cn.dankefu.bean.Sys_role;
import cn.dankefu.bean.Sys_unit;
import cn.dankefu.bean.Sys_user;
import cn.dankefu.dto.Result;
import cn.dankefu.service.SysRoleService;
import cn.dankefu.service.SysUnitService;
import cn.dankefu.service.SysUserService;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.Sqls;
import org.nutz.dao.sql.Sql;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Lang;
import org.nutz.lang.Strings;

import java.util.ArrayList;
import java.util.List;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:18
 */
@IocBean(args = {"refer:dao"})
public class SysUserServiceImpl extends BaseServiceImpl<Sys_user> implements SysUserService {

    @Inject
    SysRoleService roleService;

    @Inject
    SysUnitService sysUnitService;

    public SysUserServiceImpl(Dao dao) {
        super(dao);
    }

    @Override
    public void getRoles(Sys_user user) {
        if(user == null){
            return;
        }
        this.fetchLinks(user,"roles");
    }

    @Override
    public void addRole(String userId,String roleId) throws Exception {
        Sys_role role = roleService.fetch(roleId);
        if(role == null){
            throw Lang.makeThrow("角色信息不存在");
        }
        Sql sql = Sqls.create("insert into dankefu_sys_user_role values(@userId,@roleId)");
        sql.params().set("userId",userId);
        sql.params().set("roleId",roleId);
        count(sql);

    }

    @Override
    public void delRole(String roleId) throws Exception {

    }

    @Override
    public List<String> getRoleCodes(String userId) {
        return null;
    }

    @Override
    public List<String> getMenus(String userId) {
        return null;
    }

    @Override
    public List<Sys_menu> getMenus2(String userId) {
        return null;
    }

    @Override
    public Result register(String userName, String password, String email,String compayName) {

        Sys_unit unit = new Sys_unit();
        unit.setEmail("");
        unit.setLogo("");
        unit.setName(compayName);
        unit.setNote(compayName);
        unit.setPhone("");
        sysUnitService.insert(unit);


        Sys_user dbUser = this.fetch(Cnd.where("loginname", "=", userName));
        if (!Lang.isEmpty(dbUser)) {
            return Result.ERROR("用户名已存在");
        }

        //初始角色
        List<Sys_role> roles = new ArrayList<>();

        Sys_user user = new Sys_user();
        RandomNumberGenerator rng = new SecureRandomNumberGenerator();
        String salt = rng.nextBytes().toBase64();
        String hashedPasswordBase64 = new Sha256Hash(password, salt, 1024).toHex();
        user.setSalt(salt);
        user.setPassword(hashedPasswordBase64);
        user.setLoginCount(0);
        user.setLoginName(userName);
        user.setUserName(userName);
        user.setEmail(Strings.sBlank(email));
        user.setUnitId(unit.getId());
        user.setRoles(roles);
        user = this.insert(user);

        this.insertRelation(user, "roles");


        return Result.SUCCESS("注册成功");
    }
}
