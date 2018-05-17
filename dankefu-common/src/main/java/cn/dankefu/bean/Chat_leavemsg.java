package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 客户留言表
 * author: 蛋蛋的忧伤
 * date: 2018/5/16 0016 20:23
 */
@Table("dankefu_chat_leavemsg")
public class Chat_leavemsg extends BasePojo{
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
    @Comment("客服会话编号")
    private String chatId;


    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("客户编号")
    private String customerId;


    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("会话记录编号")
    private String chatHistoryId;


    @Column
    @ColDefine(type = ColType.VARCHAR, width = 11)
    @Comment("联系电话")
    private String phone;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("邮箱")
    private String email;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 500)
    @Comment("留言内容")
    private String content;

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

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getChatHistoryId() {
        return chatHistoryId;
    }

    public void setChatHistoryId(String chatHistoryId) {
        this.chatHistoryId = chatHistoryId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chat_leavemsg that = (Chat_leavemsg) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(unitId, that.unitId) &&
                Objects.equals(chatId, that.chatId) &&
                Objects.equals(customerId, that.customerId) &&
                Objects.equals(chatHistoryId, that.chatHistoryId) &&
                Objects.equals(phone, that.phone) &&
                Objects.equals(email, that.email) &&
                Objects.equals(content, that.content);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, chatId, customerId, chatHistoryId, phone, email, content);
    }
}
