package cn.dankefu.bean;

import org.nutz.dao.entity.annotation.*;

import java.util.Date;
import java.util.Objects;

/**
 * 客户表
 * author: 蛋蛋的忧伤
 * date: 2018/5/16 0016 20:05
 */
@Table("dankefu_customer")
public class Customer extends BasePojo{
    private static final long serialVersionUID = 1L;
    @Column
    @Name
    @Comment("编号")
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Prev(els = {@EL("uuid()")})
    private String id;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("单位编号")
    private String unitId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("会话编号")
    private String chatId;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 50)
    @Comment("客户姓名")
    private String name;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 50)
    @Comment("单位备注")
    private String remark;


    @Column
    @ColDefine(type = ColType.VARCHAR, width = 5)
    @Comment("性别")
    private String gender;


    @Column
    @ColDefine(type = ColType.VARCHAR, width = 11)
    @Comment("联系电话")
    private String phone;


    @Column
    @ColDefine(type = ColType.VARCHAR, width = 100)
    @Comment("邮箱")
    private String email;

    @Column
    @ColDefine(type = ColType.INT)
    @Comment("年龄")
    private int age;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 32)
    @Comment("出生日期")
    private Date birthday;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 10)
    @Comment("证件类型:CardTypeEnum")
    private String cardType;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 100)
    @Comment("证件号")
    private String card;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 10)
    @Comment("省份")
    private String province;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 10)
    @Comment("市")
    private String city;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 10)
    @Comment("区")
    private String region;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 100)
    @Comment("详细地址")
    private String address;


    @Column
    @ColDefine(type = ColType.VARCHAR, width = 20)
    @Comment("职业")
    private String profession;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 10)
    @Comment("来源：ClientSourceEnum")
    private String source;

    @Column
    @ColDefine(type = ColType.VARCHAR, width = 100)
    @Comment("来源平台")
    private String platform;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }


    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return age == customer.age &&
                Objects.equals(id, customer.id) &&
                Objects.equals(unitId, customer.unitId) &&
                Objects.equals(chatId, customer.chatId) &&
                Objects.equals(name, customer.name) &&
                Objects.equals(remark, customer.remark) &&
                Objects.equals(gender, customer.gender) &&
                Objects.equals(phone, customer.phone) &&
                Objects.equals(email, customer.email) &&
                Objects.equals(birthday, customer.birthday) &&
                Objects.equals(cardType, customer.cardType) &&
                Objects.equals(card, customer.card) &&
                Objects.equals(province, customer.province) &&
                Objects.equals(city, customer.city) &&
                Objects.equals(region, customer.region) &&
                Objects.equals(address, customer.address) &&
                Objects.equals(profession, customer.profession) &&
                Objects.equals(source, customer.source) &&
                Objects.equals(platform, customer.platform);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, unitId, chatId, name, remark, gender, phone, email, age, birthday, cardType, card, province, city, region, address, profession, source, platform);
    }
}
