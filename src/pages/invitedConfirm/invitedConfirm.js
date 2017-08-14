// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // title: 'Mr.Rocky 双人火焰牛排餐',
    // time: '2017.05.20(周日)18:00',
    // address: '珠江新城华夏路6号',
    // people: 'Alex',
    // price: '168',
    // show: true
  },
  // 获取用户输入的手机号码
  phoneNumberIn (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 去除遮罩层
  delMask () {
    let that = this
    // 发起意向金的支付100支付
    let obj = {
      url: useUrl.payByBond,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        console.log(res)
        // if (res.data.message === 'Success') {
        if (res.data.message === '网络错误') {
          // todo 支付
          // let pay = {
          //   timeStamp:
          //   nonceStr:
          //   package:
          //   signType:
          //   paySign:
          // }
          // wx.requestPayment(pay)
          that.data.orderInfo.bao_money = 1
          that.setData({
            orderInfo: that.data.orderInfo
          })
        }
      }
    }
    app.wxrequest(obj)
  },
  // 意向应邀确认
  confirmInvited () {
    let that = this
    let obj = {
      url: useUrl.addApplyByInvitation,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: that.data.orderId,
        mobile: that.data.mobile
      },
      success (res) {
        // console.log(res)
        console.log(res.data.message)
        if (res.data.message === '申请邀约成功' || res.data.code === 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500,
            mask: true
            // success () {
            //   let obj = {
            //     url: '../index2/index2'
            //   }
            //   setTimeout(function () {
            //     wx.navigateTo(obj)
            //   }, 2000)
            // }
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.message,
            image: '../../images/jiong.png',
            duration: 2000,
            mask: true
          })
        }
      }
    }
    app.wxrequest(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    let that = this
    // todo 获取套餐信息
    let obj = {
      url: useUrl.confirmedByInvitation,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: params.id
      },
      success (res) {
        if (res.data.code === 400) {
          wx.showToast({
            title: '哎呀，您来晚了，该邀约已生效',
            mask: true
          })
          return setTimeout(function () {
            wx.navigateBack({
              delta: 2
            })
          }, 1500)
        }
        res.data.data.time = res.data.data.order_date.replace(/-/g, '.') + '(' + res.data.data.week + ')' + res.data.data.order_time
        that.setData({
          orderInfo: res.data.data
        })
        // console.log(res.data.data)
      }
    }
    app.wxrequest(obj)
    this.setData({
      title: params.title,
      orderId: params.orderId
    })
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
