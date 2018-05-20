package cn.dankefu.base.shiro.realms;
import cn.dankefu.bean.Sys_unit;
import cn.dankefu.bean.Sys_user;
import cn.dankefu.service.SysRoleService;
import cn.dankefu.service.SysUserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.nutz.dao.Cnd;
import org.nutz.integration.jedis.RedisService;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Lang;
import org.nutz.lang.Strings;
import org.nutz.log.Log;
import org.nutz.log.Logs;

/**
 * @author 蛋蛋的忧伤
 * @date 2018/5/19 0019 13:55
 */
@IocBean(name = "adminRealm")
public class AdminAuthorizingRealm extends AuthorizingRealm {
    private static final Log log = Logs.get();

    @Inject
    private SysUserService userService;

    @Inject
    private SysRoleService roleService;

    @Inject
    private RedisService redisService;


    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
            UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
            String loginname = usernamePasswordToken.getUsername();
            char[] pwd = usernamePasswordToken.getPassword();

            if (Strings.isBlank(loginname)) {
                throw Lang.makeThrow(AuthenticationException.class, "Account name is empty");
            }


            Session session = SecurityUtils.getSubject().getSession(true);
            Sys_user user = userService.fetch(Cnd.where("loginname", "=", loginname).and("delFlag","=",false));
            if (Lang.isEmpty(user)) {
                throw Lang.makeThrow(UnknownAccountException.class, "Account [ %s ] not found", loginname);
            }
            if (user.isDisabled()) {//
                throw Lang.makeThrow(LockedAccountException.class, "Account [ %s ] is locked.", loginname);
            }
            user = userService.fetchLinks(user, null);

            session.setAttribute("uid", user.getId());
            session.setAttribute("uname", user.getUserName());
            session.setAttribute("unitId", user.getUnitId());


            SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user, user.getPassword(), getName());
            info.setCredentialsSalt(ByteSource.Util.bytes(user.getSalt()));
            return info;
    }


    /**
     * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        Object object = principals.getPrimaryPrincipal();
        if (object.getClass().isAssignableFrom(Sys_user.class)) {
//            Sys_user user = Castors.me().castTo(object, Sys_user.class);
//            if (!Lang.isEmpty(user) && !user.isDisabled()) {
//                SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
//                info.addRoles(userService.getRoleCodeList(user));
//                for (Sys_role role : user.getRoles()) {
//                    if (!role.isDisabled())
//                        info.addStringPermissions(roleService.getPermissionNameList(role));
//                }
//                return info;
//            } else {
//                return null;
//            }
        }
        return null;
    }


    public AdminAuthorizingRealm() {
        this(null, null);
    }

    public AdminAuthorizingRealm(CacheManager cacheManager, CredentialsMatcher matcher) {
        super(cacheManager, matcher);
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
        hashedCredentialsMatcher.setHashAlgorithmName("SHA-256");
        hashedCredentialsMatcher.setHashIterations(1024);
        hashedCredentialsMatcher.setStoredCredentialsHexEncoded(true);
//        setAuthenticationTokenClass(PlatformCaptchaToken.class);
        setCredentialsMatcher(hashedCredentialsMatcher);
    }

    public AdminAuthorizingRealm(CacheManager cacheManager) {
        this(cacheManager, null);
    }

    public AdminAuthorizingRealm(CredentialsMatcher matcher) {
        this(null, matcher);
    }
}