package cn.dankefu.enums;

/**
 * 客服转接状态枚举
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 0017 19:53
 */
public enum  ChatHistoryRedirectStatusEnum {
    SUCCESS("success","成功"),
    ERROR("error","失败");

    String statuc;
    String desc;

    ChatHistoryRedirectStatusEnum(String statuc, String desc){
        this.statuc = statuc;
        this.desc= desc;
    }

    public String getStatuc() {
        return statuc;
    }

    public void setStatuc(String statuc) {
        this.statuc = statuc;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
