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
    title: 'survey',
    userInfo: {},
    curChoose: 2,
    show: false,
    write: false,
    hide: true
  },
  goUser: function goUser(e) {
    wx.navigateTo({
      url: '../userInfo/userInfo?userId=' + e.currentTarget.dataset.id
    });
  },
  delMask: function delMask() {
    var that = this;
    this.setData({
      show: false
    });
    wx.redirectTo({
      // url: '../survey/survey?orderId=' + that.data.orderId
      url: '../survey/survey?id=0' + '&write=true' + '&orderId=' + that.data.orderId + '&from=show'
    });
  },
  goback: function goback() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 选择交换方式
  chooseArr: function chooseArr(e) {
    this.setData({
      curChoose: e.currentTarget.dataset.index
    });
  },

  // 获取问卷详情
  getQuestionDetail: function getQuestionDetail(id) {
    var that = this;
    var queObj = {
      url: useUrl.questionnairesDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id
      },
      success: function success(res) {
        if (res.data.code === 401) {
          return that.setData({
            show: true
          });
        }
        var s = res.data.data.questionnaires_info;
        that.setData({
          question_one: s.question_one,
          question_two: s.question_two,
          question_three: s.question_three,
          question_four: s.question_four,
          type: s.type
        });
        if (!res.data.data.user_info) return;
        res.data.data.user_info.job = res.data.data.user_info.job.split('-')[1];
        that.setData({
          userInfo: res.data.data.user_info
        });
      }
    };
    app.wxrequest(queObj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    // let that = this
    this.setData({
      orderId: params.orderId,
      id: params.id
    });
    this.getQuestionDetail(params.id);
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
//# sourceMappingURL=showsurvey.js.map
