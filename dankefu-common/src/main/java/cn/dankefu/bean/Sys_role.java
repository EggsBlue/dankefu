package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.List;
import java.util.Objects;

/**
 * 系统角色表
 * @author 蛋蛋的忧伤
 * @date 2018/5/9  21:40
 */
@Table("dankefu_sys_role")
@TableIndexes({@Index(name = "INDEX_SYS_ROLE_CODE", fields = {"code"}, unique = true)})
public class Sys_role extends BasePojo {
    private static final long serialVersionUID = 1L;

    @Column
    @Name
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Prev(els = {@EL("uuid()")})
    @Comment("编号")
    private String id;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 50)
    @Comment("名称")
    private String name;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("单位编号")
    private String unitId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 255)
    @Comment("角色代码")
    private String code;

    @Column
    @ColDefine(type = ColType.BOOLEAN)
    @Comment("是否禁用")
    private boolean disabled;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 255)
    @Comment("描述")
    private String note;

    @ManyMany(from = "roleId", relation = "dankefu_sys_role_menu", to = "menuId")
    protected List<Sys_menu> menus;

    @ManyMany(from = "roleId", relation = "dankefu_sys_user_role", to = "userId")
    private List<Sys_user> users;


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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public List<Sys_menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Sys_menu> menus) {
        this.menus = menus;
    }

    public List<Sys_user> getUsers() {
        return users;
    }

    public void setUsers(List<Sys_user> users) {
        this.users = users;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sys_role sys_role = (Sys_role) o;
        return disabled == sys_role.disabled &&
                Objects.equals(id, sys_role.id) &&
                Objects.equals(name, sys_role.name) &&
                Objects.equals(unitId, sys_role.unitId) &&
                Objects.equals(code, sys_role.code) &&
                Objects.equals(note, sys_role.note) &&
                Objects.equals(menus, sys_role.menus) &&
                Objects.equals(users, sys_role.users);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, unitId, code, disabled, note, menus, users);
    }
}
