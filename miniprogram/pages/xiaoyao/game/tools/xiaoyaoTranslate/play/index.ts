import { multilingualMT_list, serviceMarket } from "../../../../../../utils/wx_service";
import {setClipboardData, showToast} from "../../../../../../utils/util";

// pages/xiaoyao/tools/xiaoyaoTranslate/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multilingualMT_list,
    autosize: { maxHeight: 100, minHeight: 100 },
    keyword: "你在干什么",
    result: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this;
    setTimeout(function(){
      that.setData({result:"这击杀挖一年"})
    },2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 开始翻译
  onTranslate(event){
    let that = this;
    let {cliIndex} = event.currentTarget.dataset;
    let {multilingualMT_list,keyword} = that.data;
    let q = keyword.trim();
    let {tolang} = multilingualMT_list[cliIndex]
    if(q.length===0||q==""||q==undefined) return showToast("请输入翻译内容","none",1500);
    let translateInfo = {q: keyword,tolang,};
    showToast("处理中...","loading",20000);
    that.setData({result:""});
    console.log("翻译参数",translateInfo);
    serviceMarket("multilingualMT",translateInfo,(res)=>{
      console.log(res,"翻译结果")
      if(res&&res?.data) {
        let {data:{Result}} = res;
        showToast("翻译成功","none",1500);
        that.setData({result:Result})
      } else {
        showToast("翻译失败","none",1500);
      }
    })
  },
  // 复制翻译内容
  onCopyResult(){
    let that = this;
    let {result} = that.data;
    setClipboardData(result,(res)=>{
      console.log("复制成功",res);
    })
  },
})