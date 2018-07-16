package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Date;
import java.util.Objects;

/**
 * 客服会话表
 * author: 蛋蛋的忧伤
 * date: 2018/5/16 0016 20:18
 */
@Table("dankefu_chat")
public class Chat extends BasePojo{
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
    @Comment("名字")
    private String name;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 10)
    @Comment("来源:ClientSourceEnum")
    private String source;


    @Column
    @ColDefine(type = ColType.VARCHAR,width = 255)
    @Comment("浏览器代理内容")
    private String userAgent;


    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("访问ip")
    private String ip;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("来访次数")
    private int chatCount;

    @Column
    @ColDefine(type = ColType.DATETIME)
    @Comment("最后一次访问时间")
    private Date lastTime;


    @Column
    @ColDefine(type = ColType.DATETIME)
    @Comment("最后一次结束时间")
    private Date endTime;


    @Column
    @ColDefine(type = ColType.VARCHAR, width = 50)
    @Comment("区域，根据ip获取的位置")
    private String region;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 50)
    @Comment("session id")
    private String sid;


    private Chat_history curr_session;

    private String status;


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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public int getChatCount() {
        return chatCount;
    }

    public void setChatCount(int chatCount) {
        this.chatCount = chatCount;
    }

    public Date getLastTime() {
        return lastTime;
    }

    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chat chat = (Chat) o;
        return chatCount == chat.chatCount &&
                Objects.equals(id, chat.id) &&
                Objects.equals(unitId, chat.unitId) &&
                Objects.equals(sysUserId, chat.sysUserId) &&
                Objects.equals(name, chat.name) &&
                Objects.equals(ip, chat.ip) &&
                Objects.equals(lastTime, chat.lastTime) &&
                Objects.equals(endTime, chat.endTime) &&
                Objects.equals(region, chat.region);
    }



    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, sysUserId, name, ip, chatCount, lastTime, endTime, region);
    }

    public Chat_history getCurr_session() {
        return curr_session;
    }

    public void setCurr_session(Chat_history curr_session) {
        this.curr_session = curr_session;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
}
