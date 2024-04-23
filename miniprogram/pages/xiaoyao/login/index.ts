import { getUserModel, hideToast, navigateTo, showToast, validatePhoneNumber } from "../../../utils/util";
import { cloudFunctions } from "../../../utils/util_cloud";

let sms_timeout:any = null,sms_number = 60;
let RandomPhoneCode="",sms_phone="",sms_code="";
let userModel = getUserModel();
let note_click = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnFlag: false,
    sms_text: "发送验证码",
    note_flag: false,
    note_checked_flag: false,
    activeIcon: '//img.yzcdn.cn/icon-active.png',
    inactiveIcon: '//img.yzcdn.cn/icon-normal.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(sms_timeout);
    sms_timeout = null;
    sms_number = 60;
  },
  // 手机号输入
  onSmsPhone(event){
    console.log("输入的手机号码",event);
    sms_phone = event.detail.value
  },
  // 验证码输入
  onSmsCode(event){
    console.log("输入的验证码",event);
    sms_code = event.detail.value;
  },
  // 隐私保护指引
  openPrivacyContract() {
    wx.openPrivacyContract({
      success: res => {
        console.log('openPrivacyContract success')
      },
      fail: res => {
        console.error('openPrivacyContract fail', res)
      }
    })
  },
  // 勾选知情同意书
  onNoteChange(event){
    let that = this;
    let {detail} = event;
    that.setData({note_checked_flag:detail})
  },
  // 登录
  onLogin(){
    let that = this;
    let {note_flag} = that.data;
    let {deviceInfo:{brand}} = userModel;
    let event_data = {funName:"xiaoyao_login",params_data:{userModel:getUserModel()}};
    if(brand!="devtools") event_data.params_data.userModel = userModel;
    showToast("登录中","none",20000);
    if(sms_phone=="") return showToast("请输入您的手机号","none",1500);
    if(!validatePhoneNumber(sms_phone)) return showToast("手机号格式错误","none",1500);
    if(sms_code.length===0) return showToast("请输入验证码","none",1500);
    if(sms_code==""||sms_code.length!=6) return showToast("验证码错误","none",1500);
    if(!note_click) return showToast("请选阅读知情同意书","none",1500);
    if(!note_flag) return showToast("请勾选知情同意书","none",1500);
    return
    cloudFunctions(event_data,res=>{
      console.log("用户登录",res);
      let {data} = res.result;
      let {token} = data;
      if(token&&!token&&token!=null&&token!=undefined&&token!=""){
        wx.setStorageSync("login",true);
        wx.setStorageSync("token",token);
        wx.setStorageSync("userInfo",data);
      }
      showToast("登录成功","none",1500);
      hideToast(()=>{
        navigateTo(`/pages/xiaoyao/home/index`);
      })
    })
  },
  // 发送验证码
  onGetSms(event){
    let that = this;
    let {btnFlag} = that.data;
    if(btnFlag) return console.log("发送验证码中禁止点击");
    that.setData({btnFlag:true},()=>{
      that.cloudSendSMS();
      that.setSmsTimeout();
    })
  },
  // 设置发送验证码时长
  setSmsTimeout(){
    let that = this;
    clearInterval(sms_timeout);
    let sedObj = {};
    sms_timeout = setInterval(function(){
      if(sms_number<=0){
        clearInterval(sms_timeout);
        sms_number = 60;
        sedObj = {btnFlag:false,sms_text:"重新发送"};
      } else {
        sms_number--;
        sedObj = {sms_text:`${sms_number} s`};
      }
      that.setData(sedObj)
    },1000)
  },
  // 发送验证码
  cloudSendSMS(){
    let that = this;
    let event_data = {funName:"xiaoyao_sendSMS",params_data:{phoneNumber: sms_phone,RandomPhoneCode:RandomPhoneCode}};
    showToast("正在发送","loading",20000);
    cloudFunctions(event_data,res=>{
      let {code,status} = res.result;
      if(code===200&&status){
        showToast("发送成功","none",1500);
      } else {
        showToast("发送失败","none",1500);
        clearInterval(sms_timeout);
        sms_number = 60;
        that.setData({btnFlag:false,sms_text:"重新发送"})
      }
    })
  },
})