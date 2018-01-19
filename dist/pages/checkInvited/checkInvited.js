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
    title: 'checkInvited',
    chooseTab: true,
    userArr: []
  },
  // 选择应邀者
  chooseUser: function chooseUser(e) {
    var chooseIndex = e.currentTarget.dataset.index;
    this.setData({
      chooseIndex: chooseIndex,
      chooseShow: true
    });
  },

  // 按钮点击判断
  btnClick: function btnClick(e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    if (type === 'cancel') {
      this.setData({
        chooseShow: false
      });
    } else if (type === 'confirm') {
      var sbj = {
        url: useUrl.acceptApplyInvitation,
        data: {
          session_key: wx.getStorageSync('session_key'),
          id: e.currentTarget.dataset.id
        },
        success: function success(res) {
          // 选择成功
          if (res.data.code === 200) {
            that.setData({
              chooseTab: false
            });
          } else if (res.data.code === 400) {
            // 失败操作
            return wx.showToast({
              title: '您已确认应邀者了~~',
              image: '../../images/jiong.png',
              duration: 2000,
              mask: true
            });
          }
        }
      };
      app.wxrequest(sbj);
    } else if (type === 'confirm-two') {
      this.setData({
        chooseTab: true,
        chooseShow: false
      });
      setTimeout(function () {
        wx.navigateBack({
          delta: 2
        });
      });
    }
  },
  getInviteUerList: function getInviteUerList(id) {
    var that = this;
    var obj = {
      url: useUrl.lookApplyInvitation,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: id
      },
      success: function success(res) {
        that.setData({
          userArr: res.data.data
        });
      }
    };
    app.wxrequest(obj);
  },

  // 去到用户信息页面
  goUserInfo: function goUserInfo(e) {
    wx.navigateTo({
      url: '../userInfo/userInfo?userId=' + e.currentTarget.dataset.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(parmas) {
    this.setData({
      ta: parmas.ta
    });
    this.getInviteUerList(parmas.orderId);
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
//# sourceMappingURL=checkInvited.js.map
