
import { xiaoyao_show_text } from "./utils/data";
import { getUserModel, hideToast, navigateBack, navigateTo, showToast } from "./utils/util";

App({
	onLaunch: function (options) {
		console.log(getUserModel(), "用户手机信息",options,"进入小程序参数");
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力');
		} else {
			wx.cloud.init({
				// env 参数说明：
				//   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
				//   此处请填入环境 ID, 环境 ID 可打开云控制台查看
				//   如不填则使用默认环境（第一个创建的环境）
				// env: 'my-env-id',
				traceUser: true,
			});
		}
	},
	params_into(options) {
		let that = this;
		console.log("分享进入小程序参数", options);
		if (options && options.url) {
			showToast(`${xiaoyao_show_text}`,"loading");
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
