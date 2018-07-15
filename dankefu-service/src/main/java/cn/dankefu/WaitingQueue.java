package cn.dankefu;

import org.nutz.ioc.loader.annotation.IocBean;
import org.tio.core.ChannelContext;

import java.util.LinkedList;
import java.util.Queue;

/**
 * 访客队列
 * @author 蛋蛋
 * @time 2018年07月04日20:24:38
 */
@IocBean
public class WaitingQueue {
    private static final Queue<ChannelContext> WAITINGLIST = new LinkedList();

    public int getWaitCount(){
        return WAITINGLIST.size();
    }

    public ChannelContext pool(){
        return WAITINGLIST.poll();
    }

    public boolean offer(ChannelContext context){
        return WAITINGLIST.offer(context);
    }
}
