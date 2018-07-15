package cn.dankefu.websocket.handler;

import cn.dankefu.websocket.MsgHandlerInterface;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.tio.core.ChannelContext;

/**
 * 客户端接入消息
 * @Author: 蛋蛋i
 * @Time:2017/11/28 10:47
 */
@IocBean
public class ClientJoinMessageHandler implements MsgHandlerInterface {
    Log log = Logs.get();
    @Override
    public Object handler(String text, ChannelContext context) {
        log.debug("收到消息：：："+text);








        return null;
    }
}
