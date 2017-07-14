// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'otherConfirm'
  },
  getOrderInfo (id) {
    // let that = this
    let ocbj = {
      url: useUrl.comfireByTitaFaqi,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_ta_id: id
      },
      success (res) {
        console.log(res)
      }
    }
    app.wxrequest(ocbj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    app.wxlogin(getOrderInfo(params.orderTaId))
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
