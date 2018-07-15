package cn.dankefu.enums;

import org.nutz.lang.Strings;

/**
 * 评级等级
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 0017 19:58
 */
public enum  AppraiseLevelEnum {
    SATISFACTION ("satisfaction","满意"),
    ORDINARY("ordinary","一般"),
    DISSATISFIED("dissatisfied","不满");

    String level;
    String desc;

    AppraiseLevelEnum(String level, String desc){
        this.level = level;
        this.desc= desc;
    }


    public static AppraiseLevelEnum valueOf2(String type){
        if(Strings.isBlank(type)){
            return null;
        }
        AppraiseLevelEnum[] values = values();
        for (AppraiseLevelEnum typeEnum : values){
            if(typeEnum.getLevel().equalsIgnoreCase(type)){
                return typeEnum;
            }
        }
        return null;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
