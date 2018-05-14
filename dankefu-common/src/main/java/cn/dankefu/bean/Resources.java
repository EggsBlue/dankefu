package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 资源库
 * author: 蛋蛋的忧伤
 * date: 2018/5/14 0014 20:40
 */
@Table("dankefu_resources")
public class Resources extends BasePojo{
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
    @Comment("资源类型")
    private String type;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 255)
    @Comment("资源地址:ResourcesTypeEnum")
    private String url;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Resources resources = (Resources) o;
        return Objects.equals(id, resources.id) &&
                Objects.equals(unitId, resources.unitId) &&
                Objects.equals(type, resources.type) &&
                Objects.equals(url, resources.url);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, type, url);
    }
}
