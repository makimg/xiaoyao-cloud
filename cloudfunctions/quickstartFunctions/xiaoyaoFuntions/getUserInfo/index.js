
const cloud = require('wx-server-sdk');
const { generateRandomString, generateRandomUuid, getNickName, } = require('../../../cloudUtil');

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
	let user_length = data.length;
	if(user_length===0) {
		let {needWinDowInfo,windowInfo,deviceInfo} = event.userModel;
		let create_new_user_info = {needWinDowInfo,windowInfo,deviceInfo,OPENID,APPID,UNIONID,userInfo:{}};
		create_new_user_info.userInfo["register_time"] = new Date().getTime();
		create_new_user_info.userInfo["user_type"] = "new";
		create_new_user_info.userInfo["login_flag"] = false;
		create_new_user_info.userInfo["avatar"] = "";
		create_new_user_info.userInfo["phone_number"] = "";
		create_new_user_info.userInfo["nickName"] = getNickName() || "";
		create_new_user_info.userInfo["unionid"] = UNIONID || "";
		create_new_user_info.userInfo["openid"] = OPENID || "";
		create_new_user_info.userInfo["token"] = generateRandomString(18);
		create_new_user_info.userInfo["uuid"] = generateRandomUuid(9);
		console.log("用户数据--------------",create_new_user_info);
		try {
			await db.collection('user').add({data: create_new_user_info});
			result_info["data"] = create_new_user_info.userInfo;
		} catch (error) {
			result_info["data"] = {};
		}
	} else {
		result_info["data"] = {...data[0].userInfo,user_type:"old"};
	}
	return result_info;
};
