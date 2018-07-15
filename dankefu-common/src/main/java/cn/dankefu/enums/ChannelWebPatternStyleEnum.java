package cn.dankefu.enums;

import org.nutz.lang.Strings;

/**
 * WEB渠道接入类型
 * author: 蛋蛋的忧伤
 * date: 2018/5/14 0014 21:12
 */
public enum  ChannelWebPatternStyleEnum {
    PC("flow","悬浮窗对话框"),
    MOBILE("window","页面对话框");


    String style;
    String desc;

    ChannelWebPatternStyleEnum(String style, String desc){
        this.style = style;
        this.desc= desc;
    }


    public static ChannelWebPatternStyleEnum valueOf2(String type){
        if(Strings.isBlank(type)){
            return null;
        }
        ChannelWebPatternStyleEnum[] values = values();
        for (ChannelWebPatternStyleEnum typeEnum : values){
            if(typeEnum.getStyle().equalsIgnoreCase(type)){
                return typeEnum;
            }
        }
        return null;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }
}
