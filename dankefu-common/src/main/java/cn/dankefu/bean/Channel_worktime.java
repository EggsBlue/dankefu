package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 渠道工作时间表
 * author: 蛋蛋的忧伤
 * date: 2018/5/14 0014 21:16
 */
@Table("dankefu_channel_worktime")
public class Channel_worktime extends BasePojo{
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
    @ColDefine(type = ColType.VARCHAR, width = 50)
    @Comment("名字")
    private String name;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("周一")
    private boolean monday;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("周二")
    private boolean tuesday;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("周三")
    private boolean wednesday ;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("周四")
    private boolean thursday;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("周五")
    private boolean friday;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("周六")
    private boolean saturday;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("周天")
    private boolean sunday;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 100)
    @Comment("上班时间")
    private String startTime;

    @Column
    @ColDefine(type = ColType.VARCHAR,width = 100)
    @Comment("下班时间")
    private String endTime;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isMonday() {
        return monday;
    }

    public void setMonday(boolean monday) {
        this.monday = monday;
    }

    public boolean isTuesday() {
        return tuesday;
    }

    public void setTuesday(boolean tuesday) {
        this.tuesday = tuesday;
    }

    public boolean isWednesday() {
        return wednesday;
    }

    public void setWednesday(boolean wednesday) {
        this.wednesday = wednesday;
    }

    public boolean isThursday() {
        return thursday;
    }

    public void setThursday(boolean thursday) {
        this.thursday = thursday;
    }

    public boolean isFriday() {
        return friday;
    }

    public void setFriday(boolean friday) {
        this.friday = friday;
    }

    public boolean isSaturday() {
        return saturday;
    }

    public void setSaturday(boolean saturday) {
        this.saturday = saturday;
    }

    public boolean isSunday() {
        return sunday;
    }

    public void setSunday(boolean sunday) {
        this.sunday = sunday;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Channel_worktime that = (Channel_worktime) o;
        return monday == that.monday &&
                tuesday == that.tuesday &&
                wednesday == that.wednesday &&
                thursday == that.thursday &&
                friday == that.friday &&
                saturday == that.saturday &&
                sunday == that.sunday &&
                Objects.equals(id, that.id) &&
                Objects.equals(unitId, that.unitId) &&
                Objects.equals(name, that.name) &&
                Objects.equals(startTime, that.startTime) &&
                Objects.equals(endTime, that.endTime);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, name, monday, tuesday, wednesday, thursday, friday, saturday, sunday, startTime, endTime);
    }
}
