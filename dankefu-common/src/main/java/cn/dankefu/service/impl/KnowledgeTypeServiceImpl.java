package cn.dankefu.service.impl;

import cn.dankefu.bean.Knowledge_type;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.KnowledgeTypeService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:15
 */
@IocBean(args = {"refer:dao"})
public class KnowledgeTypeServiceImpl extends BaseServiceImpl<Knowledge_type> implements KnowledgeTypeService {
    public KnowledgeTypeServiceImpl(Dao dao) {
        super(dao);
    }
}
