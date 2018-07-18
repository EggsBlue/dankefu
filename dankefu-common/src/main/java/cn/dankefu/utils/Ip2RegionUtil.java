package cn.dankefu.utils;

import org.lionsoul.ip2region.DataBlock;
import org.lionsoul.ip2region.DbConfig;
import org.lionsoul.ip2region.DbSearcher;
import org.nutz.lang.Strings;
import org.nutz.log.Log;
import org.nutz.log.Logs;

import java.io.File;
import java.io.FileNotFoundException;
import java.lang.reflect.Method;

public class Ip2RegionUtil {
    Log log = Logs.get();



    /**
     * 根据ip,获取位置信息
     * @param ip
     * @param model 查询算法1:B-tree,2.binary,3.memory
     * @return
     */
    public static String getIp(String ip,int model){
        String address = "";
        if(model == 0 || model>3){
            model = 1;
        }
        Method method = null;
        try {

            File f = new File("");
            System.out.println(f.getAbsoluteFile());

            DbConfig config = new DbConfig();
            DbSearcher searcher = new DbSearcher(config,"ip2region.db");

            switch ( model )
            {
                case DbSearcher.BTREE_ALGORITHM:
                    method = searcher.getClass().getMethod("btreeSearch", String.class);
                    break;
                case DbSearcher.BINARY_ALGORITHM:
                    method = searcher.getClass().getMethod("binarySearch", String.class);
                    break;
                case DbSearcher.MEMORY_ALGORITYM:
                    method = searcher.getClass().getMethod("memorySearch", String.class);
                    break;
            }

            DataBlock dataBlock = (DataBlock) method.invoke(searcher, ip);
            String[] split = dataBlock.toString().split("\\|");
            if (split.length >= 6) {
                address = split[1]+split[3]+split[4]+split[5];
            }else{
                address = dataBlock.toString();
            }
        } catch (Exception e) {
            Logs.get().error(e);
        }
        Logs.get().infof("ip:[%s],address:[%s]",ip,address);
        return address;
    }


}
