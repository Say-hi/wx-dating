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
    // title: 'Mr.Rocky 双人火焰牛排餐',
    // days: '2017.05.20(周日)',
    time: '00:00',
    // address: '珠江新城华夏路6号',
    people: '寻约会对象',
    pay: '各付各',
    payType: 2,
    mobile: 0,
    maskTitle: '信息已保存,转发给Ta确认',
    timeArr: [],
    timeIndex: 0,
    coin: 0,
    // price: '168',
    // 意向金弹窗
    // moneyshow: false,
    // 禁止发起弹窗
    // cancelshow: false,
    // 发起成功弹窗
    datingSuccess: false,
    // 个人资料完善弹窗
    // datashow: false,
    one: 0,
    two: 0
    // value:[18, 0]
  },
  // 关闭支付界面
  closeMoneyMask: function closeMoneyMask() {
    this.setData({
      orderMask: false
    });
    app.deleteOrder(this.data.order_id || this.data.order_ta_id);
  },

  // 获取用户金额情况
  getUserMoney: function getUserMoney() {
    var that = this;
    var gum = {
      url: useUrl.payIndex,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        if (res.data.code === 200) {
          that.setData({
            coin: res.data.data.coin || 0
          });
        } else {
          wx.showToast({
            title: res.data.message
          });
        }
      }
    };
    app.wxrequest(gum);
  },

  // 发给本人确认
  sendToConfirmPeople: function sendToConfirmPeople() {
    var that = this;
    if (that.data.timeArr[that.data.timeIndex].indexOf(':') * 1 === -1) {
      return wx.showToast({
        image: '../../images/jiong.png',
        mask: true,
        title: '请选择约会时间'
      });
    }
    // 替ta发起信息提交
    var foi = wx.getStorageSync('forOtherInfo');
    console.log('foi', foi);
    var smbj = {
      url: useUrl.postTitaFaqi,
      data: {
        archives_id: foi.archives_id || '',
        session_key: foi.session_key,
        name: foi.name,
        sex: foi.sex,
        ganqing: foi.ganqing,
        age: foi.age,
        user_height: foi.user_height,
        job: foi.job,
        compny: foi.compny,
        cart_house: foi.cart_house,
        likes_sports: foi.likes_sports,
        likes_movies: foi.likes_movies,
        likes_books: foi.likes_books,
        comment: foi.comment,
        photos: foi.photos,
        id: that.data.id,
        date: that.data.day,
        time: that.data.timeArr[that.data.timeIndex],
        mobile: foi.mobile,
        is_zhidai: that.data.people === '寻约会对象' ? '1' : '2',
        pay_type: that.data.payType
      },
      complete: function complete(res) {
        // console.log(res)
        // 订单响应成功
        console.log('订单响应成功', res);
        if (res.data.code === 400) {
          return wx.showToast({
            title: res.data.message,
            image: '../../images/jiong.png'
          });
        }
        if (res.data.data.order_ta_id) {
          that.setData({
            order_ta_id: res.data.data.order_ta_id
          });
          // 支付类型 0: 替ta付清
          if (that.data.payType === 0) {
            // 替Ta发起支付
            that.getUserMoney();
            wx.showLoading({
              title: '请求支付中...'
            });
            setTimeout(function () {
              wx.hideLoading();
              that.setData({
                orderMask: true
              });
            }, 300);
            return;
            // 发起支付
            // return that.moneyPay(res.data.data.order_ta_id, 'forOther')
          } else {
            // 无需支付
            that.setData({
              sendMask: true
            });
          }
        }
      }
    };
    app.wxrequest(smbj);
  },

  // 替ta支付
  payforother: function payforother() {
    var that = this;
    var tiTAPay = {
      url: useUrl.payByOrderTa,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_ta_id: that.data.order_ta_id
      },
      success: function success(res) {
        console.log('替他支付响应成功', res);
        wx.hideLoading();
        if (res.data.code === 400) {
          return wx.showToast({
            title: res.data.message,
            image: '../../images/jiong.png'
          });
        }
        // 支付响应成功
        if (res.data.data.length !== 0) {
          return that.moneyPay(res.data.data, 'forOther');
        }
        that.setData({
          sendMask: true,
          orderMask: false
        });
      }
    };
    app.wxrequest(tiTAPay);
  },

  // 信息提交后判断是否需要支付
  moneyPay: function moneyPay(e, type) {
    console.log(e);
    var that = this;
    // 支付参数
    var payObj = {
      timeStamp: e.timeStamp,
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      success: function success(res) {
        // 支付成功响应
        console.log('支付情况', res);
        if (res.errMsg === 'requestPayment:ok') {
          if (type === 'forOther') {
            that.setData({
              orderMask: false,
              sendMask: true
            });
          } else {
            that.setData({
              orderMask: false,
              datingSuccess: true
            });
          }
        } else {
          wx.showToast({
            title: '您未完成微信支付'
          });
          // app.deleteOrder(that.data.order_id || that.data.order_ta_id)
        }
      },
      fail: function fail(res) {
        wx.showToast({
          title: '您未完成微信支付'
        });
        console.log('支付失败', res);
        app.deleteOrder(that.data.order_id || that.data.order_ta_id);
      }
    };
    app.wxpay(payObj);
  },

  // 完善个人资料
  getMyDay: function getMyDay(date) {
    var week = '';
    var dates = new Date(date);
    if (dates.getDay() === 0) week = '周日';
    if (dates.getDay() === 1) week = '周一';
    if (dates.getDay() === 2) week = '周二';
    if (dates.getDay() === 3) week = '周三';
    if (dates.getDay() === 4) week = '周四';
    if (dates.getDay() === 5) week = '周五';
    if (dates.getDay() === 6) week = '周六';
    this.setData({
      days: date.replace(/-/g, '.') + '(' + week + ')',
      day: date
    });
  },

  // var w1 = getMyDay(new Date("2015-7-12"));
  // 选择约会对象
  cp: function cp(e) {
    var p = e.currentTarget.dataset.type;
    if (p === 'noself') {
      this.setData({
        people: '寻约会对象'
      });
    } else if (p === 'self') {
      var pay = '我付清';
      var payType = 1;
      if (this.data.type === 'forOther') {
        pay = '替Ta付清';
        payType = 0;
      }
      this.setData({
        people: '自带约会对象',
        pay: pay,
        payType: payType
      });
    } else if (p === 'my') {
      this.setData({
        pay: '我付清',
        payType: 1
      });
    } else if (p === 'both') {
      this.setData({
        pay: '各付各',
        payType: 2
      });
    } else if (p === 'other') {
      this.setData({
        pay: 'Ta付清',
        payType: 3
      });
    } else if (p === 'forTa') {
      this.setData({
        pay: '替Ta付清',
        payType: 0
      });
    } else if (p === 'confirm') {
      this.setData({
        pay: '确认人付清',
        payType: 1
      });
    } else if (p === 'otherother') {
      this.setData({
        pay: '应邀者付清',
        payType: 3
      });
    }
    this.noMask();
  },

  // 遮罩
  chooseIndustry: function chooseIndustry(e) {
    var type = e.currentTarget.dataset.type;
    // console.log(type)
    if (type === 'time') {
      this.setData({
        industryShow: true
      });
    } else if (type === 'choosepeople') {
      this.setData({
        datingpeopleShow: true
      });
    } else if (type === 'kind') {
      this.setData({
        kindshow: true
      });
    } else if (type === 'pay') {
      if (this.data.people === '自带约会对象') {
        return wx.showToast({
          title: '自带约会对象，不可选择付款类型',
          image: '../../images/jiong.png',
          mask: true
        });
      }
      this.setData({
        payShow: true
      });
    }
  },

  // 去除遮罩
  noMask: function noMask() {
    this.setData({
      industryShow: false,
      datingpeopleShow: false,
      kindshow: false,
      payShow: false
    });
  },

  // 获取自己的资料
  getMyInfo: function getMyInfo() {
    // let that = this
    var getobj = {
      url: useUrl.getUserInfoBySelf,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        wx.redirectTo({
          url: '../userInfo/userInfo?userId=' + res.data.data.user_id + '&type=self'
        });
      }
    };
    app.wxrequest(getobj);
  },

  // 订单生效后跳转
  goShare: function goShare() {
    if (this.data.people === '自带约会对象') {
      return wx.redirectTo({
        url: '../userOrder/userOrder'
      });
    }
    this.getMyInfo();
  },

  // 去除遮罩层
  delMask: function delMask(e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    console.log(type);
    // console.log(type)
    if (type === 'yxpay') {
      // todo 支付意向金
      var obj = {
        url: useUrl.payByBond,
        data: {
          session_key: wx.getStorageSync('session_key')
        },
        success: function success(res) {
          console.log('保证金支付', res);
          var yxObj = {
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            paySign: res.data.data.paySign,
            success: function success(res) {
              // 支付成功
              // console.log(res)
              // console.log(res.errMsg)
              if (res.errMsg === 'requestPayment:ok') {
                that.setData({
                  moneyshow: false
                });
              }
            },
            fail: function fail(res) {
              console.log('支付失败', res);
            }
          };
          app.wxpay(yxObj);
        }
      };
      app.wxrequest(obj);
    } else if (type === 'cccc') {
      wx.reLaunch({
        url: '../index2/index2'
      });
      this.setData({
        cancelshow: false
      });
    } else {
      this.setData({
        cancelshow: false
      });
    }
  },

  // 立即发起按钮
  goPayFirst: function goPayFirst() {
    if (this.data.mobile.length !== 11) {
      return wx.showToast({
        image: '../../images/jiong.png',
        mask: true,
        title: '请填写完整的手机号码'
      });
    }
    wx.setStorageSync('phoneNumber', this.data.mobile);
    if (this.data.timeArr[this.data.timeIndex].indexOf(':') * 1 === -1) {
      return wx.showToast({
        image: '../../images/jiong.png',
        mask: true,
        title: '请选择约会时间'
      });
    }
    if (this.data.datashow && this.data.people !== '自带约会对象') {
      return this.setData({
        datashows: true
      });
    }
    wx.showLoading({
      title: '等待中'
    });
    this.getUserMoney();
    this.sendOrderData();
  },

  // 支付弹窗去支付
  goPay: function goPay() {
    wx.showLoading({
      title: '等待中'
    });
    var that = this;
    if (this.data.type === 'forOther') {
      this.payforother();
    } else {
      // this.sendOrderData()
      if (that.data.payType === 1 || that.data.payType === 2) {
        var orderPayobj = {
          url: useUrl.payByOrder,
          data: {
            session_key: wx.getStorageSync('session_key'),
            order_id: that.data.order_id
          },
          success: function success(res) {
            wx.hideLoading();
            console.log('order success', res);
            // 需要支付的发起付款
            if (res.data.code === 400) {
              return wx.showToast({
                title: res.data.message
              });
            }
            if (res.data.data.length !== 0) {
              // todo 微信支付流程
              that.moneyPay(res.data.data, 'self');
              return;
            }
            that.setData({
              orderMask: false,
              datingSuccess: true
            });
          }
        };
        app.wxrequest(orderPayobj);
      } else {
        wx.hideLoading();
        that.setData({
          orderMask: false,
          datingSuccess: true
        });
      }
    }
  },

  // 发起邀约生成订单信息
  sendOrderData: function sendOrderData() {
    var that = this;
    var obj = {
      url: useUrl.postFaqiYaoyue,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: that.data.id,
        date: that.data.day,
        time: that.data.timeArr[that.data.timeIndex],
        mobile: that.data.mobile,
        is_zhidai: that.data.people === '寻约会对象' ? '1' : '2',
        pay_type: that.data.payType
      },
      success: function success(res) {
        if (res.data.code === 400) {
          that.setData({
            orderMask: false
          });
          return wx.showToast({
            image: '../../images/jiong.png',
            title: res.data.message,
            mask: true
          });
        }
        setTimeout(function () {
          wx.hideLoading();
          that.setData({
            orderMask: true
          });
        }, 300);
        // 订单响应成功
        that.setData({
          order_id: res.data.data.order_id
        });
        // 普通订单支付类型为 1：我付清 2：各付一半
        // if (that.data.payType === 1 || that.data.payType === 2) {
        //   let orderPayobj = {
        //     url: useUrl.payByOrder,
        //     data: {
        //       session_key: wx.getStorageSync('session_key'),
        //       order_id: res.data.data.order_id
        //     },
        //     success (res) {
        //       console.log('order success', res)
        //       // 需要支付的发起付款
        //       if (res.data.data.length !== 0) {
        //         // todo 微信支付流程
        //         that.moneyPay(res.data.data, 'self')
        //         return
        //       }
        //       that.setData({
        //         orderMask: false,
        //         datingSuccess: true
        //       })
        //     }
        //   }
        //   app.wxrequest(orderPayobj)
        // } else {
        //   that.setData({
        //     orderMask: false,
        //     datingSuccess: true
        //   })
        // }
      }
    };
    app.wxrequest(obj);
  },

  // 手机号码输入
  mobileInput: function mobileInput(e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  // 用户资料检查
  checkUser: function checkUser() {
    var that = this;
    var obj = {
      url: useUrl.isPerfectData,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        if (res.data.data.is_perfect_data.toString() === '0') {
          that.setData({
            datashow: true
          });
        } else if (res.data.data.is_perfect_data.toString() === '1') {
          // 完整数据 1
          that.setData({
            datashow: false,
            datashows: false
          });
        }
        if (res.data.data.isShiyue.toString() === '1') {
          // 失约超过次数 1超
          that.setData({
            cancelshow: true
          });
        }
        // if (res.data.data.isHasBaomoney.toString() === '0') {
        //   // 无保证金 0
        //   that.setData({
        //     moneyshow: true
        //   })
        // }
      }
    };
    app.wxrequest(obj);
  },

  // 获取套餐时间列表
  getOrderTime: function getOrderTime(id) {
    var that = this;
    var time = wx.getStorageSync('time');
    var sb = {
      url: useUrl.packageDateTimeLists,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id,
        date: time.y + '-' + (time.m_n < 10 ? '0' + time.m_n : time.m_n) + '-' + (time.d < 10 ? '0' + time.d : time.d)
      },
      success: function success(res) {
        if (res.data.data.length * 1 === 0) {
          return that.setData({
            timeArr: ['该套餐已超时不可预定了']
          });
        }
        that.setData({
          timeArr: that.data.timeArr.concat(res.data.data)
        });
        // console.log(res.data.data)
      }
    };
    app.wxrequest(sb);
  },

  // picker选择器
  bindPickerChange: function bindPickerChange(e) {
    var value = e.detail.value;
    this.setData({
      timeIndex: value
    });
  },

  // getmobile () {
  //   app.getPhone(this)
  //   this.setData({
  //     mobile: this.data.phoneNumber
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    // if (wx.getStorageSync('phoneNumber')) {
    //   this.setData({
    //     mobile: wx.getStorageSync('phoneNumber')
    //   })
    // }
    this.setData({
      orderInfo: wx.getStorageSync('orderInfo')
    });
    // TODO: onLoad
    if (params.type === 'forOther') {
      this.setData({
        pay: '各付各',
        payType: 2,
        phonenoshow: true
      });
    }
    this.getOrderTime(params.id);
    this.setData({
      price: params.price || '',
      price2: params.price || '',
      address: params.address || '',
      title: params.title || '',
      id: params.id || '',
      type: params.type || ''
    });
    // 日期生成
    var time = wx.getStorageSync('time');
    this.getMyDay(time.y + '-' + (time.m_n < 10 ? '0' + time.m_n : time.m_n) + '-' + (time.d < 10 ? '0' + time.d : time.d));
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
    // if (wx.getStorageSync('phoneNumber')) {
    //   this.setData({
    //     mobile: app.getPhone()
    //   })
    app.getPhone(this);
    // }
    // console.log(params)
    // TODO: onShow
    if (this.data.pay === '替Ta付清') return;
    this.checkUser();
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

  // 页面内转发
  onShareAppMessage: function onShareAppMessage() {
    var that = this;
    this.setData({
      sendMask: false
    });
    return {
      title: '有好友替您发起以下邀约:',
      imageUrl: that.data.orderInfo.imgUrl,
      path: '/pages/otherConfirm/otherConfirm?orderTaId=' + that.data.order_ta_id + '&days=' + that.data.days + '&title=' + that.data.title + '&address=' + that.data.address,
      // 转发成功响应
      success: function success() {
        wx.navigateBack({
          delta: 1
        });
      },
      fail: function fail() {
        that.setData({
          sendMask: true
        });
      }
    };
  }
});
//# sourceMappingURL=order.js.map
