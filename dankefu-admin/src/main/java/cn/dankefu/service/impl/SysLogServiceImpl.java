package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Sys_log;
import cn.dankefu.service.SysLogService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:16
 */
@IocBean(args = {"refer:dao"})
public class SysLogServiceImpl extends BaseServiceImpl<Sys_log> implements SysLogService {
    public SysLogServiceImpl(Dao dao) {
        super(dao);
    }
}
