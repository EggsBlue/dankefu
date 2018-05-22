package cn.dankefu.web.admin;

import cn.dankefu.service.KnowledgeDataService;
import cn.dankefu.service.KnowledgeTypeService;
import cn.dankefu.handler.Handler;
import org.nutz.dao.Sqls;
import org.nutz.dao.entity.Record;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Attr;
import org.nutz.mvc.annotation.Ok;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 知识库方面
 * author: 蛋蛋的忧伤
 * date: 2018/5/20 0020 19:22
 */
@At("/knowledge")
@IocBean
public class KnowledgeController extends Handler {
    @Inject
    private KnowledgeTypeService knowledgeTypeService;

    @Inject
    private KnowledgeDataService knowledgeDataService;


    @At("")
    @Ok("beetl:/admin/knowledge/index.html")
    public void index(HttpServletRequest request){

//        List<Knowledge_type> query = knowledgeTypeService.query(Cnd.where("parentId","=",null));


    }

    @At(value = {"/childrens/?","/childrens/"})
    @Ok("json")
    public List<Record> childrens( String id,@Attr("unitId")String unitId){
        String str = "select id,name as text,hasChildren as children from dankefu_knowledge_type where unitId = '"+unitId+"' and delFlag = false ";
        if(Strings.isNotBlank(id) && !"#".equals(id)){
            str+=" and parentId = '"+ id +"'";
        }else{
            str+=" and parentId is null ";
        }
        List<Record> list = knowledgeTypeService.list(Sqls.create(str));
        return list;
    }

}
