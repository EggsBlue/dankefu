package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;


/**
 * 客服小组表
 * author: 蛋蛋的忧伤
 * date: 2018/5/14 20:16
 */
@Table("dankefu_sys_group")
public class Sys_group  extends BasePojo {
    private static final long serialVersionUID = 1L;

    @Column
    @Name
    @Comment("编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Prev(els = {@EL("uuid()")})
    private String id;

    @Column
    @Comment("名字")
    @ColDefine(type = ColType.VARCHAR, width = 120)
    private String name;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("单位编号")
    private String unitId;

    @Column
    @Comment("最大服务人数")
    @ColDefine(type = ColType.INT)
    private int maxServiceCount;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public int getMaxServiceCount() {
        return maxServiceCount;
    }

    public void setMaxServiceCount(int maxServiceCount) {
        this.maxServiceCount = maxServiceCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sys_group sys_group = (Sys_group) o;
        return maxServiceCount == sys_group.maxServiceCount &&
                Objects.equals(id, sys_group.id) &&
                Objects.equals(name, sys_group.name) &&
                Objects.equals(unitId, sys_group.unitId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, unitId, maxServiceCount);
    }
}
