package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 系统单位表
 * author: 蛋蛋的忧伤
 * date: 2018/5/14  20:03
 */
@Table("dankefu_sys_unit")
public class Sys_unit extends BasePojo{
    private static final long serialVersionUID = 1L;

    @Name
    @Prev(els = @EL("$me.uuid()") )
    @Comment("编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String id;

    @Column
    @Comment("父级编号,顶级则为空咯")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String parentId;

    @Column
    @Comment("单位名称")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String name;

    @Column
    @Comment("logo")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String logo;

    @Column
    @Comment("邮箱")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String email;


    @Column
    @Comment("联系电话")
    @ColDefine(type = ColType.VARCHAR, width = 11)
    private String phone;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sys_unit sys_unit = (Sys_unit) o;
        return Objects.equals(id, sys_unit.id) &&
                Objects.equals(parentId, sys_unit.parentId) &&
                Objects.equals(name, sys_unit.name) &&
                Objects.equals(logo, sys_unit.logo) &&
                Objects.equals(email, sys_unit.email) &&
                Objects.equals(phone, sys_unit.phone);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, parentId, name, logo, email, phone);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
