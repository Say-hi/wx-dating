// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'recharge',
    curTab: true,
    chargeFail: false
  },
  // 获取输入的礼品卷码
  inputValue (e) {
    this.setData({
      code: e.detail.value
    })
  },
  delMask () {
    this.setData({
      maskshow: false
    })
  },
  // 礼品卷充值
  codeMoney () {
    let that = this
    let codeObj = {
      url: useUrl.chongZhiLipingjuan,
      data: {
        session_key: wx.getStorageSync('session_key'),
        code: that.data.code
      },
      success (res) {
        if (res.data.code === 200) {
          that.setData({
            maskshow: true,
            chargeFail: false
          })
          return
        } else {
          that.setData({
            chargeFail: true,
            maskshow: false
          })
          return wx.showToast({
            title: res.data.message,
            mask: true
          })
        }
      }
    }
    app.wxrequest(codeObj)
  },
  // chooseTab (e) {
  //   let that = this
  //   if (e.currentTarget.dataset.type === 'wx') {
  //     that.setData({
  //       curTab: true
  //     })
  //   } else {
  //     that.setData({
  //       curTab: false
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
