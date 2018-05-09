package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

@Table("dankefu_site")
public class Site extends  BasePojo{

    @Name
    @Prev(els = @EL("$me.uuid()") )
    @Comment("编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String id;

    @Column
    @Comment("站点名称")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    private String name;

    @Column
    @Comment("站点地址")
    @ColDefine(type = ColType.VARCHAR, width = 100)
    private String url;
}
