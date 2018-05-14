package cn.dankefu.enums;

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
}
