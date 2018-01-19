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
    title: 'follow',
    page: 1,
    people: [],
    content: '',
    nohao: false
  },
  closeMask: function closeMask() {
    this.setData({
      mask: false
    });
  },
  stillmask: function stillmask() {
    this.setData({
      mask: true
    });
  },

  // 用户确认搜索
  searchValue: function searchValue(e) {
    // this.getFollowUser(1, e.detail.value, '没有搜索到相关用户')
    var that = this;
    var obj = {
      url: useUrl.getUserSubscribe,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: 1,
        user_name: e.detail.value
      },
      success: function success(res) {
        // console.log(res)
        if (res.data.data.length === 0 || !res.data.data) {
          return wx.showToast({
            title: '亲，没有搜索到相关用户',
            image: '../../images/jiong.png',
            duration: 1000,
            mask: true
          });
        }
        // let s = that.data.people.reverse().concat(res.data.data).reverse()
        that.data.people = [];
        that.setData({
          people: res.data.data
        });
      }
    };
    app.wxrequest(obj);
  },

  // 文本输入
  inputtext: function inputtext(e) {
    this.setData({
      content: e.detail.value
    });
  },

  // 弹窗
  follows: function follows(e) {
    if (e.currentTarget.dataset.follow * 1 === 1) {
      return wx.showToast({
        title: '您和Ta已互相关注啦',
        mask: true,
        duration: 1000
      });
    }
    this.setData({
      mask: true,
      id: e.currentTarget.dataset.id
    });
  },

  // 关注
  follow: function follow() {
    var that = this;
    if (that.data.content.length >= 20) {
      return wx.showToast({
        title: '超出字数限制'
      });
    }
    // console.log(that.data.id)
    var fbj = {
      url: useUrl.remindSubscribe,
      data: {
        session_key: wx.getStorageSync('session_key'),
        subscribe_user_id: that.data.id,
        content: that.data.content || 'hi, 快来关注我吧'
      },
      success: function success(res) {
        that.setData({
          mask: false
        });
        if (res.data.code === 400) {
          return wx.showToast({
            title: '亲，一天只能提醒Ta一次哦~'
          });
        }
        wx.showToast({
          title: '提醒成功'
        });
      }
    };
    app.wxrequest(fbj);
  },

  // 跳转到消息页面
  goNewfollow: function goNewfollow() {
    // if (this.data.message) {
    wx.navigateTo({
      url: '../newfollow/newfollow'
    });
    // }
  },

  // 获取用户关注的用户的列表
  getFollowUser: function getFollowUser(page, search, text) {
    var that = this;
    var obj = {
      url: useUrl.getUserSubscribe,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page,
        user_name: search || ''
      },
      success: function success(res) {
        // console.log(res)
        if (res.data.code === 200) {
          if (!res.data.data && page * 1 === 1) {
            return that.setData({
              nohao: true
            });
          }
          var s = that.data.people.concat(res.data.data);
          that.setData({
            people: s,
            nohao: false
          });
        } else {
          wx.showToast({
            title: '请在个人中心登陆后使用小程序'
          });
        }
      }
    };
    app.wxrequest(obj);
  },

  // 获取陌生人提醒
  getstranger: function getstranger() {
    var that = this;
    var gsbj = {
      url: useUrl.userHasNewStranger,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        if (res.data.data.isHas * 1 === 1) {
          that.setData({
            message: true
          });
        } else {
          that.setData({
            message: false
          });
        }
        wx.stopPullDownRefresh();
      }
    };
    app.wxrequest(gsbj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    // this.setData({
    //   page: 1,
    //   people: []
    // })
    // this.getFollowUser(1)
    // this.getstranger()
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
    this.setData({
      page: 1,
      people: []
    });
    this.getFollowUser(1);
    this.getstranger();
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
    this.setData({
      people: [],
      page: 1
    });
    this.getFollowUser(1);
    this.getstranger();
  },
  onReachBottom: function onReachBottom() {
    this.getFollowUser(++this.data.page);
  }
});
//# sourceMappingURL=follow.js.map
