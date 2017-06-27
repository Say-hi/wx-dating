// 获取全局应用程序实例对象
// const app = getApp()
const QQMapWX = require('../../utils/qmapsdk')
const qqmapsdkkey = '2D3BZ-2I7WU-F22VV-43SMX-W6Z5K-PDFYQ'
const citys = require('../../utils/citys')
let qqmapsdk
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'WeChat',
    videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    videoFull: false,
    autoplay: true,
    citydetail: ['asdf', 'asasdfdf', 'asdfghf', 'aertysdf', 'aqwesdf', 'acvnsdf', 'asiuopdf', 'as,.m/df'],
    controls: false
  },
  fullscreen () {
    wx.onVideoClickFullScreen()
  },
  smallscreen () {
    wx.onVideoClickdanmu()
  },
  // 搜索
  search (obj) {
    qqmapsdk.search(obj)
  },
  // 关键字补充
  getSuggestion (e) {
    // console.log(e)
    let obj = {
      keyword: e.detail.value,
      region: '广州市',
      region_fix: 1,
      policy: 1,
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err)
      }
    }
    qqmapsdk.getSuggestion(obj)
  },
  // 逆地址解析
  reverseGeocoder () {
    let obj = {
      success (res) {
        console.log(res)
      },
      fail (res) {
        console.log(res)
      }
    }
    qqmapsdk.reverseGeocoder(obj)
  },
  // 地址解析
  geocoder (e) {
    let obj = {
      address: e.detail.value,
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err)
      }
    }
    qqmapsdk.geocoder(obj)
  },
  // 距离计算
  calculateDistance () {
    let obj = {
      mode: 'driving',
      from: {
        latitude: 39.840677,
        longitude: 116.463318
      },
      to: [{
        latitude: 39.840177,
        longitude: 116.463318
      }],
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err)
      }
    }
    qqmapsdk.calculateDistance(obj)
  },
  // 获取全国城市列表
  getCityList () {
    let obj = {
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err)
      }
    }
    qqmapsdk.getCityList(obj)
  },
  // 通过id获取城市信息
  getCityById (e) {
    let obj = {
      id: e.detail.value,
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err)
      }
    }
    qqmapsdk.getDistrictByCityId(obj)
  },

  // 微信设置
  wxSetting () {
    wx.openSetting({
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err)
      }
    })
  },

  // 城市列表
  showcitys () {
    if (this.data.status) {
      return this.setData({
        cityslist: [],
        citydetail: [],
        status: false
      })
    }
    let cityslist = []
    for (let i in citys) {
      cityslist.push(i)
    }
    this.setData({
      cityslist: cityslist,
      status: true,
      current: cityslist[0]
    })
    this.showcitydetail()
  },
  // 二级列表
  showcitydetail (e) {
    let flag
    if (!e) {
      flag = '上海'
    } else {
      flag = e.currentTarget.dataset.city
    }
    // console.log(flag)
    let citydetail = citys[flag]
    this.setData({
      citydetail: citydetail,
      current: flag
    })
  },
  // 选择区域
  choosearea (e) {
    this.setData({
      cityslist: [],
      citydetail: [],
      status: false,
      current: null
    })
    let area = e.currentTarget.dataset.area
    console.log(area)
    wx.showModal({
      title: '您选择的城市',
      content: area,
      showCancel: false
    })
  },

  // 视屏设置

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    qqmapsdk = new QQMapWX({
      key: qqmapsdkkey
    })
    // 重新授权
    let obj = {
      scope: 'scope.userInfo',
      success (res) {
        console.log(res)
      },
      fail (err) {
        console.log(err)
      }
    }
    wx.authorize(obj)
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
    // let obj = {
    //   keyword: '酒店',
    //   success (res) {
    //     console.log(res)
    //   },
    //   fail (err) {
    //     console.log(err)
    //   }
    // }
    // this.search(obj)
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
    // TODO: onPullDownRefresh;
    // console.info(123)
  },

  backIndex () {
    wx.switchTab({
      url: '/pages/index/index',
      success () {
        console.info('success')
      }
    })
  }
})
