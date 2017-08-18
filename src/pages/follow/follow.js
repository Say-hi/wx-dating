// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'follow',
    page: 1,
    people: []
  },
  // 用户确认搜索
  searchValue (e) {
    // this.getFollowUser(1, e.detail.value, '没有搜索到相关用户')
    let that = this
    let obj = {
      url: useUrl.getUserSubscribe,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: 1,
        user_name: e.detail.value
      },
      success (res) {
        // console.log(res)
        if (res.data.data.length === 0) {
          return wx.showToast({
            title: '亲，没有搜索到相关用户',
            image: '../../images/jiong.png',
            duration: 1000,
            mask: true
          })
        }
        let s = that.data.people.reverse().concat(res.data.data).reverse()
        that.setData({
          people: s
        })
      }
    }
    app.wxrequest(obj)
  },
  // 文本输入
  inputtext (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 弹窗
  follows (e) {
    if (e.currentTarget.dataset.follow * 1 === 1) {
      return wx.showToast({
        title: '您和Ta已互相关注啦',
        mask: true,
        duration: 1000
      })
    }
    this.setData({
      mask: true,
      id: e.currentTarget.dataset.id
    })
  },
  // 关注
  follow () {
    let that = this
    let fbj = {
      url: useUrl.remindSubscribe,
      data: {
        session_key: wx.getStorageSync('session_key'),
        subscribe_user_id: that.data.id,
        content: that.data.content || 'hi, 快来关注我吧'
      },
      success (res) {
        that.setData({
          mask: false
        })
        if (res.data.code === 400) {
          return wx.showToast({
            title: '亲，一天只能提醒Ta一次哦~'
          })
        }
        wx.showToast({
          title: '提醒成功'
        })
      }
    }
    app.wxrequest(fbj)
  },
  // 跳转到消息页面
  goNewfollow () {
    if (this.data.message) {
      wx.navigateTo({
        url: '../newfollow/newfollow'
      })
    }
  },
  // 获取用户关注的用户的列表
  getFollowUser (page, search, text) {
    let that = this
    let obj = {
      url: useUrl.getUserSubscribe,
      data: {
        session_key: wx.getStorageSync('session_key'),
        page: page,
        user_name: search || ''
      },
      success (res) {
        // console.log(res)
        if (res.data.data.length === 0) {
          return wx.showToast({
            title: text || '亲，没有更多的内容啦',
            image: '../../images/jiong.png'
          })
        }
        let s = that.data.people.concat(res.data.data)
        that.setData({
          people: s
        })
      }
    }
    app.wxrequest(obj)
  },
  // 获取陌生人提醒
  getstranger () {
    let that = this
    let gsbj = {
      url: useUrl.getStranger,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        if (res.data.data.length > 0) {
          that.setData({
            message: true
          })
        }
        wx.stopPullDownRefresh()
      }
    }
    app.wxrequest(gsbj)
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
    this.setData({
      page: 1,
      people: []
    })
    this.getFollowUser(1)
    this.getstranger()
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
    this.setData({
      people: [],
      page: 1
    })
    this.getFollowUser(1)
    this.getstranger()
  },
  onReachBottom () {
    this.getFollowUser(++this.data.page)
  }
})
