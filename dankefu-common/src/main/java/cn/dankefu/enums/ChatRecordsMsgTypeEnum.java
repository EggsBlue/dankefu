package cn.dankefu.enums;

import org.nutz.lang.Strings;

/**
 * 消息类型
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 0017 19:39
 */
public enum  ChatRecordsMsgTypeEnum {
    TEXT("text","文本消息"),
    IMAGE("image","图片消息"),
    VIDEO("video","视频消息"),
    voice("voice","音频消息");

    String type;
    String desc;

    ChatRecordsMsgTypeEnum(String type, String desc){
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

    public static ChatRecordsMsgTypeEnum valueOf2(String type){
        if(Strings.isBlank(type)){
            return null;
        }
        ChatRecordsMsgTypeEnum[] values = values();
        for (ChatRecordsMsgTypeEnum typeEnum : values){
            if(typeEnum.getType().equalsIgnoreCase(type)){
                return typeEnum;
            }
        }
        return null;
    }
}
