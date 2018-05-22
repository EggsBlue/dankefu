package cn.dankefu;

import cn.dankefu.bean.Sys_user;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.nutz.boot.NbApp;
import org.nutz.boot.test.junit4.NbJUnit4Runner;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.util.cri.SimpleCriteria;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;

/**
 * 杂乱测试
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 0017 20:08
 */
@IocBean
@RunWith(NbJUnit4Runner.class)
public class Test1 extends Assert {

    @Inject
    private Dao dao;

    @Test
    public void daoCountTest(){
        String whereSql = Cnd.where("name", "=", "wendal").and("age","=",18) .toString();
        String joinSql = "inner join person on person.stuId = student.id";
        SimpleCriteria simpleCriteria = new SimpleCriteria(joinSql + whereSql);
        try {
            dao.query("person",simpleCriteria);

        }catch (Exception e){

        }
        try {
            dao.count("person", simpleCriteria);

        }catch (Exception e){

        }
    }


    @Test
    public void daoUpdateIgnoreNullTest(){
        Sys_user user = new Sys_user();
        user.setId("303284f141a24315b1bfdd8370421daf");
        user.setLoginCount(0);
        dao.updateIgnoreNull(user);
    }

    public static NbApp createNbApp() {
        NbApp nb = new NbApp().setMainClass(DankefuAdminMainLauncher.class).setPrintProcDoc(false);
        nb.getAppContext().setMainPackage("cn.dankefu");
        return nb;
    }
}
