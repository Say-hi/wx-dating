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
    hasmessage: false, // 有消息状态
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
        title: '我的资料',
        ico: 'icon-ziliao',
        url: '../userziliao/userziliao'
      },
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
        let hasvideo = false
        if (res.data.data.video_url.length > 0) {
          hasvideo = true
        }
        that.setData({
          hasvideo: hasvideo,
          userPhotos: res.data.data.photos,
          videoSrc: res.data.data.video_url,
          videoCover: res.data.data.video_image || '../../images/video_cover.jpg'
        })
      }
    }
    app.wxrequest(getMO)
  },
  // 上传视频
  upVideo () {
    let that = this
    let videoObj = {
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'front',
      success (res) {
        wx.showLoading({
          title: '视频上传中',
          mask: true
        })
        let i = res.tempFilePath
        let upVideo = {
          url: useUrl.updateVideoUrl,
          filePath: i,
          formData: {
            session_key: wx.getStorageSync('session_key'),
            file: i
          },
          success (res) {
            wx.hideLoading()
            // console.log(res)
            let jsonObj = JSON.parse(res.data).data.res_file
            that.setData({
              videoSrc: jsonObj,
              hasvideo: true
            })
          },
          fail (res) {
            console.log('上传错误', res)
            wx.showToast({
              title: '视频上传失败，请重新尝试',
              mask: true,
              duration: 1000
            })
          }
        }
        app.wxUpload(upVideo)
      }
    }
    wx.chooseVideo(videoObj)
  },
  // 编辑相册封面
  editVideo () {
    let that = this
    let obj = {
      count: 1,
      success (res) {
        wx.showLoading({
          title: '图片上传中',
          mask: true
        })
        let i = res.tempFilePaths[0]
        let upImg = {
          url: useUrl.uploadPhotos,
          filePath: i,
          formData: {
            session_key: wx.getStorageSync('session_key'),
            file: i
          },
          success (res) {
            wx.hideLoading()
            let jsonObj = JSON.parse(res.data).data.res_file
            let coverObj = {
              url: useUrl.updateVideoImage,
              data: {
                session_key: wx.getStorageSync('session_key'),
                video_image: jsonObj
              },
              success (res) {
                // console.log(res)
                that.setData({
                  videoCover: jsonObj
                })
                wx.showToast({
                  title: res.data.message
                })
              }
            }
            app.wxrequest(coverObj)
          },
          fail (res) {
            // console.log('上传错误', res)
            wx.showToast({
              title: '图片上传失败，请重新尝试',
              mask: true,
              duration: 1000
            })
          }
        }
        app.wxUpload(upImg)
      },
      fail (err) {
        console.log(err)
      }
    }
    wx.chooseImage(obj)
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
              app.wxlogin(that.getMyInfo)
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
  getMessage () {
    let that = this
    let obj = {
      url: useUrl.messageList,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        if (res.data.data.length !== 0 ) {
          that.setData({
            hasmessage: true
          })
        } else {
          that.setData({
            hasmessage: false
          })
        }
      }
    }
    app.wxrequest(obj)
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    this.getMessage()
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.getMyInfo()
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
