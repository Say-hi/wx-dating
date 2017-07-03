// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'user',
    // 视屏
    logins: false,
    hasvideo: true,
    hasmessage: true, // 有消息状态
    videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    videoCover: '../../images/video_cover.jpg',
    videoPlay: '../../images/play.png',
    videoControls: true,
    autoplay: false,
    show: true,
    playStatus: false,
    objectFit: 'fill',
    // 相册
    userPhotos: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
    ],
    open_types: 'navigate',
    // 用户操作
    opertaion: [
      {
        title: 'TA的档案',
        ico: 'icon-dangan',
        url: '../taRecord/taRecord'
      },
      {
        title: '账户余额',
        ico: 'icon-yue',
        url: '../newuser/newuser'
      },
      {
        title: '问卷调查',
        ico: 'icon-wenjuan',
        url: '../message/message'
      },
      {
        title: 'FAQ',
        ico: 'icon-FAQ'
      },
      {
        title: '反馈与客服',
        ico: 'icon-fankui'
      }
    ]
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
