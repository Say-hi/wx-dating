// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
const WXParse = require('../../wxParse/wxParse')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播
    imgUrls: [
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    height: '500rpx',
    width: '750rpx',
    mode: 'aspectFill'
    // 中间区域
    // title: 'Mr.Rocky双人火焰牛排餐',
    // address: '广州·天河区',
    // price: '168',
    // 商店相关
    // shopTitle: 'Mr.Rocky 洛奇先生餐吧',
    // shopTime: '2017.05.20',
    // shopAddress: '珠江新城华夏路6号'
  },
  // 应邀
  yingyao () {
    let that = this
    wx.navigateTo({
      url: '../duixianglist/duixianglist?id=' + that.data.id + '&title=' + that.data.orderInfo.name
    })
  },
  // 查看地图
  showMap () {
    let that = this
    wx.openLocation({
      latitude: that.data.orderInfo.lat * 1,
      longitude: that.data.orderInfo.lng * 1,
      name: that.data.orderInfo.name,
      address: that.data.orderInfo.address
    })
  },
  gohome () {
    wx.reLaunch({
      url: '../index2/index2'
    })
  },
  // 触摸开始
  // touchStart (e) {
  //   this.setData({
  //     startY: e.changedTouches[0].clientY
  //   })
  // },
  // // 触摸移动
  // touchMove (e) {
  //   let moveY = e.changedTouches[0].clientY
  //   let height = parseInt(this.data.height)
  //   let width = parseInt(this.data.width)
  //   // console.log(moveY - parseInt(this.data.startY))
  //   if ((moveY - parseInt(this.data.startY)) < 0) return
  //   height += (moveY - parseInt(this.data.startY)) / 30
  //   width += (moveY - parseInt(this.data.startY)) / 60
  //   // console.log(height)
  //   height = height + 'rpx'
  //   width = width + 'rpx'
  //   // console.log(height)
  //   this.setData({
  //     height: height,
  //     width: width
  //   })
  // },
  // // 触摸结束
  // touchEnd () {
  //   this.setData({
  //     height: '500rpx',
  //     width: '750rpx'
  //   })
  // },
  // 替ta发起跳转
  forOtherPeople () {
    let that = this
    let orderInfo = {
      orderId: that.data.id,
      address: that.data.orderInfo.address,
      price: that.data.orderInfo.money,
      title: that.data.orderInfo.name,
      imgUrl: that.data.orderInfo.photo_list[0]
    }
    wx.setStorageSync('orderInfo', orderInfo)
    wx.navigateTo({
      url: '../taRecordDetail/taRecordDetail?type=forOther'
    })
  },
  // 发起邀约
  forMine () {
    let that = this
    wx.navigateTo({
      url: '../order/order?id=' + that.data.id + '&address=' + that.data.orderInfo.address + '&price=' + that.data.orderInfo.money + '&title=' + that.data.orderInfo.name
    })
  },
  // 获取套餐详情
  getMeal (id) {
    let that = this
    let obj = {
      url: useUrl.engagementDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id
      },
      success (res) {
        // console.log(res)
        let shopInfo = res.data.data.info
        WXParse.wxParse('shopInfo', 'html', shopInfo, that, 5)
        let menu = res.data.data.menu
        WXParse.wxParse('menu', 'html', menu, that, 5)
        let reminder = res.data.data.reminder
        WXParse.wxParse('reminder', 'html', reminder, that, 5)
        that.setData({
          id: id,
          orderInfo: res.data.data
        })
      }
    }
    app.wxrequest(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    console.log(params)
    this.setData({
      id: params.id
    })
    if (params.type === 'share') {
      let time = {
        y: params.y,
        m: params.m,
        m_n: params.m_n,
        d: params.d
      }
      wx.setStorageSync('time', time)
      app.wxlogin(this.getMeal, params.id)
      this.getMeal(params.id)
    } else {
      this.getMeal(params.id)
    }
    if (params.type === 'out') {
      return this.setData({
        type: 'out',
        shopTime: params.time
      })
    }
    let time = wx.getStorageSync('time')
    time = time.y + '.' + (time.m_n < 10 ? '0' + time.m_n : time.m_n) + '.' + (time.d < 10 ? '0' + time.d : time.d)
    this.setData({
      shopTime: time
    })
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
  },
  onShareAppMessage () {
    let time = wx.getStorageSync('time')
    console.log(time)
    return {
      title: '这儿有个值得分享的地方！',
      path: `pages/setMeal/setMeal?id=${this.data.id}&d=${time.d}&m=${time.m}&m_n=${time.m_n}&y=${time.y}&type=share`
    }
  }
})
