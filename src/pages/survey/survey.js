// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'survey',
    userInfo: {
      avatarUrl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      nickName: '兔子',
      gender: 1
    },
    userDetail: ['单身', '20-28岁', '188cm', '广告行业'],
    curChoose: 2,
    chooseArr: [
      {
        name: 'noshow',
        value: '匿名',
        text: '等到地方收到至少2份匿名问卷后才能看到'
      },
      {
        name: 'show',
        value: '交换',
        text: '需要对方填写提交后才能看到'
      },
      {
        name: 'free',
        value: '开放',
        text: '无条件开放给对方看'
      }
    ],
    // impression: '幽默',
    // moment: '幽默',
    // possible: '80%',
    // doing: '再约',
    show: true,
    write: false,
    hide: true
  },
  delMask () {
    this.setData({
      show: false
    })
  },
  goback () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 选择交换方式
  chooseArr (e) {
    this.setData({
      curChoose: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.setData({
      write: params.write
    })
    if (params.write === 'false') {
      // todo getdata
      this.setData({
        impression: '幽默',
        moment: '幽默',
        possible: '80%',
        doing: '再约'
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
