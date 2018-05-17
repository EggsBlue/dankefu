package cn.dankefu.dto;

import org.nutz.json.Json;

import java.io.Serializable;
import java.util.Objects;

/**
 * http协议下的消息格式
 * author: 蛋蛋的忧伤
 * date: 2018/5/17 20:56
 */
public class Result implements Serializable {
    private static final long serialVersionUID = 1L;

    public static int SUCCESS = 0;
    public static int ERROR = 1;

    private int code;
    private String msg;
    private Object data;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static Result ERROR(){
        return Result.NEW(ERROR,"操作失败",null);
    }
    public static Result ERROR(String msg){
        return Result.NEW(ERROR,msg,null);
    }

    public static Result ERROR(String msg,Object data){
        return Result.NEW(ERROR,msg,data);
    }

    public static Result ERROR(int code,String msg,Object data){
        return Result.NEW(code,msg,data);
    }

    public static Result SUCCESS(){
        return Result.NEW(SUCCESS,"操作成功",null);
    }
    public static Result SUCCESS(String msg){
        return Result.NEW(SUCCESS,msg,null);
    }

    public static Result SUCCESS(String msg,Object data){
        return Result.NEW(SUCCESS,msg,data);
    }

    public static Result SUCCESS(int code,String msg,Object data){
        return Result.NEW(code,msg,data);
    }

    public static Result NEW(int code){
        Result result = Result.NEW();
        result.setCode(code);
        return result;
    }

    public static Result NEW(int code,String msg){
        Result result = Result.NEW();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }

    public static Result NEW(int code,String msg,Object data){
        Result result = Result.NEW();
        result.setCode(code);
        result.setMsg(msg);
        result.setData( data);
        return result;
    }

    public static Result NEW(){
        return new Result();
    }

    public boolean isOK(){
        return this.code == SUCCESS;
    }

    public boolean isError(){
        return this.code == ERROR;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Result result = (Result) o;
        return code == result.code &&
                Objects.equals(msg, result.msg) &&
                Objects.equals(data, result.data);
    }

    @Override
    public int hashCode() {

        return Objects.hash(code, msg, data);
    }

    @Override
    public String toString() {
        return Json.toJson(this);
    }
}
