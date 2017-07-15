// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    payArr: ['已付清', '我付清', '各付各', 'Ta付清'],
    houseArr: ['请选择Ta的车房状况', '有房有车', '有房无车', '有车无房', '车房待购'],
    // 性别
    genderCur: 0,
    genderChoose: [
      {
        flag: 1,
        value: '男',
        ico: 'icon-nanxing'
      },
      {
        name: 2,
        value: '女',
        ico: 'icon-nvxing'
      }
    ],
    // 婚姻
    marryCur: 0,
    marryChoose: [
      {
        flag: 1,
        value: '单身',
        ico: 'icon-nanxing'
      },
      {
        name: 2,
        value: '非单身',
        ico: 'icon-nvxing'
      }
    ]
  },
  // 获取转发订单信息
  getOrderInfo (id) {
    let that = this
    let ocbj = {
      url: useUrl.comfireByTitaFaqi,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_ta_id: id
      },
      success (res) {
        // console.log(res)
        let photos = []
        if (res.data.data.photos.length !== 0) {
          photos = res.data.data.photos.split(',')
        }
        let job1 = res.data.data.job.split('-')
        let v1 = that.data.industryOne.indexOf(job1[0])
        let v2 = 0
        if (v1 < 24) {
          v2 = that.data.industryTwo[v1].indexOf(job1[1])
        }
        let vv = [v1, v2]
        that.setData({
          orderInfo: res.data.data,
          people: res.data.data.is_zhidai === '1' ? '寻约会对象' : '自带约会对象',
          pay: that.data.payArr[res.data.data.pay_type],
          genderCur: res.data.data.sex * 1 - 1,
          photos: photos,
          marryCur: res.data.data.ganqing * 1,
          ageIndex: that.data.ageArr.indexOf(res.data.data.age),
          value: vv,
          houseIndex: res.data.data.cart_house
        })
      }
    }
    app.wxrequest(ocbj)
  },
  // 输入框内容
  inputValue (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    let orderInfo = this.data.orderInfo
    if (type === 'name') {
      orderInfo.name = value
    } else if (type === 'height') {
      orderInfo.user_height = value
    } else if (type === 'company') {
      orderInfo.compny = value
    } else if (type === 'sport') {
      orderInfo.likes_sports = value
    } else if (type === 'movie') {
      orderInfo.likes_movies = value
    } else if (type === 'book') {
      orderInfo.likes_books = value
    }
    this.setData({
      orderInfo: orderInfo
    })
  },
  // 行业选择
  bindChange (e) {
    var tempValue = []
    if (e.detail.value[0] === this.data.value[0]) {
      tempValue = e.detail.value
    } else {
      tempValue = [e.detail.value[0], 0]
    }
    this.setData({
      two: e.detail.value[0],
      value: tempValue
    })
  },
  // picker选择器
  bindPickerChange: function (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type === 'age') {
      this.setData({
        ageIndex: value
      })
    } else if (type === 'industry') {
      this.setData({
        industryIndex: value
      })
    } else if (type === 'house') {
      this.setData({
        houseIndex: value
      })
    }
  },
  // 单项选择
  chooseChange (e) {
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    let that = this
    if (type === 'gender') {
      that.setData({
        genderCur: index
      })
    } else if (type === 'marry') {
      that.setData({
        marryCur: index
      })
    }
  },
  // 约会类型，付款类型选择
  cp (e) {
    if (this.data.orderInfo.pay_type === '0') return
    let p = e.currentTarget.dataset.type
    if (p === 'noself') {
      this.setData({
        people: '寻约会对象'
      })
    } else if (p === 'self') {
      let pay = '我付清'
      let payType = 1
      if (this.data.type === 'forOther') {
        pay = '替Ta付清'
        payType = 0
      }
      this.setData({
        people: '自带约会对象',
        pay: pay,
        payType: payType
      })
    } else if (p === 'my') {
      this.setData({
        pay: '我付清',
        payType: 1
      })
    } else if (p === 'both') {
      this.setData({
        pay: '各付各',
        payType: 2
      })
    } else if (p === 'other') {
      this.setData({
        pay: 'Ta付清',
        payType: 3
      })
    } else if (p === 'forTa') {
      this.setData({
        pay: '替Ta付清',
        payType: 0
      })
    } else if (p === 'confirm') {
      this.setData({
        pay: '确认人付清',
        payType: 1
      })
    } else if (p === 'otherother') {
      this.setData({
        pay: '应邀者付清',
        payType: 3
      })
    }
    this.noMask()
  },
  // 行业遮罩
  chooseIndustryhy () {
    this.setData({
      industryShow: true
    })
  },
  // 遮罩
  chooseIndustry (e) {
    if (this.data.orderInfo.pay_type === '0') return
    let type = e.currentTarget.dataset.type
    // console.log(type)
    if (type === 'time') {
      this.setData({
        industryShow: true
      })
    } else if (type === 'choosepeople') {
      this.setData({
        datingpeopleShow: true
      })
    } else if (type === 'kind') {
      this.setData({
        kindshow: true
      })
    } else if (type === 'pay') {
      if (this.data.people === '自带约会对象') {
        return wx.showToast({
          title: '自带约会对象，不可选择付款类型',
          image: '../../images/jiong.png',
          mask: true
        })
      }
      this.setData({
        payShow: true
      })
    }
  },
  // 去除遮罩
  noMask () {
    this.setData({
      industryShow: false,
      datingpeopleShow: false,
      kindshow: false,
      payShow: false
    })
  },
  // 手机号码输入
  mobileInput (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 去到地图地址上
  showMap () {
    let that = this
    wx.openLocation({
      latitude: that.data.orderInfo.shop_lat * 1,
      longitude: that.data.orderInfo.shop_lng * 1,
      name: '预定餐厅所在位置',
      address: that.data.orderInfo.address
    })
  },
  // 用户上传图片
  upPhoto () {
    let that = this
    let obj = {
      count: 1,
      success (res) {
        wx.showLoading({
          title: '图片上传中',
          mask: true
        })
        let photos = that.data.photos
        for (let i of res.tempFilePaths) {
          // 添加到相册数组中
          // 上传图片
          let upImg = {
            url: useUrl.uploadPhotos,
            filePath: i,
            formData: {
              session_key: wx.getStorageSync('session_key'),
              file: i
            },
            success (res) {
              // console.log(res)
              // console.log('上传成功', res.data)
              wx.hideLoading()
              let jsonObj = JSON.parse(res.data).data.res_file
              photos.push(jsonObj)
              that.setData({
                photos: photos
              })
              // console.log('obj', JSON.parse(res.data))
            },
            fail (res) {
              console.log('上传错误', res)
              wx.showToast({
                title: '图片上传失败，请重新尝试',
                mask: true,
                duration: 1000
              })
            }
          }
          app.wxUpload(upImg)
        }
      },
      fail (err) {
        console.log(err)
      }
    }
    wx.chooseImage(obj)
  },
  // 删除图片
  delphoto (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let photos = that.data.photos
    photos.splice(index, 1)
    that.setData({
      photos: photos
    })
  },
  // 用户预览图片
  preview (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let obj = {
      current: that.data.photos[index],
      urls: that.data.photos
    }
    wx.previewImage(obj)
  },
  // 智能修正弹窗
  getFixInfoModal () {
    let that = this
    wx.showModal({
      title: '智能修正',
      content: '将会更新内容为您所填写的资料',
      showCancel: true,
      cancelText: '不用了',
      cancelColor: '#2b2f41',
      confirmText: '更新下',
      confirmColor: '#ffc4a6',
      success (res) {
        if (res.confirm) {
          that.getFixInfo()
        }
      }
    })
  },
  // 智能修正
  getFixInfo () {
    let that = this
    let gfiObj = {
      url: useUrl.getUserInfoBySelf,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        let mine = res.data.data
        let orderInfo = that.data.orderInfo
        let job2 = mine.job.split('-')
        let v11 = that.data.industryOne.indexOf(job2[0])
        let v22 = 0
        if (v11 < 24) {
          v22 = that.data.industryTwo[v11].indexOf(job2[1])
        }
        let vvv = [v11, v22]
        // let vvv = [0, 0]
        orderInfo.name = mine.name
        orderInfo.user_height = mine.user_height
        orderInfo.compny = mine.compny
        orderInfo.likes_sports = mine.likes_sports
        orderInfo.likes_movies = mine.likes_movies
        orderInfo.likes_books = mine.likes_books
        that.setData({
          orderInfo: orderInfo,
          genderCur: mine.sex,
          marrCur: mine.ganqing,
          ageIndex: that.data.ageArr.indexOf(mine.age),
          value: vvv
        })
        // console.log(res)
      }
    }
    app.wxrequest(gfiObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    let that = this
    app.data.ageArr.splice(0, 1, '请选择Ta的年龄区间')
    app.data.industryOne.splice(0, 1, '请选择Ta所在的行业')
    app.data.industryTwo.splice(0, 1, ['请选择Ta所在的行业'])
    this.setData({
      title: params.title,
      days: params.days,
      address: params.address,
      ageArr: app.data.ageArr,
      industryOne: app.data.industryOne,
      industryTwo: app.data.industryTwo
    })
    // this.setData({
    //   title: 'Mr.Rocky 双人火焰牛排餐',
    //   address: '天河区车陂大街汇德商业大厦1号楼506',
    //   days: '2017.05.06(周日)',
    //   ageArr: app.data.ageArr,
    //   industryOne: app.data.industryOne,
    //   industryTwo: app.data.industryTwo
    // })
    app.wxlogin(that.getOrderInfo, params.orderTaId)
    // app.wxlogin(that.getOrderInfo, 44)
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
  }
})
