package cn.dankefu.enums;

import org.nutz.lang.Strings;

/**
 * 客服转接状态枚举
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 0017 19:53
 */
public enum  ChatHistoryRedirectStatusEnum {
    SUCCESS("success","成功"),
    ERROR("error","失败");

    String status;
    String desc;

    ChatHistoryRedirectStatusEnum(String status, String desc){
        this.status = status;
        this.desc= desc;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String statuc) {
        this.status = statuc;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }


    public static ChatHistoryRedirectStatusEnum valueOf2(String type){
        if(Strings.isBlank(type)){
            return null;
        }
        ChatHistoryRedirectStatusEnum[] values = values();
        for (ChatHistoryRedirectStatusEnum typeEnum : values){
            if(typeEnum.getStatus().equalsIgnoreCase(type)){
                return typeEnum;
            }
        }
        return null;
    }
}
