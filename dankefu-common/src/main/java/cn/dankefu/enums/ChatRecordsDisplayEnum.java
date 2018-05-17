package cn.dankefu.enums;

/**
 * 聊天记录展示类型
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 0017 19:37
 */
public enum  ChatRecordsDisplayEnum {
    normal("normal","正常");

    String type;
    String desc;

    ChatRecordsDisplayEnum(String type, String desc){
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
}
