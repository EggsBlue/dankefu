package cn.dankefu.utils;

import cn.dankefu.packet.SocketMsg;
import org.nutz.json.Json;
import org.tio.core.ChannelContext;
import org.tio.utils.lock.SetWithLock;
import org.tio.websocket.common.WsResponse;

import java.util.Set;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * 使用Tio提供的WebSocket时整理的一些工具方法
 * @author 蛋蛋
 * @Time 2018年07月16日21:10:15
 */
public class TioWebSocketUtils {

    /**
     * 快速生成WsResponse
     * @param action
     * @param body
     * @return
     */
    public static WsResponse makeWsResponse(byte action, Object body){
        return WsResponse.fromText(Json.toJson(new SocketMsg(action, body)),"utf-8");
    }

    /**
     * 从set中快速获取一个通道
     * @param channelContextSetWithLock
     * @return
     */
    public static ChannelContext getInSetWithLock(SetWithLock<ChannelContext> channelContextSetWithLock){
        ChannelContext context = null;
        if(channelContextSetWithLock!=null && channelContextSetWithLock.size()>0){
            ReentrantReadWriteLock.ReadLock readLock = channelContextSetWithLock.readLock();
            readLock.lock();
            Set<ChannelContext> obj = channelContextSetWithLock.getObj();
            context = obj.iterator().next();
            readLock.unlock();
        }
        return context;
    }



}
