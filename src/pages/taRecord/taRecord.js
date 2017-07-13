// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'taRecord',
    choose: false,
    userList: []
  },
  getRecordData () {
    let that = this
    let rd = {
      url: useUrl.getTaArchives,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        console.log(res)
        that.setData({
          userList: res.data.data
        })
      }
    }
    app.wxrequest(rd)
  },
  // 选择替Ta发起的对象
  backChoose (e) {
    wx.redirectTo({
      url: '../taRecordDetail/taRecordDetail?type=forOther&userId=' + e.currentTarget.dataset.id
    })
  },
  // 跳转到对应的资料编辑页面
  gotodetail (e) {
    let id = e.currentTarget.dataset.id
    let obj = {
      url: '../taRecordDetail/taRecordDetail?id=' + id
    }
    wx.navigateTo(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (e) {
    // console.log(e)
    if (e.type === 'choose') {
      this.setData({
        choose: true
      })
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
    this.getRecordData()
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
