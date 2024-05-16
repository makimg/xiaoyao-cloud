
import { xiaoyao_show_text } from "./utils/data";
import { getUserModel, hideToast, initCloudMain, navigateTo, showToast } from "./utils/util";
import { cloudFunctions } from "./utils/util_cloud";

App({
	onLaunch: function (options) {
		wx.cloud.init({traceUser: true,});
		console.log(getUserModel(), "用户手机信息",options,"进入小程序参数");
	},
	params_into(options) {
		let that = this;
		console.log("分享进入小程序参数", options);
		if (options && options.url) {
			showToast(`${xiaoyao_show_text}`,"loading",20000);
			// 小程序的分享-从首页做中转
			let { url } = options;
			let resultPath: any = null;
			if (url.indexOf("-") >= 0) {
				// 携带参数
				let url_array = url.split("-");
				url_array.forEach((element, el_index) => {
					if (el_index === 0) {
						resultPath = `${element}?`;
					} else {
						let params_array = element.split(".");
						let params_url = `${params_array[0]}=${params_array[1]}`;
						resultPath = el_index===1?`${resultPath}${params_url}`:`${resultPath}&${params_url}`;
					}
				});
				console.log("最终落地页路径及参数", resultPath);
			} else {
				// 未携带参数

			}
			hideToast(()=>{
				navigateTo(resultPath);
			})
		} else if (options && options.sence) {
			// 小程序码、短链接等
		} else {
			// 未做处理
		}
	},
	globalData: {
		...getUserModel().needWinDowInfo,
	}
});
