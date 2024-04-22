const { envList } = require("../../envList");
const { getNickName } = require("../../utils/randomName");
const { getUserModel } = require("../../utils/util");
const { cloudFunctions } = require("../../utils/util_cloud");
const { QuickStartPoints, QuickStartSteps } = require("./constants");

Page({
  data: {
    knowledgePoints: QuickStartPoints,
    steps: QuickStartSteps,
  },
  onLoad(){
    let that = this;
    wx.showLoading({
      title: '获取用户信息',
    })
    let event_data = {funName:"xiaoyao_getUserInfo",userModel:getUserModel()}
    cloudFunctions(event_data,result=>{
      console.log("获取用户信息,index",result);
    })
  },
  copyCode(e) {
    const code = e.target?.dataset?.code || '';
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({
          title: '已复制',
        })
      },
      fail: (err) => {
        console.error('复制失败-----', err);
      }
    })
  },

  discoverCloud() {
    wx.switchTab({
      url: '/pages/examples/index',
    })
  },

  gotoGoodsListPage() {
    wx.navigateTo({
      url: '/pages/goods-list/index',
    })
  },
});
