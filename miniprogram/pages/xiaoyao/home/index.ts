
import {navigateTo, xiaoyao_share} from "../../../utils/util";
const XIAOYAO_APP = getApp(); 
let {globalData:{StatusBar,CustomBar},params_into} = XIAOYAO_APP;
let GET_INFO_MODAL = null;
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
        className: "h3 bg-gradual-black6",
      },
      {
        name: "去抽奖",
        name_key: "drawPrize",
        className: "pumpPrize bg-gradual-black7",
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
        type: "contact",
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
  onLoad(options) {
    let that = this;
		params_into(options);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
		let that = this;
		GET_INFO_MODAL = that.selectComponent('#info_modal');
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
		let that = this;
		let share_obj = {
			title: "乐逍遥",
			path: "/pages/xiaoyao/home/index",
		}
    return xiaoyao_share(share_obj);
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
	// 打开用户授权弹框
	onOpenGetUserModal(event){
		let that = this;
		GET_INFO_MODAL._onShowModal();
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