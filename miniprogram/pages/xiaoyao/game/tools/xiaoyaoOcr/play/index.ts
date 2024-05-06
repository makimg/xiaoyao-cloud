import { chooseMediaFile, showToast } from "../../../../../../utils/util";
import { cloudUpFile } from "../../../../../../utils/util_cloud";
import { serviceMarket } from "../../../../../../utils/wx_service";

// pages/xiaoyao/game/tools/xiaoyaoOcr/play/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    ocr_list:[
      {name: "身份证",type: 1,},
      {name: "银行卡",type: 2,},
      {name: "行驶证",type: 3,},
      {name: "驾驶证",type: 4,},
      {name: "营业执照",type: 7,},
      {name: "通用识别",type: 8,},
      {name: "车牌识别",type: 10,},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 选择资料
   *  */ 
  onChooseFile(event){
    let that = this;
    let {cliIndex} = event.currentTarget.dataset;
    let {ocr_list} = that.data;
    let {type} = ocr_list[cliIndex];
    chooseMediaFile(1,resultData=>{
      console.log(resultData,"选择的图片");
      if(resultData&&resultData.errMsg==="chooseMedia:ok"){
        let {tempFiles} = resultData;
        that.upLoadFile(type,tempFiles,()=>{
          let {tempFilePath} = tempFiles[0];
          showToast("上传成功","none",1500);
          that.setData({
            ocrImgIng: tempFilePath
          })
        })
      } else {
        showToast("选择图片失败","none",1500);
      }
    })
  },

  /** 
   * 上传资料
   * */
  upLoadFile(type,tempFiles,callback){
    let {tempFilePath} = tempFiles[0];
    showToast("上传中","loading",20000);
    cloudUpFile(type,tempFilePath).then(resultData=>{
      callback && callback(resultData);
    })
  },
  /**
   * 开始识别
   *  */ 
  onStartOCR(){
    let that = this;
    let {ocrImgIng,active,ocr_list} = that.data;
    let {type} = ocr_list[active];
    let ocrData = {img_url:ocrImgIng,ocr_type:parseInt(type),data_type:3};
    showToast("开始识别","loading",20000);
    serviceMarket("OcrAllInOne",ocrData,(res)=>{
      console.log("识别结果",res);
      showToast("识别成功","none",1500);
    })
  },
})