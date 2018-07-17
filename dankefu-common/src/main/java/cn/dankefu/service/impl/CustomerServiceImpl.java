package cn.dankefu.service.impl;

import cn.dankefu.bean.Customer;
import cn.dankefu.dto.Result;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.CustomerService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:13
 */
@IocBean(args = {"refer:dao"})
public class CustomerServiceImpl extends BaseServiceImpl<Customer> implements CustomerService {
    public CustomerServiceImpl(Dao dao) {
        super(dao);
    }

    @Override
    public Result save(Customer customer) {
        if(customer ==null){
            return Result.ERROR("数据异常");
        }
        if(Strings.isNotBlank(customer.getId())){
             updateIgnoreNull(customer);
        }else{
            customer = insert(customer);
        }
        return Result.SUCCESS().setData(customer);
    }
}
