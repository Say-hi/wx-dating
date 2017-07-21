// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
const citys = require('../../utils/citys')
const QQMapWX = require('../../utils/qmapsdk')
const qqmapsdkkey = '2D3BZ-2I7WU-F22VV-43SMX-W6Z5K-PDFYQ'
let qqmapsdk
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'plans',
    day: 20,
    month: 'May',
    setAdd: true,
    city: '定位中',
    area: '定位中',
    selectBy: '筛选',
    selectdata: 2,
    page: 1,
    content: []
  },
  // 选择排序方式
  selectchoose (e) {
    let that = this
    let q = e.currentTarget.dataset.choose
    // console.log(q)
    if (q === '0') {
      this.setData({
        selectBy: '美食'
      })
    } else if (q === '1') {
      this.setData({
        selectBy: '体验'
      })
    }
    this.setData({
      selectdata: q,
      page: 1,
      statustwo: false,
      content: []
    })
    this.engagementLists(q, that.data.page)
  },
  // 排序页面展示
  select () {
    let a = this.data.statustwo
    this.setData({
      statustwo: !a,
      status: false
    })
  },
  // 逆地址解析
  reverseGeocoder () {
    let that = this
    let obj = {
      success (res) {
        // console.log(res)
        let city = res.result.ad_info.city
        city = city.replace('市', '')
        // console.log(city)
        // console.log(citys[city])
        if (!citys[city]) {
          return that.setData({
            city: '不在服务范围内',
            ifarrow: true,
            setAdd: false,
            // lat: res.result.location.lat,
            // lng: res.result.location.lng,
            area: ''
          })
        }
        if (citys[city][0] !== '附近') {
          citys[city].unshift('附近')
        }
        that.setData({
          setAdd: false,
          city: city,
          cityall: res.result.ad_info.city,
          lat: res.result.location.lat,
          lng: res.result.location.lng,
          area: '附近'
        })
        that.engagementLists(2, that.data.page)
      },
      fail (res) {
        console.log(res)
      }
    }
    qqmapsdk.reverseGeocoder(obj)
  },
// 城市列表
  showcitys () {
    // if (this.data.ifarrow) return
    if (this.data.setAdd) {
      return wx.showToast({
        title: '等待定位',
        icon: 'loading',
        mask: 'true'
      })
    }
    if (this.data.status) {
      return this.setData({
        cityslist: [],
        citydetail: [],
        status: false,
        statustwo: false
      })
    }
    let cityslist = []
    for (let i in citys) {
      cityslist.push(i)
    }
    let index = this.data.city === '佛山' ? '0' : this.data.city === '广州' ? '1' : this.data.city === '深圳' ? '2' : '3'
    // console.log(index);
    let cl = cityslist[index]
    console.log(cl)
    this.setData({
      cityslist: cityslist,
      status: true,
      statustwo: false,
      current: cl
    })
    this.showcitydetail()
  },
  // 二级列表
  showcitydetail (e) {
    let flag
    console.log(e)
    if (!e) {
      if (this.data.city === '佛山' || this.data.city === '广州' || this.data.city === '深圳' || this.data.city === '北京') {
        flag = this.data.city
      } else {
        flag = '佛山'
      }
    } else {
      flag = e.currentTarget.dataset.city
    }
    console.log(flag)
    let citydetail = citys[flag]
    this.setData({
      citydetail: citydetail,
      current: flag,
      cityone: flag
    })
  },
  // 选择区域
  choosearea (e) {
    let that = this
    this.setData({
      cityslist: [],
      citydetail: [],
      status: false,
      current: null,
      page: 1,
      content: []
    })
    let area = e.currentTarget.dataset.area
    // console.log(area)
    let cityone = this.data.cityone
    this.setData({
      city: cityone,
      ifarrow: false,
      area: area
    })
    this.engagementLists(that.data.selectdata, that.data.page)
  },
  // 选择时间
  chooseTime () {
    wx.switchTab({
      url: '../index2/index2'
    })
  },
  // 获取约会套餐列表
  engagementLists (type, page) {
    let that = this
    let time = that.data.year + '-' + (that.data.month_n < 10 ? '0' + that.data.month_n : that.data.month_n) + '-' + (that.data.day < 10 ? '0' + that.data.day : that.data.day)
    let obj = {}
    if (that.data.area === '附近') {
      obj = {
        url: useUrl.engagementLists,
        data: {
          session_key: wx.getStorageSync('session_key'),
          type: type || 2,
          time: time,
          // district: that.data.area,
          lng: that.data.lng,
          lat: that.data.lat,
          page: page
        },
        success (res) {
          // console.log(res)
          if (res.data.data.length <= 0) {
            return wx.showToast({
              title: '暂时没有更多内容啦',
              image: '../../images/jiong.png',
              duration: 2000,
              mask: true
            })
          }
          for (let i of res.data.data) {
            that.data.content.push(i)
          }
          that.setData({
            content: that.data.content
          })
        }
      }
    } else {
      obj = {
        url: useUrl.engagementLists,
        data: {
          session_key: wx.getStorageSync('session_key'),
          type: type || 2,
          time: time,
          district: that.data.area,
          // lng: that.data.lng,
          // lat: that.data.lat,
          page: page
        },
        success (res) {
          // console.log(res)
          if (res.data.data.length <= 0) {
            return wx.showToast({
              title: '没有更多内容啦',
              image: '../../images/jiong.png',
              mask: true
            })
          }
          for (let i of res.data.data) {
            that.data.content.push(i)
          }
          that.setData({
            content: that.data.content
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
    qqmapsdk = new QQMapWX({
      key: qqmapsdkkey
    })

    this.reverseGeocoder()
    let time = wx.getStorageSync('time')
    this.setData({
      year: time.y,
      month: time.m,
      month_n: time.m_n,
      day: time.d
    })
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
    // let that = this
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
  // 页面触底事件
  onReachBottom () {
    this.engagementLists(this.data.selectdata, ++this.data.page)
  }
})
