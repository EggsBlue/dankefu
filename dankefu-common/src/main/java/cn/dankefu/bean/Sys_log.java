package cn.dankefu.bean;

import cn.dankefu.utils.ShiroUtil;
import org.nutz.dao.entity.annotation.*;

import java.io.Serializable;
import java.util.Date;

import static org.nutz.lang.Lang.getIP;
import static org.nutz.mvc.Mvcs.getReq;


/**
 *  系统日志表
 * @author 蛋蛋的忧伤
 * @date 2018/5/9  21:41
 */
@Table("dankefu_sys_log_${month}")
public class Sys_log extends BasePojo {
    private static final long serialVersionUID = 1L;
    @Column
    @Id
    @Comment("编号")
    private long id;

    @Column
    @Comment("创建昵称")
    @ColDefine(type = ColType.VARCHAR, width = 100)
    private String username;

    @Column
    @Comment("日志类型")
    @ColDefine(type = ColType.VARCHAR, width = 20)
    private String type;

    @Column
    @Comment("日志标识")
    @ColDefine(type = ColType.VARCHAR, width = 50)
    private String tag;

    @Column
    @Comment("执行类")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String src;

    @Column
    @Comment("来源IP")
    @ColDefine(type = ColType.VARCHAR, width = 255)
    private String ip;

    @Column
    @Comment("日志内容")
    @ColDefine(type = ColType.TEXT)
    private String msg;

    @Column
    @Comment("请求内容")
    @ColDefine(type = ColType.TEXT)
    private String param;

    @Column
    @Comment("执行结果")
    @ColDefine(type = ColType.TEXT)
    private String result;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public static Sys_log create(String type, String tag, String source, String msg, String param, String result) {
        Sys_log sysLog = new Sys_log();
        if (type == null || tag == null) {
            throw new RuntimeException("type/tag can't null");
        }
        sysLog.setType(type);
        sysLog.setTag(tag);
        sysLog.setSrc(source);
        sysLog.setMsg(msg);
        sysLog.setParam(param);
        sysLog.setResult(result);
        if (getReq() != null) {
            sysLog.setIp(getIP(getReq()));
        }
        sysLog.setAt(ShiroUtil.getUid());
        sysLog.setCreateTime(new Date());
        sysLog.setDelFlag(false);
        sysLog.setUsername(ShiroUtil.getUsername());
        return sysLog;
    }
}
