import { showToast } from "../../../../../../utils/util";
import { chatbot_nlp, initChatBot } from "../../../utils/utils";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jumpAim: "",
    topNum: "",
    questionList: [],
    question_count: 1,
    userid: "999999",
    isShowBar: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this;
    that.init();
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 初始化诗词问答
   * */
  init(){
    let that = this;
    initChatBot(()=>{
      that.getQuestionList();
    })
  },
  /**
   * 获取问答数据
   *  */ 
  getQuestionList(){
    let that = this;
    let {question_count,userid,questionList} = that.data;
    chatbot_nlp('poem_fetch_question', {question_count, userid}).then(res => {
      console.log("poem_fetch_question result : ", res)
      let {question_list,status} = res;
      if(status===0) {
        let question_array:any = [];
        question_list.forEach(element => {
          question_array.push(element)
        });
        questionList = [...questionList,...question_array,]
        let {question_id} = questionList[questionList.length-1];
        that.setData({
          questionList,
          
        },()=>{
          setTimeout(function(){
            that.setData({jumpAim: `#xiaoyao_${questionList.length-1}`,})
          },2000)
        })
      } else {
        console.log("初始化失败")
      }
    })
  },
   /**
   * 监听子组件选择答案
   *  */ 
  onCheckAnswer(event){
    let that = this;
    let {answerInfo} = event.detail;
    let {question_id,user_answer_content} = answerInfo;
    let {questionList} = that.data;
    let questionIndex = questionList.findIndex(x=>{return x.question_id===question_id});
    that.setData({
      [`questionList[${questionList.length}]`]: {answerInfo}
    })
    if(questionIndex>=0){
      chatbot_nlp("poem_check_answer",answerInfo).then(res => {
        console.log("poem_check_answer result : ", res)
        let {status,check_result} = res;
        if(status===0){
          let {answer_options} = questionList[questionIndex];
          let answer_current = answer_options.findIndex(x=>{return x===user_answer_content});
          showToast(`回答${check_result===1?"正确":"错误"}`,"none",1500);
          that.setData({
            jumpAim: `#xiaoyao_${questionList.length-1}`,
            [`questionList[${questionIndex}].answer_current`]: answer_current,
            [`questionList[${questionIndex}].answer_result`]: check_result,
            [`questionList[${questionIndex}].answer_flag`]: true,
          },()=>{
            that.getQuestionList();
          })
        } else {
          showToast("服务器宕机，请稍后问答！","none",1500);
        }
      })
    }
  },
})