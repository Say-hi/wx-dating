// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // title: 'Mr.Rocky 双人火焰牛排餐',
    // days: '2017.05.20(周日)',
    time: '00:00',
    // address: '珠江新城华夏路6号',
    people: '寻约会对象',
    pay: '我付清',
    payType: 1,
    mobile: 0,
    maskTitle: '信息以保存,转发给Ta确认',
    // price: '168',
    // 意向金弹窗
    // moneyshow: false,
    // 禁止发起弹窗
    // cancelshow: false,
    // 发起成功弹窗
    datingSuccess: false,
    // 个人资料完善弹窗
    // datashow: false,
    one: 0,
    two: 0
    // value:[18, 0]
  },
  // 发给本人确认
  sendToConfirmPeople () {
    let that = this
    // 替ta发起信息提交
    let foi = wx.getStorageSync('forOtherInfo')
    let smbj = {
      url: useUrl.postTitaFaqi,
      data: {
        session_key: foi.session_key,
        name: foi.name,
        sex: foi.sex,
        ganqing: foi.ganqing,
        age: foi.age,
        user_height: foi.user_height,
        job: foi.job,
        compny: foi.compny,
        cart_house: foi.cart_house,
        likes_sports: foi.likes_sports,
        likes_movies: foi.likes_movies,
        likes_books: foi.likes_books,
        comment: foi.comment,
        photos: foi.photos,
        id: that.data.id,
        date: that.data.day,
        time: that.data.time,
        mobile: that.data.mobile,
        is_zhidai: (that.data.people === '寻约会对象') ? '1' : '2',
        pay_type: that.data.payType
      },
      complete (res) {
        console.log(res)
        // 订单响应成功
        if (res.data.data.order_ta_id) {
          that.setData({
            order_ta_id: res.data.data.order_ta_id
          })
          // 支付类型 0: 替ta付清
          if (that.data.payType === 0) {
            // 替Ta发起支付
            let tiTAPay = {
              url: useUrl.payByOrderTa,
              data: {
                session_key: wx.getStorageSync('session_key'),
                order_ta_id: res.data.data.order_ta_id
              },
              success (res) {
                console.log('替他支付响应成功', res)
                // 支付响应成功
                if (res.data.data.length !== 0) {
                  return that.moneyPay(res.data.data, 'forOther')
                }
                that.setData({
                  sendMask: true
                })
              }
            }
            app.wxrequest(tiTAPay)
            // 发起支付
            // return that.moneyPay(res.data.data.order_ta_id, 'forOther')
          }
          // 无需支付
          that.setData({
            sendMask: true
          })
        }
      }
    }
    app.wxrequest(smbj)
  },
  // 信息提交后判断是否需要支付
  moneyPay (e, type) {
    let that = this
    // 支付参数
    let payObj = {
      timeStamp: e.timeStamp,
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      success (res) {
        // 支付成功响应
        console.log(res)
        if (type === 'forOther') {
          that.setData({
            sendMask: true
          })
        } else {
          that.setData({
            datingSuccess: true
          })
        }
      },
      fail (res) {
        console.log('支付失败', res)
      }
    }
    app.wxpay(payObj)
  },
  // 完善个人资料
  getMyDay (date) {
    var week = ''
    var dates = new Date(date)
    if (dates.getDay() === 0) week = '周日'
    if (dates.getDay() === 1) week = '周一'
    if (dates.getDay() === 2) week = '周二'
    if (dates.getDay() === 3) week = '周三'
    if (dates.getDay() === 4) week = '周四'
    if (dates.getDay() === 5) week = '周五'
    if (dates.getDay() === 6) week = '周六'
    this.setData({
      days: date.replace(/-/g, '.') + '(' + week + ')',
      day: date
    })
  },
// var w1 = getMyDay(new Date("2015-7-12"));
  // 选择约会对象
  cp (e) {
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
  // 遮罩
  chooseIndustry (e) {
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
  // 时间选择
  bindChange (e) {
    let time = (e.detail.value[0] < 10 ? '0' + e.detail.value[0] : e.detail.value[0]) + ':' + (e.detail.value[1] < 10 ? '0' + e.detail.value[1] : e.detail.value[1])
    this.setData({
      one: e.detail.value[0],
      two: e.detail.value[1],
      time: time,
      value: e.detail.value
    })
  },
  // 去除遮罩层
  delMask (e) {
    let that = this
    let type = e.currentTarget.dataset.type
    console.log(type)
    // console.log(type)
    if (type === 'yxpay') {
      // todo 支付意向金
      let obj = {
        url: useUrl.payByBond,
        data: {
          session_key: wx.getStorageSync('session_key')
        },
        success (res) {
          console.log('保证金支付', res)
          let yxObj = {
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            paySign: res.paySign,
            success (res) {
              // 支付成功
              that.setData({
                moneyshow: false
              })
            },
            fail (res) {
              // 支付失败
              // todo 删除
              that.setData({
                moneyshow: false
              })
            }
          }
          app.wxpay(yxObj)
        }
      }
      app.wxrequest(obj)
    } else if (type === 'cccc') {
      wx.switchTab({
        url: '../index2/index2'
      })
      this.setData({
        cancelshow: false
      })
    } else {
      this.setData({
        cancelshow: false
      })
    }
  },
  // 去支付
  goPay () {
    if (this.data.mobile.length !== 11) {
      return wx.showToast({
        image: '../../images/jiong.png',
        mask: true,
        title: '请填写完整的手机号码'
      })
    }
    this.sendOrderData()
  },
  // 发起邀约生成订单信息
  sendOrderData () {
    let that = this
    console.log(wx.getStorageSync('session_key'))
    let obj = {
      url: useUrl.postFaqiYaoyue,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: that.data.id,
        date: that.data.day,
        time: that.data.time,
        mobile: that.data.mobile,
        is_zhidai: (that.data.people === '寻约会对象') ? '1' : '2',
        pay_type: that.data.payType
      },
      success (res) {
        if (res.data.message === '手机号码不正确') {
          return wx.showToast({
            title: '请填写正确的手机号码',
            mask: true
          })
        }
        // 订单响应成功
        that.setData({
          order_id: res.data.data.order_id
        })
        // 普通订单支付类型为 1：我付清 2：各付一半
        if (that.data.payType === 1 || that.data.payType === 2) {
          let orderPayobj = {
            url: useUrl.payByOrder,
            data: {
              session_key: wx.getStorageSync('session_key'),
              order_id: res.data.data.order_id
            },
            success (res) {
              console.log(res)
              // 需要支付的发起付款
              if (res.data.data.length !== 0) {
                // todo 微信支付流程
                return
              }
              that.setData({
                datingSuccess: true
              })
            }
          }
          app.wxrequest(orderPayobj)
        } else {
          that.setData({
            datingSuccess: true
          })
        }
      }
    }
    app.wxrequest(obj)
  },
  // 手机号码输入
  mobileInput (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 用户资料检查
  checkUser () {
    let that = this
    let obj = {
      url: useUrl.isPerfectData,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        if (res.data.data.is_perfect_data.toString() === '0') {
          // 完整数据 1
          that.setData({
            datashow: true
          })
        }
        if (res.data.data.isShiyue.toString() === '1') {
          // 失约超过次数 1超
          that.setData({
            cancelshow: true
          })
        }
        if (res.data.data.isHasBaomoney.toString() === '0') {
          // 无保证金 0
          that.setData({
            moneyshow: true
          })
        }
      }
    }
    app.wxrequest(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    // TODO: onLoad
    if (params.type === 'forOther') {
      this.setData({
        pay: '替Ta付清',
        payType: 0
      })
    }
    // 时间选择项生成
    let industryOne = []
    let industryTwo = []
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        let s = '0' + i
        industryOne.push(s)
        industryTwo.push(s)
      } else if (i < 24) {
        industryOne.push(i)
        industryTwo.push(i)
      } else {
        industryTwo.push(i)
      }
    }
    this.setData({
      industryTwo: industryTwo,
      industryOne: industryOne,
      price: params.price || '',
      address: params.address || '',
      title: params.title || '',
      id: params.id || '',
      type: params.type || ''
    })
    // 日期生成
    // this.setData({
    //   // time:
    // })
    let time = wx.getStorageSync('time')
    this.getMyDay(time.y + '-' + (time.m_n < 10 ? '0' + time.m_n : time.m_n) + '-' + (time.d < 10 ? '0' + time.d : time.d))
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
    this.checkUser()
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
  // 页面内转发
  onShareAppMessage () {
    let that = this
    return {
      title: '有好友替您发起邀约，赶快确认吧',
      path: '/pages/otherConfirm/otherConfirm?orderTaId=' + that.data.order_ta_id + '&days=' + that.data.days + '&title=' + that.data.title + '&address=' + that.data.address,
      // 转发成功响应
      success () {
        that.setData({
          datingSuccess: true
        })
      }
    }
  }
})

