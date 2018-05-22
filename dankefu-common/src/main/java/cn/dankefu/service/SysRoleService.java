package cn.dankefu.service;

import cn.dankefu.bean.Sys_role;

import java.util.List;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:08
 */
public interface SysRoleService extends BaseService<Sys_role> {


    /**
     * 获取角色对应的权限
     * @param role
     * @return
     */
    List<String> getPermissions(Sys_role role);
}
