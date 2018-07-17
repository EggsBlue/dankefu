package cn.dankefu.web.chat;

import cn.dankefu.bean.Customer;
import cn.dankefu.dto.Result;
import cn.dankefu.handler.Handler;
import cn.dankefu.service.CustomerService;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.adaptor.JsonAdaptor;
import org.nutz.mvc.annotation.*;

@IocBean
@At("/customer")
public class CustomerController extends Handler {

    @Inject
    private CustomerService customerService;

    @At
    @Ok("json")
    @POST
    @AdaptBy(type = JsonAdaptor.class)
    public Result save(Customer customer){
        return customerService.save(customer);
    }
}
