// 获取全局应用程序实例对象
// const app = getApp()
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
    content: [
      {
        src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        title: 'Kiss Bottle 全新手工制品天平阿斯顿发的发生的发生的发生的发生地方不能',
        address: '广州·天河区',
        price: 168,
        id: 23
      },
      {
        src: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        title: 'Kiss Bottle 全新手工制品天平阿斯顿发的发生的发生的发生的发生地方不能',
        address: '广州·天河区',
        price: 168,
        id: 45
      }
    ]
  },
  // 选择排序方式
  selectchoose (e) {
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
      statustwo: false
    })
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
            area: ''
          })
        }
        citys[city].unshift('附近')
        that.setData({
          setAdd: false,
          city: city,
          area: '附近'
        })
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
    let index = this.data.city === '上海' ? '0' : this.data.city === '广州' ? '1' : this.data.city === '深圳' ? '2' : '3'
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
      if (this.data.city === '上海' || this.data.city === '广州' || this.data.city === '深圳' || this.data.city === '北京') {
        flag = this.data.city
      } else {
        flag = '上海'
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
    this.setData({
      cityslist: [],
      citydetail: [],
      status: false,
      current: null
    })
    let area = e.currentTarget.dataset.area
    // console.log(area)
    let cityone = this.data.cityone
    this.setData({
      city: cityone,
      ifarrow: false,
      area: area
    })
  },
  // 选择时间
  chooseTime () {
    wx.switchTab({
      url: '../index2/index2'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    qqmapsdk = new QQMapWX({
      key: qqmapsdkkey
    })

    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
    // let that = this
    this.reverseGeocoder()
    let time = wx.getStorageSync('time')
    this.setData({
      month: time.m,
      day: time.d
    })
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
  }
})
