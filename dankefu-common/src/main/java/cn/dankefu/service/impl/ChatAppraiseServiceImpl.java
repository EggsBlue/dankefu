package cn.dankefu.service.impl;

import cn.dankefu.bean.Chat_appraise;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.ChatAppraiseService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:11
 */
@IocBean(args = {"refer:dao"})
public class ChatAppraiseServiceImpl extends BaseServiceImpl<Chat_appraise> implements ChatAppraiseService {
    public ChatAppraiseServiceImpl(Dao dao) {
        super(dao);
    }
}
