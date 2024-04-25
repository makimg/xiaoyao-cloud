

const app = getApp();
const {CustomBar} = app.globalData;
var plugin = requirePlugin("chatbot");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // this.chatAI_init();
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
  // 初始化机器人插件
  chatAI_init(){
    let that = this;
    plugin.init({
      appid: "4BdYHGuNV1DsszNNUKsFqRjJ55ZKJk", //微信对话开放平台中应用绑定小程序插件appid
      openid: "oUxkJ40tf_muIoEd5HpwO0piDWco", // 小程序用户的openid，必填项
    });
  },
  // 点击机器人回答里的链接跳转 webview
  openWebview: function(e) {
    let url = e.detail.weburl
    wx.navigateTo({
        url: `/pages/webviewPage/webviewPage?url=${url}`
    })
  },
  // 点击机器人回答中的小程序
  openMiniProgram(e) {
    let {appid, pagepath} = e.detail
    if (appid) {
        wx.navigateToMiniProgram({
            appId: appid,
            path: pagepath,
            extraData: {},
            envVersion: "trial",
            success(res) {
                // 打开成功
            }
        });
    } else {
        wx.navigateTo({
            url: pagepath,
            fail() {
                wx.switchTab({
                    url: pagepath
                });
            }
        });
    }
  },
})