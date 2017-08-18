// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'duixianglist',
    curIndex: 0,
    rankArr: [
      {
        text: '价格由低到高',
        desc: 'money_asc'
      },
      {
        text: '价格由高到低',
        desc: 'money_desc '
      },
      {
        text: '约会时间先后',
        desc: 'time_asc'
      }
    ],
    show: false
  },
  cancel () {
    this.setData({
      show: false
    })
  },
  yingyoa (e) {
    let that = this
    wx.reLaunch({
      url: '../invitedConfirm/invitedConfirm?id=' + e.currentTarget.dataset.id + '&title=' + that.data.title
    })
  },
  showrank () {
    this.setData({
      show: true
    })
  },
  // 选择排序
  rank (e) {
    this.setData({
      curIndex: e.currentTarget.dataset.index,
      show: false
    })
    this.getList(this.data.id, this.data.rankArr[e.currentTarget.dataset.index]['desc'])
  },
  // 获取列表对象
  getList (id, sort) {
    let that = this
    let time = wx.getStorageSync('time')
    let date = time.y + '-' + (time.m_n < 10 ? '0' + time.m_n : time.m_n) + '-' + (time.d < 10 ? '0' + time.d : time.d)
    // console.log(date)
    let listObj = {
      url: useUrl.engagementObjictList,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id,
        date: date,
        sort: sort || 'money_asc'
      },
      success (res) {
        // console.log(res)
        if (res.data.data.length === 0) {
          return wx.showToast({
            title: '没有新的内容了',
            mask: true
          })
        }
        for (let i of res.data.data) {
          if (i.job) {
            i.job = i.job.split('-')[1]
          } else {
            i.job = '用户未填写'
          }
        }
        that.setData({
          listArr: res.data.data
        })
      }
    }
    app.wxrequest(listObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.setData({
      id: params.id || 6,
      title: params.title || '重庆鸡公煲'
    })
    this.getList(params.id || 6)
    let t = wx.getStorageSync('time')
    this.setData({
      time: t.d + 'th,' + t.m
    })
    // this.getList(6)
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
