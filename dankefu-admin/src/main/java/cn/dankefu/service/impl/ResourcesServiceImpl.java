package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Resources;
import cn.dankefu.service.ResourcesService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:15
 */
@IocBean(args = {"refer:dao"})
public class ResourcesServiceImpl extends BaseServiceImpl<Resources> implements ResourcesService {
    public ResourcesServiceImpl(Dao dao) {
        super(dao);
    }
}
