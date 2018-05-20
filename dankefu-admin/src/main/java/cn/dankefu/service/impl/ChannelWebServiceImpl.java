package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Channel_web;
import cn.dankefu.service.ChannelWebService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:10
 */
@IocBean(args = {"refer:dao"})
public class ChannelWebServiceImpl extends BaseServiceImpl<Channel_web> implements ChannelWebService {
    public ChannelWebServiceImpl(Dao dao) {
        super(dao);
    }
}
