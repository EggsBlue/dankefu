package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Customer;
import cn.dankefu.bean.Customer_tags;
import cn.dankefu.service.CustomerTagsService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:14
 */
@IocBean(args = {"refer:dao"})
public class CustomerTagsServiceImpl extends BaseServiceImpl<Customer_tags> implements CustomerTagsService {
    public CustomerTagsServiceImpl(Dao dao) {
        super(dao);
    }
}
