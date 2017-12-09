'use strict';

/*eslint-disable*/
/**
 * Created by JiangWenqiang on 2017/5/3.
 */
/**
 * 扫描二维码
 * @param callbackSuccess
 * @param callbackFail
 */
function scanCode(callbackSuccess, callbackFail) {
  wx.scanCode({
    success: function success(res) {
      callbackSuccess(res);
    },
    fail: function fail(res) {
      callbackFail(res);
    }
  });
}
/**
 * 数据请求
 * @param obj
 */
function wxRequest(obj) {
  wx.request(obj);
}
module.exports = {
  scanCode: scanCode,
  wxRequest: wxRequest
};
/**
 *  用户微信授权登陆
 */
function login(obj) {
  var loginSuccess = obj.success || function () {
    console.log('未传入success回调函数');
  };
  var loginFail = obj.success || function () {
    console.log('未传入fail回调函数');
  };
  wx.login({
    success: function success(res) {
      // console.log(res.code)
      loginSuccess(res);
    },
    fail: function fail(res) {
      loginFail(res);
    }
  });
}

/**
 * 获取用户微信信息
 * @param obj
 */
function getUserInfo(obj) {
  var getUserSuccess = obj.success || function () {
    console.log('未传入success回调函数');
  };
  var getUserFail = obj.fail || function () {
    wx.showModal({
      title: '未提供权限',
      content: '请删除小程序后重新打开并授权',
      showCancel: false
    });
  };
  wx.getUserInfo({
    // 默认获取用户带加密数据的信息
    withCredentials: obj.withCredentials || false,
    success: function success(res) {
      getUserSuccess(res);
    },
    fail: function fail(res) {
      getUserFail(res);
    }
  });
}

/**
 * 服务器获取用户session_key
 */
function getSessionKey(obj) {
  this.requestInfo(obj);
}

/**
 * 向服务器请求信息
 */
function requestInfo(obj) {
  wx.request({
    url: obj.url || useUrl.serviceUrl.login,
    method: obj.method || 'POST',
    data: obj.data || {},
    header: {
      'content-type': obj.header || 'application/x-www-form-urlencoded'
    },
    success: obj.success || function () {
      console.log('未传入success回调函数');
    },
    fail: obj.fail || function (err) {
      console.log('未传入fail回调函数,err:' + err.errMsg);
    },
    complete: obj.complete || function () {}
  });
}

/**
 * 登陆态检查
 */
function sessionCheck() {
  var that = this;
  wx.checkSession({
    success: function success() {
      console.log('session有效');
      // that.mainLogin()
    },
    fail: function fail() {
      console.log('session失效');
      that.mainLogin();
    }
  });
}

/**
 * 主登陆函数
 */
function mainLogin(_this, callback, callback2, callback3) {
  var that = this;
  var loginObj = {
    success: function success(params) {
      // 获取用户登陆code
      // console.log(res)
      // 获取用户的session_key
      // console.log('mainLogin' + res.code)
      var obj = {
        url: useUrl.serviceUrl.login + '?code=' + params.code,
        method: 'GET',
        // data: {
        //   code: res.code
        // },
        header: 'application/json',
        success: function success(res) {
          // console.log(useUrl.serviceUrl.login + '?code=' + params.code)
          // console.log(res)
          // console.log(res.data.data.session_key)
          // session_key 存储
          that.data.session_key = res.data.data.session_key;
          wx.setStorageSync('session_key', res.data.data.session_key);
          if (callback) {
            callback();
          }
          if (callback2) {
            callback2();
          }
          if (callback3) {
            callback3();
          }
        },
        fail: function fail(res) {
          console.log(res);
        }
      };
      that.getSessionKey(obj);
      // 获取用户信息
      var obj2 = {
        success: function success(res) {
          // console.log(res)
          that.data.userInfo = res.userInfo;
          wx.setStorageSync('userInfo', res.userInfo);
          if (_this) {
            _this.setData({
              userInfo: res.userInfo
            });
          }
        }
      };
      that.getUserInfo(obj2);
    }
  };
  that.login(loginObj);
}
//# sourceMappingURL=common.js.map
