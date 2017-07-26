// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'account',
    shwoWhat: 'detail'
  },
  // 获取用户余额
  getUserMoney () {
    let that = this
    let moneyObj = {
      url: useUrl.payIndex,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        // console.log(res)
        that.setData({
          sincerityMoney: res.data.data.bao_money * 1,
          money: res.data.data.coin
        })
      }
    }
    app.wxrequest(moneyObj)
  },
  // 充值保证金
  chargeBao () {
    // let that = this
    let chargeObj = {
      url: useUrl.payByBond,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        console.log('保证金支付', res)
        let yxObj = {
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          paySign: res.paySign,
          success (res) {
            // 支付成功
            wx.showToast({
              title: '保证金充值成功',
              mask: true
            })
          },
          fail (res) {
            // 支付失败
            wx.showToast({
              title: '充值失败，请再次尝试',
              mask: true
            })
          }
        }
        app.wxpay(yxObj)
      }
    }
    app.wxrequest(chargeObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getUserMoney()
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
