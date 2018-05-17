package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * 系统用户表
 * @author 蛋蛋的忧伤
 * @date 2018/5/10 0010 20:22
 */
@Table("dankefu_sys_user")
@TableIndexes({@Index(name = "INDEX_SYS_USER_LOGINNAMAE", fields = {"loginName"}, unique = true)})
public class Sys_user extends BasePojo {
    private static final long serialVersionUID = 1L;

    @Column
    @Name
    @Comment("编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Prev(els = {@EL("uuid()")})
    private String id;

    @Column
    @Comment("账号")
    @ColDefine(type = ColType.VARCHAR, width = 120)
    private String loginName;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("单位编号")
    private String unitId;

    @Column
    @Comment("密码")
    @ColDefine(type = ColType.VARCHAR, width = 100)
    private String password;

    @Column
    @Comment("密码盐")
    @ColDefine(type = ColType.VARCHAR, width = 50)
    private String salt;

    @Column
    @Comment("用户名")
    @ColDefine(type = ColType.VARCHAR, width = 100)
    private String userName;

    @Column
    @Comment("是否在线")
    @ColDefine(type = ColType.BOOLEAN)
    private boolean online;

    @Column
    @Comment("是否禁用")
    @ColDefine(type = ColType.BOOLEAN)
    private boolean disable;

    @Column
    @Comment("邮箱")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String email;

    @Column
    @Comment("手机号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String mobile;

    @Column
    @Comment("最后登陆时间")
    @ColDefine(type = ColType.INT)
    private Date loginAt;

    @Column
    @Comment("最后登陆IP")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String loginIp;

    @Column
    @Comment("登陆次数")
    @ColDefine(type = ColType.INT)
    private Integer loginCount;

    @Column
    @Comment("用户头像img")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String icon;

    @Column
    @Comment("最大服务人数")
    @ColDefine(type = ColType.INT)
    private int maxServiceCount;


    @ManyMany(from = "userId", relation = "dankefu_sys_user_role", to = "roleId")
    private List<Sys_role> roles;

    protected List<Sys_menu> menus;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public boolean isDisabled() {
        return disable;
    }

    public void setDisabled(boolean disabled) {
        this.disable = disabled;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Date getLoginAt() {
        return loginAt;
    }

    public void setLoginAt(Date loginAt) {
        this.loginAt = loginAt;
    }

    public String getLoginIp() {
        return loginIp;
    }

    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }

    public Integer getLoginCount() {
        return loginCount;
    }

    public void setLoginCount(Integer loginCount) {
        this.loginCount = loginCount;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public List<Sys_role> getRoles() {
        return roles;
    }

    public void setRoles(List<Sys_role> roles) {
        this.roles = roles;
    }

    public List<Sys_menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Sys_menu> menus) {
        this.menus = menus;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public boolean isDisable() {
        return disable;
    }

    public void setDisable(boolean disable) {
        this.disable = disable;
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
        Sys_user sys_user = (Sys_user) o;
        return online == sys_user.online &&
                disable == sys_user.disable &&
                maxServiceCount == sys_user.maxServiceCount &&
                Objects.equals(id, sys_user.id) &&
                Objects.equals(loginName, sys_user.loginName) &&
                Objects.equals(unitId, sys_user.unitId) &&
                Objects.equals(password, sys_user.password) &&
                Objects.equals(salt, sys_user.salt) &&
                Objects.equals(userName, sys_user.userName) &&
                Objects.equals(email, sys_user.email) &&
                Objects.equals(mobile, sys_user.mobile) &&
                Objects.equals(loginAt, sys_user.loginAt) &&
                Objects.equals(loginIp, sys_user.loginIp) &&
                Objects.equals(loginCount, sys_user.loginCount) &&
                Objects.equals(icon, sys_user.icon) &&
                Objects.equals(roles, sys_user.roles) &&
                Objects.equals(menus, sys_user.menus);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, loginName, unitId, password, salt, userName, online, disable, email, mobile, loginAt, loginIp, loginCount, icon, maxServiceCount, roles, menus);
    }
}
