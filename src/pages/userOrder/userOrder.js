// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'userOrder',
    topTab: ['本人发起', '本人应邀', '替Ta发起'],
    tabCurrent: 0,
    orderMine: [
      {
        orderNumber: 12341234,
        status: 0,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: 'Kiss Bottle 全新手工制甜品餐',
        time: '2017.05.20 18:30',
        address: '珠江新城',
        money: 158,
        userImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        userName: '崔大炮',
        userGender: 2,
        userId: 1234123,
        codeNumber: 1234123
      },
      {
        orderNumber: 5674576452,
        status: 1,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: 'Kiss Bottle 全新手工制甜品餐',
        time: '2017.05.20 18:30',
        address: '珠江新城',
        money: 158,
        userImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        userName: '崔大炮',
        userGender: 1,
        userId: 1234123,
        codeNumber: 1234123
      },
      {
        orderNumber: 12341234,
        status: 2,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: 'Kiss Bottle 全新手工制甜品餐',
        time: '2017.05.20 18:30',
        address: '珠江新城',
        money: 158,
        userImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        userName: '崔大炮',
        userGender: 2,
        userId: 1234123,
        codeNumber: 1234123
      },
      {
        orderNumber: 12341234,
        status: 3,
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: 'Kiss Bottle 全新手工制甜品餐',
        time: '2017.05.20 18:30',
        address: '珠江新城',
        money: 158,
        userImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        userName: '崔大炮',
        userGender: 1,
        userId: 1234123,
        codeNumber: 1234123
      }
    ]
  },
  // 取消赴约&&查看应邀
  cancelCheck (e) {
    // let index = e.currentTarget.dataset.index
    let status = e.currentTarget.dataset.status
    // console.log(status)
    let orderId = e.currentTarget.dataset.id
    let tabCurrent = this.data.tabCurrent
    // console.log(orderId)
    if (status === 0 && tabCurrent === 1) {
      // todo 查看应邀
      wx.navigateTo({
        url: '../checkInvited/checkInvited?orderId=' + orderId
      })
    } else if (status === 1 && tabCurrent !== 2) {
      // todo 取消赴约
    } else if (status === 0 && tabCurrent === 2) {
      // todo 提醒功能
    }
  },
  // 顶部tab选择
  chooseTab (e) {
    this.setData({
      tabCurrent: e.currentTarget.dataset.index
    })
  },
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
