package cn.dankefu.enums;

/**
 * 证件类型枚举
 * @author 蛋蛋的忧伤
 * @date 2018/5/16 0016 20:10
 */
public enum CardTypeEnum {
    IDENTITYCARD ("identityCard","身份证"),
    OFFICERCERTIFICATE("officerCertificate","军官证书"),
    PASSPORT("passport","护照");


    String type;
    String desc;

    CardTypeEnum(String type, String desc){
        this.type = type;
        this.desc= desc;
    }



    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
