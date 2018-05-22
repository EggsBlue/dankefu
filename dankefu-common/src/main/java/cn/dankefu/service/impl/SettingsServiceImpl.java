package cn.dankefu.service.impl;

import cn.dankefu.bean.Settings;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.SettingsService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:16
 */
@IocBean(args = {"refer:dao"})
public class SettingsServiceImpl extends BaseServiceImpl<Settings> implements SettingsService {
    public SettingsServiceImpl(Dao dao) {
        super(dao);
    }
}
