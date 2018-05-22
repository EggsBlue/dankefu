package cn.dankefu.service.impl;

import cn.dankefu.bean.Sys_menu;
import cn.dankefu.bean.Sys_role;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.SysRoleService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:17
 */
@IocBean(args = {"refer:dao"})
public class SysRoleServiceImpl extends BaseServiceImpl<Sys_role> implements SysRoleService {
    public SysRoleServiceImpl(Dao dao) {
        super(dao);
    }

    @Override
    public List<String> getPermissions(Sys_role role)  {
        List<String> permissions = new ArrayList<>();
        if(role == null){
            return permissions;
        }

        role = this.fetchLinks(role, "menus");
        if(role.getMenus()== null || role.getMenus().size() == 0){
            return permissions;
        }

        role.getMenus().forEach(new Consumer<Sys_menu>() {
            @Override
            public void accept(Sys_menu sys_menu) {
                permissions.add(sys_menu.getPermission());
            }
        });
        return permissions;
    }
}
