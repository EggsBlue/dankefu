package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Date;
import java.util.Objects;

/**
 * 会话记录表
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 0017 19:48
 */
@Table("dankefu_chat_history")
public class Chat_history extends BasePojo{
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
    @Comment("会话消息编号")
    private String chatId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("客服编号")
    private String sysUserId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 50)
    @Comment("来放人名字")
    private String name;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 10)
    @Comment("来源:ClientSourceEnum")
    private String source;


    @Column
    @ColDefine(type = ColType.VARCHAR,width = 100)
    @Comment("浏览器代理内容")
    private String userAgent;

    @Column
    @ColDefine(type = ColType.DATETIME)
    @Comment("结束时间")
    private Date endTime;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否转接到了人工")
    private boolean isPersonService;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否客服全忙")
    private boolean isBusy;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否为休息时间")
    private boolean isRestTime;


    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否评级")
    private boolean isAppraise;


    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否转接客服")
    private boolean isRedirect;


    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("转接状态")
    private boolean redirectStatus;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 32)
    @Comment("转接目标人编号")
    private boolean redirectUserId;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 32)
    @Comment("转接人编号")
    private boolean formUserId;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 32)
    @Comment("转接来源会话编号")
    private boolean fromChatId;


    @Column
    @ColDefine(type = ColType.VARCHAR,width = 32)
    @Comment("转接来源会话编号")
    private boolean fromChatHistoryId;

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

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public String getSysUserId() {
        return sysUserId;
    }

    public void setSysUserId(String sysUserId) {
        this.sysUserId = sysUserId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public boolean isPersonService() {
        return isPersonService;
    }

    public void setPersonService(boolean personService) {
        isPersonService = personService;
    }

    public boolean isBusy() {
        return isBusy;
    }

    public void setBusy(boolean busy) {
        isBusy = busy;
    }

    public boolean isRestTime() {
        return isRestTime;
    }

    public void setRestTime(boolean restTime) {
        isRestTime = restTime;
    }

    public boolean isAppraise() {
        return isAppraise;
    }

    public void setAppraise(boolean appraise) {
        isAppraise = appraise;
    }

    public boolean isRedirect() {
        return isRedirect;
    }

    public void setRedirect(boolean redirect) {
        isRedirect = redirect;
    }

    public boolean isRedirectStatus() {
        return redirectStatus;
    }

    public void setRedirectStatus(boolean redirectStatus) {
        this.redirectStatus = redirectStatus;
    }

    public boolean isRedirectUserId() {
        return redirectUserId;
    }

    public void setRedirectUserId(boolean redirectUserId) {
        this.redirectUserId = redirectUserId;
    }

    public boolean isFormUserId() {
        return formUserId;
    }

    public void setFormUserId(boolean formUserId) {
        this.formUserId = formUserId;
    }

    public boolean isFromChatId() {
        return fromChatId;
    }

    public void setFromChatId(boolean fromChatId) {
        this.fromChatId = fromChatId;
    }

    public boolean isFromChatHistoryId() {
        return fromChatHistoryId;
    }

    public void setFromChatHistoryId(boolean fromChatHistoryId) {
        this.fromChatHistoryId = fromChatHistoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chat_history that = (Chat_history) o;
        return isPersonService == that.isPersonService &&
                isBusy == that.isBusy &&
                isRestTime == that.isRestTime &&
                isAppraise == that.isAppraise &&
                isRedirect == that.isRedirect &&
                redirectStatus == that.redirectStatus &&
                redirectUserId == that.redirectUserId &&
                formUserId == that.formUserId &&
                fromChatId == that.fromChatId &&
                fromChatHistoryId == that.fromChatHistoryId &&
                Objects.equals(id, that.id) &&
                Objects.equals(unitId, that.unitId) &&
                Objects.equals(chatId, that.chatId) &&
                Objects.equals(sysUserId, that.sysUserId) &&
                Objects.equals(name, that.name) &&
                Objects.equals(source, that.source) &&
                Objects.equals(userAgent, that.userAgent) &&
                Objects.equals(endTime, that.endTime);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, chatId, sysUserId, name, source, userAgent, endTime, isPersonService, isBusy, isRestTime, isAppraise, isRedirect, redirectStatus, redirectUserId, formUserId, fromChatId, fromChatHistoryId);
    }
}
