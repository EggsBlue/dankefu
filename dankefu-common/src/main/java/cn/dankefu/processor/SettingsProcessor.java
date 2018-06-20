package cn.dankefu.processor;

import cn.dankefu.utils.DateUtil;
import cn.dankefu.utils.ShiroUtil;
import org.nutz.ioc.impl.PropertiesProxy;
import org.nutz.mvc.ActionContext;
import org.nutz.mvc.ActionInfo;
import org.nutz.mvc.NutConfig;
import org.nutz.mvc.impl.processor.AbstractProcessor;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/8  21:21
 */
public class SettingsProcessor extends AbstractProcessor {

	private ShiroUtil shiroUtil;
	private DateUtil dateUtil;
	private PropertiesProxy conf;

	public void init(NutConfig config, ActionInfo ai) throws Throwable {
		shiroUtil = config.getIoc().get(ShiroUtil.class);
		dateUtil = config.getIoc().get(DateUtil.class);
		conf = config.getIoc().get(PropertiesProxy.class,"conf");
	}

	public void process(ActionContext ac) throws Throwable {
		ac.getRequest().setAttribute("shiro", shiroUtil);
		ac.getRequest().setAttribute("date", dateUtil);
		ac.getRequest().setAttribute("conf", conf);


		doNext(ac);
	}

}
