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
    private String key;

    @Column
    @Comment("值")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String val;


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

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getVal() {
        return val;
    }

    public void setVal(String val) {
        this.val = val;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Settings settings = (Settings) o;
        return Objects.equals(id, settings.id) &&
                Objects.equals(unitId, settings.unitId) &&
                Objects.equals(key, settings.key) &&
                Objects.equals(val, settings.val);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, key, val);
    }
}

