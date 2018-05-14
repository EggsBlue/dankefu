package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * WEB渠道接入方式
 * author: 蛋蛋的忧伤
 * date: 2018/5/14 0014 21:09
 */
@Table("dankefu_channel_web_pattern")
public class Channel_web_pattern extends BasePojo {
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
    @ColDefine(type = ColType.VARCHAR, width = 50)
    @Comment("标题")
    private String title;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 255)
    @Comment("入口地址")
    private String url;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 15)
    @Comment("颜色")
    private String color;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 6)
    @Comment("类型:ChannelWebTypeEnum")
    private String type;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 6)
    @Comment("展示样式:ChannelWebPatternStyleEnum")
    private String style;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Channel_web_pattern that = (Channel_web_pattern) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(unitId, that.unitId) &&
                Objects.equals(name, that.name) &&
                Objects.equals(title, that.title) &&
                Objects.equals(url, that.url) &&
                Objects.equals(color, that.color) &&
                Objects.equals(type, that.type) &&
                Objects.equals(style, that.style);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, name, title, url, color, type, style);
    }
}
