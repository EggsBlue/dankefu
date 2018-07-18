package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 公共设置表
 * author: 蛋蛋的忧伤
 * date: 2018/5/14 0014 20:19
 */
@Table("dankefu_settings")
public class Settings extends BasePojo{
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
    @Comment("键")
    @ColDefine(type = ColType.VARCHAR, width = 120)
    private String sKey;

    @Column
    @Comment("值")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String sVal;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 100)
    @Comment("描述")
    private String note;


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

    public String getsKey() {
        return sKey;
    }

    public void setsKey(String sKey) {
        this.sKey = sKey;
    }

    public String getsVal() {
        return sVal;
    }

    public void setsVal(String sVal) {
        this.sVal = sVal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Settings settings = (Settings) o;
        return Objects.equals(id, settings.id) &&
                Objects.equals(unitId, settings.unitId) &&
                Objects.equals(sKey, settings.sKey) &&
                Objects.equals(sVal, settings.sVal);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, sKey, sVal);
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}

