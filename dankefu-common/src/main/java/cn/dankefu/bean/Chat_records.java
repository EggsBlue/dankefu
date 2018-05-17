package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Date;
import java.util.Objects;

/**
 * 聊天记录表
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 0017 19:35
 */
@Table("dankefu_chat_records")
public class Chat_records extends BasePojo{
    private static final long serialVersionUID = 1L;
    @Column
    @Name
    @Comment("编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Prev(els = {@EL("uuid()")})
    private String id;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("会话消息编号")
    private String chatId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 10)
    @Comment("消息类型:ChatRecordsMsgTypeEnum")
    private String msgType;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("展示类型:ChatRecordsDisplayEnum")
    private String display;

    @Column
    @ColDefine(type = ColType.DATETIME)
    @Comment("附带时间")
    private Date prevTime;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 100)
    @Comment("消息发送者,对应:sys_user_id/chatId,robot")
    private String msgFrom;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 100)
    @Comment("消息接受者,对应:sys_user_id/chatId,robot")
    private String msgTo;

    @Column
    @ColDefine(type = ColType.TEXT)
    @Comment("消息内容")
    private String content;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 10)
    @Comment("消息来源:ClientSourceEnum")
    private String source;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public String getMsgType() {
        return msgType;
    }

    public void setMsgType(String msgType) {
        this.msgType = msgType;
    }

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    public Date getPrevTime() {
        return prevTime;
    }

    public void setPrevTime(Date prevTime) {
        this.prevTime = prevTime;
    }

    public String getMsgFrom() {
        return msgFrom;
    }

    public void setMsgFrom(String msgFrom) {
        this.msgFrom = msgFrom;
    }

    public String getMsgTo() {
        return msgTo;
    }

    public void setMsgTo(String msgTo) {
        this.msgTo = msgTo;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chat_records that = (Chat_records) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(chatId, that.chatId) &&
                Objects.equals(msgType, that.msgType) &&
                Objects.equals(display, that.display) &&
                Objects.equals(prevTime, that.prevTime) &&
                Objects.equals(msgFrom, that.msgFrom) &&
                Objects.equals(msgTo, that.msgTo) &&
                Objects.equals(content, that.content) &&
                Objects.equals(source, that.source);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, chatId, msgType, display, prevTime, msgFrom, msgTo, content, source);
    }
}
