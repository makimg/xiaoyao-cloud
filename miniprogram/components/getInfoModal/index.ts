
import {showToast} from "../../utils/util";

Component({

	options:{
		addGlobalClass: true
	},

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
		_modal: false,
		_user_nickname: "",
		_user_avatar: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
		// 关闭授权弹框
    _onCloseModal(){
      let that = this;
      this.setData({_modal:false},()=>{
        that.triggerEvent("onChangeModalFlag",{modalShow:false});
      });
		},
		// 打开授权弹框
    _onShowModal(){
      let that = this;
      this.setData({_modal:true},()=>{
        that.triggerEvent("onChangeModalFlag",{modalShow:true});
      });
		},
		// 选择头像
		_onchooseavatar(event){
			let that = this;
			console.log(event);
			let {avatarUrl} =  event.detail;
			console.log("选择的图片",avatarUrl)
		},
		// 输入的昵称
		_onNicknameReview(event){
			let that = this;
			let {pass,timeout} = event.detail;
			console.log("输入的昵称",pass,timeout,event);
			if(!pass) return showToast("昵称违规，请重新输入～","none",1500);
		},
		// 提交用户授权信息
		_onSubmitInfo(){
			let that = this;
			let {_user_avatar,_user_nickname} = that.data;
		},
  }
})