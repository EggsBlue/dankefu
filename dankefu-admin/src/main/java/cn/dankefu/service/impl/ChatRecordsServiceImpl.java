package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Chat_records;
import cn.dankefu.service.ChatRecordsService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:12
 */
@IocBean(args = {"refer:dao"})
public class ChatRecordsServiceImpl extends BaseServiceImpl<Chat_records> implements ChatRecordsService {
    public ChatRecordsServiceImpl(Dao dao) {
        super(dao);
    }
}
