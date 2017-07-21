// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'user',
    // 视屏
    hasmessage: true, // 有消息状态
    videoSrc: '',
    videoCover: '',
    videoPlay: '../../images/play.png',
    videoControls: true,
    autoplay: false,
    show: true,
    playStatus: false,
    objectFit: 'fill',
    // 相册
    userPhotos: [],
    open_types: 'navigate',
    // 用户操作
    opertaion: [
      {
        title: 'TA的档案',
        ico: 'icon-dangan',
        url: '../taRecord/taRecord'
      },
      {
        title: '卷包余额',
        ico: 'icon-yue',
        url: '../account/account'
      },
      {
        title: '问卷调查',
        ico: 'icon-wenjuan',
        url: '../mySurvey/mySurvey'
      },
      {
        title: 'FAQ',
        ico: 'icon-FAQ',
        url: '../faq/faq'
      },
      {
        title: '反馈与客服',
        ico: 'icon-fankui',
        url: '../kefu/kefu'
      }
    ]
  },
  // 获取个人信息
  getMyInfo () {
    let that = this
    let getMO = {
      url: useUrl.getUserinfo,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        // console.log(res)
        let hasvideo = false
        // console.log(res)
        // console.log(res.data.data.video_url)
        if (res.data.data.video_url.length > 0) {
          hasvideo = true
        }
        that.setData({
          hasvideo: hasvideo,
          userPhotos: res.data.data.photos,
          videoSrc: res.data.data.video_url,
          videoCover: res.data.data.video_cover || '../../images/video_cover.jpg'
        })
      }
    }
    app.wxrequest(getMO)
  },
  // 上传视频
  upVideo () {
    let videoObj = {
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'front',
      success (res) {
        // todo 视频相关
        // 视频文件路径
        // console.log(res.tempFilePath)
        // console.log(res)
      }
    }
    wx.chooseVideo(videoObj)
  },
  // 编辑相册封面
  editVideo () {
    // todo
    // 视频遮盖图修改
    console.log(1)
  },
  videodel () {
    this.setData({
      show: true
    })
  },
  // 重新拉起授权
  getUserInfo () {
    if (this.data.userInfo) return
    let that = this
    wx.openSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success (data) {
              // console.log(data)
              wx.setStorageSync('userInfo', data.userInfo)
              that.setData({
                userInfo: data.userInfo,
                logins: true
              })
            }
          })
        }
      }
    })
  },
  // 播放视屏
  playVideo () {
    this.setData({
      autoplay: true,
      show: false,
      playStatus: true
    })
  },
  // 视频播放结束
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
  onLoad () {
    // TODO: onLoad
    // app.login()
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        logins: true
      })
    } else {
      this.setData({
        logins: false
      })
    }
    this.getMyInfo()
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
    wx.stopPullDownRefresh()
    this.playVideo()
  }
})
