// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'mySurvey',
    topArr: [
      '我收到的问卷',
      '我发出的问卷'
    ],
    page: 1,
    topCur: 0,
    orderArr: [
      {
        number: 6321654165,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: 'Kiss Bottle 全新手工制甜品餐',
        time: '2017.05.20 18:30',
        address: '珠江新城',
        money: '158',
        status: 1
      },
      {
        number: 6321654165,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: 'Kiss Bottle 全新手工制甜品餐',
        time: '2017.05.20 18:30',
        address: '珠江新城',
        money: '158',
        status: 2
      },
      {
        number: 6321654165,
        status: 0
      }
    ]
  },
  // 查看详情
  goDetail (e) {
    let status = e.currentTarget.dataset.status
    if (status === 2) {
      wx.navigateTo({
        url: '../survey/survey?orderId=' + e.currentTarget.dataset.id + '&write=true'
      })
    } else {
      wx.navigateTo({
        url: '../survey/survey?orderId=' + e.currentTarget.dataset.id + '&write=false'
      })
    }
  },
  // 选择顶部nav
  chooseTop (e) {
    this.setData({
      topCur: e.currentTarget.dataset.index
    })
  },
  // 获取我收到的问卷
  getMyReceive (page) {
    // let that = this
    let obj = {
      url: useUrl.myReceiveQuestionnaires,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success (res) {
        console.log(res)
      }
    }
    app.wxrequest(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
    this.getMyReceive(1)
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
