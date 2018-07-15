package cn.dankefu.lang;

import org.junit.Test;
import org.nutz.lang.Lang;

import java.util.LinkedList;
import java.util.Queue;

public class QueueTest {


    /*
    boolean offer(E e):将元素追加到队列末尾,若添加成功则返回true。
    E poll():从队首删除并返回该元素。
    E peek():返回队首元素，但是不删除
     */
    @Test
    public void test1(){
        Queue queue = new LinkedList();
//        queue.offer("1");
//        queue.offer("2");
//        queue.offer("3");
//        queue.offer("4");


        final int[] i = {5};
        new Thread(new Runnable() {
            @Override
            public void run() {
                while(true){
                    Lang.sleep(500);
                    queue.offer(i[0]++);
                }

//

            }
        }).start();

        while(true){
            System.out.println(queue.size());
        }



    }


    @Test
    public void test2(){

        Queue queue = new LinkedList();
        queue.offer("1");
        queue.offer("2");
        queue.offer("3");
        queue.offer("4");


        System.out.println(queue.size());
        System.out.println(queue.poll());
        System.out.println(queue.size());
    }


}
