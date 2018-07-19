var dankefu={
    c_handlers:{
        resttime:function(data){
            console.log("resttime process...");
            console.log(data);
        },
        waiting:function(data){
            console.log("waiting process...");
            console.log(data);
            var waitingTpl = waiting.innerHTML,chatContent = $('#chatContent');
            laytpl(waitingTpl).render(data, function(html){
                $(chatContent).append( html );
            });
        },
        join:function(data){
            console.log("join process...");
            console.log(data);
            var joinTpl = join.innerHTML,chatContent = $('#chatContent');
            laytpl(joinTpl).render(data, function(html){
                $(chatContent).append( html );
            });
        },
        nooneservicer:function(data){
            console.log("nooneservicer process...");
            console.log(data);
        }
    },
    s_handlers:{
        join:function(data){
            console.log("join process...");
            console.log(data);
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
        },
        leave:function(data){
            console.log("leave process...");
            console.log(data);
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
        }
    }
}