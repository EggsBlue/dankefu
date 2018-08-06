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
            @Param("chatId")String chatId,@Attr("uid") String uid, @Param("servicer_id")String servicer_id,
            @Param("pageNo")int pageNo,@Param("pageSize")int pageSize,@Param("month")String month,@Param("offset_ct")Long offsetCt){
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

        Cnd cnd = Cnd.where("chatId","=",chatId);
        if(offsetCt!=null && offsetCt>0){
            cnd.and("ct","<",offsetCt);
        }
        cnd.orderBy("ct","desc");
        return  chatRecordsService.query(cnd,pageNo,pageSize,month);
    }

}
