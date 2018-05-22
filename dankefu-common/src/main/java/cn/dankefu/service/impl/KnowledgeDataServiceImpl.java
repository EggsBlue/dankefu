package cn.dankefu.service.impl;

import cn.dankefu.bean.Knowledge_data;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.KnowledgeDataService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:14
 */
@IocBean(args = {"refer:dao"})
public class KnowledgeDataServiceImpl extends BaseServiceImpl<Knowledge_data> implements KnowledgeDataService {
    public KnowledgeDataServiceImpl(Dao dao) {
        super(dao);
    }
}
