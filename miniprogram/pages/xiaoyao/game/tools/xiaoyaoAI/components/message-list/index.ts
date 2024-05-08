// pages/xiaoyao/game/tools/xiaoyaoAI/components/chat-list/index.ts
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
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _checkAnswer(event){
      let {answerInfo} = event.detail;
      this.triggerEvent("checkAnswer",{answerInfo})
    }
  }
})