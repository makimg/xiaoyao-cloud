

1: ID card; 1：身份证；
2: Bank card; 2：银行卡；
3: Driving license; 3：行驶证；
4: Driver's license; 4：驾驶证；
7: Business license; 7：营业执照；
8: Universal OCR; 8：通用OCR;
10: car-card-license 10: 车牌识别;


服务接口
API OcrAllInOne
Service ID wx79ac3de8be320b71
接口调用说明
详细说明
API
API 均在 wx.serviceMarket 对象下。

invokeService
调用服务提供商提供的 API

入参

接收一个对象，对象下有如下定义的字段：
````
字段名	类型	必填	默认值	说明
img_data	string	是（与img_url二选一）		图片
img_url	string	是（与img_data二选一）		图片
data_type	int	是		1：二进制；2：base64字符串；3：图片url
ocr_type	int	是		1：身份证；2：银行卡；3：行驶证；4：驾驶证；7：营业执照；8：通用OCR ; 10: 车牌识别
在 img_url 字段中，如需传递本地大数据（文件、Buffer 等），请搭配使用 CDN 方法对相应值标记，对被 CDN 标记的值，会在调用给服务提供方时自动转换成 CDN URL，服务提供方在这些字段获取到的也将是可下载的 CDN URL。
````
返回值
````
字段名	类型	必填	默认值	说明
idcard_res	Object	是		身份证的返回结果
bankcard_res	Object	是		银行卡的返回结果
driving_res	Object	是		行驶证的返回结果
driving_license_res	Object	是		驾驶证的返回结果
biz_license_res	Object	是		营业执照的返回结果
ocr_comm_res	Object	是		通用OCR的返回结果
plate_comm_res	Object	是		车牌识别的返回结果
````
##车牌plate_comm_res
````
{
    "image_height": 683,
    "image_width":1080,
    "debug_info":"{\"text\":\"\\u4eacA33333\",\"score\":0.99999999999999999}",
    "number":{
    "text":"京A33333"}
}
````
##身份证idcard_res
###正面：
    ````
    {
        "type": 0, //正面
        "name": {"text": "张三"}, //姓名
        "id": {"text": "123456789012345678"}, //身份证号码
        "address": {"text": "广东省广州市XXX"}, //住址
        "gender": {"text": "男"}, //性别
        "nationality": {"text": "汉"} //民族
    }
    ````
###背面：
    ````
    {
        "type": 1, //背面
        "valid_date": {"text": "20171025-20271025"} //有效期
    }
    ````
##银行卡bankcard_res
````
{
    "number": {"text": "1234567890"} //银行卡号
}
````
##行驶证driving_res
````
{
    "plate_num": {"text": "粤xxxxx"}, //车牌号码
    "vehicle_type": {"text": "小型普通客车"}, //车辆类型
    "owner": {"text": "东莞市xxxxx机械厂"}, //所有人
    "addr": {"text": "广东省东莞市xxxxx号"}, //住址
    "use_character": {"text": "非营运"}, //使用性质
    "model": {"text": "江淮牌HFCxxxxxxx"}, //品牌型号
    "vin": {"text": "LJ166xxxxxxxx51"}, //车辆识别代号
    "engine_num": {"text": "J3xxxxx3"}, //发动机号码
    "register_date": {"text": "2018-07-06"}, //注册日期
    "issue_date": {"text": "2018-07-01"}, //发证日期
    "plate_num_b": {"text": "粤xxxxx"}, //车牌号码
    "record": {"text": "441xxxxxx3"}, //号牌
    "passengers_num": {"text": "7人"}, //核定载人数
    "total_quality": {"text": "2700kg"}, //总质量
    "prepare_quality": {"text": "1995kg"} //整备质量
    "overall_size": {"text": "4582x1795x1458mm"} //外廓尺寸
}
````
##驾驶证drivinglicense_res
````
{
    "id_num": {"text": "660601xxxxxxxx1234" }, //证号
    "name": {"text": "张三" }, //姓名
    "sex": {"text": "男" }, //性别
    "nationality": {"text": "中国" }, //国籍
    "address": {"text": "广东省东莞市xxxxx号" }, //住址
    "birth_date": {"text": "1990-12-21" }, //出生日期
    "issue_date": {"text": "2012-12-21" }, //初次领证日期
    "car_class": {"text": "C1" }, //准驾车型
    "valid_from": {"text": "2018-07-06" }, //有效期限起始日
    "valid_to": {"text": "2020-07-01" }, //有效期限终止日
    "official_seal": {"text": "xx市公安局公安交通管理局" } //印章文字
}
````
##营业执照biz_license_res
````
{
    "reg_num": {"text": "123123" }, //注册号
    "serial": {"text": "123123" }, //编号
    "legal_representative": {"text": "张三" }, //法定代表人姓名
    "enterprise_name": {"text": "XX饮食店" }, //企业名称
    "type_of_organization": {"text": "个人经营" }, //组成形式
    "address": {"text": "XX市XX区XX路XX号"}, //经营场所/企业住所
    "type_of_enterprise": {"text": "xxx" }, //公司类型
    "business_scope": {"text": "中型餐馆(不含凉菜、不含裱花蛋糕，不含生食海产品)。" }, //经营范围
    "registered_capital": {"text": "200万" }, //注册资本
    "paid_in_capital": {"text": "200万" }, //实收资本
    "valid_period": {"text": "2019年1月1日" }, //营业期限
    "registered_date": {"text": "2018年1月1日" } //注册日期/成立日期
}
````
##通用OCR ocr_comm_res
````
{
    "items": [ //识别结果
        {
            "text": "腾讯", 
            "pos": {
                "left_top": {
                    "x": 575, 
                    "y": 519
                }, 
                "right_top": {
                    "x": 744, 
                    "y": 519
                }, 
                "right_bottom": {
                    "x": 744, 
                    "y": 532
                }, 
                "left_bottom": {
                    "x": 573, 
                    "y": 532
                }
            }
        }, 
        {
            "text": "微信团队", 
            "pos": {
                "left_top": {
                    "x": 670, 
                    "y": 516
                }, 
                "right_top": {
                    "x": 762, 
                    "y": 517
                }, 
                "right_bottom": {
                    "x": 762, 
                    "y": 532
                }, 
                "left_bottom": {
                    "x": 670, 
                    "y": 531
                }
            }
        }
    ]
}
````
示例代码

从手机选择图片后，调用 OCR 服务
````
    wx.serviceMarket.invokeService({
      service: 'wx79ac3de8be320b71', // '固定为服务商OCR的appid，非小程序appid',
      api: 'OcrAllInOne',
      data: {
        img_url: "http://www.example.com/xxx.jpg",
        data_type: 3,
        ocr_type: 1,
      },
    }).then(res => {
      console.log('invokeService success', res)
      wx.showModal({
        title: 'cost',
        content: (Date.now() - d) + '',
      })
    }).catch(err => {
      console.error('invokeService fail', err)
      wx.showModal({
        title: 'fail',
        content: err + '',
      })
    })
  }
  ````
CDN
在使用 invokeService 时，如需传递大数据（文件，Buffer，...）时，请使用 CDN 对相关值进行标记，标记后会自动将值上传到 CDN 并转换成 CDN URL 给到服务提供方，使用该方法可以在大数据情况下提升调用效率。CDN 方法可以接收三种参数类型：

String
ArrayBuffer
文件路径定义对象
当使用文件路径定义对象时，将在调用服务 API 时自动将相应文件路径对应的文件内容上传至 CDN 并转换成 CDN URL，对象定义如下：

字段名	类型	必填	默认值	说明
type	String	是		定义对象的类型，必填 filePath
filePath	String	是		文件路径
