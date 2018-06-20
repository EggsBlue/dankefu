package cn.dankefu.websocket;

import org.tio.core.ChannelContext;

/**
 * 处理消息的抽象接口
 *@Author: 蛋蛋的忧伤
 *@Time:2017/11/28 10:24
 */
public interface MsgHandlerInterface {
    Object handler(String text, ChannelContext context);
}
