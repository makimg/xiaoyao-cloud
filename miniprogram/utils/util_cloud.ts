
import {envList} from "./env_list";

const cloudFunctions = (event_data,callback)=>{
	let token = wx.getStorageSync("token") || "";
	event_data.params_data = {...event_data.params_data,token,};
	wx.cloud.callFunction({
		name: 'quickstartFunctions',
		config: {env: envList[0].envId},
		data: event_data,
	}).then((result) => {
		callback && callback(result);
	}).catch((e) => {
		console.log(e);
	});
}


export {
	cloudFunctions,
}
