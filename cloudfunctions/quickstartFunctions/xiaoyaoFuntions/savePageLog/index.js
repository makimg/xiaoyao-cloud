
const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
	// 获取基础信息
	const wxContext = cloud.getWXContext();
	const {OPENID,APPID,UNIONID} = wxContext;
	let get_user_info = await db.collection('user').where({OPENID}).get();
	// 返回数据库查询结果
	console.log("云端获取到的用户信息",get_user_info,event);
	let {data,errMsg} = get_user_info;
	let result_info = {code:200,status:true,data:{},errMsg};
	let user_into_log = {...event.pageLog,current_time: new Date().getTime(),};
	if(data.length>0) user_into_log = {...user_into_log,...data[0].userInfo,};
	try {
		await db.collection('pageLog').add({data: user_into_log});
		result_info["data"] = user_into_log;
	} catch (error) {
		result_info["data"] = {};
	}
	return result_info;
};
