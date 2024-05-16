import { cloudFunctions } from "./util_cloud"

const formatTime = (date: Date) => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return (
		[year, month, day].map(formatNumber).join('/') +
		' ' +
		[hour, minute, second].map(formatNumber).join(':')
	)
}

const formatNumber = (n: number) => {
	const s = n.toString()
	return s[1] ? s : '0' + s
}






// get请求
function getWxRequest(url: any, data: {} | undefined, isNeedLoading: boolean | undefined) {
	let contentType = "application/json";
	return wxRequest(url, data, isNeedLoading, "GET", 60000, contentType);
}
// post请求
function postWxRequest(url: any, data: {} | undefined, isNeedLoading: boolean) {
	let contentType = "application/x-www-form-urlencoded";
	return wxRequest(url, data, isNeedLoading = false, "POST", 60000, contentType);
}

//封装请求
function wxRequest(url: any, data = {}, isNeedLoading = false, method: string, timeout: number, contentType: string) {
	console.log(data);
	if (isNeedLoading) showToast("小默在努力搬砖...", "none", 20000);
	let promiseData = new Promise((resolve, reject) => {
		wx.request({
			url,
			data,
			header: { "content-type": contentType, },
			method,
			timeout,
			dataType: 'json',
			forceCellularNetwork: true,
			success(res) {
				if (isNeedLoading) hideToast();
				let { statusCode } = res;
				switch (statusCode) {
					case 200:
						resolve(res.data);
						break;
					default:
						reject(res.data);
						break;
				}
			},
			fail() {
				showToast(`小默正在开小差儿...`, "none", 2000);
			}
		})
	})
	return promiseData;
}

// 页面路由========================================================================
function navigateTo(url: any) {
	wx.navigateTo({
		url,
	})
}

function redirectTo(url: any) {
	wx.redirectTo({
		url,
	})
}

function navigateBack(delta: any) {
	wx.navigateBack({
		delta,
	})
}

function reLaunch(url: any) {
	wx.reLaunch({
		url,
	})
}

function switchTab(url: any) {
	wx.switchTab({
		url,
	})
}


// 页面交互状态 =============================================================================
//显示toast状态
function showToast(title: string, icon: string, duration: number | undefined) {
	wx.showToast({ title, icon, mask: true, duration: duration ? duration : 60000 })
}

//隐藏toast状态
function hideToast(callback: { (): void; (): any } | undefined) {
	let show_timeout: any = null;
	if (callback) {
		show_timeout = setTimeout(() => {
			wx.hideToast({
				success() {
						callback && callback();
						clearTimeout(show_timeout)
				}
			})
		}, 800);
	} else {
		wx.hideToast()
	}
}

//页面滚动
function pageScrollTo(selector: any, callBack: (arg0: WechatMiniprogram.GeneralCallbackResult) => any, duration: any) {
	wx.pageScrollTo({
		selector,
		duration: duration ? duration : 300,
		success: function (res) {
			return callBack(res);
		}
	})
}

//设置页面title
function setNavigationBarTitle(title: any) {
	wx.setNavigationBarTitle({
		title,
	})
}


// 函数防抖（debounce）：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
function debounce(func: { apply: (arg0: any, arg1: any[]) => void }, delay: number | undefined) {
    let timer: number;
    return function (...args: any) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
// 函数节流（throttle）：每隔一段时间，只执行一次函数。
// const throttle = (fn: { (): void; (): { (): any; new(): any; apply: { (arg0: undefined, arg1: any): void; new(): any } } }, delay: number | undefined) => {
// 	let timer:any = null;
// 	let that = this;
// 	return (args: any) => {
// 			if (timer) return;
// 			timer = setTimeout(() => {
// 					fn().apply(that, args);
// 					timer = null;
// 			}, delay);
// 	}
// }

function throttle(func: { apply: (arg0: any, arg1: any[]) => void }, delay: number) {
	let lastTime = 0;
	return function (...args: any) {
		const now = new Date().getTime();
		if (now - lastTime >= delay) {
			func.apply(this, args);
			lastTime = now;
		}
	};
}

// 使用函数节流防止重复点击
function throttle2(fn: { apply: (arg0: any, arg1: IArguments) => void }, gapTime: number | null | undefined) {
	if (gapTime == null || gapTime == undefined) {
		gapTime = 1000
	}
	let _lastTime: number | null = null
	// 返回新的函数
	return function () {
		let _nowTime = + new Date()
		if (_nowTime - _lastTime > gapTime || !_lastTime) {
			fn.apply(this, arguments)   //将this和参数传给原函数
			_lastTime = _nowTime
		}
	}
}



// 文件====================================================================
//通过下载文件获取微信返回的临时文件地址 以便后续查看文件
function mkDownloadFile(url: any, callBackSucc: (arg0: WechatMiniprogram.DownloadFileSuccessCallbackResult) => void, loadingFlag = true) { //处理文件
	if (loadingFlag) showToast("文件处理中", "none", 20000);
	wx.downloadFile({
		url, //仅为示例，并非真实的资源
		success(res) {
			// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
			if (res.statusCode === 200) {
				if (loadingFlag) hideToast();
				console.log(res, "res")
				return callBackSucc(res);
			} else {
				console.log(res, "error")
				showToast("文件处理失败，请稍后重试", "none", 2000);
				return;
			}
		},
		fail(error) {
			if (error.errMsg && error.errMsg != "") {
				showToast("文件处理失败，请稍后重试", "none", 2000);
			}
		}
	})
}

// 查看微信返回临时地址的文件
function mkOpenDocument(filePath: any, showMenu: any) {
	wx.openDocument({
		filePath,
		showMenu: showMenu ? showMenu : false,
		success: function (res) {
			hideToast();
			console.log('打开文档成功')
			return;
		}
	})
}

// 图片预览==========================================================
function previewImage(current_url: any, urls: any) {
	wx.previewImage({
		current: current_url,
		urls: urls,
	})
}

// 剪贴板
function setClipboardData(data: any, callBack: (arg0: string) => any) {
	wx.setClipboardData({
		data,
		success(resData) {
			wx.getClipboardData({
				success(res) {
					callBack && callBack(res.data);
				}
			})
		}
	})
}

//小默微服务
function moreCodeMarket(apiUrl: any, dataObj: any, callback: (arg0: any) => any, serviceUrl: any) {
	showToast("小默正在识别", "none", 20000);
	wx.serviceMarket.invokeService({
		service: serviceUrl || 'wxcae50ba710ca29d3', // 'wx_mp_appid',
		api: apiUrl,
		data: dataObj,
	}).then((res: { data: { err_code: number; data_list: any; err_msg: any } }) => {
		console.log('invokeService success', res)
		if (res.data && res.data.err_code == 0) {
			showToast("识别成功", "none", 1500);
			return callback && callback(res.data.data_list);
		}
		showToast(res.data.err_msg || "服务器异常", "none", 1500);
	}).catch((err: any) => {
		console.error('invokeService fail', err);
		showToast("服务器异常", "none", 1500);
	})
}

//随机生成rgb格式的色值
function randomRgbColor(filterNums = 1) {
	const r = Math.floor(255 * Math.random())
	const g = Math.floor(255 * Math.random())
	const b = Math.floor(255 * Math.random())
	let colorStr = `rgb(${r}, ${g}, ${b})`;
	if (filterNums != 1) colorStr = `rgba(${r}, ${g}, ${b},.${filterNums})`;
	return colorStr;
}

//全局事件订阅发布管理
function eventBugs() {
	const eventMap = new Map();
	let eventOn = (action: any, event: any) => {
		if (eventMap && !eventMap.has(action)) eventMap.set(action, event);
	};
	let eventOff = (action: any) => {
		if (eventMap && !eventMap.has(action)) eventMap.delete(action);
	};
	let eventEmit = (action: any, arg: any) => {
		if (eventMap && !eventMap.has(action)) eventMap.get(action) && eventMap.get(action)(arg);
	};
	return { eventOn, eventOff, eventEmit };
}
// 获取用户手机信息
function getUserModel() {
	const deviceInfo = wx.getDeviceInfo();
	const windowInfo = wx.getWindowInfo();
	let capsule = wx.getMenuButtonBoundingClientRect();
	let { statusBarHeight } = windowInfo;
	let modelInfo: any = { deviceInfo, windowInfo };
	let needWinDowInfo: any = { StatusBar: statusBarHeight };
	if (capsule) {
		let { bottom, top } = capsule;
		needWinDowInfo["Custom"] = capsule;
		needWinDowInfo["CustomBar"] = (bottom + top) - statusBarHeight;
	} else {
		needWinDowInfo["CustomBar"] = statusBarHeight + 50;
	}
	modelInfo["needWinDowInfo"] = needWinDowInfo;
	return modelInfo;
}
// 封装分享
function xiaoyao_share(share_obj: { path: string }) {
	let xiaoyao_token = wx.getStorageSync("token");
	let home_path = `/pages/xiaoyao/home/index?url=`;
	share_obj.path = `${home_path}${share_obj.path}&token=${xiaoyao_token}`;
	return share_obj;
}
// 手机号校验
function validatePhoneNumber(phoneNumber: string) {  
	// 定义手机号正则表达式  
	const phoneRegex = /^1[3456789]\d{9}$/;
	let phone_flag = false;  
	// 使用test方法检查手机号是否符合格式  
	if(phoneRegex.test(phoneNumber)) phone_flag = true;
	console.log(`手机号格式${phone_flag?'正确':'错误'}`);  
	return phone_flag;
}  

// 帐号是否合法(字母开头，允许6-12字节，允许字母数字)：
function mottoAccoutCheck(mottoAccout){
	return /^[a-zA-Z][a-zA-Z0-9]{6,12}$/.test(mottoAccout);
}

// 密码(以字母开头，长度在6~15之间，只能包含字母、数字和下划线)：
function mottoPassWordCheck(mottoPassWord){
	return /^[a-zA-Z]\w{6,15}$/.test(mottoPassWord);
}

// 强密码(必须包含大写字母，小写字母的组合，长度在6-18之间，只能包含字母和数字)：
function mottoPassWordMaxCheck(mottoPassMaxWord){
	return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,18}$/.test(mottoPassMaxWord);
}

// 密码强度检测
function checkPasswordStrength(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[\W_]/.test(password);
  // 密码长度
  const lengthBonus = password.length >= minLength ? 10 : (password.length > 5) ? 5 : 0;
  // 大小写字母、数字、特殊字符
  const caseBonus = hasUpperCase && hasLowerCase ? 10 : 0;
  const numberBonus = hasNumbers ? 10 : 0;
  const specialCharBonus = hasSpecialChars ? 10 : 0;
  // 总分
  const totalScore = lengthBonus + caseBonus + numberBonus + specialCharBonus;
  // 强度等级
  // const strengthLevels = ['弱', '中', '强'];
	// const strengthLevel = totalScore > 30 ? strengthLevels[2] : (totalScore > 15 ? strengthLevels[1] : strengthLevels[0]);
	return totalScore;
}

const chooseMediaFile = (count,callback)=>{
	wx.chooseMedia({
		count,
		mediaType: ['image'],
		sourceType: ['album', 'camera'],
		camera: 'back',
		success(res) {
			console.log(res.tempFiles[0].tempFilePath)
			console.log(res.tempFiles[0].size)
			callback && callback(res);
		}
	})
}

//时间戳转化为日期
function formatDated(timeStr, nums,flag=false) {
  if (typeof (timeStr) == 'undefined') {
    return ''
  } else {
    let date = new Date(parseInt(timeStr))
    let y:any = date.getFullYear()
    let MM:any = date.getMonth() + 1
    MM = MM < 10 ? ('0' + MM) : MM
    let d:any = date.getDate()
    if(nums!=10) d = d < 10 ? ('0' + d) : d
    let h:any = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let m:any = date.getMinutes()
    m = m < 10 ? ('0' + m) : m
    let s:any = date.getSeconds()
    s = s < 10 ? ('0' + s) : s
    let showStr;
    if(nums&&nums===14){
      showStr = flag?":":"-";
      return `${MM}${showStr}${d}`;
    } else if (nums && nums === 13) {
      showStr = "-";
      return `${y}${showStr}${MM}${showStr}${d} ${h}${showStr}${m}`;
    } else if (nums && nums === 1) {
      showStr = "-";
      return `${y}${showStr}${MM}${showStr}${d}`;
    } else if (nums && nums === 2) {
      showStr = "/";
      return `${y}${showStr}${MM}${showStr}${d}`;
    } else if (nums && nums === 3) {
      showStr = "-";
      return `${y}${showStr}${MM}${showStr}${d} ${h}${showStr}${m}${showStr}${s}`;
    } else if (nums && nums === 4){
      showStr = ":";
      return `${m}${showStr}${s}`;
    } else if (nums && nums === 45){
      showStr = ":";
      return `${h}${showStr}${m}`;
    } else if (nums && nums === 5){
      showStr = "-";
      return `${y}${showStr}${MM}`;
    } else if (nums && nums === 6){
      showStr = ".";
      if(flag) showStr = "-"
      return `${y}${showStr}${MM}${showStr}${d} ${h}:${m}`;
    } else if (nums && nums === 7){
      showStr = ".";
      return `${y}${showStr}${MM}${showStr}${d}`;
    } else if (nums && nums===8){
      return {year:`${parseInt(y)}`,month:`${parseInt(MM)}`,date:`${parseInt(d)}`};
    } else if (nums && nums===9){
      showStr = ".";
      return `${y}${showStr}${MM}${showStr}${d} ${h}:${m}:${s}`;
    } else if (nums && nums===10){
      return parseInt(timeStr/1000/60/60/24);
    }
  }
}

//日期转化为时间戳
function formatDate(dateStr) {
  dateStr = dateStr.replace(/-/g,"/");
  console.log(`需要转化为时间戳的日期${dateStr}`);
  let date = new Date(dateStr); // 有三种方式获取 // date.getTime(); // date.valueOf(); // Date.parse(date);
  return date.getTime();
}

function handelCloudImagePath(fileName,imgUrl=""){
	if(!imgUrl||imgUrl==""||imgUrl==undefined) return "";
	let DOMAIN = wx.getStorageSync("DOMAIN");
	let cloudDomain:any = null;
	if(DOMAIN&&DOMAIN!=undefined&&DOMAIN!=null&&DOMAIN!=""){
		cloudDomain = DOMAIN.cloudDomain;
	} else {
		let resultData:any = initCloudMain();
		cloudDomain = resultData.cloudDomain;
	}
	let IMGDOMAIN = `https://7369-${cloudDomain}-1259633115.tcb.qcloud.la/xiaoyao/${fileName}`;
	let resultImagePath = `${IMGDOMAIN}/${imgUrl}`;
	return resultImagePath;
}

async function initCloudMain(){
	let event_data = {funName:"xiaoyao_getCloudDomain",params_data:{}};
	return await new Promise((resolve)=>{
		cloudFunctions(event_data,resultData=>{
			console.log(resultData,"888888");
			if(resultData&&resultData.result){
				wx.setStorageSync("DOMAIN",resultData.result);
				resolve(resultData.result)
			}
		})
	})
}
export {
	formatTime,
	getWxRequest,
	postWxRequest,
	wxRequest,
	navigateTo,
	redirectTo,
	navigateBack,
	reLaunch,
	switchTab,
	showToast,
	hideToast,
	pageScrollTo,
	setNavigationBarTitle,
	debounce,
	throttle,
	throttle2,
	mkDownloadFile,
	mkOpenDocument,
	previewImage,
	setClipboardData,
	moreCodeMarket,
	randomRgbColor,
	eventBugs,
	getUserModel,
	xiaoyao_share,
	validatePhoneNumber,
	mottoAccoutCheck,
	mottoPassWordCheck,
	mottoPassWordMaxCheck,
	checkPasswordStrength,
	chooseMediaFile,
	formatDated,
	formatDate,
	handelCloudImagePath,
	initCloudMain,
}