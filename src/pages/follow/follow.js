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
    message: true,
    people: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '崔大炮',
        gender: 2,
        follow: 0,
        number: 12,
        id: 'YH123'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '崔大炮2',
        gender: 1,
        number: 1,
        follow: 0,
        id: 'YH143'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '崔大炮3',
        gender: 1,
        follow: 1,
        id: 'YH124'
      }
    ]
  },
  // 关注
  follow (e) {
    // let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let peopleArr = this.data.people
    if (peopleArr[index].is_subscribe === '1') {
      peopleArr[index].is_subscribe = '0'
    } else {
      peopleArr[index].is_subscribe = '1'
    }
    // peopleArr[index].is_subscribe = !peopleArr[index].is_subscribe
    this.setData({
      people: peopleArr
    })
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
  getFollowUser () {
    let that = this
    let obj = {
      url: useUrl.getUserSubscribe,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        console.log(res)
        that.setData({
          people: res.data.data
        })
      }
    }
    app.wxrequest(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
    this.getFollowUser()
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
