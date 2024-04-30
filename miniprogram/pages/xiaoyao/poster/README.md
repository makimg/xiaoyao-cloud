参数列表
参数	类型	是否必传	注释
btnImg	String	否	按钮图片
btnText	String	否	按钮文字
layoutType	Number	是	海报类型，参数0-5，默认为0，具体样式参考下文
bgColor	String	是	海报背景色，例如（#ffffff）,默认为#ffffff，当layoutType = 5时，背景色最好使用和白色相反的颜色
imgData	Object	是	海报内容图片，图片宽高参考下文，参数：{path: '', width: 0, height: 0}，path必须为wx.getImageInfo返回的图片本地路径
shopData	Object	是	门店名称，参数：{text: '', color: ''}
titleData	Object	是	标题名称，参数：{text: '', color: ''}，当layoutType = 5时，该文字颜色会强制使用bgColor
userImg	String	是	分享用户头像，必须为wx.getImageInfo返回的图片本地路径
userName	Object	是	分享用户昵称，参数：{text: '', color: ''}
codeImg	Object	是	小程序太阳码，参数：{path: '', width: 0, height: 0}，path必须为wx.getImageInfo返回的图片本地路径
tipsData	Object	是	太阳码底部提示语，参数：{text: '', color: ''}
logoImg	Object	否	当layoutType = 5时，该参数必传，logo图，必须为wx.getImageInfo返回的图片本地路径
logoTitle	Object	否	当layoutType = 5时，该参数必传，logo图下方提示语，参数：{text: '', color: ''}
海报格式--layoutType
layoutType = 0 ,海报内容图片宽高为: 688*932
layoutType = 1 ,海报内容图片宽高为: 688*688
layoutType = 2 ,海报内容图片宽高为: 648*648
layoutType = 3 ,海报内容图片宽高为: 800*488
layoutType = 4 ,海报内容图片宽高为: 800*488
layoutType = 5 ,海报内容图片宽高为: 608*430