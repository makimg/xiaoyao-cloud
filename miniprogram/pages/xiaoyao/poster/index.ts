import { chooseMediaFile } from "../../../utils/util"

// pages/xiaoyao/poster/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnImg: "",
		btnText: "啥玩意",
    layoutType: 3,
    bgColor: "#EEEEEE",
    imgData: {path:"",width:688,height:932},
    shopData: {text: '这是啥玩意', color: ''},
    titleData: {text: '乐逍遥邀请默垂眸游玩', color: '#000000'},
    userImg: "",
    userName: {text: '乐逍遥', color: '#000000'},
    codeImg: {path:"",width:688,height:932},
    tipsData: {text: '游玩娱乐工具', color: '#000000'},
    logoImg: "",
    logoTitle: {text: '默垂眸', color: '#000000'},
    flag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this;
    chooseMediaFile(1,(result)=>{
      console.log("选择图片结果",result);
      let {tempFiles} = result;
      let {tempFilePath} = tempFiles[0];
      // tempFilePath = "https://mmbiz.qpic.cn/mmbiz_jpg/tyM1FcrhAVblrXY2fsjt95d8XsPsCicqx9b10mxlG2X8qicj95htgv87JA1uFMYSgmfEVmWnJ6K7sicatNLY0Dv6w/0";
      that.setData({
        flag: true,
        btnImg: tempFilePath,
        "imgData.path": tempFilePath,
        "userImg": tempFilePath,
        "codeImg.path": tempFilePath,
        "logoImg": tempFilePath,
      })
    })
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

  }
})