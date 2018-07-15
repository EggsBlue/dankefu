package cn.dankefu.service;

import cn.dankefu.bean.Chat;
import org.nutz.mvc.annotation.Param;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:04
 */
public interface ChatService extends BaseService<Chat> {

    Chat insert(String unitId,String sourceDesc,String ip);
    Chat getGuest(String unitId,String type, HttpServletRequest request, HttpServletResponse response);
}
