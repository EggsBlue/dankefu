package cn.dankefu.service.impl;

import cn.dankefu.bean.Sys_menu;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.SysMenuService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:17
 */
@IocBean(args = {"refer:dao"})
public class SysMenuServiceImpl extends BaseServiceImpl<Sys_menu> implements SysMenuService {
    public SysMenuServiceImpl(Dao dao) {
        super(dao);
    }
}
