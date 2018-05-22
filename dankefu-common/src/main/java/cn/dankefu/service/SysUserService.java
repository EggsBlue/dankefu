package cn.dankefu.service;

import cn.dankefu.bean.Sys_menu;
import cn.dankefu.bean.Sys_user;
import cn.dankefu.dto.Result;

import java.util.List;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:08
 */
public interface SysUserService extends BaseService<Sys_user> {
    /**
     * 获取角色信息
     */
    List<String> getRoles(Sys_user user);

    /**
     * 添加角色
     * @param roleId
     * @throws Exception
     */
    void addRole(String userId, String roleId) throws Exception;

    /**
     * 删除角色信息
     * @param roleId
     * @throws Exception
     */
    void delRole(String roleId) throws Exception;

    /**
     * 获取用户所有的角色编码
     * @param userId
     * @return
     */
    List<String> getRoleCodes(String userId);

    /**
     * 获取用户所有菜单的权限标识:permission字段
     * @param userId
     * @return
     */
    List<String> getMenus(String userId);

    /**
     * 获取用户所有的菜单对象
     * @param userId
     * @return
     */
    List<Sys_menu> getMenus2(String userId);

    /**
     * 注册
     * @param userName
     * @param password
     * @param compayName
     * @return
     */
    Result register(String userName, String password, String email, String compayName);
}
