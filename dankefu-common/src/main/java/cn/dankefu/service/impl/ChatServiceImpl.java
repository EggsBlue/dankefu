package cn.dankefu.service.impl;

import cn.dankefu.bean.Chat;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.ChatService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:13
 */
@IocBean(args = {"refer:dao"})
public class ChatServiceImpl extends BaseServiceImpl<Chat> implements ChatService {
    public ChatServiceImpl(Dao dao) {
        super(dao);
    }
}
