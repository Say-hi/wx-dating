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
  // 获取用户金额情况
  getUserMoney () {
    let that = this
    let gum = {
      url: useUrl.payIndex,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        if (res.data.code === 200) {
          that.setData({
            coin: res.data.data.coin || 0
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }
    }
    app.wxrequest(gum)
  },
  // 信息提交后判断是否需要支付
  moneyPay (e, type) {
    // console.log(e)
    let that = this
    // 支付参数
    let payObj = {
      timeStamp: e.timeStamp,
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      success (res) {
        // 支付成功响应
        console.log('支付情况', res)
        if (res.errMsg === 'requestPayment:ok') {
          if (type === 'forOther') {
            that.setData({
              payflag: false,
              sendMask: true,
              orderMask: false
            })
          } else {
            that.setData({
              datingSuccess: true,
              orderMask: false
            })
          }
        } else {
          wx.showToast({
            title: '尚未支付完成,请到订单中继续支付',
            mask: true
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '../index2/index2'
            })
          }, 1000)
        }
      },
      fail (res) {
        console.log('支付失败', res)
        wx.showToast({
          title: '未完成支付,订单关闭',
          mask: true
        })
        app.deleteOrder(that.data.order_id)
        that.orderCancel()
        setTimeout(function () {
          wx.reLaunch({
            url: '../index2/index2'
          })
        }, 1000)
      }
    }
    app.wxpay(payObj)
  },
  // 获取转发订单信息
  getOrderInfo (id) {
    this.getMyPhoto()
    let that = this
    let ocbj = {
      url: useUrl.comfireByTitaFaqi,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_ta_id: id
      },
      success (res) {
        // console.log(res)
        if (res.data.message === '已经确认过了') {
          wx.showToast({
            title: '本订单已经确认过了，如不是您确认的请联系您的好友',
            mask: true
          })
          return setTimeout(function () {
            wx.reLaunch({
              url: '../index2/index2'
            })
          }, 1500)
        } else if (res.data.message === '您替TA发起,不能应邀') {
          wx.showToast({
            title: '不能确认自己发起的订单',
            mask: true
          })
          return setTimeout(function () {
            wx.reLaunch({
              url: '../userOrder/userOrder?type=ta'
            })
          }, 1500)
        } else if (res.data.code === 400) {
          wx.showToast({
            title: res.data.message,
            mask: true
          })
          return setTimeout(function () {
            wx.reLaunch({
              url: '../index2/index2'
            })
          }, 1500)
        }
        let photos = []
        if (res.data.data.photos.length !== 0) {
          // photoTemp = res.data.data.photos.split(',')
          res.data.data.photos.split(',').forEach(v => {
            photos.push({
              photo_url: v,
              is_ta: 1
            })
          })
        }
        let job1 = res.data.data.job.split('-')
        let v1 = that.data.industryOne.indexOf(job1[0])
        let v2 = 0
        if (v1 < 24) {
          v2 = that.data.industryTwo[v1].indexOf(job1[1])
        }
        let vv = [v1, v2]
        // if (res.data.data.mobile.length * 1 !== 11) {
        //   if (wx.getStorageSync('phoneNumber')) {
        //     res.data.data.mobile = wx.getStorageSync('phoneNumber')
        //   }
        // }
        that.setData({
          orderInfo: res.data.data,
          people: res.data.data.is_zhidai === '1' ? '寻约会对象' : '自带约会对象',
          pay: that.data.payArr[res.data.data.pay_type],
          payType: res.data.data.pay_type,
          price: res.data.data.money,
          genderCur: res.data.data.sex * 1 - 1,
          photos: photos,
          marryCur: res.data.data.ganqing * 1,
          ageIndex: that.data.ageArr.indexOf(res.data.data.age),
          value: vv,
          houseIndex: res.data.data.cart_house,
          mobile: res.data.data.mobile || ''
          // phone: wx.getStorageSync('phoneNumber') || ''
        })
        // app.getPhone(that)
        that.checkUser()
      }
    }
    app.wxrequest(ocbj)
  },
  closeMoneyMask () {
    this.setData({
      orderMask: false
    })
    app.deleteOrder(this.data.order_id)
    this.orderCancel()
    // wx.showToast({
    //   title: '订单已确认，请在账单页面继续完成支付',
    //   // title: '订单未完成支付,删除订单',
    //   mask: true
    // })
    // setTimeout(() => {
    //   wx.reLaunch({
    //     url: '../index2/index2'
    //   })
    // }, 1000)
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
    let that = this
    this.data.orderInfo.mobile = e.detail.value
    this.setData({
      orderInfo: that.data.orderInfo,
      phone: e.detail.value,
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
              photos.push({
                photo_url: jsonObj,
                is_ta: 0
              })
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
      content: '更改为您所填写的个人资料',
      showCancel: true,
      cancelText: '不用了',
      cancelColor: '#2b2f41',
      confirmText: '更改',
      confirmColor: '#ffc4a6',
      success (res) {
        if (res.confirm) {
          that.getFixInfo()
        }
      }
    })
  },
  // 订单生效后跳转
  goShare () {
    this.getMyInfo()
  },
  // 跳转套餐详情
  goTaocan () {
    wx.navigateTo({
      url: `../setMeal/setMeal?id=${this.data.orderInfo.package_id}&type=out&time=${this.data.orderInfo.order_date}`
    })
  },
  // 获取自己的资料
  getMyInfo () {
    // let that = this
    let getobj = {
      url: useUrl.getUserInfoBySelf,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        wx.redirectTo({
          url: `../userInfo/userInfo?userId=${res.data.data.user_id}&type=self`
        })
      }
    }
    app.wxrequest(getobj)
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
        // console.log(mine.photos)
        // console.log(mine.cart_house)
        // console.log(mine.photos)
        app.getPhone(that)
        that.setData({
          orderInfo: orderInfo,
          genderCur: mine.sex - 1,
          marrCur: mine.ganqing,
          ageIndex: that.data.ageArr.indexOf(mine.age),
          value: vvv,
          houseIndex: mine.cart_house * 1,
          photos: that.data.photos.concat(that.data.photosMy),
          fix: true
        })
        // console.log(res)
      }
    }
    app.wxrequest(gfiObj)
  },
  // 获取我的相册图片数量
  getMyPhoto () {
    let that = this
    let gmp = {
      url: useUrl.myPhotos,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        that.setData({
          photosMy: res.data.data
        })
        // console.log(res)
      }
    }
    app.wxrequest(gmp)
  },
  // 取消确认
  orderCancel () {
    let that = this
    let cancelOjb = {
      url: useUrl.titaFaqiByreject,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_ta_id: that.data.orderInfo.order_ta_id
      },
      success (res) {
        // that.setData({
        //   payflag: true
        // })
        wx.showToast({
          title: '取消成功',
          mask: true
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../index2/index2'
          })
        }, 1000)
      }

    }
    app.wxrequest(cancelOjb)
  },
  // 订单确认
  orderConfirm () {
    if (!this.data.fix) {
      if (this.data.photos.length + this.data.photosMy.length > 9) {
        return wx.showToast({
          title: '亲,相册最大为9张，请删除多余的图片',
          mask: true
        })
      }
    } else {
      if (this.data.photos.length > 9) {
        return wx.showToast({
          title: '亲,相册最大为9张，请删除多余的图片',
          mask: true
        })
      }
    }
    // console.log(this.data.orderInfo.mobile.length)
    if (!this.data.mobile || parseInt(this.data.mobile.length) !== 11) {
      return wx.showToast({
        title: '亲,请输入正确的手机号码',
        mask: true
      })
    }
    if (this.data.ageIndex * 1 === 0) {
      return wx.showToast({
        title: '亲,请选择年龄区间',
        mask: true
      })
    }
    if (this.data.orderInfo.user_height * 1 === 0) {
      return wx.showToast({
        title: '亲,请输入身高',
        mask: true
      })
    }
    if (this.data.value[0] === 0) {
      return wx.showToast({
        title: '亲,请选择行业',
        mask: true
      })
    }
    if (!this.data.orderInfo.compny) {
      return wx.showToast({
        title: '亲,请输入工作的公司',
        mask: true
      })
    }
    if (this.data.houseIndex * 1 === 0) {
      return wx.showToast({
        title: '亲,请选择车房状况',
        mask: true
      })
    }
    wx.setStorageSync('phoneNumber', this.data.orderInfo.mobile)
    let that = this
    let oi = this.data.orderInfo
    if (this.data.is_perfect_data === '0') {
      wx.showModal({
        title: '非已有用户无保存资料',
        content: '是否保存该资料为个人资料？',
        showCancel: true,
        cancelText: '不保存',
        cancelColor: '#2b2f41',
        confirmText: '保存',
        confirmColor: '#ffc4a6',
        success (res) {
          if (res.confirm) {
            let userObj = {
              url: useUrl.updateUserInfo,
              data: {
                session_key: wx.getStorageSync('session_key'),
                name: oi.name,
                sex: that.data.genderCur,
                ganqing: that.data.marryCur,
                age: that.data.ageArr[that.data.ageIndex],
                user_height: oi.user_height,
                job: that.data.industryOne[that.data.value[0]] + (that.data.value[1] < 24 ? '-' + that.data.industryTwo[that.data.value[0]][that.data.value[1]] : ''),
                compny: oi.compny,
                cart_house: that.data.houseIndex,
                likes_books: oi.likes_books,
                likes_movies: oi.likes_movies,
                likes_sports: oi.likes_sports,
                photos: JSON.stringify(that.data.photos)
              },
              success () {
                // if (res.data.message === '保存成功') {
                //   wx.showToast({
                //     title: '保存成功'
                //   })
                // }
              }
            }
            app.wxrequest(userObj)
          }
        }
      })
    }
    // 订单确认
    // 为智能修正
    if (!this.data.fix) {
      that.data.photos = that.data.photos.concat(that.data.photosMy)
    }
    let confirmObj = {
      url: useUrl.titaFaqiByComfire,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_ta_id: oi.order_ta_id,
        pay_type: that.data.payType,
        is_zhidai: that.data.people === '寻约会对象' ? 1 : 2,
        name: oi.name,
        mobile: that.data.mobile,
        sex: that.data.genderCur,
        ganqing: that.data.marryCur,
        age: that.data.ageArr[that.data.ageIndex],
        user_height: oi.user_height,
        job: that.data.industryOne[that.data.value[0]] + '-' + that.data.industryTwo[that.data.value[0]][that.data.value[1]],
        compny: oi.compny,
        cart_house: that.data.houseIndex,
        likes_books: oi.likes_books,
        likes_movies: oi.likes_movies,
        likes_sports: oi.likes_sports,
        photos: JSON.stringify(that.data.photos)
      },
      success (res) {
        console.log('替他发起页面订单支付', res)
        if (res.data.data.order_id) {
          that.setData({
            order_id: res.data.data.order_id
          })
          if ((that.data.payType * 1) === 1 || (that.data.payType * 1) === 2) {
            // wx.showLoading({
            //   title: '订单已确认,发起支付中...'
            // })
            that.getUserMoney()
            setTimeout(() => {
              wx.hideLoading()
              that.setData({
                orderMask: true,
                payflag: true
              })
            }, 300)
            // todo
          } else {
            that.setData({
              orderMask: false,
              datingSuccess: true
            })
          }
        } else {
          // console.log(res)
          wx.showToast({
            title: res.data.message,
            mask: true
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../index2/index2'
            })
          }, 1000)
        }
      }
    }
    app.wxrequest(confirmObj)
  },
  // 订单确认支付
  goPay () {
    let that = this
    let orderPayobj = {
      url: useUrl.payByOrder,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: that.data.order_id
      },
      success (res) {
        if (res.data.code === 400) {
          wx.showToast({
            title: res.data.message,
            image: '../../images/jiong.png'
          })
          return setTimeout(() => {
            wx.reLaunch({
              url: '../index2/index2'
            })
          }, 1500)
        }
        console.log('order success', res)
        // 需要支付的发起付款
        if (res.data.data.length !== 0) {
          // asdfasdfasdf
          // todo 微信支付流程
          that.setData({
            payflag: false
          })
          that.moneyPay(res.data.data, 'self')
          return
        }
        that.setData({
          payflag: false,
          orderMask: false,
          datingSuccess: true
        })
      }
    }
    app.wxrequest(orderPayobj)
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
        // console.log(res.data.data.is_perfect_data)
        // console.log(res.data.data.isShiyue)
        // console.log(res.data.data.isHasBaomoney)
        if (res.data.data.isShiyue.toString() === '1') {
          that.setData({
            cancelshow: true
          })
        } else if (res.data.data.isHasBaomoney.toString() === '0') {
          // that.setData({
          //   moneyshow: true
          // })
        }
        that.setData({
          is_perfect_data: res.data.data.is_perfect_data
        })
        wx.hideLoading()
      }
    }
    app.wxrequest(obj)
  },
  // 去除遮罩层
  delMask (e) {
    let that = this
    let type = e.currentTarget.dataset.type
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
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            paySign: res.data.data.paySign,
            success (res) {
              // 支付成功
              if (res.errMsg === 'requestPayment:ok') {
                that.setData({
                  moneyshow: false
                })
              }
            },
            fail (res) {
              console.log('支付失败', res)
              // 支付失败
            }
          }
          app.wxpay(yxObj)
        }
      }
      app.wxrequest(obj)
    } else {
      wx.reLaunch({
        url: '../index2/index2'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    // params['orderTaId'] = 929
    // console.log(params)
    if (params.orderTaId === 'undefined' || !params.orderTaId) {
      wx.showLoading({
        title: '非法套餐数据,即将返回首页',
        mask: true
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '../index2/index2'
        })
      }, 1500)
      return
    }
    let that = this
    app.data.ageArr.splice(0, 1, '请选择Ta的年龄区间')
    app.data.industryOne.splice(0, 1, '请选择Ta所在的行业')
    app.data.industryTwo.splice(0, 1, ['请选择Ta所在的行业'])
    wx.showLoading({
      title: '亲，接受数据中',
      mask: true
    })
    this.setData({
      title: params.title,
      days: params.days,
      address: params.address,
      ageArr: app.data.ageArr,
      industryOne: app.data.industryOne,
      industryTwo: app.data.industryTwo
    })

    this.setData({
      id: params.orderTaId
    })
    app.wxlogin(that.getOrderInfo, params.orderTaId)
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
    if (this.data.payflag) {
      app.deleteOrder(this.data.order_id)
      this.orderCancel()
    }
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
