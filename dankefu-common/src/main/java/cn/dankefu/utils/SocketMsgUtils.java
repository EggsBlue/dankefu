package cn.dankefu.utils;

import cn.dankefu.packet.SocketMsg;
import org.nutz.json.Json;
import org.tio.websocket.common.WsResponse;

/**
 * 处理Socket消息工具类
 */
public class SocketMsgUtils {


    /**
     * 快速生成WsResponse
     * @param action
     * @param body
     * @return
     */
    public static WsResponse makeWsResponse(byte action, Object body){
        return WsResponse.fromText(Json.toJson(new SocketMsg(action, body)),"utf-8");
    }

}
