// pages/xiaoyao/game/tools/randomGeneration/play/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    crossAxisCount: 2,
    crossAxisGap: 8,
    mainAxisGap: 4,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      gridList: this.generateGridList(10, 4),
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

  },
  generateGridList(childCount, columns){
    const ans = []
    for (let i = 0; i < childCount; i++) {
      ans.push({ id: i, sub: this.getRandomInt(columns) + 1,})
    }
    return ans
  },
  getRandomInt(max){
    return Math.floor(Math.random() * max)
  },
})