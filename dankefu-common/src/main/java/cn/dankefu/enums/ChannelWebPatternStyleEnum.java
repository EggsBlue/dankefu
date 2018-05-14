package cn.dankefu.enums;

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


    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
