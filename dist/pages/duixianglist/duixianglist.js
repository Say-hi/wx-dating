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
    title: 'duixianglist',
    curIndex: 0,
    rankArr: [{
      text: '价格由低到高',
      desc: 'money_asc'
    }, {
      text: '价格由高到低',
      desc: 'money_desc '
    }, {
      text: '约会时间先后',
      desc: 'time_asc'
    }],
    show: false
  },
  cancel: function cancel() {
    this.setData({
      show: false
    });
  },
  yingyoa: function yingyoa(e) {
    var that = this;
    wx.redirectTo({
      url: '../invitedConfirm/invitedConfirm?id=' + e.currentTarget.dataset.id + '&title=' + that.data.title
    });
  },
  showrank: function showrank() {
    this.setData({
      show: true
    });
  },

  // 选择排序
  rank: function rank(e) {
    this.setData({
      curIndex: e.currentTarget.dataset.index,
      show: false
    });
    this.getList(this.data.id, this.data.rankArr[e.currentTarget.dataset.index]['desc']);
  },

  // 获取列表对象
  getList: function getList(id, sort) {
    var that = this;
    var time = wx.getStorageSync('time');
    var date = time.y + '-' + (time.m_n < 10 ? '0' + time.m_n : time.m_n) + '-' + (time.d < 10 ? '0' + time.d : time.d);
    // console.log(date)
    var listObj = {
      url: useUrl.engagementObjictList,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id,
        date: date,
        sort: sort || 'money_asc'
      },
      success: function success(res) {
        // console.log(res)
        if (res.data.data.length === 0) {
          return wx.showToast({
            title: '没有新的内容了',
            duration: 1000,
            mask: true
          });
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res.data.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            if (i.job) {
              i.job = i.job.split('-')[1];
            } else {
              i.job = '用户未填写';
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        that.setData({
          listArr: res.data.data
        });
      }
    };
    app.wxrequest(listObj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    this.setData({
      id: params.id || 6,
      title: params.title || '重庆鸡公煲'
    });
    this.getList(params.id || 6);
    var t = wx.getStorageSync('time');
    this.setData({
      time: t.d + 'th,' + t.m
    });
    // this.getList(6)
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
//# sourceMappingURL=duixianglist.js.map
