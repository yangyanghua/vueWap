# 码上花wap

> 码上花：登录、注册、商品详情、订单结算、支付、个人中心。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8098
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
# 关于适配

## 像素会自动转换成rem
     现设计稿是750px，既根据设计稿给的大小来开发，如设计稿按钮 宽600，高80，样式里写 {width:600px;height:80px;}即可。

## 若不想转成rem  
    若不想将px转换成rem,属性后添加：/*no*/ 即可，如：border-bottom: 1px dashed #999999;/*no*/；

## 关于字体
    字体大小用 @include fontsz(18px); 
## 图标
    图标采用 1、2、3倍图适配，图标命名：1倍图用原名，2倍图原名+“_2x.png”,3倍图原名+“_3x.png”，如“wx.png，wx__2x.png，wx__3x.png，”；	
    实际写法： @include icon(150px, 150px, '../../assets/images/home_pic1', '.jpg');

## assets 目录下有个rename.js文件，是用于统一重名图片的，将ui切图考到images文件夹下，打开控制台，运行rename，即可统一重命名图片为以上格式。    
    
```    
具体可参考 项目(git@192.168.5.251:yanghua/zcode-guanwang-wap.git)；

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
