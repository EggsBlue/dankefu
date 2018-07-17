package cn.dankefu.service;

import cn.dankefu.bean.Customer;
import cn.dankefu.dto.Result;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:05
 */
public interface CustomerService extends BaseService<Customer> {
    Result save(Customer customer);
}
