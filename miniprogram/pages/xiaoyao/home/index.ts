
import {navigateTo} from "../../../utils/util";
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
    game_array: [
      {
        name: "去选择",
        name_key: "select",
        className: "bg-gradual-red",
      },
      {
        name: "排顺序",
        name_key: "sort",
        className: "h4 bg-gradual-black",
      },
      {
        name: "去投票",
        name_key: "vote",
        className: "h4 bg-gradual-black1",
      },
      {
        name: "来抓阄",
        name_key: "drawLot",
        className: "bg-gradual-black2",
      },
      {
        name: "分任务",
        name_key: "allotTask",
        className: "h3 bg-gradual-black3",
      },
      {
        name: "去接龙",
        name_key: "solitaire",
        className: "h5 bg-gradual-black4",
      },
      {
        name: "来抽签",
        name_key: "lottery",
        className: "bg-gradual-black5",
      },
      {
        name: "去分组",
        name_key: "allotGroup",
        className: "h3 bg-gradual-red",
      },
      {
        name: "去抽奖",
        name_key: "drawPrize",
        className: "pumpPrize bg-gradual-red",
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
    toggleDelay: false,
    fly_array: [
      {
        name: "我参与的",
        count: 0,
        color: "bg-gradual-red",
      },
      {
        name: "我发起的",
        count: 0,
        color: "bg-gradual-orange",
      },
      {
        name: "我的徽章",
        count: 0,
        color: "bg-gradual-purple",
      },
    ],
    cont_array: [
      {
        name: "关于乐逍遥小程序",
        type: "index",
        icon: "browsing-history-o",
        color: "#0081ff",
        button_flag: false,
      },
      {
        name: "版本日志",
        type: "log",
        icon: "todo-list-o",
        color: "#1cbbb4",
        button_flag: false,
      },
      {
        name: "赞赏支持",
        type: "appreciate",
        icon: "good-job-o",
        color: "#ec008c",
        button_flag: false,
      },
      {
        name: "意见反馈",
        type: "feedback",
        icon: "records-o",
        color: "#ed1c24",
        button_flag: true,
      },
      {
        name: "联系客服",
        type: "concat",
        icon: "user-o",
        color: "#5e00ff",
        button_flag: true,
      },
      {
        name: "邀请好友",
        type: "share",
        icon: "share-o",
        color: "#39b54a",
        button_flag: true,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this;
    that.setData({toggleDelay:true});
    that.towerSwiper('swiperList');
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
    let that = this;
    let list = that.data[name];
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
  },
  // 开始玩吧
  toPLay(event){
    let that = this;
    let {keys} = event.currentTarget.dataset;
    let path = `/pages/xiaoyao/game/${keys}/play/index`;
    navigateTo(path);
  },
  // 去查看
  goLink(event){
    let that = this;
    let {link} = event.currentTarget.dataset;
    let path = `/pages/xiaoyao/about/`;
    path = link=="index"?`${path}${link}`:`${path}${link}/index`;
    if(link==="appreciate") { //赞赏
      
    } else {
      navigateTo(path);
    }
    
  },
})