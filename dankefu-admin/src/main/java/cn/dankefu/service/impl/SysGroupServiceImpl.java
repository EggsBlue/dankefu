package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Sys_group;
import cn.dankefu.service.SysGroupService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:16
 */
@IocBean(args = {"refer:dao"})
public class SysGroupServiceImpl extends BaseServiceImpl<Sys_group> implements SysGroupService {
    public SysGroupServiceImpl(Dao dao) {
        super(dao);
    }
}
