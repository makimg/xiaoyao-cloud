import { showToast } from "../../../../../../../utils/util";

// pages/xiaoyao/game/tools/xiaoyaoAI/components/chat-item/index.ts
Component({
  options:{
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    answer_flag: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onChoice(event){
      let that = this;
      let {item,cliText} = event.currentTarget.dataset;
      let {question_id,answer_flag} = item;
      if(answer_flag&&answer_flag!=undefined) return;
      let answerInfo = {question_id, user_answer_content: cliText};
      that.triggerEvent("choice",{answerInfo})
    },
  }
})