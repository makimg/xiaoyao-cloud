
const cloud = require('wx-server-sdk');
const { generateRandomString, generateRandomUuid, getFourName, } = require('../../../cloudUtil');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
//云函数的功能：发送短信验证码
// 查询数据库集合云函数入口函数
// 云函数入口函数
exports.main = async (event, context) => {
	let {phoneNumber,RandomPhoneCode} = event;
  const result = await cloud.openid.cloudbase.sendSms({
    env:cloud.DYNAMIC_CURRENT_ENV,
    phone_number_list:[`+86${phoneNumber}`],
    content: `【默垂眸小程序】验证码为：${RandomPhoneCode}`,
	})
	return result;
}













