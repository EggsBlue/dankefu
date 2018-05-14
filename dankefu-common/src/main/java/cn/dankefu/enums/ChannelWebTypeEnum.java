package cn.dankefu.enums;

/**
 * WEB接入类型
 * author: 蛋蛋的忧伤
 * date: 2018/5/14 0014 20:49
 */
public enum  ChannelWebTypeEnum {
    PC("pc","PC网站"),
    MOBILE("mobile","手机网站");


    String type;
    String desc;

    ChannelWebTypeEnum(String type, String desc){
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
