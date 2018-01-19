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
    userInfo: {
      avatarUrl: '../../images/login-img.png'
    },
    // 视屏
    hasmessage: false, // 有消息状态
    videoSrc: '',
    videoCover: '',
    videoPlay: '../../images/play.png',
    videoControls: true,
    autoplay: true,
    show: true,
    playStatus: false,
    objectFit: 'fill',
    // 相册
    userPhotos: [],
    open_types: 'navigate',
    // 用户操作
    opertaion: [
      {
        title: '消息箱',
        ico: 'icon-xiaoxi',
        url: '../message/message'
      },
      {
        title: 'TA的档案',
        ico: 'icon-dangan',
        url: '../taRecord/taRecord'
      },
      {
        title: '券包余额',
        ico: 'icon-yue',
        url: '../account/account'
      },
      {
        title: '问卷调查',
        ico: 'icon-wenjuan',
        url: '../mySurvey/mySurvey'
      },
      {
        title: '帮助指南',
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
        if (res.data.code === 200) {
          let hasvideo = false
          if (res.data.data.video_url.length > 0) {
            hasvideo = true
          }
          // let { userInfo } = that.data
          // userInfo['avatarUrl'] = res.data.data.avatar
          // userInfo['nickName'] = res.data.data.user_nicename
          // userInfo['gender'] = res.data.data.sex
          that.setData({
            hasvideo: hasvideo,
            // userInfo: that.data.userInfo,
            userPhotos: res.data.data.photos || [],
            videoSrc: res.data.data.video_url,
            videoCover: res.data.data.video_image || '../../images/login-bg.png'
          })
        } else {
          // wx.showToast({
          //   title: '未授权登陆,请点击【立即登录】'
          // })
        }
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
        console.log(res)
        if (res.duration > 60) {
          return wx.showToast({
            title: '请选择视频时间小于1分钟的'
          })
        }
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
  edit () {
    let that = this
    wx.showActionSheet({
      itemList: ['修改封面图片', '重新上传视频', '删除视频', '删除封面'],
      itemColor: '#FCC0A4',
      success (res) {
        if (res.tapIndex * 1 === 0) {
          that.editVideo()
        } else if (res.tapIndex * 1 === 1) {
          that.upVideo()
        } else if (res.tapIndex * 1 === 2) {
          let upVideo = {
            url: useUrl.updateVideoUrl,
            data: {
              session_key: wx.getStorageSync('session_key'),
              file: ''
            },
            success (res) {
              wx.hideLoading()
              // console.log(res)
              // let jsonObj = JSON.parse(res.data).data.res_file
              that.setData({
                videoSrc: '',
                hasvideo: false
              })
            }
          }
          app.wxrequest(upVideo)
        } else if (res.tapIndex * 1 === 3) {
          app.wxrequest({
            url: useUrl.updateVideoImage,
            data: {
              session_key: wx.getStorageSync('session_key'),
              video_image: ''
            },
            success () {
              wx.hideLoading()
              that.setData({
                videoCover: '../../images/login-bg.png'
              })
            }
          })
        }
      }
    })
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
  // 获取自己的资料
  getMyInfoid () {
    // let that = this
    let getobj = {
      url: useUrl.getUserInfoBySelf,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        wx.navigateTo({
          url: `../userInfo/userInfo?userId=${res.data.data.user_id}&type=self`
        })
      }
    }
    app.wxrequest(getobj)
  },
  // 重新拉起授权
  getUserInfo () {
    if (this.data.logins) {
      wx.navigateTo({
        url: '../userziliao/userziliao'
      })
      return
    }
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
    let s = wx.getSystemInfoSync()
    let ss = false
    // console.log(s)
    if (s.brand === 'iPhone' && parseInt(s.system.split(' ')[1]) <= 10) {
      // console.log(1)
      ss = true
      wx.showModal({
        title: '视频播放',
        content: '由于IOS版本较低，视频无法播放',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            return
          }
        }
      })
    }
    // if (ss) {
    //   setTimeout(() => {
    //     this.setData({
    //       autoplay: true,
    //       show: false,
    //       playStatus: true
    //     })
    //   }, 1500)
    // } else {
    //   this.setData({
    //     autoplay: true,
    //     show: false,
    //     playStatus: true
    //   })
    // }
    if (!ss) {
      this.setData({
        autoplay: true,
        show: false,
        playStatus: true
      })
    }
    // console.log('s', parseInt(s.system))
    // // if (s.brand && parseInt(s.system < 10.3))
    // this.setData({
    //   autoplay: true,
    //   show: false,
    //   playStatus: true
    // })
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
      url: useUrl.userHasNewMessage,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        if (res.data.data.isHas * 1 === 1) {
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
    // app.wxlogin()
    let that = this
    if (wx.getStorageSync('userInfo')) {
      wx.login({
        success () {
          wx.getUserInfo({
            success (res) {
              // console.log(res)
              res.userInfo['check'] = true
              that.setData({
                userInfo: res.userInfo,
                logins: true
              })
            }
          })
        }
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
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.getMessage()
    this.getMyInfo()
    // let s =
    // console.log('s',s.system.split(" "))
    // console.log('s', )
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
  }

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh () {
  //   // TODO: onPullDownRefresh
  //   // wx.stopPullDownRefresh()
  //   // if (!this.data.hasvideo) return
  //   // this.playVideo()
  // }
})
