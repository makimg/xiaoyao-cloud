
import {handelCloudImagePath, navigateTo, xiaoyao_share} from "../../../utils/util";
import { collection_where } from "../../../utils/util_cloud";
const XIAOYAO_APP = getApp(); 
let {globalData:{StatusBar,CustomBar},params_into} = XIAOYAO_APP;
let GET_INFO_MODAL:any = null,autoplayTime:any = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: "",
    StatusBar,
    CustomBar,
    autoplay: false,
    modalShow: false,
    game_array: [],
    cardCur: 0,
    swiperList: [],
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
    crossAxisCount: 2,
    crossAxisGap: 15,
    mainAxisGap: 15,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    params_into(options);
    that.getSwiper();
    that.getGameList();
  },
  /**
   * 生命周期函数--监听页面进入前台
   */
  onShow() {
    let that = this;
    clearTimeout(autoplayTime);
    autoplayTime = setTimeout(() => {
      that.setData({autoplay:true},()=>{
        clearTimeout(autoplayTime);
      });
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
		let that = this;
    GET_INFO_MODAL = that.selectComponent('#info_modal');
  },
  /**
   * 生命周期函数--监听页面进入后台
   */
  onHide() {
    this.setData({autoplay:false},()=>{
      clearTimeout(autoplayTime);
    });
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
  // 获取首页顶部轮播图数据
  getSwiper(){
    let that = this;
    let {swiperList} = that.data;
    collection_where("public",{type:"swiper",value:"index"}).then(resultData=>{
      console.log(resultData,"获取首页顶部轮播图")
      let {list} = resultData;
      if(list&&list.length>0){
        that.setData({swiperList:list})
      }
    })
  },
  // 获取娱乐工具列表
  getGameList(){
    let that = this;
    let {game_array} = that.data;
    collection_where("public",{type:"game",value:"index"}).then(resultRes=>{
      console.log(resultRes,"获取娱乐工具列表")
      let gameArray = resultRes.list;
      gameArray.forEach(element => {
        element["imagePath"] = handelCloudImagePath("static",element.image);
      });
      if(gameArray.length>0) that.setData({game_array:gameArray})
    })
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