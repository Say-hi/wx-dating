'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var useUrl = require('../../utils/service');
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  textInput: function textInput(e) {
    this.setData({
      textValue: e.detail.value.toString()
    });
  },

  // 发送信息
  send: function send() {
    if (!wx.getStorageSync('session_key')) {
      return wx.showToast({
        title: '您未授权小程序,无法发送评论，请删除小程序后,再打开链接并授权'
      });
    }
    if (this.data.textValue.length === 0) {
      return wx.showToast({
        title: '请填写评论内容'
      });
    }
    var that = this;
    var obj = {
      url: useUrl.postApplyUserComment,
      data: {
        session_key: wx.getStorageSync('session_key'),
        comment_user_id: that.data.id,
        comment_content: that.data.textValue
      },
      success: function success(res) {
        if (res.data.code === 200) {
          wx.showToast({
            title: '评价成功',
            mask: true
          });
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/index2/index2'
            });
          }, 1000);
        } else {
          wx.showToast({
            title: res.data.message
          });
        }
      }
    };
    app.wxrequest(obj);
  },
  goUser: function goUser(e) {
    wx.navigateTo({
      url: '../userInfo/userInfo?userId=' + e.currentTarget.dataset.id
    });
  },

  // 获取评价用户信息
  getInfo: function getInfo(id) {
    var that = this;
    var getObj = {
      url: useUrl.applyUserComment,
      data: {
        session_key: wx.getStorageSync('session_key'),
        comment_user_id: id
      },
      success: function success(res) {
        res.data.data.job = res.data.data.job.split('-')[1];
        that.setData({
          user: res.data.data
        });
      }
    };
    app.wxrequest(getObj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    var that = this;
    this.setData({
      id: params.id
    });
    app.wxlogin(that.getInfo, params.id);
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
//# sourceMappingURL=inviteEvaluate.js.map
