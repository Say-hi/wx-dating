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
    title: 'newfollow',
    page: 1,
    people: []
  },
  // 关注
  follow: function follow(e) {
    // let id = e.currentTarget.dataset.id
    var that = this;
    var index = e.currentTarget.dataset.index;
    var peopleArr = this.data.people;
    var type = Math.abs(e.currentTarget.dataset.type * 1 - 1);
    var fbj = {
      url: useUrl.doIgnore,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: e.currentTarget.dataset.id,
        type: type
      },
      success: function success(res) {
        console.log(res);
        if (res.data.code === 400) {
          return wx.showToast({
            title: '哎呀，服务器出小差了，请稍后重试~',
            mask: true
          });
        }
        peopleArr[index]['is_ignore'] = type;
        console.log('peopleInfo', peopleArr);
        that.setData({
          people: peopleArr
        });
      }
    };
    app.wxrequest(fbj);
    // if (peopleArr[index]['is_ignore'] === 1) {
    //   peopleArr[index]['is_ignore'] = 0
    // } else {
    //   peopleArr[index]['is_ignore'] = 1
    // }
  },

  // 获取陌生人提醒列表
  getstranger: function getstranger(page) {
    var that = this;
    var gsbj = {
      url: useUrl.getStranger,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success: function success(res) {
        if (!res.data.data.length === 0) {
          return wx.showToast({
            title: '亲，没有更多内容啦~',
            mask: true
          });
        }
        var s = that.data.people.concat(res.data.data);
        that.setData({
          people: s
        });
      }
    };
    app.wxrequest(gsbj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    this.getstranger(1);
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
    this.getstranger(++this.data.page);
  }
});
//# sourceMappingURL=newfollow.js.map
