package cn.dankefu.enums;

import org.nutz.lang.Strings;

/**
 * 消息类型
 * author: 蛋蛋的忧伤
 * date: 2018年07月18日21:05:14
 */
public enum ChatRecordTypeEnum {
    SYSTEM("system","系统消息"),
    CHAT("chat","聊天消息");

    String type;
    String desc;

    ChatRecordTypeEnum(String type, String desc){
        this.type = type;
        this.desc= desc;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public static ChatRecordTypeEnum valueOf2(String type){
        if(Strings.isBlank(type)){
            return null;
        }
        ChatRecordTypeEnum[] values = values();
        for (ChatRecordTypeEnum typeEnum : values){
            if(typeEnum.getType().equalsIgnoreCase(type)){
                return typeEnum;
            }
        }
        return null;
    }
}
