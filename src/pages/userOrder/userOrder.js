// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'userOrder',
    orderMask: false,
    topTab: ['本人发起', '本人应邀', '替Ta发起'],
    tabCurrent: 0,
    page: 1,
    orderMine: []
  },
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
  // 取消赴约&&查看应邀
  cancelCheck (e) {
    // let index = e.currentTarget.dataset.index
    let status = e.currentTarget.dataset.status * 1
    let orderId = e.currentTarget.dataset.id
    let tabCurrent = this.data.tabCurrent
    this.setData({
      setIndex: e.currentTarget.dataset.index
    })
    // console.log(orderId)
    // console.log(status)
    // console.log(tabCurrent)
    if (status === 0 && tabCurrent === 0) {
      // todo 查看应邀
      wx.navigateTo({
        // url: '../checkInvited/checkInvited?orderId=' + orderId +
        url: `../checkInvited/checkInvited?orderId=${orderId}&ta=${e.currentTarget.dataset.ta}`
      })
    } else if ((status === 1 || status === 4) && tabCurrent !== 2) {
      // todo 取消赴约
      wx.navigateTo({
        url: '../cancelOrder/cancelOrder?id=' + orderId + '&status=' + status
      })
    } else if (status === 0 && tabCurrent === 2) {
      // todo 提醒功能
    } else if (status === 0 && tabCurrent === 1) {
      // todo 微信支付
      // console.log(1)
      wx.showLoading({
        title: '正在请求支付中...'
      })
      setTimeout(() => {
        wx.hideLoading()
        this.getUserMoney()
        this.setData({
          orderMask: true,
          orderId: orderId
        })
      }, 300)
    }
  },
  goPay () {
    this.payMoney(this.data.orderId)
  },
  // 支付操作
  payMoney (id) {
    let that = this
    let payObj = {
      url: useUrl.payByOrder,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: id
      },
      success (res) {
        console.log(res)
        // todo 微信支付流程
        if (res.data.data.length !== 0) {
          // app.wxpay(res.data.data)
          let e = res.data.data
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
                  title: '支付成功，订单已确认'
                  // mask: true
                })
                that.setData({
                  page: 1,
                  orderMine: [],
                  orderMask: false
                })
                that.getInfo(that.data.tabCurrent, 1)
                // setTimeout(function () {
                //   wx.redirectTo({
                //     url: '../userOrder/userOrder'
                //   })
                // }, 1000)
              }
            },
            fail (res) {
              console.log('支付失败', res)
            }
          }
          app.wxpay(payObj)
        } else {
          // 余额支付成功
          that.setData({
            orderMask: false
          })
          wx.showToast({
            title: '支付成功，订单已确认'
            // mask: true
          })
          that.setData({
            page: 1,
            orderMine: [],
            orderMask: false
          })
          that.getInfo(that.data.tabCurrent, 1)
        }
      }
    }
    app.wxrequest(payObj)
  },
  // 顶部tab选择
  chooseTab (e) {
    this.setData({
      orderMine: [],
      tabCurrent: e.currentTarget.dataset.index,
      page: 1
    })
    this.getInfo(e.currentTarget.dataset.index, 1)
  },
  // 获取信息列表
  getInfo (type, page) {
    let that = this
    let obj = {
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success (res) {
        // console.log(res.data.data)
        if (res.data.data.length === 0) {
          return wx.showToast({
            title: '亲，没有更多内容啦~'
            // mask: true
          })
        }
        that.setData({
          orderMine: that.data.orderMine.concat(res.data.data)
        })
        // console.log(res)
      }
    }
    if (type === 0) {
      obj['url'] = useUrl.myOrderListsByFaqi
    } else if (type === 1) {
      obj['url'] = useUrl.benrenYingyaoOrderLists
    } else if (type === 2) {
      obj['url'] = useUrl.titafaqiOrderList
    }
    app.wxrequest(obj)
  },
  // 去到详情页
  goDetail (e) {
    if (this.data.tabCurrent * 1 === 2) return
    if (this.data.tabCurrent * 1 === 1 && e.currentTarget.dataset.status * 1 === 6) {
      return wx.showToast({
        title: '对方未确认您的应邀，无法查看信息'
      })
    }
    wx.navigateTo({
      url: `../orderDatial/orderDatial?id=${e.currentTarget.dataset.id}&status=${e.currentTarget.dataset.status}&pay=${e.currentTarget.dataset.pay}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    if (params.type === 'weixin') {
      let arr = [0, 1]
      app.wxlogin(this.getInfo, ...arr)
    }
    if (params.type === 'ta') {
      this.setData({
        tabCurrent: 2
      })
      return this.getInfo(2, 1)
    }
    this.getInfo(0, 1)
    // TODO: onLoad
  },

  /**
   *
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
    if (this.data.hide) {
      this.setData({
        page: 1,
        orderMine: []
      })
      this.getInfo(this.data.tabCurrent, 1)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    this.setData({
      hide: true
    })
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    this.setData({
      hide: false
    })
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  },
  // 触底加载数据
  onReachBottom () {
    this.getInfo(this.data.tabCurrent, ++this.data.page)
  }
})
