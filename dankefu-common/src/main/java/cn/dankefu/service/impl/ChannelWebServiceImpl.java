package cn.dankefu.service.impl;

import cn.dankefu.bean.Channel_web;
import cn.dankefu.bean.Channel_worktime;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.ChannelWebService;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Lang;

import java.util.Calendar;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:10
 */
@IocBean(args = {"refer:dao"})
public class ChannelWebServiceImpl extends BaseServiceImpl<Channel_web> implements ChannelWebService {
    public ChannelWebServiceImpl(Dao dao) {
        super(dao);
    }

    @Override
    public boolean isWork(Channel_worktime worktime) {
        if(Lang.isEmpty(worktime)){ //没有设置工作时间，默认全天工作
            return true;
        }
        boolean flag = false;
        Calendar now = Calendar.getInstance();
        int week =now.get(Calendar.DAY_OF_WEEK);
        switch (week) {
            case 1:
                flag = worktime.isSunday();
                break;
            case 2:
                flag = worktime.isMonday();
                break;
            case 3:
                flag = worktime.isTuesday();
                break;
            case 4:
                flag = worktime.isWednesday();
                break;
            case 5:
                flag = worktime.isThursday();
                break;
            case 6:
                flag = worktime.isFriday();
                break;
            case 7:
                flag = worktime.isSunday();
                break;
            default:
                flag = true;
                break;
        }

        return flag;
    }
}
