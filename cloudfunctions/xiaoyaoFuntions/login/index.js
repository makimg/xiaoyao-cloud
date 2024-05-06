
const cloud = require('wx-server-sdk');
const { generateRandomString, generateRandomUuid, getFourName, } = require('../../cloudUtil');
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
	console.log("云端获取到的用户信息",event);
	let {params_data} = event;
	let {accoutNumber,accoutPassword,userModel} = params_data;
	// let {total} = await user_db.where({OPENID}).count();
	let {total} = await user_db.where({
		"userInfo.accoutNumber": accoutNumber,
		"userInfo.accoutPassword": accoutPassword,
	}).count();
	// 返回数据库查询结果
	console.log("云端获取到的用户信息",total,event);
	let {needWinDowInfo,windowInfo,deviceInfo} = userModel;
	if(total){
		// 老用户更新用户手机信息
		await user_db.where({OPENID}).update({data: {needWinDowInfo,windowInfo,deviceInfo}})
	} else {
		// 新用户增加记录
		let create_new_user_info = {needWinDowInfo,windowInfo,deviceInfo,OPENID,APPID,UNIONID,userInfo:{accoutNumber,accoutPassword,}};
		create_new_user_info.userInfo["register_time"] = new Date().getTime();
		create_new_user_info.userInfo["user_type"] = "new";
		create_new_user_info.userInfo["login_flag"] = false;
		create_new_user_info.userInfo["avatar"] = "";
		create_new_user_info.userInfo["phone_number"] = "";
		create_new_user_info.userInfo["unionid"] = UNIONID || "";
		create_new_user_info.userInfo["openid"] = OPENID || "";
		create_new_user_info.userInfo["token"] = generateRandomString(18);
		create_new_user_info.userInfo["uuid"] = generateRandomUuid(9);
		create_new_user_info.userInfo["integral"] = 0;
		create_new_user_info.userInfo["signTotal"] = 0;
		create_new_user_info.userInfo["signday"] = [];
		console.log("用户数据--------------",create_new_user_info);
		try {
			await user_db.add({data: create_new_user_info});
		} catch (error) {
			await user_db.add({data: create_new_user_info});
		}
	}
	let result_user = await user_db.where({OPENID}).get();
	let {userInfo} = result_user.data[0];
	console.log(userInfo,"9999999",result_user)
	let result_info = {code:200,status:true,data:userInfo};
	return result_info;
};
