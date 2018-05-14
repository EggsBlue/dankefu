package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 知识库
 * author: 蛋蛋的忧伤
 * date: 2018/5/14  20:21
 */
@Table("dankefu_knowledge_data")
public class Knowledge_data extends BasePojo{
    private static final long serialVersionUID = 1L;

    @Column
    @Name
    @Comment("编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Prev(els = {@EL("uuid()")})
    private String id;

    @Column
    @Comment("问题")
    @ColDefine(type = ColType.VARCHAR, width = 120)
    private String question;

    @Column
    @Comment("知识库分类编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String knowledgeTypeId;

    @Column
    @Comment("问题类型:KnowledgeDataTypeEnum")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String type;

    @Column
    @Comment("答案")
    @ColDefine(type = ColType.TEXT)
    private String result;

    @Column
    @Comment("客服是否可用")
    @ColDefine(type = ColType.BOOLEAN)
    private boolean userDisable;

    @Column
    @Comment("机器人是否可用")
    @ColDefine(type = ColType.BOOLEAN)
    private boolean robotDisable;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getKnowledgeTypeId() {
        return knowledgeTypeId;
    }

    public void setKnowledgeTypeId(String knowledgeTypeId) {
        this.knowledgeTypeId = knowledgeTypeId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public boolean isUserDisable() {
        return userDisable;
    }

    public void setUserDisable(boolean userDisable) {
        this.userDisable = userDisable;
    }

    public boolean isRobotDisable() {
        return robotDisable;
    }

    public void setRobotDisable(boolean robotDisable) {
        this.robotDisable = robotDisable;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Knowledge_data that = (Knowledge_data) o;
        return userDisable == that.userDisable &&
                robotDisable == that.robotDisable &&
                Objects.equals(id, that.id) &&
                Objects.equals(question, that.question) &&
                Objects.equals(knowledgeTypeId, that.knowledgeTypeId) &&
                Objects.equals(type, that.type) &&
                Objects.equals(result, that.result);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, question, knowledgeTypeId, type, result, userDisable, robotDisable);
    }
}
