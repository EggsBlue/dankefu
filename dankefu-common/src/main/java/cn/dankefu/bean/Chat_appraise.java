package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 客户评级表
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 0017 19:56
 */
@Table("dankefu_chat_appraise")
public class Chat_appraise extends BasePojo{
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
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("客服编号")
    private String sysUserId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("对应会话记录编号")
    private String chatHistoryId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 10)
    @Comment("评级:AppraiseLevelEnum")
    private String appraiseLevel;

    @Column
    @ColDefine(type = ColType.TEXT)
    @Comment("评价内容")
    private String appraiseContent;

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

    public String getSysUserId() {
        return sysUserId;
    }

    public void setSysUserId(String sysUserId) {
        this.sysUserId = sysUserId;
    }

    public String getChatHistoryId() {
        return chatHistoryId;
    }

    public void setChatHistoryId(String chatHistoryId) {
        this.chatHistoryId = chatHistoryId;
    }

    public String getAppraiseLevel() {
        return appraiseLevel;
    }

    public void setAppraiseLevel(String appraiseLevel) {
        this.appraiseLevel = appraiseLevel;
    }

    public String getAppraiseContent() {
        return appraiseContent;
    }

    public void setAppraiseContent(String appraiseContent) {
        this.appraiseContent = appraiseContent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chat_appraise that = (Chat_appraise) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(unitId, that.unitId) &&
                Objects.equals(sysUserId, that.sysUserId) &&
                Objects.equals(chatHistoryId, that.chatHistoryId) &&
                Objects.equals(appraiseLevel, that.appraiseLevel) &&
                Objects.equals(appraiseContent, that.appraiseContent);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, sysUserId, chatHistoryId, appraiseLevel, appraiseContent);
    }
}
