// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'inviteEvaluate'
  },
  textInput (e) {
    this.setData({
      textValue: e.detail.value.toString()
    })
  },
  // 发送信息
  send () {
    if (!wx.getStorageSync('session_key')) {
      return wx.showToast({
        title: '您为授权小程序,无法发送评论，请删除小程序后,再打开链接并授权'
      })
    }
    if (this.data.textValue.length === 0) {
      return wx.showToast({
        title: '请填写评论内容'
      })
    }
    let that = this
    let obj = {
      url: useUrl.postApplyUserComment,
      data: {
        session_key: wx.getStorageSync('session_key'),
        comment_user_id: that.data.id,
        comment_content: that.data.textValue
      },
      success (res) {
        if (res.data.code === 200) {
          wx.showToast({
            title: '评价成功',
            mask: true
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/index2/index2'
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(obj)
  },
  // 获取评价用户信息
  getInfo (id) {
    let that = this
    let getObj = {
      url: useUrl.applyUserComment,
      data: {
        session_key: wx.getStorageSync('session_key'),
        comment_user_id: id
      },
      success (res) {
        res.data.data.job = res.data.data.job.split('-')[1]
        that.setData({
          user: res.data.data
        })
      }
    }
    app.wxrequest(getObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    let that = this
    this.setData({
      id: params.id
    })
    app.wxlogin(that.getInfo, params.id)
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
