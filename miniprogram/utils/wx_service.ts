
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
	{tolang:"zh_CN",name:"中文（简体）"},
	{tolang:"zh_TW",name:"中文（繁体）"},
	{tolang:"en",name:"英语"},
	{tolang:"ko",name:"韩语"},
	{tolang:"ja",name:"日语"},];
const serviceMarket = (serviceAPI,serviceData,callback)=>{
	let service_info:any = [],serviceAPI_obj={};
	service_info = service_list.findIndex(x=>{return x.api===serviceAPI});
	if(service_info>=0) {
		let {service,api} = service_list[0];
		serviceAPI_obj = {service,api};
	}
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
export {serviceMarket,multilingualMT_list}