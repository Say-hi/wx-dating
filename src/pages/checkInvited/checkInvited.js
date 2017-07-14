// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'checkInvited',
    chooseTab: true,
    userArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '崔大炮',
        gender: 1,
        marry: 1,
        job: '互联网行业',
        id: 41323
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '崔大炮',
        gender: 2,
        marry: 1,
        job: '互联网行业',
        id: 41323
      }
    ]
  },
  // 选择应邀者
  chooseUser (e) {
    let chooseIndex = e.currentTarget.dataset.index
    this.setData({
      chooseIndex: chooseIndex,
      chooseShow: true
    })
  },
  // 按钮点击判断
  btnClick (e) {
    let that = this
    let type = e.currentTarget.dataset.type
    if (type === 'cancel') {
      this.setData({
        chooseShow: false
      })
    } else if (type === 'confirm') {
      // todo 应邀者确定
      let sbj = {
        url: useUrl.acceptApplyInvitation,
        data: {
          session_key: wx.getStorageSync('session_key'),
          id: e.currentTarget.dataset.id
        },
        success (res) {
          console.log(res)
          // 选择成功
          if (res.data.code === 200) {
            that.setData({
              chooseTab: false
            })
          } else {
            // 失败操作
            return wx.showToast({
              title: '哎呀，服务器开小差了，请稍后再操作',
              image: '../../images/jiong.png',
              duration: 2000,
              mask: true
            })
          }
        }
      }
      app.wxrequest(sbj)
    } else if (type === 'confirm-two') {
      this.setData({
        chooseTab: true,
        chooseShow: false
      })
    }
  },
  getInviteUerList (id) {
    let that = this
    let obj = {
      url: useUrl.lookApplyInvitation,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: id
      },
      success (res) {
        that.setData({
          userArr: res.data.data
        })
        console.log(res)
      }
    }
    app.wxrequest(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (parmas) {
    this.getInviteUerList(parmas.orderId)
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
