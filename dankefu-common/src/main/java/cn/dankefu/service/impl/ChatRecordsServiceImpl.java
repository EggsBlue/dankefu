package cn.dankefu.service.impl;

import cn.dankefu.bean.Chat_records;
import cn.dankefu.dto.Result;
import cn.dankefu.enums.ChatRecordTypeEnum;
import cn.dankefu.enums.ChatRecordsDisplayEnum;
import cn.dankefu.enums.ChatRecordsMsgTypeEnum;
import cn.dankefu.service.BaseServiceImpl;
import cn.dankefu.service.ChatRecordsService;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.TableName;
import org.nutz.dao.pager.Pager;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;
import org.nutz.lang.Times;
import org.nutz.lang.util.NutMap;
import org.nutz.log.Log;
import org.nutz.log.Logs;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:12
 */
@IocBean(args = {"refer:dao"})
public class ChatRecordsServiceImpl extends BaseServiceImpl<Chat_records> implements ChatRecordsService {
    Log log = Logs.get();


    public ChatRecordsServiceImpl(Dao dao) {
        super(dao);
    }


    /**
     * 插入
     *
     * @param record
     * @param tableName
     * @return
     */
    @Override
    public Chat_records insert(Chat_records record, String tableName) {
        try{
            if(Strings.isBlank(tableName)){
                tableName = Times.format("yyyyMM",new Date());
            }
            TableName.set(tableName);
            if(!dao().exists(Chat_records.class)){
                dao().create(Chat_records.class,false);
            }
            record = dao().insert(record);
        }finally {
            TableName.clear();
        }
        return record;
    }

    @Override
    public Chat_records insert(String chatId, String chatHistoryId, String recordType, String msgType, String display, Date prevTime, String msgForm, String msgTo, String content, String source,String sys_user_id) {
        Chat_records record = new Chat_records();
        record.setChatId(chatId);
        record.setChatHistoryId(chatHistoryId);
        record.setRecordType(recordType);
        record.setMsgType(msgType);
        record.setDisplay(display);
        record.setPrevTime(prevTime);
        record.setMsgFrom(msgForm);
        record.setMsgTo(msgTo);
        record.setContent(content);
        record.setSource(source);
        record.setSys_user_id(sys_user_id);
        return insert(record,"");
    }

    /**
     * 分页查询
     *
     * @param cnd
     * @param pageNo
     * @param pageSize
     * @param tableName
     * @return
     */
    @Override
    public Result query(Cnd cnd, int pageNo, int pageSize, String tableName) {
        if (Strings.isBlank(tableName)) {
            tableName = Times.format("yyyyMM",new Date());
        }
        NutMap data = NutMap.NEW();
        try {
            TableName.set(tableName);

            Pager p = new Pager().setPageNumber(pageNo).setPageSize(pageSize);
            List<Chat_records> records = dao().query(Chat_records.class, cnd, p);
            if(records==null || records.size()==0){//如果未查询到数据,可能这个月数据查完了,so 我们来查上个月
                Calendar tableNameCal = Calendar.getInstance();
                tableNameCal.setTime(Times.parse("yyyyMM",tableName));
                tableNameCal.add(Calendar.MONTH,-1);

                tableName = Times.format("yyyyMM",tableNameCal.getTime());
                TableName.set(tableName);
                pageNo = 1;
                p.setPageNumber(pageNo);
                records = dao().query(Chat_records.class, cnd, p);
            }

            data.setv("pageNo",pageNo).setv("pageSize",pageSize).setv("tableName",tableName).setv("list",records);
        } catch (ParseException e) {
            log.error(e);
        } finally {
            TableName.clear();
        }
        return Result.SUCCESS().setData(data);
    }
}
