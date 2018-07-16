package cn.dankefu.service;

import cn.dankefu.bean.Chat;
import cn.dankefu.enums.ClientSourceEnum;
import org.nutz.mvc.annotation.Param;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:04
 */
public interface ChatService extends BaseService<Chat> {

    Chat insert(String unitId, ClientSourceEnum sourceDesc, HttpServletRequest request);
    Chat getGuest(String unitId,String type, HttpServletRequest request, HttpServletResponse response);

    /**
     * 获取历史服务访客列表
     * @param uid
     * @return
     */
    List<Chat> getChatList(String uid);
}
