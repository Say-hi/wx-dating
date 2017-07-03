// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'orderDatial',
    order: {
      number: 123123,
      status: 1,
      restaurantImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      restaurantText: 'Mr.Rock 双人火焰牛排餐',
      userImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      userName: '崔大炮',
      gender: 1,
      // money: 10,
      // reason: '奥斯卡地方哈萨克老地方哈快速的合法快速将地方哈快速的减肥哈萨克的减肥哈斯的考虑返回萨多浪费撒大黄蜂',
      // respond: '上拉阿隆索的减肥啦；思考的风景拉萨的；风景撒旦；浪费就撒地方叫阿斯顿飞',
      conversion: 12341234
    },
    datingInfo: [
      {
        title: '时间',
        text: '2017.05.20(周日)18:00'
      },
      {
        title: '地址',
        text: '珠江新城华夏路16号'
      },
      {
        title: '约会对象',
        text: '兔脚'
      },
      {
        title: '费用',
        text: '￥168'
      },
      {
        title: '联系手机',
        text: '18855953482'
      },
      {
        title: '约会类型',
        text: '寻约会对象'
      },
      {
        title: '付款类型',
        text: '我付清'
      }
    ]
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
