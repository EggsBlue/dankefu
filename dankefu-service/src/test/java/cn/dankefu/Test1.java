package cn.dankefu;


import cn.dankefu.enums.ClientSourceEnum;
import cn.dankefu.utils.Ip2RegionUtil;
import org.junit.Test;
import org.lionsoul.ip2region.DataBlock;
import org.lionsoul.ip2region.DbConfig;
import org.lionsoul.ip2region.DbSearcher;
import org.nutz.lang.*;

import java.io.File;
import java.lang.reflect.Method;

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


    @Test
    public void ip2RegionTest(){
        DbConfig config = null;
        String ip = "220.181.132.199";
        try {
            config = new DbConfig();
            DbSearcher searcher = new DbSearcher(config, getClass().getClassLoader().getResource("ip2region.db").getFile().toString());
            Method method;
            method = searcher.getClass().getMethod("btreeSearch", String.class);
            DataBlock  dataBlock = (DataBlock) method.invoke(searcher, ip);
            String[] split = dataBlock.toString().split("\\|");
            System.out.println(split.length);
//            for(String s : split){
//                System.out.print(s);
//            }
            if (split.length >= 6) {
                System.out.println(split[1]+split[3]+split[4]+split[5]);
            }else{
                System.out.println(dataBlock);
            }
            //System.out.println(getClass().getClassLoader().getResource("ip2region.db").toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Test
    public void ip2RegionTest2(){
        String ip = "220.181.132.199";
        System.out.println(Ip2RegionUtil.getIp(ip,1));
//        File f = new File("target/test-classes/ip2region.db");
//        System.out.println(f.getAbsoluteFile());
    }
}
