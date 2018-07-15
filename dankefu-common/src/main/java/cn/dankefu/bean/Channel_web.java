package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * WEB接入渠道
 * author: 蛋蛋的忧伤
 * date: 2018/5/14 0014 20:47
 */
@Table("dankefu_channel_web")
public class Channel_web extends BasePojo{
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
    @Comment("入口展示样式编号")
    private String patternId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 5)
    @Comment("WEB渠道类型:ClientSourceEnum")
    private String type;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("工作时间表编号")
    private String workTimeId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 255)
    @Comment("非工作时间提示语")
    private String notWorkTimeWords;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否超时提示用户")
    private boolean isTimeOutHint;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("超时警告时间,秒")
    private int prevTimeOutTime;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 255)
    @Comment("超时警告提示语,秒")
    private String prevTimeOutWords;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("超时时间,秒")
    private int TimeOutTime;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 255)
    @Comment("超时提示语")
    private String TimeOutWords;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("客服全忙时是否排队")
    private boolean isQueueUp;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 255)
    @Comment("客服接入后的第一句话")
    private String accessAfterWords;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 255)
    @Comment("客服全忙时提示语")
    private String allBusyWords;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否允许客服主动询问服务满意度")
    private boolean isUserPushAppraise;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否允许客户主动提交服务满意度")
    private boolean isCilentPushAppraise;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("服务结束后,是否允许系统自动询问客户服务满意度")
    private boolean isSystemPushAppraise;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否启用客服长时间不回复提示")
    private boolean isUserLongTimeBusy;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("客服长时间不回复,第一次提示时间,秒")
    private int userFirstLongTime;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("客服长时间不回复,后续间隔提示时间,秒")
    private int userIntervalLongTime;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 255)
    @Comment("客服长时间不回复提示语")
    private String userLongTimeWords;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否启用客服长时间不回复则安抚用户")
    private boolean isUserLongTimeBusyPacify;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("客服长时间不回复第一次安抚时间,秒")
    private int userFirstLongTimePacify;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("客服长时间不回复后续间隔安抚时间,秒")
    private int userIntervalLongTimePacify;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 255)
    @Comment("客服长时间不回复安抚提示语")
    private String userIntervalLongTimePacifyWords;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("客服长时间不回复,提示次数")
    private int userIntervalLongTimeCount;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("安抚次数")
    private int userIntervalLongTimePacifyCount;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否启用机器人")
    private boolean isRobot;



    @One(field = "workTimeId")
    private Channel_worktime channel_worktime;

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

    public String getPatternId() {
        return patternId;
    }

    public void setPatternId(String patternId) {
        this.patternId = patternId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getWorkTimeId() {
        return workTimeId;
    }

    public void setWorkTimeId(String workTimeId) {
        this.workTimeId = workTimeId;
    }

    public String getNotWorkTimeWords() {
        return notWorkTimeWords;
    }

    public void setNotWorkTimeWords(String notWorkTimeWords) {
        this.notWorkTimeWords = notWorkTimeWords;
    }

    public boolean isTimeOutHint() {
        return isTimeOutHint;
    }

    public void setTimeOutHint(boolean timeOutHint) {
        isTimeOutHint = timeOutHint;
    }

    public int getPrevTimeOutTime() {
        return prevTimeOutTime;
    }

    public void setPrevTimeOutTime(int prevTimeOutTime) {
        this.prevTimeOutTime = prevTimeOutTime;
    }

    public String getPrevTimeOutWords() {
        return prevTimeOutWords;
    }

    public void setPrevTimeOutWords(String prevTimeOutWords) {
        this.prevTimeOutWords = prevTimeOutWords;
    }

    public int getTimeOutTime() {
        return TimeOutTime;
    }

    public void setTimeOutTime(int timeOutTime) {
        TimeOutTime = timeOutTime;
    }

    public String getTimeOutWords() {
        return TimeOutWords;
    }

    public void setTimeOutWords(String timeOutWords) {
        TimeOutWords = timeOutWords;
    }

    public boolean isQueueUp() {
        return isQueueUp;
    }

    public void setQueueUp(boolean queueUp) {
        isQueueUp = queueUp;
    }

    public String getAccessAfterWords() {
        return accessAfterWords;
    }

    public void setAccessAfterWords(String accessAfterWords) {
        this.accessAfterWords = accessAfterWords;
    }

    public String getAllBusyWords() {
        return allBusyWords;
    }

    public void setAllBusyWords(String allBusyWords) {
        this.allBusyWords = allBusyWords;
    }

    public boolean isUserPushAppraise() {
        return isUserPushAppraise;
    }

    public void setUserPushAppraise(boolean userPushAppraise) {
        isUserPushAppraise = userPushAppraise;
    }

    public boolean isCilentPushAppraise() {
        return isCilentPushAppraise;
    }

    public void setCilentPushAppraise(boolean cilentPushAppraise) {
        isCilentPushAppraise = cilentPushAppraise;
    }

    public boolean isSystemPushAppraise() {
        return isSystemPushAppraise;
    }

    public void setSystemPushAppraise(boolean systemPushAppraise) {
        isSystemPushAppraise = systemPushAppraise;
    }

    public boolean isUserLongTimeBusy() {
        return isUserLongTimeBusy;
    }

    public void setUserLongTimeBusy(boolean userLongTimeBusy) {
        isUserLongTimeBusy = userLongTimeBusy;
    }

    public int getUserFirstLongTime() {
        return userFirstLongTime;
    }

    public void setUserFirstLongTime(int userFirstLongTime) {
        this.userFirstLongTime = userFirstLongTime;
    }

    public int getUserIntervalLongTime() {
        return userIntervalLongTime;
    }

    public void setUserIntervalLongTime(int userIntervalLongTime) {
        this.userIntervalLongTime = userIntervalLongTime;
    }

    public String getUserLongTimeWords() {
        return userLongTimeWords;
    }

    public void setUserLongTimeWords(String userLongTimeWords) {
        this.userLongTimeWords = userLongTimeWords;
    }

    public boolean isUserLongTimeBusyPacify() {
        return isUserLongTimeBusyPacify;
    }

    public void setUserLongTimeBusyPacify(boolean userLongTimeBusyPacify) {
        isUserLongTimeBusyPacify = userLongTimeBusyPacify;
    }

    public int getUserFirstLongTimePacify() {
        return userFirstLongTimePacify;
    }

    public void setUserFirstLongTimePacify(int userFirstLongTimePacify) {
        this.userFirstLongTimePacify = userFirstLongTimePacify;
    }

    public int getUserIntervalLongTimePacify() {
        return userIntervalLongTimePacify;
    }

    public void setUserIntervalLongTimePacify(int userIntervalLongTimePacify) {
        this.userIntervalLongTimePacify = userIntervalLongTimePacify;
    }

    public String getUserIntervalLongTimePacifyWords() {
        return userIntervalLongTimePacifyWords;
    }

    public void setUserIntervalLongTimePacifyWords(String userIntervalLongTimePacifyWords) {
        this.userIntervalLongTimePacifyWords = userIntervalLongTimePacifyWords;
    }

    public int getUserIntervalLongTimeCount() {
        return userIntervalLongTimeCount;
    }

    public void setUserIntervalLongTimeCount(int userIntervalLongTimeCount) {
        this.userIntervalLongTimeCount = userIntervalLongTimeCount;
    }

    public int getUserIntervalLongTimePacifyCount() {
        return userIntervalLongTimePacifyCount;
    }

    public void setUserIntervalLongTimePacifyCount(int userIntervalLongTimePacifyCount) {
        this.userIntervalLongTimePacifyCount = userIntervalLongTimePacifyCount;
    }

    public boolean isRobot() {
        return isRobot;
    }

    public void setRobot(boolean robot) {
        isRobot = robot;
    }


    public Channel_worktime getChannel_worktime() {
        return channel_worktime;
    }

    public void setChannel_worktime(Channel_worktime channel_worktime) {
        this.channel_worktime = channel_worktime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Channel_web that = (Channel_web) o;
        return isTimeOutHint == that.isTimeOutHint &&
                prevTimeOutTime == that.prevTimeOutTime &&
                TimeOutTime == that.TimeOutTime &&
                isQueueUp == that.isQueueUp &&
                isUserPushAppraise == that.isUserPushAppraise &&
                isCilentPushAppraise == that.isCilentPushAppraise &&
                isSystemPushAppraise == that.isSystemPushAppraise &&
                isUserLongTimeBusy == that.isUserLongTimeBusy &&
                userFirstLongTime == that.userFirstLongTime &&
                userIntervalLongTime == that.userIntervalLongTime &&
                isUserLongTimeBusyPacify == that.isUserLongTimeBusyPacify &&
                userFirstLongTimePacify == that.userFirstLongTimePacify &&
                userIntervalLongTimePacify == that.userIntervalLongTimePacify &&
                userIntervalLongTimeCount == that.userIntervalLongTimeCount &&
                userIntervalLongTimePacifyCount == that.userIntervalLongTimePacifyCount &&
                isRobot == that.isRobot &&
                Objects.equals(id, that.id) &&
                Objects.equals(unitId, that.unitId) &&
                Objects.equals(patternId, that.patternId) &&
                Objects.equals(type, that.type) &&
                Objects.equals(workTimeId, that.workTimeId) &&
                Objects.equals(notWorkTimeWords, that.notWorkTimeWords) &&
                Objects.equals(prevTimeOutWords, that.prevTimeOutWords) &&
                Objects.equals(TimeOutWords, that.TimeOutWords) &&
                Objects.equals(accessAfterWords, that.accessAfterWords) &&
                Objects.equals(allBusyWords, that.allBusyWords) &&
                Objects.equals(userLongTimeWords, that.userLongTimeWords) &&
                Objects.equals(userIntervalLongTimePacifyWords, that.userIntervalLongTimePacifyWords);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, patternId, type, workTimeId, notWorkTimeWords, isTimeOutHint, prevTimeOutTime, prevTimeOutWords, TimeOutTime, TimeOutWords, isQueueUp, accessAfterWords, allBusyWords, isUserPushAppraise, isCilentPushAppraise, isSystemPushAppraise, isUserLongTimeBusy, userFirstLongTime, userIntervalLongTime, userLongTimeWords, isUserLongTimeBusyPacify, userFirstLongTimePacify, userIntervalLongTimePacify, userIntervalLongTimePacifyWords, userIntervalLongTimeCount, userIntervalLongTimePacifyCount, isRobot);
    }
}
