package cn.dankefu.websocket;

import org.nutz.ioc.Ioc;
import org.nutz.ioc.impl.PropertiesProxy;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.nutz.mvc.Mvcs;
import org.tio.server.ServerGroupContext;
import org.tio.websocket.server.WsServerStarter;

import java.io.IOException;

/**
 * Tio WebSocket启动器
 *@Author: 蛋蛋 [TopCoderMyDream@gmail.com,https://github.com/TopCoderMyDream]
 *@Time:2017/12/12 13:57
 */
@IocBean(create = "init")
public class WebSocketServer {
    Log log = Logs.get();

    @Inject
    private Accepter accepter;

    @Inject
    private PropertiesProxy conf;

    public static ServerGroupContext groupContext = null;

    public void init(){
        int port = Integer.valueOf( conf.get("websocket.port","9423"));
        try {
            WsServerStarter wsServerStarter = new WsServerStarter(port, accepter);
            groupContext= wsServerStarter.getServerGroupContext();
            wsServerStarter.start();
        } catch (IOException e) {
            log.error("WebSocket Server Start Fail!!!");
            log.error(e);
        }
    }
}
