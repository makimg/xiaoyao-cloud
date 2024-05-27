
import { envList } from "./env_list";
import { formatDated } from "./util";

const cloudFunctions = (event_data, callback) => {
	let token = wx.getStorageSync("token") || "";
	event_data.params_data = { ...event_data.params_data, token, };
	wx.cloud.callFunction({
		name: 'xiaoyaoFuntions',
		config: { env: envList[0].envId },
		data: event_data,
	}).then((result) => {
		callback && callback(result);
	}).catch((e) => {
		console.log(e);
	});
}

const queryFunction = (collectionName) => {
	// 1. 获取数据库引用
	const db = wx.cloud.database()
	// 2. 构造查询语句
	// collection 方法获取一个集合的引用
	// where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
	// get 方法会触发网络请求，往数据库取数据
	return db.collection(collectionName)
}

const collection_where = (collectionName, whereData) => {
	let promises = new Promise((resolve, reject) => {
		queryFunction(collectionName).where(whereData).get({
			success: function (res) {
				if (res && res.data && res.data.length > 0) {
					console.log(res, "查询成功")
					let resultData = {};
					let resData = res.data[0];
					let resList = [];
					if(whereData.type==="swiper"||whereData.type==="game"){
						resData.list.forEach(element => {
							if(element.allFlag) resList.push(element);
						});
					}
					resultData = {...resData,list:resList};
					resolve(resultData);
				} else {
					console.log(res, "查询失败")
					resolve(res);
				}
			},
			fail: function (err) {
				console.log(err, "请求失败")
				resolve(err);
			}
		})
	})
	return promises;
}

const cloudUpFile = (type,filePath)=>{
	let currentDate = new Date().getTime();
	let cloudPath = `xiaoyao/OCR`;
	let type_str = `others`;
	type_str = type==1?"identity":(type==2?"bank":(type==3?"driving":(type==4?"drivings":(type==7?"business":(type==8?"beOcr":(type==10?"license":"others"))))))
	cloudPath = `${cloudPath}/${type_str}/${formatDated(currentDate,1)}/${formatDated(currentDate,1)}_${currentDate}.png`;
	console.log(cloudPath,filePath);
	let upPromises = new Promise((resolve,reject)=>{
		// 将图片上传至云存储空间
		wx.cloud.uploadFile({
			// 指定上传到的云路径
			cloudPath,
			// 指定要上传的文件的小程序临时文件路径
			filePath,
			// 成功回调
			success: res => {
				console.log('上传成功', res)
				resolve(res)
			},
		})
	})
	return upPromises;
}

export {
	cloudFunctions,
	collection_where,
	cloudUpFile,
}
