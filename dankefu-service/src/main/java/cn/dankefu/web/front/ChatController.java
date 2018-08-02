package cn.dankefu.web.front;

import cn.dankefu.bean.Chat;
import cn.dankefu.bean.Sys_unit;
import cn.dankefu.dto.Result;
import cn.dankefu.enums.ClientSourceEnum;
import cn.dankefu.handler.Handler;
import cn.dankefu.service.ChatRecordsService;
import cn.dankefu.service.ChatService;
import cn.dankefu.service.SysUnitService;
import jdk.nashorn.internal.ir.annotations.Reference;
import org.nutz.dao.Cnd;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.*;
import org.nutz.lang.random.R;
import org.nutz.lang.util.NutMap;
import org.nutz.mvc.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@At("/front/chat")
@Filters()
@IocBean(name = "frontChatController")
public class ChatController extends Handler {

    @Inject
    private ChatService chatService;

    @Inject
    private SysUnitService sysUnitService;


    @Inject
    private ChatRecordsService chatRecordsService;


    /**
     * 手机web端入口
     * localhost:9422/front/chat/tsd7krdjeuj6kqdsn16nohfj46/web_mobile
     * @param unitId 企业单位id
     * @param type 访问来源：ClientSourceEnum
     * @param request
     * @param response
     */
    @At("/?/?")
    @Ok("beetl:/front/chat/mobile/index.html")
    public void index(String unitId,String type,HttpServletRequest request,HttpServletResponse response){
        Chat guest = chatService.getGuest(unitId, type, request, response);
        if(Lang.isNotEmpty(guest)){
            request.setAttribute("guest_id",guest.getId());
            request.setAttribute("unitId",unitId);
        }
    }

    @At("/get")
    @Ok("json")
    @POST
    public Object get(@Param("unitId")String unitId,@Param("type")String type, HttpServletRequest request, HttpServletResponse response){
        Chat chat = chatService.getGuest(unitId, type, request, response);
        if(Lang.isEmpty(chat)){
            return error("非法请求");
        }
        return success().setData(new NutMap("guest_id",chat.getId()));
    }


    @At("/query")
    @Ok("json")
    @POST
    public Result query(
            @Param("chatId")String chatId,@Attr("uid") String uid, @Param("servicer_id")String servicer_id,
            @Param("pageNo")int pageNo,@Param("pageSize")int pageSize,@Param("month")String month){
        if(Strings.isBlank(chatId)){
            return success();
        }
        if(pageNo == 0){
            pageNo = 1;
        }
        if(pageSize == 0){
            pageSize = 20;
        }
        if(Strings.isNotBlank(servicer_id)){
            uid = servicer_id;
        }
        Cnd cnd = Cnd.where("chatId","=",chatId).and("sys_user_id","=",uid);
        cnd.orderBy("ct","asc");
        return  chatRecordsService.query(cnd,pageNo,pageSize,month);
    }



}
