package cn.dankefu.service.impl;

import cn.dankefu.bean.Chat_leavemsg;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.ChatLeavemsgService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:12
 */
@IocBean(args = {"refer:dao"})
public class ChatLeavemsgServiceImpl extends BaseServiceImpl<Chat_leavemsg> implements ChatLeavemsgService {
    public ChatLeavemsgServiceImpl(Dao dao) {
        super(dao);
    }
}
