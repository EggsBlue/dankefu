package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Chat_history;
import cn.dankefu.service.ChatHistoryService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:11
 */
@IocBean(args = {"refer:dao"})
public class ChatHistoryServiceImpl extends BaseServiceImpl<Chat_history> implements ChatHistoryService{
    public ChatHistoryServiceImpl(Dao dao) {
        super(dao);
    }
}
