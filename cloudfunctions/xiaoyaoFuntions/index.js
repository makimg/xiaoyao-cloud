
const xiaoyao_login = require("./login/index");
const xiaoyao_getUserInfo = require("./getUserInfo/index");
const xiaoyao_sendSMS = require("./sendSMS/index");
// 云函数入口函数
exports.main = async (event, context) => {
  let {funName} = event;
  switch (funName){
    case 'xiaoyao_login':
      return await xiaoyao_login.main(event, context);
    case 'xiaoyao_getUserInfo':
      return await xiaoyao_getUserInfo.main(event, context);
    case 'xiaoyao_sendSMS':
      return await xiaoyao_sendSMS.main(event, context);
  }
};
        
