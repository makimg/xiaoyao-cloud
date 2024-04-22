
import {envList} from "./env_list";

const cloudFunctions = (event_data,callback)=>{
	wx.cloud.callFunction({
		name: 'quickstartFunctions',
		config: {env: envList[0].envId},
		data: event_data,
	}).then((result) => {
		callback && callback(result);
		wx.hideLoading();
	}).catch((e) => {
		console.log(e);
		wx.hideLoading();
	});
}


export {
	cloudFunctions,
}
