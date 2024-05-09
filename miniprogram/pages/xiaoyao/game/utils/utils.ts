const plugin = requirePlugin("chatbot");

const initChatBot = (callback)=>{
	let that = this;
    plugin.init({
			appid: "P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja", //小程序示例账户，仅供学习和参考
			openid: "ewdwedadxascdewd", //用户的openid，非必填，建议传递该参数
			success: () => {
        callback && callback()
      }, //非必填
			fail: (error) => {}, //非必填
		});
}

const chatbot_nlp = (type,answerInfo)=>{
	return plugin.api.nlp(type, answerInfo)
}

export {
	initChatBot,
	chatbot_nlp,
}