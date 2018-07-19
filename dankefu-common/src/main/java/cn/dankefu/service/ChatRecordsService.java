package cn.dankefu.service;

import cn.dankefu.bean.Chat_records;
import cn.dankefu.dto.Result;
import org.nutz.dao.Cnd;

import java.util.Date;
import java.util.List;

/**
 * author: 蛋蛋的忧伤
 * date: 2018/5/19 0019 14:05
 */
public interface ChatRecordsService extends BaseService<Chat_records> {
    /**
     * 插入
     * @param record
     * @return
     */
    Chat_records insert(Chat_records record,String tableName);

    Chat_records insert(String chatId,String chatHistoryId,String recordType,String msgType,String display,Date prevTime,
                        String msgForm,String msgTo,String content,String source,String sys_user_id,String unitId);

    /**
     * 分页查询
     * @param cnd
     * @param pageNo
     * @param pageSize
     * @param tableName
     * @return
     */
    Result query(Cnd cnd, int pageNo, int pageSize, String tableName);

}
