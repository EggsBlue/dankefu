package cn.dankefu.web.chat;

import cn.dankefu.bean.Sys_user;
import cn.dankefu.dto.Result;
import cn.dankefu.handler.Handler;
import cn.dankefu.service.ChatRecordsService;
import cn.dankefu.service.SysUserService;
import org.nutz.dao.Cnd;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;
import org.nutz.mvc.annotation.*;

/**
 * 会话记录入口
 * @author 蛋蛋
 */
@At("/chat/records")
@IocBean
public class ChatRecordsController extends Handler {

    @Inject
    private ChatRecordsService chatRecordsService;

    @Inject
    private SysUserService sysUserService;

    @At("/query")
    @Ok("json")
    @POST
    public Result query(
            @Param("chatId")String chatId,@Attr("uid") String uid,
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
        Cnd cnd = Cnd.where("chatId","=",chatId).and("sys_user_id","=",uid);
        return  chatRecordsService.query(cnd,pageNo,pageSize,month);
    }

}
