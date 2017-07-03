// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'cancelOrder',
    order: {
      number: 1232416,
      type: 0, // 0 自己发起的 1 别人发起的
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      title: 'Kiss Bottle 全新手工制甜品餐',
      time: '2017.05.20 18:30',
      address: '珠江新城',
      money: 158,
      pImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      pName: '凸角',
      pGender: 1,
      pReason: '萨克的覅双方都刷卡地方萨克的浪费和萨阿斯顿飞哈斯的空间费',
      pId: 12312321,
      zd: false
    },
    items: [
      {
        name: '1',
        value: '对方爽约，且不愿主动取消赴约',
        checked: false
      }
    ]
  },
  // 选择框
  checkboxChange () {
    let items = this.data.items
    items[0].checked = !items[0].checked
    this.setData({
      items: items
    })
  },
  confirmBtn () {
    // todo 信息上传
    this.setData({
      show: true
    })
  },
  // 关闭弹窗
  delMask () {
    this.setData({
      show: false
    })
    wx.switchTab({
      url: '../index2/index2'
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
