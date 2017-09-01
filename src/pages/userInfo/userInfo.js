// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'userInfo',
    logins: true,
    // 视屏
    videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    videoCover: '../../images/video_cover.jpg',
    videoPlay: '../../images/play.png',
    videoControls: true,
    autoplay: false,
    show: true,
    playStatus: false,
    objectFit: 'Fill',
    // 用户信息
    // userDetail: ['单身', '20-28岁', '188cm', '广告行业'],
    houseArr: ['暂无信息', '有房有车', '有房无车', '有车无房', '车房代购'],
    showMoreBtn: true,
    showTaDeep: false,
    userInfos: {},
    // 按钮文字
    btnText: '+关注',
    disabled: false,
    // invite
    invite: [],
    // 相册
    userPhotos: [],
    open_types: 'navigate',
    // 评价
    estimate: []
  },
  // 获取用户的详细资料
  getUserDetail (id) {
    let that = this
    let getObj = {
      url: useUrl.ViewUserInformation,
      data: {
        session_key: wx.getStorageSync('session_key'),
        view_user_id: id
      },
      success (res) {
        res.data.data.job = res.data.data.job.split('-')[1]
        // res.data.data.shenduziliao = false
        res.data.data['video_image'] = res.data.data.video_image ? res.data.data.video_image : '../../images/login-bg.png'
        that.setData({
          user: res.data.data
        })
      }
    }
    app.wxrequest(getObj)
  },
  // 去除视屏区域
  videodel () {
    this.setData({
      show: true
    })
  },
  // 显示更多
  // showMore () {
  //   let name = '李四' + Math.floor(Math.random() * 10)
  //   let obj = {
  //     src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
  //     name: name,
  //     gender: 1,
  //     text: '李四444'
  //   }
  //   this.data.estimate.push(obj)
  //   this.data.estimate.push(obj)
  //   this.data.estimate.push(obj)
  //   let newestimate = this.data.estimate
  //   this.setData({
  //     estimate: newestimate
  //   })
  // },
  // 关注
  follow () {
    // console.log(e)
    let that = this
    let obj = {
      url: useUrl.subscribeByUser,
      data: {
        session_key: wx.getStorageSync('session_key'),
        user_id: that.data.user.user_id
      },
      success (res) {
        // console.log(res)
        if (res.data.code === 200) {
          wx.showToast({
            title: '关注成功'
          })
          that.getUserDetail(that.data.id)
          // that.data.user.isSubscribe = true
          // that.setData({
          //   btnText: '已关注',
          //   disabled: true,
          //   user: that.data.user
          // })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(obj)
  },
  // 播放视屏
  playVideo () {
    this.setData({
      autoplay: true,
      show: false,
      playStatus: true
    })
  },
  // 视屏结束
  playFinish () {
    this.setData({
      autoplay: false,
      show: true,
      playStatus: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.setData({
      id: params.userId,
      type: params.type || 's'
    })
    if (params.type === 'out') {
      app.wxlogin(this.getUserDetail, params.userId)
    } else {
      this.getUserDetail(params.userId)
    }
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
  // 下拉操作
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
    wx.stopPullDownRefresh()
    this.playVideo()
  },
  // 上拉触底操作
  onReachBottom () {
    // todo 判断是否关注了
    if (!this.data.user.isSubscribe) {
      return wx.showToast({
        title: '您需要关注用户方可查看深度资料'
      })
    }
    this.setData({
      showTaDeep: true,
      showMoreBtn: false
    })
  },
  onShareAppMessage () {
    this.setData({
      type: 's'
    })
    return {
      title: '有人要一起分享吗？',
      path: `pages/userInfo/userInfo?userId=${this.data.id}&type=out`,
      success () {
        wx.reLaunch({
          url: '../index2/index2'
        })
      }
    }
  }
})
