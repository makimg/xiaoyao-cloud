const getOpenId = require('./getOpenId/index');
const getMiniProgramCode = require('./getMiniProgramCode/index');
const createCollection = require('./createCollection/index');
const selectRecord = require('./selectRecord/index');
const updateRecord = require('./updateRecord/index');
const sumRecord = require('./sumRecord/index');
const fetchGoodsList = require('./fetchGoodsList/index');
const genMpQrcode = require('./genMpQrcode/index');


const xiaoyao_login = require("./xiaoyaoFuntions/login/index");
const xiaoyao_getUserInfo = require("./xiaoyaoFuntions/getUserInfo/index");
const xiaoyao_sendSMS = require("./xiaoyaoFuntions/sendSMS/index");

// 云函数入口函数
exports.main = async (event, context) => {
  let {funName,type,params_data} = event;
  switch (funName){
    case 'xiaoyao_login':
      return await xiaoyao_login.main(event, context);
    case 'xiaoyao_getUserInfo':
      return await xiaoyao_getUserInfo.main(event, context);
    case 'xiaoyao_sendSMS':
      return await xiaoyao_sendSMS.main(event, context);
  }
  switch (type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'getMiniProgramCode':
      return await getMiniProgramCode.main(event, context);
    case 'createCollection':
      return await createCollection.main(event, context);
    case 'selectRecord':
      return await selectRecord.main(event, context);
    case 'updateRecord':
      return await updateRecord.main(event, context);
    case 'sumRecord':
      return await sumRecord.main(event, context);
    case 'fetchGoodsList':
      return await fetchGoodsList.main(event, context);
    case 'genMpQrcode':
      return await genMpQrcode.main(event, context);





    case 'xiaoyao_getUserInfo':
      return await xiaoyao_getUserInfo.main(event, context);
  }
};
        
