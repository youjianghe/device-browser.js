/*
#auth:lzf
#20160914
#update:20170719
#更新了Edge的判断，优化了部分代码
#参考了sui关于设备侦测部分
#使用说明
#实例化 var ua = new UaInfo();或者直接使用UaInfo()
#可取值：userAgent,WinPc,MacPc,Unix,Linux,android,AndroidChrome,ipad,ipod,iphone,os,osVersion,Edge,Weixin,Chrome,Firefox,Safari,Maxthon,IE,IE7,IE8,IE9,IE10,IE11
*/
;"use strict";
var UaInfo = function(){
	var nv = navigator,device = device||{},browser = browser||{};
    //====pc设备判断======
    var np = nv.platform;
    device.WinPc = (np == "Win32") || (np == "Windows");
    device.MacPc = (np == "Mac68K") || (np == "MacPPC") || (np == "Macintosh") || (np == "MacIntel");
    device.Unix = (np == "X11") && !device.WinPc && !device.MacPc;
    device.Linux = (String(np).indexOf("Linux") > -1);
    //====移动设备判断======来自sui
    var ua = nv.userAgent;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.Android = true;
        browser.AndroidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    // iOS
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iPhone
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iPhone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.iPad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.iPod = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }
    //=======浏览器判断 =====
    browser.userAgent = ua;
    browser.Edge =/Edge/i.test(ua);
    browser.Weixin = /MicroMessenger/i.test(ua);
    browser.Maxthon = /Maxthon/i.test(ua);
    browser.Chrome = /Chrome/i.test(ua)&&!browser.Edge;
    browser.Firefox = /Firefox/i.test(ua);
    browser.Safari = /Safari/i.test(ua)&&!browser.Edge&&!browser.Chrome;
    browser.IE7 = /MSIE\s7.0/i.test(ua);//
    browser.IE8 = /MSIE\s8.0/i.test(ua);//
    browser.IE9 = /MSIE\s9.0/i.test(ua);//MSIE 9.0
    browser.IE10 = /MSIE\s10.0/i.test(ua);//
    browser.IE11 = /rv:11/i.test(ua);//rv:11
    browser.IE =(/MSIE/i.test(ua)||/rv:11/i.test(ua));
//====assign====合并对象，
//详见https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
//===将browser和device合并
 return Object.assign(browser,device);
//====结束====
}