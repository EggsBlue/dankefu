package cn.dankefu.service.impl;

import cn.dankefu.base.service.BaseServiceImpl;
import cn.dankefu.bean.Customer;
import cn.dankefu.service.CustomerService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:13
 */
@IocBean(args = {"refer:dao"})
public class CustomerServiceImpl extends BaseServiceImpl<Customer> implements CustomerService {
    public CustomerServiceImpl(Dao dao) {
        super(dao);
    }
}
