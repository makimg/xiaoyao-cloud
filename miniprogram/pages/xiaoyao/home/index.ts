
import {handelCloudImagePath, navigateTo, xiaoyao_share} from "../../../utils/util";
import { collection_where } from "../../../utils/util_cloud";
const XIAOYAO_APP = getApp(); 
let {globalData:{StatusBar,CustomBar},params_into} = XIAOYAO_APP;
let GET_INFO_MODAL:any = null;
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
        img_url: handelCloudImagePath("select.png?sign=155e13082448a314a1d9a475fcc4d5a3&t=1715245787"),
        className: "bg-gradual-red",
      },
      {
        name: "逍遥微聊",
        name_key: "tools/xiaoyaoAI",
        img_url: handelCloudImagePath("chat.png?sign=410f2f3faeebe3caaacc087550ab8e80&t=1715246045"),
        className: "h4 bg-gradual-black",
      },
      {
        name: "排顺序",
        name_key: "sort",
        img_url: handelCloudImagePath("sort.png?sign=fd40113c080afe3bcdf926612dba9590&t=1715246114"),
        className: "h4 bg-gradual-black",
      },
      {
        name: "去投票",
        name_key: "vote",
        img_url: "",
        className: "h4 bg-gradual-black1",
      },
      {
        name: "逍遥古诗答疑",
        name_key: "tools/xiaoyaoAI/ancientPoetry",
        img_url: handelCloudImagePath("knowledge-2.png?sign=235be83bcbecf4c997ce17b5572f2c1f&t=1715246478"),
        className: "h4 bg-gradual-black10",
      },
      {
        name: "来抓阄",
        name_key: "drawLot",
        img_url: "",
        className: "bg-gradual-black2",
      },
      {
        name: "逍遥翻译",
        name_key: "tools/xiaoyaoAI",
        img_url: "",
        className: "h4 bg-gradual-black",
      },
      {
        name: "分任务",
        name_key: "allotTask",
        img_url: "",
        className: "h3",
      },
      {
        name: "随机生成",
        name_key: "tools/randomGeneration",
        img_url: handelCloudImagePath("random.png?sign=f9b09beab95535f6ce3322f8d8f68b34&t=1715246228"),
        className: "h4",
      },
      {
        name: "去接龙",
        name_key: "solitaire",
        img_url: handelCloudImagePath("dragon-1.png?sign=51b038acd09d8c0b01f643fd0a4a1a05&t=1715246365"),
        className: "h5 bg-gradual-black4",
      },
      {
        name: "来抽签",
        name_key: "lottery",
        img_url: handelCloudImagePath("lottery.png?sign=42d735dc79ad2e65afe0b9a87cb955d6&t=1715246762"),
        className: "bg-gradual-black5",
      },
      {
        name: "去分组",
        name_key: "allotGroup",
        img_url: handelCloudImagePath("vote.png?sign=a0df23ea93cbd219ef3623b3bae0e381&t=1715247270"),
        className: "h3",
      },
      {
        name: "逍遥智能识别",
        name_key: "tools/xiaoyaoOcr",
        img_url: handelCloudImagePath("identify.png?sign=64d42c2b338deb627123af00688ff964&t=1715246166"),
        className: "h4 bg-gradual-black",
      },
      {
        name: "去抽奖",
        name_key: "drawPrize",
        img_url: handelCloudImagePath("lottery-1.png?sign=d4b4976d3231d07d234509b15cfdb8d3&t=1715247320"),
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
  // 获取首页顶部轮播图数据
  getSwiper(){
    let that = this;
    let {swiperList} = that.data;
    collection_where("public",{type:"swiper",value:"index"}).then(resultData=>{
      console.log(resultData,"9999")
      let {list} = resultData;
      if(list&&list.length>0){
        that.setData({swiperList:list})
      }
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