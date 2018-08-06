var dankefu={
    c_handlers:{
        resttime:function(data){
            console.log("resttime process...");
            // console.log(data);
        },
        waiting:function(data){
            console.log("waiting process...");
            // console.log(data);
            var waitingTpl = msg_item.innerHTML,chatContent = $('#chatContent');
            laytpl(waitingTpl).render(data, function(html){
                $(chatContent).append( html );
            });
        },
        join:function(data){
            console.log("join process...");
            servicer_id = data.servicer_id;
            if(ct ==0){
                // console.log(data);
                ct = data.ct;
                console.log("ct:::"+ct);
            }
            var joinTpl =msg_item.innerHTML,chatContent = $('#chatContent');
            laytpl(joinTpl).render(data, function(html){
                $(chatContent).append( html );
            });
            setTimeout(function(){
                chatContent[0].scrollTop = chatContent[0].scrollHeight;
                chatContentScrollTop = chatContent[0].scrollHeight;
                console.log("最后scrollHeight:"+chatContentScrollTop);
            },50)
        },
        nooneservicer:function(data){
            console.log("nooneservicer process...");
            // console.log(data);
            var joinTpl =msg_item.innerHTML,chatContent = $('#chatContent');
            laytpl(joinTpl).render(data, function(html){
                $(chatContent).append( html );
            });
            chatContent[0].scrollTop = chatContent[0].scrollHeight;
        },
        receiveMsg:function(data){
            console.log(data);
            console.log("receive process...");
            var receiveTpl =msg_item.innerHTML,chatContent = $('#chatContent');
            laytpl(receiveTpl).render(data, function(html){
                $(chatContent).append( html );
            });

            setTimeout(function(){
                // chatContent[0].scrollTop = chatContent[0].scrollHeight;
            },50)
        },
        sendPlain:function(){
            var msg = $('#msgIn').val();
            if($.trim(msg) == '' ){
                layer.msg("请输入要发送的内容");
                return;
            }

            var packet = {};
            packet.action = type.S_REQ_RECEIVEMSG;
            packet.msgFrom = guest_id;
            packet.msgTo = app.current_chat.id;
            packet.recordType = "chat";
            packet.msgType = "text";
            packet.prevTime = "";
            packet.content = app.text_in;
            packet.unitId = unitId;
            packet.session_id = app.current_chat.curr_session.id;
            packet.source = app.current_chat.source;
            sendString(JSON.stringify(packet));
            app.text_in = '';

            app.chat_logs.records.push(packet);

            $('#msgIn').val('');
        }
    },
    s_handlers:{
        join:function(data){
            console.log("join process...");
            // console.log(data);
            var flag = true;
            app.onlineList.forEach((t)=>{
                if(t.id == data.curr_session.id){
                    flag = false;
                    t.status = "online";
                    console.log("新上线用户已在列表中,id:"+t.id);
                    return;
                }
            });
            if(flag){
                app.onlineList.push(data.curr_session);
                console.log("id:"+data.curr_session.id+",已添加到列表");
            }

            Vue.set(data.curr_session, 'lock_active', false);
            Vue.set(data.curr_session, 'chat_logs', {
                pageNo:0,
                pageSize:20,
                month:'',
                chatId:data.curr_session.id,
                records:[]
            });

        },
        leave:function(data){
            console.log("leave process...");
            // console.log(data);
            // leaveItems = $('#chat-list').find("[chat-id="+data.curr_session.chatId+"]");
            // console.log(leaveItems);
            // $.each(leaveItems,function(idx){
            //     $(leaveItems[idx]).find('.chat-item-status').removeClass('online');
            //     $(leaveItems[idx]).find('.chat-item-status').addClass('offline');
            //
            //     $(leaveItems[idx]).find('.chat-item-status').text("离线");
            // });

            app.onlineList.forEach((t)=>{
                if(t.id == data.curr_session.id){
                    t.status = data.curr_session.status;
                    return;
                }
            });
        },
        receiveMsg:function(data){
            console.log("receiveMsg process...");
            console.log(data);
            app.chat_logs.records.push(data);
            setTimeout(function(){
                var box = $('#wrap')[0];
                box.scrollTop = box.scrollHeight;
            },50)
        }
    }
}