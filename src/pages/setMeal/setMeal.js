// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    height: '500rpx',
    width: '750rpx',
    mode: 'aspectFill',
    // 中间区域
    title: 'Mr.Rocky双人火焰牛排餐',
    address: '广州·天河区',
    price: '168',
    // 商店相关
    shopTitle: 'Mr.Rocky 洛奇先生餐吧',
    shopTime: '2017.05.20',
    shopAddress: '珠江新城华夏路6号'
  },
  // 触摸开始
  touchStart (e) {
    this.setData({
      startY: e.changedTouches[0].clientY
    })
  },
  touchMove (e) {
    let moveY = e.changedTouches[0].clientY
    let height = parseInt(this.data.height)
    let width = parseInt(this.data.width)
    // console.log(moveY - parseInt(this.data.startY))
    if ((moveY - parseInt(this.data.startY)) < 0) return
    height += (moveY - parseInt(this.data.startY)) / 30
    width += (moveY - parseInt(this.data.startY)) / 60
    // console.log(height)
    height = height + 'rpx'
    width = width + 'rpx'
    // console.log(height)
    this.setData({
      height: height,
      width: width
    })
  },
  touchEnd () {
    this.setData({
      height: '500rpx',
      width: '750rpx'
    })
  },
  forOtherPeople () {
    wx.redirectTo({
      url: '../taRecordDetail/taRecordDetail?type=forOther'
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
