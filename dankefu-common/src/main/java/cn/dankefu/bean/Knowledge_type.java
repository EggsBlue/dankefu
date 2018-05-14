package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 知识库分类
 * author: 蛋蛋的忧伤
 * date: 2018/5/14  20:21
 */
@Table("dankefu_knowledge_type")
public class Knowledge_type extends BasePojo{
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
    @Comment("名字")
    @ColDefine(type = ColType.VARCHAR, width = 120)
    private String name;

    @Column
    @Comment("父级分类编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String parentId;

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

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Knowledge_type that = (Knowledge_type) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(unitId, that.unitId) &&
                Objects.equals(name, that.name) &&
                Objects.equals(parentId, that.parentId);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, name, parentId);
    }
}
