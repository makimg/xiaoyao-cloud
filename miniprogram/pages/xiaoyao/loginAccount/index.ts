import { getFourName } from "../../../utils/randomName";
import { checkPasswordStrength, debounce, getUserModel, mottoAccoutCheck, mottoPassWordCheck, mottoPassWordMaxCheck, showToast, throttle } from "../../../utils/util";
import { cloudFunctions } from "../../../utils/util_cloud";


let mottoTimeOut:any = null,mottoCount=0,mottoAccout="",mottoPassWord="";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mottoValue: getFourName(true),
    noteCheckedFlag: false,
    changeMottoIng: false,
    mottoLoginIng: false,
    strengthLevel: 0,
    strengthList: ["弱","中","强"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearTimeout(mottoTimeOut);
    mottoTimeOut = null;
  },
  // 随机切换座右铭
  onChangeMottoIng: throttle(function(){
    let that = this;
    console.log(mottoCount)
    if(mottoCount>=5) return showToast("已达上限喽~","none",1500);
    that.setData({changeMottoIng:true},()=>{
      that.randomMotto();
    })
  },1500),
  // 随机切换座右铭
  randomMotto(){
    let that:any = this;
    clearTimeout(mottoTimeOut);
    mottoTimeOut = setTimeout(() => {
      mottoCount++;
      that.setData({
        mottoValue: getFourName(true),
        changeMottoIng: false
      })
      clearTimeout(mottoTimeOut);
    }, 1000);
  },
  // 账号输入
  onMottoAccoutInput(event){
    console.log(event.detail,"输入的账号");
    mottoAccout = event.detail;
    console.log(mottoAccoutCheck(mottoAccout));
  },
  // 密码输入
  onMottoPasswordInput(event){
    console.log(event.detail,"输入的密码");
    mottoPassWord = event.detail;
    console.log(mottoPassWordMaxCheck(mottoPassWord));
    this.checkPasswordStrong()
  },
  // 密码强度检测
  checkPasswordStrong: throttle(function(){
    checkPasswordStrength(mottoPassWord)
    this.setData({
      strengthLevel: checkPasswordStrength(mottoPassWord)
    })
  },1000),
  // 隐私知情同意书勾选
  onNoteChange(event){
    let that = this;
    let {detail} = event;
    that.setData({noteCheckedFlag:detail})
  },
  // 隐私知情同意书跳转
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
  // 登录
  login(){
    let that = this;
    if(mottoAccout.length===0) return showToast("账号不能为空","none",1500);
    if(!mottoAccoutCheck(mottoAccout)) return showToast("账号格式错误","none",1500);
    if(mottoPassWord.length===0) return showToast("密码不能为空","none",1500);
    if(!mottoPassWordMaxCheck(mottoPassWord)) return showToast("密码格式错误","none",1500);
    that.setData({mottoLoginIng:true},()=>{
      showToast("登录中...","loading",20000);
      that.cloudLogin();
    });
  },
  // 云调用登录
  cloudLogin(){
    let that = this;
    let {mottoValue} = that.data;
    let params_data = {
      accoutNumber: mottoAccout,
      accoutPassword: mottoPassWord,
      accoutMotto: mottoValue,
      userModel:getUserModel(),
    };
    let event_data = {funName:"xiaoyao_login",params_data};
    cloudFunctions(event_data,res=>{
      console.log("登录注册,login",res);
      let {code,status,data} = res.result;
      if(code===200&&status){
        console.log(data);
        showToast("登录成功","none",1500);
      } else {
        showToast("登录失败","none",1500);
      }
    })
  },
})