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
    userDetail: ['单身', '20-28岁', '188cm', '广告行业'],
    houseArr: ['暂无信息', '有房有车', '有房无车', '有车无房', '车房代购'],
    showMoreBtn: true,
    showTaDeep: false,
    userInfos: {
      company: '广东银燕传奇广告有限公司',
      house: '有房有车',
      sport: '慢跑',
      movie: '七星报喜',
      book: '解忧杂货铺'
    },
    // 按钮文字
    btnText: '+关注',
    disabled: false,
    // invite
    invite: [
      {
        time: '2017.06.01',
        address: '体育西路',
        id: 'inv-123'
      },
      {
        time: '2017.06.01',
        address: '体育西路asdfasdfsadfsadf',
        id: 'inv-123'
      }
    ],
    // 相册
    userPhotos: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    open_types: 'navigate',
    // 评价
    estimate: [
      {
        src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '李四',
        gender: 1,
        text: '我是李四'
      },
      {
        src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '李四2',
        gender: 2,
        text: '李四22as拉萨；空间的发生；了地方见撒旦；浪费撒旦2'
      }
    ]
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
  showMore () {
    let name = '李四' + Math.floor(Math.random() * 10)
    let obj = {
      src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      name: name,
      gender: 1,
      text: '李四444'
    }
    this.data.estimate.push(obj)
    this.data.estimate.push(obj)
    this.data.estimate.push(obj)
    let newestimate = this.data.estimate
    this.setData({
      estimate: newestimate
    })
  },
  // 关注
  follow (e) {
    console.log(e)
    this.setData({
      btnText: '已关注',
      disabled: true
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
    this.getUserDetail(params.userId)
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
    if (!this.data.user.shenduziliao) {
      return wx.showToast({
        title: '您需要关注用户方可查看深度资料'
      })
    }
    this.setData({
      showTaDeep: true,
      showMoreBtn: false
    })
  }
})
