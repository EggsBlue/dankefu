package cn.dankefu.service.impl;

import cn.dankefu.bean.Sys_unit;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.SysUnitService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:17
 */
@IocBean(args = {"refer:dao"})
public class SysUnitServiceImpl extends BaseServiceImpl<Sys_unit> implements SysUnitService {
    public SysUnitServiceImpl(Dao dao) {
        super(dao);
    }
}
