package cn.dankefu.base.cache;

import net.sf.ehcache.CacheManager;
import org.nutz.ioc.loader.annotation.IocBean;

import java.net.MalformedURLException;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 20:28
 */
@IocBean
public class MyEhCacheManager {

//    @IocBean(name = "ehcacheCacheManager")
    public CacheManager getCacheManager() throws MalformedURLException {
       return new CacheManager("ehcache.xml");
    }
}
