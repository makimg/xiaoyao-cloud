
const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const user_db = db.collection('user');
// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
	// 获取基础信息
	const wxContext = cloud.getWXContext();
	const {OPENID,APPID,UNIONID} = wxContext;
	let {total} = await user_db.where({OPENID}).count();
	// 返回数据库查询结果
	console.log("云端获取到的用户信息",total,event);
	let result_info = {code:200,status:true,data:{}};
	if(total){
		let result_user = await user_db.where({OPENID}).get();
		let {userInfo} = result_user.data[0];
		console.log(userInfo,"9999999",result_user)
		result_info.data = userInfo;
	} else {
		result_info.status = false;
	}
	return result_info;
};
