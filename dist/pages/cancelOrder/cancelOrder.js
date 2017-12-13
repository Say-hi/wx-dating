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
    title: 'cancelOrder',
    value: '',
    shiYue: false,
    flag: false,
    flagTwo: false,
    // order: {
    //   number: 1232416,
    //   type: 0, // 0 自己发起的 1 别人发起的
    //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   title: 'Kiss Bottle 全新手工制甜品餐',
    //   time: '2017.05.20 18:30',
    //   address: '珠江新城',
    //   money: 158,
    //   pImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   pName: '凸角',
    //   pGender: 1,
    //   pReason: '萨克的覅双方都刷卡地方萨克的浪费和萨阿斯顿飞哈斯的空间费',
    //   pId: 12312321,
    //   zd: false
    // },
    items: [{
      name: '1',
      value: '对方爽约，且不愿主动取消赴约',
      checked: false
    }]
  },
  // 选择框
  checkboxChange: function checkboxChange() {
    var items = this.data.items;
    items[0].checked = !items[0].checked;
    this.setData({
      items: items
    });
  },
  confirmBtn: function confirmBtn() {
    if (this.data.flag) return;
    this.data.flag = true;
    var that = this;
    if (this.data.status === 1) {
      that.cancelOrder();
    } else if (this.data.status === 4) {
      that.replyOrder();
    }
  },
  inputValue: function inputValue(e) {
    this.setData({
      value: e.detail.value
    });
  },

  // 关闭弹窗
  delMask: function delMask() {
    this.setData({
      show: false
    });
    wx.switchTab({
      url: '../index2/index2'
    });
  },

  // 获取用户资料
  getUserInfo: function getUserInfo() {
    var that = this;
    var userObj = {
      url: useUrl.isPerfectData,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        if (res.data.data.shiyue_num >= 4) {
          that.setData({
            shiYue: true
          });
        }
      }
    };
    app.wxrequest(userObj);
  },

  // 获取订单信息
  getOrderInfo: function getOrderInfo(id) {
    var that = this;
    var orderObj = {
      url: useUrl.cancelOrderDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: id
      },
      success: function success(res) {
        that.setData({
          order: res.data.data,
          order_id: id
        });
        if (res.data.data.is_zudong * 1 === 1) {
          that.setData({
            zd: true
          });
        }
      }
    };
    app.wxrequest(orderObj);
  },


  // 获取订单信息
  getOrderInfoTwo: function getOrderInfoTwo(id) {
    var that = this;
    var obj = {
      url: useUrl.orderDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: id
      },
      success: function success(res) {
        that.setData({
          infoTwo: res.data.data || ''
        });
      }
    };
    app.wxrequest(obj);
  },

  // 回复取消订单
  replyOrder: function replyOrder() {
    var that = this;
    // if (this.data.value.length === 0) {
    //   this.data.flag = false
    //   return wx.showToast({
    //     title: '您还没有填写回复理由呢',
    //     mask: true
    //   })
    // }
    var replyObj = {
      url: useUrl.huifuOrderCancel,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: that.data.order_id,
        content: that.data.value || '未填写理由'
      },
      success: function success(res) {
        if (res.data.code === 200) {
          wx.showToast({
            title: '回复成功',
            mask: true
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 1500);
        } else {
          that.data.flag = false;
          wx.showToast({
            title: res.data.message
          });
        }
      }
    };
    app.wxrequest(replyObj);
  },

  // 取消订单
  cancelOrder: function cancelOrder() {
    // if (this.data.flagTwo) return
    if (this.data.value.length === 0) {
      this.data.flag = false;
      return wx.showToast({
        title: '您还没有填写理由呢~~',
        mask: true
      });
    }
    // this.data.flag = true
    var that = this;
    var cancelObj = {
      url: useUrl.cancelOrder,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: that.data.order_id,
        cancel_liyou: that.data.value || '未填写理由',
        check: that.data.items[0].checked ? '1' : '0'
      },
      success: function success(res) {
        // console.log(res)
        if (res.data.code === 200) {
          if (that.data.order.is_zhidai * 1 === 2) {
            wx.showToast({
              title: '订单已取消，款项已原路退回',
              mask: true
            });
          } else {
            wx.showToast({
              title: '订单已取消，等待审核退款',
              mask: true
            });
          }
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 1500);
        } else {
          that.data.flag = false;
          wx.showToast({
            title: res.data.message
          });
        }
      }
    };
    app.wxrequest(cancelObj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    // TODO: onLoad
    if (params.status * 1 === 1) {
      this.setData({
        zd: true
      });
    } else if (params.status * 1 === 4) {
      this.setData({
        zd: false
      });
    }
    this.setData({
      status: params.status * 1
    });
    this.getOrderInfo(params.id);
    this.getOrderInfoTwo(params.id);
    this.getUserInfo();
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
//# sourceMappingURL=cancelOrder.js.map
