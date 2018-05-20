package cn.dankefu.base.init;

import org.nutz.dao.Dao;
import org.nutz.dao.util.Daos;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Log;
import org.nutz.log.Logs;

/**
 * 初始化数据表
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 15:02
 */
@IocBean(create = "init")
public class TablesInit {

    Log log = Logs.get();

    @Inject
    Dao dao;

    public void init(){
        //创建表结构
        Daos.createTablesInPackage(dao, "cn.dankefu", false);
        if (log.isDebugEnabled()) {
            //更新表字段
            Daos.migration(dao, "cn.dankefu", true, false);
        }


    }

}
