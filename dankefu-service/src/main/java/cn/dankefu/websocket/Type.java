package cn.dankefu.websocket;

/**
 * 消息规格说明
 * @Author: 蛋蛋 [TopCoderMyDream@gmail.com,https://github.com/TopCoderMyDream]
 * @Time:2017/12/12 13:57
 */
public interface Type {

    // ===============客户端交互消息规格=====================
    /**
     * 请求服务
     */
    byte CLIENT_REQ_SERVICE = 1;

    /**
     * 非作息时间/休息时间
     */
    byte CLIENT_RESP_RESTTIME = 2;

    /**
     * 客服全忙，排队中
     */
    byte CLIENT_RESP_WAITING = 3;

    /**
     * 客服接入成功
     */
    byte CLIENT_RESP_JOIN = 4;

    /**
     * 暂时无客服在线
     */
    byte CLIENT_RESP_NOONESERVICER = 5;

    /**
     * 邀请留言
     */
     byte CLIENT_RESP_INVITINGMESSAGE = 6;

    /**
     * 对话客服已下线
     */
    byte CLIENT_RESP_SERVICEROFLINE = 7;

    /**
     * 收到消息
     */
    byte CLIENT_RESP_RECEIVEMSG = 8;


    // ===============客户端交互消息规格=====================





    // ===============客服端交互消息规格=====================
    /**
     * 有访客加入
     */
    byte SERVICER_RESP_JOIN = 101;

    /**
     * 访客离开
     */
    byte SERVICER_RESP_LEAVE = 102;

    /**
     * 发送消息
     */
    byte SERVICER_REQ_RECEIVEMSG = 103;

    /**
     * 客服收到消息
     */
    byte SERVICER_RESP_RECEIVEMSG = 104;

    // ===============客服端交互消息规格=====================
}
