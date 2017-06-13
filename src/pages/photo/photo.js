// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'photo',
    userPhotos: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    height: '500rpx',
    width: '750rpx',
    mode: 'aspectFill'
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
