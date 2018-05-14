package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 机器人未知问题表
 * author: 蛋蛋的忧伤
 * date: 2018/5/14  20:21
 */
@Table("dankefu_unknown_questions")
public class Unknown_questions extends BasePojo{
    private static final long serialVersionUID = 1L;

    @Column
    @Name
    @Comment("编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Prev(els = {@EL("uuid()")})
    private String id;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("单位编号")
    private String unitId;

    @Column
    @Comment("问题")
    @ColDefine(type = ColType.VARCHAR, width = 120)
    private String question;

    @Column
    @Comment("问题：ClientSourceEnum")
    @ColDefine(type = ColType.VARCHAR, width = 120)
    private String source;

    @Column
    @Comment("来源会话记录编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String chatHistoryId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getChatHistoryId() {
        return chatHistoryId;
    }

    public void setChatHistoryId(String chatHistoryId) {
        this.chatHistoryId = chatHistoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Unknown_questions that = (Unknown_questions) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(unitId, that.unitId) &&
                Objects.equals(question, that.question) &&
                Objects.equals(source, that.source) &&
                Objects.equals(chatHistoryId, that.chatHistoryId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, question, source, chatHistoryId);
    }
}
