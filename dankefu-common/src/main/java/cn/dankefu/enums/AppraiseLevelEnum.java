package cn.dankefu.enums;

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
