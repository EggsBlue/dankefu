package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Channel_web_pattern;
import cn.dankefu.service.ChannelWebPatternService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:09
 */
@IocBean(args = {"refer:dao"})
public class ChannelWebPatternServiceImpl extends BaseServiceImpl<Channel_web_pattern>  implements ChannelWebPatternService {
    public ChannelWebPatternServiceImpl(Dao dao) {
        super(dao);
    }
}
