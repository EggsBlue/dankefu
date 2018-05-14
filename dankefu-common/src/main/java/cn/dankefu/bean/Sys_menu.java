package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Objects;

/**
 * 系统权限/菜单表
 * @author 蛋蛋的忧伤
 * @date 2018/5/10  20:28
 */
@Table("dankefu_sys_menu")
@TableIndexes({@Index(name = "INDEX_SYS_MENU_PERMISSION", fields = {"permission"}, unique = true)})
public class Sys_menu extends BasePojo {
    private static final long serialVersionUID = 1L;
    @Column
    @Name
    @Comment("ID")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Prev(els = {@EL("uuid()")})
    private String id;

    @Column
    @Comment("菜单/权限名称")
    @ColDefine(type = ColType.VARCHAR, width = 100)
    private String name;

    @Column
    @Comment("权限标识")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String permission;

    @Column
    @Comment("说明")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String note;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sys_menu sys_menu = (Sys_menu) o;
        return Objects.equals(id, sys_menu.id) &&
                Objects.equals(name, sys_menu.name) &&
                Objects.equals(permission, sys_menu.permission) &&
                Objects.equals(note, sys_menu.note);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, permission, note);
    }

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

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
