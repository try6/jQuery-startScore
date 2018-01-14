# 星级评分jQuery-starScore小插件
###### 效果图

![GIF.gif](http://upload-images.jianshu.io/upload_images/2865721-c94489a42421afd9.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 插件说明
1. 为实现效果使用了三种开发方式放，以method命名分为三个文件夹，其中后两种封装为了JQuery插件
2. 第2种方式以点亮整个图标为阶梯
3. 第3种方式是第2种的升级版本，以点亮半个图标为阶梯

###### 使用说明
1. 依赖Jquery
2. 引入jQuery-starScore-entire.js.js
3. 初始化图标，调用插件
```
rating.init('.rating1', {
	mode: 'LightHalf',     //模式选择，LightHalf/LightEntire
	num: 2.5,              //初始化点亮颗数，最小为0，以0。5为阶梯 
});
```
