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
    title: 'accountDetail',
    page: 1,
    info: [
      // {
      //   kind: '约会计划',
      //   time: '2017.05.10 14:20',
      //   money: 168,
      //   pay: '微信支付'
      // },
      // {
      //   kind: '账户充值',
      //   time: '2017.05.10 14:20',
      //   money: -168,
      //   pay: '礼品卷充值'
      // }
    ]
  },
  // 获取用户流水
  getLog: function getLog(page) {
    var that = this;
    var logObj = {
      url: useUrl.payLogsDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success: function success(res) {
        if (res.data.data.length === 0) {
          return wx.showToast({
            title: '没有更多的消费记录了'
          });
        }
        that.setData({
          info: that.data.info.concat(res.data.data)
        });
      }
    };
    app.wxrequest(logObj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    this.getLog(1);
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
  },

  // 触底操作
  onReachBottom: function onReachBottom() {
    this.getLog(++this.data.page);
  }
});
//# sourceMappingURL=accountDetail.js.map
