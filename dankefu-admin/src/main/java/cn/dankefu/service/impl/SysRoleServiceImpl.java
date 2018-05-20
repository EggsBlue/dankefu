package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Sys_role;
import cn.dankefu.service.SysRoleService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:17
 */
@IocBean(args = {"refer:dao"})
public class SysRoleServiceImpl extends BaseServiceImpl<Sys_role> implements SysRoleService {
    public SysRoleServiceImpl(Dao dao) {
        super(dao);
    }
}
