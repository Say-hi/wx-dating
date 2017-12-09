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
    title: 'message',
    page: 1,
    message: []
  },
  getMessage: function getMessage(page) {
    var that = this;
    var obj = {
      url: useUrl.messageList,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success: function success(res) {
        // console.log(res)
        if (res.data.data.length === 0) {
          return wx.showToast({
            title: '没有更多内容啦'
          });
        }
        res.data.data.forEach(function (v) {
          v.content = that.br(v.content);
        });
        that.setData({
          message: that.data.message.concat(res.data.data)
        });
      }
    };
    app.wxrequest(obj);
  },
  br: function br(str) {
    // console.log(str)
    return str.split('$');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    this.getMessage(1);
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
  onReachBottom: function onReachBottom() {
    this.getMessage(++this.data.page);
  }
});
//# sourceMappingURL=message.js.map
