package cn.dankefu.enums;

import org.nutz.lang.Strings;

/**
 * 知识库数据类型
 * @author 蛋蛋的忧伤
 * @date 2018/5/14 0014 20:26
 */
public enum KnowledgeDataTypeEnum {
    TEXT("TEXT","纯文本"),
    RichTEXT("RichTEXT","富文本");

    String type;
    String desc;

    KnowledgeDataTypeEnum(String type, String desc){
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

    public static KnowledgeDataTypeEnum valueOf2(String type){
        if(Strings.isBlank(type)){
            return null;
        }
        KnowledgeDataTypeEnum[] values = values();
        for (KnowledgeDataTypeEnum typeEnum : values){
            if(typeEnum.getType().equalsIgnoreCase(type)){
                return typeEnum;
            }
        }
        return null;
    }
}
