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
    @Comment("来访人名字")
    private String name;

    @Column
    @ColDefine(type = ColType.DATETIME)
    @Comment("结束时间")
    private Date endTime;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否转接到了人工")
    @Default(value = "false")
    private boolean isPersonService;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否客服全忙")
    @Default(value = "false")
    private boolean isBusy;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否为休息时间")
    @Default(value = "false")
    private boolean isRestTime;


    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否评级")
    @Default(value = "false")
    private boolean isAppraise;


    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否转接客服")
    @Default(value = "false")
    private boolean isRedirect;


    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("转接状态")
    @Default(value = "false")
    private boolean redirectStatus;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 32)
    @Comment("转接目标人编号")
    private String redirectUserId;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 32)
    @Comment("转接人编号")
    private String formUserId;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 32)
    @Comment("转接来源会话编号")
    private String fromChatId;


    @Column
    @ColDefine(type = ColType.VARCHAR,width = 32)
    @Comment("转接来源会话编号")
    private String fromChatHistoryId;

    @Column
    @ColDefine(type = ColType.BOOLEAN,width = 32)
    @Comment("是否无客服在线")
    @Default(value = "false")
    private boolean isNoone;

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


    public String getRedirectUserId() {
        return redirectUserId;
    }

    public void setRedirectUserId(String redirectUserId) {
        this.redirectUserId = redirectUserId;
    }

    public String getFormUserId() {
        return formUserId;
    }

    public void setFormUserId(String formUserId) {
        this.formUserId = formUserId;
    }

    public String getFromChatHistoryId() {
        return fromChatHistoryId;
    }

    public void setFromChatHistoryId(String fromChatHistoryId) {
        this.fromChatHistoryId = fromChatHistoryId;
    }

    public String getFromChatId() {
        return fromChatId;
    }

    public void setFromChatId(String fromChatId) {
        this.fromChatId = fromChatId;
    }

    public boolean isNoone() {
        return isNoone;
    }

    public void setNoone(boolean noone) {
        isNoone = noone;
    }
}
