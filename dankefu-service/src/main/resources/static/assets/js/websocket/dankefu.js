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
            var joinTpl = join.innerHTML,chatList = $('#chat-list');
            var items = $(chatList).find('.chat-item');
            if(items.length ==0){
                $('#noone').hide();
            }
            laytpl(joinTpl).render(data, function(html){
                $(chatList).append( html );
            });
        },
        leave:function(data){
            console.log("leave process...");
            console.log(data);
            leaveItems = $('#chat-list').find("[chat-id="+data.curr_session.chatId+"]");
            console.log(leaveItems);
            $.each(leaveItems,function(idx){
                $(leaveItems[idx]).find('.chat-item-status').removeClass('online');
                $(leaveItems[idx]).find('.chat-item-status').addClass('offline');

                $(leaveItems[idx]).find('.chat-item-status').text("离线");
            });
        }
    }
}