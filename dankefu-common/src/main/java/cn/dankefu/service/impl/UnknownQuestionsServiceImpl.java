package cn.dankefu.service.impl;

import cn.dankefu.bean.Unknown_questions;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.UnknownQuestionsService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:18
 */
@IocBean(args = {"refer:dao"})
public class UnknownQuestionsServiceImpl extends BaseServiceImpl<Unknown_questions> implements UnknownQuestionsService {
    public UnknownQuestionsServiceImpl(Dao dao) {
        super(dao);
    }
}
