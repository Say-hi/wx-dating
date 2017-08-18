// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datashows: false
  },
  // 用户资料检查
  checkUser () {
    let that = this
    let obj = {
      url: useUrl.isPerfectData,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        if (res.data.data.is_perfect_data.toString() === '0') {
          // 完整数据 1
          that.setData({
            datashows: true
          })
        } else if (res.data.data.is_perfect_data.toString() === '1') {
          that.setData({
            datashows: false
          })
        }
        if (res.data.data.isShiyue.toString() === '1') {
          // 失约超过次数 1超
          that.setData({
            cancelshow: true
          })
        }
        if (res.data.data.isHasBaomoney.toString() === '0') {
          // 无保证金 0
          that.setData({
            moneyshow: true
          })
        }
      }
    }
    app.wxrequest(obj)
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
        // console.log(res)
          // todo 支付
        let yxObj = {
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          paySign: res.data.data.paySign,
          success (res) {
            // 支付成功
            if (res.errMsg === 'requestPayment:ok') {
              wx.showToast({
                title: '保证金充值成功',
                mask: true
              })
              that.setData({
                moneyshow: false
              })
            }
          },
          fail (res) {
            // 支付失败
            console.log('支付失败', res)
            wx.showToast({
              title: '充值失败，请再次尝试',
              mask: true
            })
          }
        }
        app.wxpay(yxObj)
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
    this.checkUser()
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
      orderId: params.id
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
