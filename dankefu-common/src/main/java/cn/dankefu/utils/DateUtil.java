package cn.dankefu.utils;

import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Times;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * 时间工具类
 * author: 蛋蛋的忧伤
 * date: 2018/5/8  21:21
 */
@IocBean
public class DateUtil {
    private static final Locale DEFAULT_LOCALE = Locale.CHINA;
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * 获取当前时间(HH:mm:ss)
     *
     * @return
     */
    public static String getDate() {
        return Times.format("yyyy-MM-dd",new Date());
    }

    /**
     * 获取当前时间(HH:mm:ss)
     *
     * @return
     */
    public static String getTime() {
        return Times.format( "HH:mm:ss",new Date());
    }

    /**
     * 获取当前时间(yyyy-MM-dd HH:mm:ss)
     *
     * @return
     */
    public static String getDateTime() {
        return Times.format("yyyy-MM-dd HH:mm:ss",new Date());
    }

    /**
     * 转换日期格式(yyyy-MM-dd HH:mm:ss)
     *
     * @param date
     * @return
     */
    public static String formatDateTime(Date date) {
        if (date == null) return "";
        return Times.format("yyyy-MM-dd HH:mm:ss",date);
    }

    /**
     * 转换日期格式(yyyy-MM-dd HH:mm:ss)
     *
     * @param date
     * @param f
     * @return
     */
    public static String format(Date date, String f) {
        if (date == null) return "";
        return Times.format(f,date);
    }

    /**
     * 时间戳日期
     *
     * @param time
     * @return
     */
    public static String getDate(long time) {
        return Times.format( "yyyy-MM-dd HH:mm:ss",new Date(time * 1000));
    }

    /**
     * 时间戳日期
     *
     * @param time
     * @param f
     * @return
     */
    public static String getDate(long time, String f) {
        return Times.format(f,new Date(time * 1000));
    }

    /**
     * 通过字符串时间获取时间戳 nutzwk5.0改为long
     *
     * @param date
     * @return
     */
    public static int getTime(String date) {
        try {
            return (int) (Times.parse(sdf, date).getTime() / 1000);
        } catch (ParseException e) {
            return 0;
        }
    }

    /**
     * 通过字符串时间获取时间戳 nutzwk5.0改为long
     *
     * @param date
     * @return
     */
    public static int getTime(SimpleDateFormat sdf, String date) {
        try {
            return (int) (Times.parse(sdf, date).getTime() / 1000);
        } catch (ParseException e) {
            return 0;
        }
    }

    /**
     * 通过字符串时间获取时间戳 nutzwk5.0改为long
     *
     * @param date
     * @return
     */
    public static long getTimeLong(SimpleDateFormat sdf, String date) {
        try {
            return (long) (Times.parse(sdf, date).getTime() / 1000);
        } catch (ParseException e) {
            return 0;
        }
    }
}
