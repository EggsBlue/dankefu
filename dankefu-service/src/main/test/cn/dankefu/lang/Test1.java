package cn.dankefu.lang;


import cn.dankefu.enums.ClientSourceEnum;
import org.junit.Test;
import org.nutz.lang.*;

public class Test1 {

    @Test
    public void lang_each_test(){
        String[] str = new String[]{"111","222","333"};
        Lang.each(str, new Each<Object>() {
            @Override
            public void invoke(int index, Object ele, int length) throws ExitLoop, ContinueLoop, LoopException {
                System.out.println("index:::"+index);
                System.out.println("ele:"+ele);
                System.out.println("length:"+length);
            }
        });

        System.out.println("end");
    }


    @Test
    public void enum_valueof_test(){
        ClientSourceEnum web_mobile1 = ClientSourceEnum.valueOf2("web_mobile2");
        System.out.println(web_mobile1);
    }
}
