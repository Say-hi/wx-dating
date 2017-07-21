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
      // {
      //   number: 6321654165,
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   title: 'Kiss Bottle 全新手工制甜品餐',
      //   time: '2017.05.20 18:30',
      //   address: '珠江新城',
      //   money: '158',
      //   status: 1
      // },
      // {
      //   number: 6321654165,
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   title: 'Kiss Bottle 全新手工制甜品餐',
      //   time: '2017.05.20 18:30',
      //   address: '珠江新城',
      //   money: '158',
      //   status: 2
      // },
      // {
      //   number: 6321654165,
      //   status: 0
      // }
    ]
  },
  // 查看详情
  goDetail (e) {
    let that = this
    // let status = e.currentTarget.dataset.status * 1
    let topCur = this.data.topCur * 1
    // if (status === 0) {
    //   wx.navigateTo({
    //     url: '../survey/survey?id=' + e.currentTarget.dataset.id + '&topCur=' + that.data.topCur + '&write=true' + '&orderId=' + e.currentTarget.dataset.orderid + '&type=' + e.currentTarget.dataset.type
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../survey/survey?id=' + e.currentTarget.dataset.id + '&topCur=' + that.data.topCur + '&write=false' + '&orderId=' + e.currentTarget.dataset.orderid + '&type=' + e.currentTarget.dataset.type
    //   })
    // }
    if (topCur === 1) {
      wx.navigateTo({
        url: '../survey/survey?id=' + e.currentTarget.dataset.id + '&topCur=' + that.data.topCur + '&write=true' + '&orderId=' + e.currentTarget.dataset.orderid
      })
    } else {
      wx.navigateTo({
        url: '../showsurvey/showsurvey?id=' + e.currentTarget.dataset.id + '&topCur=' + that.data.topCur + '&write=false' + '&orderId=' + e.currentTarget.dataset.orderid
      })
    }
  },
  // 选择顶部nav
  chooseTop (e) {
    this.setData({
      orderArr: []
    })
    if (e.currentTarget.dataset.index * 1 === 1) {
      this.getMySend(1)
    } else {
      this.getMyReceive(1)
    }
    this.setData({
      topCur: e.currentTarget.dataset.index * 1,
      page: 1
    })
  },
  // 获取我收到的问卷
  getMyReceive (page) {
    let that = this
    let obj = {
      url: useUrl.myReceiveQuestionnaires,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success (res) {
        // console.log(res)
        if (res.data.data.length <= 0) {
          return wx.showToast({
            title: '没有更多内容啦',
            mask: true
          })
        }
        that.setData({
          orderArr: that.data.orderArr.concat(res.data.data)
        })
      }
    }
    app.wxrequest(obj)
  },
  // 获取我发出的问卷
  getMySend (page) {
    let that = this
    let sendObj = {
      url: useUrl.myFachuQuestionnaires,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page
      },
      success (res) {
        if (res.data.data.length <= 0) {
          return wx.showToast({
            title: '没有更多内容啦',
            mask: true
          })
        }
        that.setData({
          orderArr: that.data.orderArr.concat(res.data.data)
        })
      }
    }
    app.wxrequest(sendObj)
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
    this.setData({
      orderArr: [],
      page: 1
    })
    if (this.data.topCur * 1 === 1) {
      this.getMySend(1)
    } else {
      this.getMyReceive(1)
    }
  },
  // 触底刷新
  onReachBottom () {
    let that = this
    if (this.data.topCur === 1) {
      this.getMySend(++that.data.page)
    } else {
      this.getMyReceive(++that.data.page)
    }
  }
})
