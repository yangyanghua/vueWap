
let httpService = '';
let SKUService = '';
let purchaseService = '';
var currentHost = location.host;

/*陈杰 ip 192.168.9.247:8383*/
if (currentHost == '192.168.9.243:8383' || currentHost == 'localhost:8383' || currentHost == '192.168.9.247:8383' || currentHost == '192.168.9.76:8091' || currentHost == '192.168.9.76:8383') {


   // SKUService = 'http://192.168.9.202:8094'; //王昌晶(sku)
   // httpService = 'http://192.168.9.202:8291'; //王昌晶(商品详情)
   // httpService = 'http://192.168.9.241:8080'; //淼洁
   // purchaseService = 'http://192.168.9.206:8080';// 陈瑞栋
   // httpService = "http://192.168.9.250:8080"; //杨顺
    
    SKUService = 'http://tsgapp-api.iflashbuy.com:8383' //旧接口测试
 
  	// httpService = 'http://tmall.iflashbuy.com:8383'; //王昌晶(sku)

	// SKUService = 'http://192.168.9.206:8081'; // //旧接口开发	
	
} else if ((currentHost == 'tmsh-m.z-code.cn:8383')||(currentHost == 'tm.z-code.cn:8383')) {


   SKUService = 'http://tsgapp-api.iflashbuy.com:8383';

} else if (currentHost == 'm.z-code.cn') {
httpService = 'http://website-api.z-code.cn'; //生產
}

export const deltailPro = '/iflashbuy/rest/queryform/'; //商品详情
export const deltailSku =SKUService+ '/front/api/v1/product/getByProductId'; //商品sku
export const purchase =  '/iflashbuy/rest/settle/doSettleH5';//一键购买
export const chectProduct = '/iflashbuy/rest/shopcart/v2/checkProductH5'; // 查询商品库存


// export const deltailPro = purchaseService+'/iflashbuy/rest/queryform/'; //商品详情
// export const deltailSku = '/front/api/v1/product/getByProductId'; //商品sku
// export const purchase = purchaseService + '/iflashbuy/rest/settle/doSettleH5';//一键购买


export const login = SKUService + '/front/api/v1/customer/webLogin'; //登录接口

export const msettleOrder = '/iflashbuy/rest/settle/getSettleOrderFromCacheH5'; //设置订单
export const settleOrder ='/iflashbuy/rest/settle/getSettleOrderFromCache'; //设置订单
export const regOrder = '/iflashbuy/rest/orderData/order'; //提交订单

export const getRegion = '/iflashbuy/rest/region/getRegionH5'; //获取省市区
export const getAddressList ='/iflashbuy/rest/address/getAddressListH5'; //获取地址列表
export const deleteAddr = '/iflashbuy/rest/address/deleteAddrH5'; //删除地址
export const addAddr = '/iflashbuy/rest/address/doSaveAddrH5'; //新增地址
export const updateAddr ='/iflashbuy/rest/address/updateAddrH5'; //更新地址
export const setdefault ='/iflashbuy/rest/address/setdefaultH5'; //设置默认地址
export const getAddbuyId = '/iflashbuy/rest/address/toUpdateAddrH5'; //根据id查询地址信息接口
export const doSelectAdd = '/iflashbuy/rest/settle/addr/doSelectH5'; //选择地址
export const getCustomerOrderList = SKUService +'/front/api/v1/order/getCustomerOrderList'; //个人中心

export const getMobileVerifyCode = SKUService+ '/front/api/v1/customer/getMobileVerifyCode'; //获取手机验证码
export const register = SKUService + '/front/api/v1/customer/webRegister'; //注册接口
export const changePsw = SKUService + '/front/api/v1/customer/changePsw'; //找回密码


