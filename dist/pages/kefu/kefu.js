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
    title: 'kefu'
  },
  // 设置信息
  inputMessage: function inputMessage(e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    var value = e.detail.value;
    if (type === 'content') {
      that.setData({
        content: value
      });
    } else if (type === 'contact') {
      that.setData({
        contact: value
      });
    }
  },

  // 发送反馈
  sendMessage: function sendMessage() {
    var that = this;
    if (!this.data.content || !this.data.contact) {
      return wx.showToast({
        title: '请填写反馈内容和联系方式',
        image: '../../images/jiong.png',
        duration: 1000,
        mask: true
      });
    }
    var obj = {
      url: useUrl.addFeedback,
      data: {
        session_key: wx.getStorageSync('session_key'),
        content: that.data.content,
        contact: that.data.contact
      },
      complete: function complete() {
        wx.showToast({
          title: '已接收您的宝贵建议，感谢反馈',
          duration: 1000,
          mask: true
        });
      }
    };
    app.wxrequest(obj);
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
//# sourceMappingURL=kefu.js.map
