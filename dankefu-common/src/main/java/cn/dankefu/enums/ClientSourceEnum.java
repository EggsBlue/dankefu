package cn.dankefu.enums;

import org.nutz.lang.Strings;

/**
 * 客户来源
 * author: 蛋蛋的忧伤
 * date: 2018/5/14  20:34
 */
public enum ClientSourceEnum {
    WEB_PC("web_pc","PC网站"),
    WEB_MOBILE("web_mobile","手机网站");

    String source;
    String desc;

    ClientSourceEnum(String source, String desc){
        this.source = source;
        this.desc= desc;
    }

    public static ClientSourceEnum valueOf2(String type){
        if(Strings.isBlank(type)){
            return null;
        }
        ClientSourceEnum[] values = values();
        for (ClientSourceEnum typeEnum : values){
            if(typeEnum.getSource().equalsIgnoreCase(type)){
                return typeEnum;
            }
        }
        return null;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
