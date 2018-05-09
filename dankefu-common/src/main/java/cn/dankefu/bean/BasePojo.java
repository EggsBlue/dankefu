package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;
import org.nutz.json.Json;
import org.nutz.json.JsonFormat;
import org.nutz.lang.random.R;

import java.io.Serializable;
import java.util.Date;
/*
 * author: 蛋蛋的忧伤
 * date: 2018/5/1  21:21
 */
public class BasePojo implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Prev(els=@EL("$me.now()"))
    @Column("ct")
    protected Date createTime;
    @Prev(els=@EL("$me.now()"))
    @Column("ut")
    protected Date updateTime;
    @Column("at")
    protected String at;
    @Column("delFlag")
    @Prev(els=@EL("$me.flag()"))
    @ColDefine(type = ColType.BOOLEAN)
    protected boolean delFlag;


    public String getAt() {
        return at;
    }

    public void setAt(String at) {
        this.at = at;
    }

    public boolean isDelFlag() {
        return delFlag;
    }

    public void setDelFlag(boolean delFlag) {
        this.delFlag = delFlag;
    }

    public String toString() {
        return Json.toJson(this, JsonFormat.compact().setQuoteName(true).setIgnoreNull(false));
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
    
    public Date now() {
        return new Date();
    }
    
    public String uuid() {
        return R.UU32().toLowerCase();
    }
    public boolean flag(){
        return false;
    }
}
