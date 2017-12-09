'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var useUrl = require('../../utils/service');
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'account',
    shwoWhat: 'detail',
    status: 0
  },
  // 获取用户余额
  getUserMoney: function getUserMoney() {
    var that = this;
    var moneyObj = {
      url: useUrl.payIndex,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        // console.log(res)
        that.setData({
          sincerityMoney: res.data.data.bao_money * 1,
          money: res.data.data.coin,
          status: res.data.data.is_back // 0 无 1有
        });
      }
    };
    app.wxrequest(moneyObj);
  },

  // 申请退款操作
  mOp: function mOp(e) {
    var that = this;
    if (e.currentTarget.dataset.type === 'confirm') {
      if (!this.data.wechat) {
        return wx.showToast({
          title: '请输入您的微信号码'
        });
      }
      var backobj = {
        url: useUrl.userBondBack,
        data: {
          session_key: wx.getStorageSync('session_key'),
          wechat_no: that.data.wechat
        },
        success: function success(res) {
          if (res.data.code === 400) {
            return wx.showToast({
              title: res.data.message
            });
          }
          wx.showToast({
            title: res.data.message
          });
          that.setData({
            mask: false
          });
          that.getUserMoney();
        }
      };
      app.wxrequest(backobj);
    } else {
      this.setData({
        mask: false
      });
    }
  },

  // 文字输入
  inputValue: function inputValue(e) {
    this.setData({
      wechat: e.detail.value
    });
  },

  // 充值保证金
  chargeBao: function chargeBao() {
    var that = this;
    if (this.data.status * 1 === 1) {
      return wx.showToast({
        title: '审核中...'
      });
    }
    if (this.data.sincerityMoney) {
      return that.setData({
        mask: true
      });
    }
    var chargeObj = {
      url: useUrl.payByBond,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        var yxObj = {
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          paySign: res.data.data.paySign,
          success: function success(res) {
            // 支付成功
            wx.showToast({
              title: '保证金充值成功',
              mask: true
            });
            that.getUserMoney();
          },
          fail: function fail(res) {
            // 支付失败
            wx.showToast({
              title: '充值失败，请再次尝试',
              mask: true
            });
          }
        };
        app.wxpay(yxObj);
      }
    };
    app.wxrequest(chargeObj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    this.getUserMoney();
    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=account.js.map
