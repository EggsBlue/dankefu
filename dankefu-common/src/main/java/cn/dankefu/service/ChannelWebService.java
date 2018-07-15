package cn.dankefu.service;

import cn.dankefu.bean.Channel_web;
import cn.dankefu.bean.Channel_worktime;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 13:56
 */
public interface ChannelWebService extends BaseService<Channel_web> {
    /**
     * 是否在工作时间
     * @param worktime
     * @return
     */
    boolean isWork(Channel_worktime worktime);
}
