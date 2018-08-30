package cn.dankefu.web.admin;

import cn.dankefu.handler.Handler;
import cn.dankefu.utils.DateUtil;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.nutz.ioc.impl.PropertiesProxy;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Files;
import org.nutz.lang.random.R;
import org.nutz.lang.util.NutMap;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.nutz.mvc.annotation.*;
import org.nutz.mvc.impl.AdaptorErrorContext;
import org.nutz.mvc.upload.TempFile;
import org.nutz.mvc.upload.UploadAdaptor;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Date;

@IocBean
@At("/upload")
public class UploadController extends Handler {
    private static final Log log = Logs.get();

    @Inject
    private PropertiesProxy conf;

    @AdaptBy(type = UploadAdaptor.class, args = {"ioc:fileUpload"})
    @POST
    @At
    @Ok("json")
    @RequiresAuthentication
    //AdaptorErrorContext必须是最后一个参数
    public Object file(@Param("Filedata") TempFile tf, HttpServletRequest req, AdaptorErrorContext err) {
        try {
            if (err != null && err.getAdaptorErr() != null) {
                return error("文件不合法");
            } else if (tf == null) {
                return error("空文件");
            } else {
                String s = tf.getSubmittedFileName().substring(tf.getSubmittedFileName().indexOf(".") + 1);
                String uri = "/images/" + DateUtil.format(new Date(), "yyyyMMdd") + "/";
                String fileName = R.UU32() + tf.getSubmittedFileName().substring(tf.getSubmittedFileName().indexOf("."));
                String path = conf.get("jetty.staticPathLocal");
                Files.write(path+uri+fileName,tf.getFile());
                return success("上传成功").setData(NutMap.NEW().addv("path",uri+fileName));
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return error("系统异常");
        }
    }

    @AdaptBy(type = UploadAdaptor.class, args = {"ioc:imageUpload"})
    @POST
    @At
    @Ok("json")
    @RequiresAuthentication
    public Object image(@Param("file") TempFile tf, HttpServletRequest req, AdaptorErrorContext err) {
        try {
            if (err != null && err.getAdaptorErr() != null) {
                return error( "文件不合法");
            } else if (tf == null) {
                return error("空文件");
            } else {
                String uri = "/images/" + DateUtil.format(new Date(), "yyyyMMdd") + "/";
                String fileName = R.UU32() + tf.getSubmittedFileName().substring(tf.getSubmittedFileName().indexOf("."));
                String path = conf.get("jetty.staticPathLocal");
//                Files.write(path+uri+fileName,tf.getFile());
                Files.copy(tf.getFile(),new File(path+uri+fileName));
                return success("上传成功").setData(NutMap.NEW().addv("path",uri+fileName));
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return error("系统错误");
        }
    }

}
