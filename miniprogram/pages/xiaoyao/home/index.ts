
import {showToast} from "../../utils/util";
const XIAOYAO_APP = getApp(); 
let {StatusBar,CustomBar} = XIAOYAO_APP.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: "",
    StatusBar,
    CustomBar,
    modalShow: false,
    arrayList: [
      {
        name: 1,
        className: "",
      },
      {
        name: 2,
        className: "w60",
      },
      {
        name: 3,
        className: "w30",
      },
      {
        name: 4,
        className: "",
      },
      {
        name: 5,
        className: "w45",
      },
      {
        name: 6,
        className: "w40",
      },
      {
        name: 7,
        className: "",
      },
      {
        name: 8,
        className: "",
      },
      {
        name: 9,
        className: "",
      },
    ],
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    crossAxisCount: 4,
    crossAxisGap: 4,
    mainAxisGap: 4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.towerSwiper('swiperList');
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opts: { target: any }): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  },
  // 监听上传用户资料弹框滚动穿透
  modalFlagChange(event: { detail: { modalShow: any; }; }){
    let that = this;
    let {modalShow} = event.detail;
    that.setData({modalShow})
  },
  // 打开隐藏魔盒
  showModal(event: { currentTarget: { dataset: { value: any; }; }; }) {
    let that = this;
    let {value} = event.currentTarget.dataset;
    that.setData({modalName:value})
  },
  // 关闭隐藏魔盒
  hideModal() {
    let that = this;
    that.setData({modalName: ""})
  },

  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name: string | number) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e: { touches: { pageX: any; }[]; }) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e: { touches: { pageX: number; }[]; }) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e: any) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})