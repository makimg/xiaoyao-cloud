const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
	const wxContext = cloud.getWXContext();
	const cloudDomain = "silents-0g9acbkb68a4da06";
  return {
		cloudDomain,
		openid: wxContext.OPENID
  };
};
