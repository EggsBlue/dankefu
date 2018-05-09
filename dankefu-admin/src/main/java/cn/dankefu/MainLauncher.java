package cn.dankefu;

import org.nutz.boot.NbApp;
import org.nutz.integration.jedis.JedisAgent;
import org.nutz.integration.shiro.ShiroSessionProvider;
import org.nutz.ioc.Ioc;
import org.nutz.ioc.impl.PropertiesProxy;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.nutz.mvc.annotation.*;


/**
 * NB启动类
 * author: 蛋蛋的忧伤
 * date: 2018/5/8  20:18
 */
@IocBean(create = "init", depose = "depose")
@Modules(packages = "cn.dankefu")
@Encoding(input = "UTF-8", output = "UTF-8")
@ChainBy(args = "config/chain/dankefu-mvc-chain.json")
@SessionBy(ShiroSessionProvider.class)
public class MainLauncher {
    private static final Log log = Logs.get();
    @Inject("refer:$ioc")
    private Ioc ioc;
    @Inject
    private PropertiesProxy conf;
    @Inject
    private JedisAgent jedisAgent;

    public static void main(String[] args) throws Exception {
        new NbApp().setArgs(args).run();
    }

    public void init() {
    }

    public void depose() {

    }
}
