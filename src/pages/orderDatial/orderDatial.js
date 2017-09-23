// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '订单详情',
    orderArr: ['发布中', '已确认', '已消费', '订单关闭', '已取消订单', '订单关闭'],
    type: ['寻约会对象', '自带约会对象'],
    payType: ['替TA付清', '发起人付清', '各付各', '应邀者付清'],
    datingInfo: [
      {
        title: '时间',
        text: '暂无数据'
      },
      {
        title: '地址',
        text: '暂无数据'
      },
      {
        title: '约会对象',
        text: '暂无数据'
      },
      {
        title: '费用',
        text: '暂无数据'
      },
      {
        title: '联系手机',
        text: '暂无数据'
      },
      {
        title: '约会类型',
        text: '暂无数据'
      },
      {
        title: '付款类型',
        text: '暂无数据'
      }
    ]
  },
  // 获取订单信息
  getOrderInfo (id) {
    let that = this
    let obj = {
      url: useUrl.orderDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: id
      },
      success (res) {
        // console.log(res)
        if (res.data.code === 400) {
          wx.showToast({
            title: res.data.message,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
          return
        }
        let s = res.data.data
        let datingInfo = that.data.datingInfo
        datingInfo[0].text = s.order_date + '(' + s.order_week + ')' + s.order_time
        datingInfo[1].text = s.address
        datingInfo[2].text = s.duixiang.user_nicename || '暂无数据'
        datingInfo[3].text = s.money
        datingInfo[4].text = s.mobile || '暂无数据'
        datingInfo[5].text = that.data.type[s.is_zhidai * 1 - 1]
        datingInfo[6].text = that.data.payType[s.pay_type * 1]
        that.setData({
          info: s,
          datingInfo: datingInfo
        })
      }
    }
    app.wxrequest(obj)
  },
  getUserInfo () {
    let that = this
    let ss = {
      url: useUrl.isPerfectData,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        that.setData({
          money: res.data.data.isShiyue * 1
        })
      }
    }
    app.wxrequest(ss)
  },
  payorder () {
    this.getUserMoney()
    wx.showLoading({
      title: '请求支付中...'
    })
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        orderMask: true
      })
    }, 300)
  },
  // 支付
  goPay () {
    let that = this
    let orderPayobj = {
      url: useUrl.payByOrder,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: that.data.id
      },
      success (res) {
        console.log('pay order', res)
        // 需要支付的发起付款
        if (res.data.data.length !== 0) {
          // todo 微信支付流程
          that.moneyPay(res.data.data)
          return
        } else {
          if (res.data.message === '应邀者付清') {
            return wx.showToast({
              title: '需应邀者付清'
            })
          } else if (res.data.message === '该订单已经完成支付') {
            return wx.showToast({
              title: '该订单已完成支付'
            })
          }
          that.getOrderInfo(that.data.id)
        }
      }
    }
    app.wxrequest(orderPayobj)
  },
  // 关闭弹窗
  closeMoneyMask () {
    this.setData({
      orderMask: false
    })
  },
  // 获取用户金额情况
  getUserMoney () {
    let that = this
    let gum = {
      url: useUrl.payIndex,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        if (res.data.code === 200) {
          that.setData({
            coin: res.data.data.coin || 0
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(gum)
  },
  moneyPay (e) {
    // console.log(e)
    let that = this
    // 支付参数
    let payObj = {
      timeStamp: e.timeStamp,
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      success (res) {
        // 支付成功响应
        console.log('支付情况', res)
        if (res.errMsg === 'requestPayment:ok') {
          wx.showToast({
            title: '支付成功'
          })
          that.getOrderInfo(that.data.id)
        }
      },
      fail (res) {
        wx.showToast({
          title: '未完成支付'
        })
        console.log('支付失败', res)
      }
    }
    app.wxpay(payObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    // console.log(!params.id)
    if (params.id === 'null') {
      // console.log(1)
      wx.showToast({
        title: '无法查看尚未确认订单',
        duration: 1000,
        mask: true
      })
      return setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      })
    } else {
      this.setData({
        id: params.id,
        status: params.status,
        pay: params.pay
      })
      this.getOrderInfo(params.id)
      this.getUserInfo()
    }
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
