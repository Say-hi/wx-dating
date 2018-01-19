// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'stranger',
    strangerList: [
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '好友一号',
        nickName: 'Jack Jhon',
        gender: 1,
        id: 123,
        miss: 1
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '好友二号',
        nickName: 'Jack Jhon',
        gender: 2,
        id: 234,
        miss: 2
      }
    ]
  },
  // 忽略消息
  getmiss (e) {

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
