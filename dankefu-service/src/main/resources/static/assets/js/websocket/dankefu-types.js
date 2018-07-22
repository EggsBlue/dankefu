var type={
    // 客户端消息交互规格
    C_REQ_SERVICE:"1",   //请求服务
    C_RESP_RESTTIME:"2", //非作息时间/休息时间
    C_RESP_WAITING:"3", //客服全忙，排队中
    C_RESP_JOIN:"4",   //客服接入成功
    C_RESP_NOONESERVICER:"5", //没有客服在线
    C_RESP_INVITINGMESSAGE:"6", //服务端邀请留言
    C_RESP_SERVICEROFLINE:"7", //对话客服已下线
    C_RESP_RECEIVEMSG:"8" //收到消息


    // 客服端消息交互规格
    ,S_RESP_JOIN:"101", //有访客加入
    S_RESP_LEAVE:"102", //访客离开
    S_REQ_RECEIVEMSG:"103", //发送消息,
    S_RESP_RECEIVEMSG:"104" //收到消息
}
