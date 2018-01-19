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
    videoSrc: '',
    videoCover: '../../images/video_cover.jpg',
    videoPlay: '../../images/play.png',
    videoControls: true,
    autoplay: false,
    show: true,
    playStatus: false,
    objectFit: 'Fill',
    // 用户信息
    // userDetail: ['单身', '20-28岁', '188cm', '广告行业'],
    houseArr: ['暂无信息', '有房有车', '有房无车', '有车无房', '车房待购'],
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
    // console.log(id);
    let that = this
    let getObj = {
      url: useUrl.ViewUserInformation,
      data: {
        session_key: wx.getStorageSync('session_key'),
        view_user_id: id
      },
      success (res) {
        // console.log(res)
        res.data.data.job = res.data.data.job.split('-')[1]
        // res.data.data.shenduziliao = false
        res.data.data['video_image'] = res.data.data.video_image ? res.data.data.video_image : '../../images/login-bg.png'
        if (res.data.data.shenduziliao) {
          that.setData({
            showTaDeep: true,
            showMoreBtn: false
          })
        }
        app.getPhone(that, id)
        that.getMyInfo()
        that.setData({
          user: res.data.data
        })
        let i = 0
        for (let v of res.data.data.comment_list) {
          if (v.content.length > 0) {
            i = 1
            break
          }
        }
        if (i === 0) {
          that.setData({
            asdfasdf: true
          })
        }
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
    if (this.data.user.video_url.length <= 1) {
      return wx.showToast({
        title: '该用户未上传视频'
      })
    }
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
    if (!ss) {
      this.setData({
        autoplay: true,
        show: false,
        playStatus: true
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
  },
  // 视屏结束
  playFinish () {
    this.setData({
      autoplay: false,
      show: true,
      playStatus: false
    })
  },
  // 首先获取自己的资料
  getMyInfo () {
    let that = this
    let getobj = {
      url: useUrl.getUserInfoBySelf,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        let i = res.data.data
        // let job1 = i.job.split('-') || '不限'
        // let v1 = that.data.industryOne.indexOf(job1[0]) || 0
        // let v2 = 0
        // // console.log(that.data.industryTwo)
        // if (v1 < 24) {
        //   v2 = that.data.industryTwo[v1].indexOf(job1[1]) || 0
        // }
        // let vv = [v1, v2]
        that.setData({
          // name: i.name,
          // genderCur: i.sex * 1 - 1,
          // marryCur: i.ganqing,
          // ageIndex: that.data.ageArr.indexOf(i.age),
          // userHeight: i.user_height,
          // value: vv,
          compny: i.compny,
          houseIndex: i.cart_house,
          likesSports: i.likes_sports,
          likesMovies: i.likes_movies,
          likesBooks: i.likes_books,
          // comment_list: i.comment_lists,
          // id: i.user_id,
          phone: that.data.phoneNumber || ''
        })
      }
    }
    app.wxrequest(getobj)
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
    // console.log('asdf', app.getPhone(this))
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
    // wx.stopPullDownRefresh()
    // this.playVideo()
  },
  // 上拉触底操作
  onReachBottom () {
    // todo 判断是否关注了
    // if (!this.data.user.shenduziliao) {
    //   return wx.showToast({
    //     title: '约会成功才可查看对方深度资料'
    //   })
    // }
    // this.setData({
    //   showTaDeep: true,
    //   showMoreBtn: false
    // })
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
