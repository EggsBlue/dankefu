package cn.dankefu.service.impl;

import cn.dankefu.bean.Channel_worktime;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.ChannelWorkTimeService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:11
 */
@IocBean(args = {"refer:dao"})
public class ChannelWorkTimeServiceImpl extends BaseServiceImpl<Channel_worktime> implements ChannelWorkTimeService {
    public ChannelWorkTimeServiceImpl(Dao dao) {
        super(dao);
    }
}
