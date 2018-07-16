package cn.dankefu.service.impl;

import cn.dankefu.bean.Chat;
import cn.dankefu.bean.Sys_unit;
import cn.dankefu.dto.Result;
import cn.dankefu.enums.ClientSourceEnum;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.ChatService;
import cn.dankefu.service.SysUnitService;
import org.nutz.dao.Dao;
import org.nutz.dao.Sqls;
import org.nutz.dao.sql.Sql;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.*;
import org.nutz.lang.random.R;
import org.tio.core.Tio;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:13
 */
@IocBean(args = {"refer:dao"})
public class ChatServiceImpl extends BaseServiceImpl<Chat> implements ChatService {
    public ChatServiceImpl(Dao dao) {
        super(dao);
    }


    @Inject
    private ChatService chatService;

    @Inject
    private SysUnitService sysUnitService;




    @Override
    public Chat insert(String unitId,ClientSourceEnum sourceEnum,HttpServletRequest request) {
        Chat chat = new Chat();
        chat.setId(R.UU16());
        chat.setUnitId(unitId);
        chat.setName(sourceEnum.getDesc()+"-匿名-"+count());
        chat.setIp(Lang.getIP(request));
        chat.setChatCount(1);
        chat.setLastTime(new Date());
        chat.setRegion("");
        chat.setSource(sourceEnum.getSource());
        fastInsert(chat);
        return chat;
    }

    @Override
    public Chat getGuest(String unitId, String type, HttpServletRequest request, HttpServletResponse response) {
        if(Strings.isBlank(unitId)){
            return null;
        }
        Sys_unit unit = sysUnitService.fetch(unitId);
        if (unit == null) {
            return null;
        }
        ClientSourceEnum sourceEnum = ClientSourceEnum.valueOf2(type);
        if(Strings.isBlank(type) || sourceEnum== null){
            return null;
        }
        Cookie[] cookies = request.getCookies();
        final String[] sid = {""};
        if(cookies!=null && cookies.length >0){
            Lang.each(cookies, new Each<Object>() {
                @Override
                public void invoke(int index, Object ele, int length) throws ExitLoop, ContinueLoop, LoopException {
                    Cookie ele_ = ( (Cookie)ele);
                    if( "sid2".equalsIgnoreCase(ele_.getName()) ){
                        sid[0] = ele_.getValue();
                    }
                }
            });
        }
        Chat chat;
        if(Strings.isBlank(sid[0])){
            chat = insert(unitId,sourceEnum,request);
            addCookie(chat.getId(),response);
        }else{
            chat = fetch(sid[0]);
            if(chat == null){
                chat = insert(unitId,sourceEnum,request);
                addCookie(chat.getId(),response);
            }else{
                chat.setChatCount(chat.getChatCount() +1 );
                chat.setIp(Lang.getIP(request));
                chat.setLastTime(new Date());
                update(chat);
            }
        }
        return chat;
    }

    @Override
    public List<Chat> getChatList(String uid) {
        Sql sql = Sqls.create("select c.id,c.* from dankefu_chat as c left join   (select distinct  chatId from  dankefu_chat_history where sysUserId = @userId )  as h on c.id = h.chatId  order by c.ct desc  ");
        sql.setParam("userId",uid);
        sql.setCallback(Sqls.callback.entities());
        sql.setEntity(dao().getEntity(Chat.class));
        dao().execute(sql);
        return sql.getList(Chat.class);
    }


    void addCookie(String sid,HttpServletResponse response){
        Cookie cookie = new Cookie("sid2",sid);
        cookie.setPath("/");
        cookie.setMaxAge(60*60*24*365); // 一年
        response.addCookie(cookie);
    }

}
