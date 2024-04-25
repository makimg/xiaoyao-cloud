const { envList } = require("../../envList");
const { getFourName, } = require("../../utils/randomName");
const { getUserModel, showToast } = require("../../utils/util");
const { cloudFunctions } = require("../../utils/util_cloud");
const { QuickStartPoints, QuickStartSteps } = require("./constants");

Page({
  data: {
    knowledgePoints: QuickStartPoints,
    steps: QuickStartSteps,
  },
  onLoad(){
    let that = this;
    // wx.showLoading({
    //   title: '获取用户信息',
    // })
    console.log(getFourName(true),);
    // let event_data = {funName:"xiaoyao_getUserInfo",params_data:{}}
    // cloudFunctions(event_data,res=>{
    //   console.log("获取用户信息,index",res);
    //   let {code,status} = res.result;
    //   if(code===200&&status){
    //     showToast("登录成功","none",1500);
    //   } else {
    //     wx.hideLoading()
    //   }
    // })
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
