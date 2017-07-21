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
    topTab: ['本人发起', '本人应邀', '替Ta发起'],
    tabCurrent: 0,
    page: 1,
    orderMine: []
  },
  // 取消赴约&&查看应邀
  cancelCheck (e) {
    // let index = e.currentTarget.dataset.index
    let status = e.currentTarget.dataset.status * 1
    let orderId = e.currentTarget.dataset.id
    let tabCurrent = this.data.tabCurrent
    // console.log(orderId)
    // console.log(status)
    // console.log(tabCurrent)
    if (status === 0 && tabCurrent === 0) {
      // todo 查看应邀
      wx.navigateTo({
        url: '../checkInvited/checkInvited?orderId=' + orderId
      })
    } else if (status === 1 && tabCurrent !== 2) {
      // todo 取消赴约
      wx.navigateTo({
        url: '../cancelOrder/cancelOrder?orderId=' + orderId
      })
    } else if (status === 0 && tabCurrent === 2) {
      // todo 提醒功能
    }
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
            title: '亲，没有更多内容啦~',
            mask: true
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
  },
  // 触底加载数据
  onReachBottom () {
    this.getInfo(this.data.tabCurrent, ++this.data.page)
  }
})
