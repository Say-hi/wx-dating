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
    title: 'mySurvey',
    topArr: ['我收到的问卷', '我发出的问卷'],
    page: 1,
    topCur: 0,
    orderArr: [
      // {
      //   number: 6321654165,
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   title: 'Kiss Bottle 全新手工制甜品餐',
      //   time: '2017.05.20 18:30',
      //   address: '珠江新城',
      //   money: '158',
      //   status: 1
      // },
      // {
      //   number: 6321654165,
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   title: 'Kiss Bottle 全新手工制甜品餐',
      //   time: '2017.05.20 18:30',
      //   address: '珠江新城',
      //   money: '158',
      //   status: 2
      // },
      // {
      //   number: 6321654165,
      //   status: 0
      // }
    ]
  },
  // 查看详情
  goDetail: function goDetail(e) {
    var that = this;
    // let status = e.currentTarget.dataset.status * 1
    var topCur = this.data.topCur * 1;
    // if (status === 0) {
    //   wx.navigateTo({
    //     url: '../survey/survey?id=' + e.currentTarget.dataset.id + '&topCur=' + that.data.topCur + '&write=true' + '&orderId=' + e.currentTarget.dataset.orderid + '&type=' + e.currentTarget.dataset.type
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../survey/survey?id=' + e.currentTarget.dataset.id + '&topCur=' + that.data.topCur + '&write=false' + '&orderId=' + e.currentTarget.dataset.orderid + '&type=' + e.currentTarget.dataset.type
    //   })
    // }
    if (topCur === 1) {
      wx.navigateTo({
        url: '../survey/survey?id=' + e.currentTarget.dataset.id + '&topCur=' + that.data.topCur + '&write=true' + '&orderId=' + e.currentTarget.dataset.orderid
      });
    } else {
      wx.navigateTo({
        url: '../showsurvey/showsurvey?id=' + e.currentTarget.dataset.id + '&topCur=' + that.data.topCur + '&write=false' + '&orderId=' + e.currentTarget.dataset.orderid
      });
    }
  },

  // 选择顶部nav
  chooseTop: function chooseTop(e) {
    this.setData({
      orderArr: []
    });
    if (e.currentTarget.dataset.index * 1 === 1) {
      this.getMySend(1);
    } else {
      this.getMyReceive(1);
    }
    this.setData({
      topCur: e.currentTarget.dataset.index * 1,
      page: 1
    });
  },

  // 获取我收到的问卷
  getMyReceive: function getMyReceive(page) {
    var that = this;
    var obj = {
      url: useUrl.myReceiveQuestionnaires,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success: function success(res) {
        // console.log(res)
        if (res.data.data.length <= 0) {
          return wx.showToast({
            title: '没有更多内容啦',
            mask: true
          });
        }
        that.setData({
          orderArr: that.data.orderArr.concat(res.data.data)
        });
      }
    };
    app.wxrequest(obj);
  },

  // 获取我发出的问卷
  getMySend: function getMySend(page) {
    var that = this;
    var sendObj = {
      url: useUrl.myFachuQuestionnaires,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success: function success(res) {
        if (res.data.data.length <= 0) {
          return wx.showToast({
            title: '没有更多内容啦',
            mask: true
          });
        }
        that.setData({
          orderArr: that.data.orderArr.concat(res.data.data)
        });
      }
    };
    app.wxrequest(sendObj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    this.getMyReceive(1);
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
    if (this.data.hide) {
      this.setData({
        orderArr: [],
        page: 1
      });
      if (this.data.topCur * 1 === 1) {
        this.getMySend(1);
      } else {
        this.getMyReceive(1);
      }
    }
    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    this.setData({
      hide: true
    });
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
    this.setData({
      orderArr: [],
      page: 1
    });
    if (this.data.topCur * 1 === 1) {
      this.getMySend(1);
    } else {
      this.getMyReceive(1);
    }
  },

  // 触底刷新
  onReachBottom: function onReachBottom() {
    var that = this;
    if (this.data.topCur === 1) {
      this.getMySend(++that.data.page);
    } else {
      this.getMyReceive(++that.data.page);
    }
  }
});
//# sourceMappingURL=mySurvey.js.map
