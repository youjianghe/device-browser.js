/*
@20160914
@参考了sui关于设备侦测部分
 */
var UaInfo = function(){
    //抄自sui的设备侦测
    "use strict";
    var device = {
    	os:null,
    	osVersion:null,
		isAndroid:false,
		isiPad:false,
		isiPhone:false,
		isiOS:false,
		isWinPhone:false,
		isWinPc:false,
		isMacPc:false,
		isUnix:false,
		isLinux:false
		//IsDebug:false
    };
    var browser = {
    	userAgent:null,
    	isWeixin:false,
    	isChrome:false,
    	isAndroidChrome:false,
    	isisFirefox:false,
    	isIE:false,
    	isIE7:false,
    	isIE8:false,
    	isIE9:false,
    	isIE10:false
    }
    //====pc设备判断======
    var np = navigator.platform;
    device.isWinPc = (np == "Win32") || (np == "Windows");
    device.isMacPc = (np == "Mac68K") || (np == "MacPPC") || (np == "Macintosh") || (np == "MacIntel");
    device.isUnix = (np == "X11") && !isWin && !isMac;
    device.isLinux = (String(np).indexOf("Linux") > -1);
    //====移动设备判断======来自sui
    var ua = navigator.userAgent;
    browser.userAgent = ua;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.isAndroid = true;
        browser.isAndroidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    // iOS
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.isiOS = true;
    }
    // iPhone
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.isiPhone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.isiPad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.isiPod = true;
    }
    // iOS 8+ changed UA
    if (device.isiOS && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }
    //=======浏览器判断 =====
    browser.isWeixin = /MicroMessenger/i.test(ua);
    browser.isChrome = /Chrome/i.test(ua);
    browser.isFirefox = /Firefox/i.test(ua);
    browser.isIE7 = /MSIE\s7.0/i.test(ua);//
    browser.isIE8 = /MSIE\s8.0/i.test(ua);//
    browser.isIE9 = /MSIE\s9.0/i.test(ua);//MSIE 9.0
    browser.isIE10 = /MSIE\s10.0/i.test(ua);//
    browser.isIE11 = /MSIE\s10.0/i.test(ua);//
    browser.isIE11 = /rv:11/i.test(ua);//rv:11
    browser.isIE =(/MSIE/i.test(ua)||/rv:11/i.test(ua));
    //browser.isIE12 = /rv:11/i.test(ua);//rv:11

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
/*
使用说明
实例化 var ua = new UaInfo();或者直接使用UaInfo().
{
	os:null,
	osVersion:null,
	isAndroid:false,
	isiPad:false,
	isiPhone:false,
	isiOS:false,
	isWinPhone:false,
	isWinPc:false,
	isMacPc:false,
	isUnix:false,
	isLinux:false,
	userAgent:null,
	isWeixin:false,
	isChrome:false,
	isAndroidChrome:false,
	isisFirefox:false,
	isIE:false,
	isIE7:false,
	isIE8:false,
	isIE9:false,
	isIE10:false
}
*/

