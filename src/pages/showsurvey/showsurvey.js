// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'survey',
    userInfo: {},
    curChoose: 2,
    show: false,
    write: false,
    hide: true
  },
  delMask () {
    let that = this
    this.setData({
      show: false
    })
    wx.redirectTo({
      // url: '../survey/survey?orderId=' + that.data.orderId
      url: '../survey/survey?id=0' + '&write=true' + '&orderId=' + that.data.orderId
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
  // 获取问卷详情
  getQuestionDetail (id) {
    let that = this
    let queObj = {
      url: useUrl.questionnairesDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id
      },
      success (res) {
        if (res.data.code === 401) {
          return that.setData({
            show: true
          })
        }
        let s = res.data.data.questionnaires_info
        that.setData({
          question_one: s.question_one,
          question_two: s.question_two,
          question_three: s.question_three,
          question_four: s.question_four,
          type: s.type
        })
        if (!res.data.data.user_info) return
        res.data.data.user_info.job = res.data.data.user_info.job.split('-')[1]
        that.setData({
          userInfo: res.data.data.user_info
        })
      }
    }
    app.wxrequest(queObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    // let that = this
    this.setData({
      orderId: params.orderId,
      id: params.id
    })
    this.getQuestionDetail(params.id)
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
