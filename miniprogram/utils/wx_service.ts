
const service_list = [
	{
		serviceName: "多语言翻译",
		api: "multilingualMT",
		service: "wxf5c22ebbe4ed811e",
	},
	{
		serviceName: "OCR识别",
		api: "OcrAllInOne",
		service: "wx79ac3de8be320b71",
	}
]
const multilingualMT_list = [
	{toLang:"zh_CN",name:"中文（简体）"},
	{toLang:"zh_TW",name:"中文（繁体）"},
	{toLang:"en",name:"英语"},
	{toLang:"ko",name:"韩语"},
	{toLang:"ja",name:"日语"},];
const serviceMarket = (serviceAPI,serviceData,callback)=>{
	let service_info:any = [],serviceAPI_obj={};
	service_info = service_list.findIndex(x=>{return x.api===serviceAPI});
	if(service_info>=0) {
		let {service,api} = service_list[service_info];
		serviceAPI_obj = {service,api};
	}
	console.log(serviceAPI_obj,serviceData)
	wx.serviceMarket.invokeService({
		...serviceAPI_obj,
		data: serviceData,
	}).then(res => {
		console.log('invokeService success', res)
		callback && callback(res)
	}).catch(err => {
		console.error('invokeService fail', err)
		callback && callback(err)
	})
}
const serviceCDN = (filePath)=>{
	return new wx.serviceMarket.CDN({type: 'filePath',filePath,})
}
export {
	serviceMarket,
	multilingualMT_list,
	serviceCDN,
}
