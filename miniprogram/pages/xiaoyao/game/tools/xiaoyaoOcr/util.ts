import { serviceCDN, serviceMarket } from "../../../../../utils/wx_service"

const newOCR = (ocrInfo,callback)=>{
	let ocr_obj = {img_url: serviceCDN(ocrInfo.filePath),data_type: 3,ocr_type: ocrInfo.ocr_type};
	serviceMarket("OcrAllInOne",ocr_obj,(res)=>{
		console.log("识别结果",res);
		callback && callback(res);
	})
}

export {newOCR}