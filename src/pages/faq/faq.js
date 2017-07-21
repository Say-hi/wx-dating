// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
const WXParse = require('../../wxParse/wxParse')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'faq'
  },
  getfaq () {
    let that = this
    let getObj = {
      url: useUrl.getFaqLists,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        let answer = res.data.data[0].answer
        WXParse.wxParse('answer', 'html', answer, that, 5)
      }
    }
    app.wxrequest(getObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getfaq()
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
