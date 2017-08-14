// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'newuser',
    photos: [],
    name: '',
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
    ],
    // 年龄
    ageIndex: 0,
    // 行业
    two: 0,
    industryIndex: 0,
    value: [0, 0],
    // 车房状况
    houseArr: ['请选择Ta的车房状况', '有房有车', '有房无车', '有车无房', '车房待购'],
    houseIndex: 0,
    industryShow: false,
    forOther: false,
    parmas: {}
  },
  // 替他发起订单生成
  goNextStep () {
    let that = this
    if (this.data.name.length === 0) {
      return wx.showToast({
        title: '亲，至少要填写Ta的名称哦~',
        mask: true
      })
    }
    wx.showModal({
      title: '是否保存TA的资料',
      showCancel: true,
      concelText: '取消',
      cncelColor: '#666666',
      confirmText: '确认',
      confirmColor: '#ffc4a6',
      success (res) {
        if (res.confirm) {
          console.log(1)
          that.updateTaArchives()
        } else if (res.cancel) {
          console.log(2)
          let foi = {
            session_key: wx.getStorageSync('session_key'),
            id: that.data.id || '',
            name: that.data.name,
            sex: that.data.genderCur * 1 + 1,
            ganqing: that.data.marryCur,
            age: that.data.ageArr[that.data.ageIndex],
            user_height: that.data.userHeight || '',
            // job: that.data.industryOne[that.data.value[0]] + (that.data.value[1] < 24 ? '-' + that.data.industryTwo[that.data.value[0]][that.data.value[1]] : ''),
            job: that.data.industryOne[that.data.value[0]] + '-' + that.data.industryTwo[that.data.value[0]][that.data.value[1]],
            compny: that.data.compny || '',
            cart_house: that.data.houseIndex,
            likes_sports: that.data.likesSports || '',
            likes_movies: that.data.likesMovies || '',
            likes_books: that.data.likesBooks || '',
            comment: that.data.comment || '',
            photos: that.data.photos.join(',')
          }
          wx.setStorageSync('forOtherInfo', foi)
          let s = wx.getStorageSync('orderInfo')
          wx.redirectTo({
            url: '../order/order?type=forOther&id=' + s.orderId + '&title=' + s.title + '&price=' + s.price + '&address=' + s.address
          })
        }
      }
    })
  },
  // 输入框内容
  inputValue (e) {
    let that = this
    app.inputValue(e, that)
  },
  // 确认
  taConfirm () {
    wx.navigateTo({
      url: '../newuser/newuser'
    })
  },
  // 选择档案
  chooseTa () {
    wx.redirectTo({
      url: '../taRecord/taRecord?type=choose'
    })
  },
  // 行业遮罩
  chooseIndustry () {
    this.setData({
      industryShow: true
    })
  },
  // 去除遮罩
  noMask () {
    this.setData({
      industryShow: false
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
  // 去除遮罩层
  delMask () {
    this.setData({
      show: false
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
          // photos.push(i)
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
              if (photos.length > 9) {
                wx.showToast({
                  title: '超过9张啦,已删除多余的照片',
                  image: '../../images/jiong.png',
                  duration: 2000,
                  mask: true
                })
              }
              photos = photos.slice(0, 9)
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
  // 获取信息
  getArchives (id) {
    let that = this
    let gc = {
      url: useUrl.getTaArchivesDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id
      },
      success (res) {
        // console.log(res)
        // console.log(res.data.data)
        let job1 = res.data.data.job.split('-')
        let v1 = that.data.industryOne.indexOf(job1[0])
        let v2 = 0
        if (v1 < 24) {
          v2 = that.data.industryTwo[v1].indexOf(job1[1])
        }
        let vv = [v1, v2]
        that.setData({
          name: res.data.data.name,
          genderCur: (res.data.data.sex * 1 - 1),
          marryCur: res.data.data.ganqing,
          ageIndex: that.data.ageArr.indexOf(res.data.data.age),
          userHeight: res.data.data.user_height,
          value: vv,
          compny: res.data.data.compny,
          houseIndex: res.data.data.cart_house,
          likesSports: res.data.data.likes_sports,
          likesMovies: res.data.data.likes_movies,
          likesBooks: res.data.data.likes_books,
          comment: res.data.data.comment,
          photos: res.data.data.photos || [],
          id: id
        })
      }
    }
    app.wxrequest(gc)
  },
  // 更新信息
  updateTaArchives () {
    let that = this
    if (that.data.name.length <= 0) {
      return wx.showToast({
        title: '请填写名字',
        image: '../../images/jiong.png',
        duration: 1500,
        mask: true
      })
    }
    let upobj = {
      url: useUrl.addUpdateTaArchives,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: that.data.id || '',
        name: that.data.name,
        sex: that.data.genderCur * 1 + 1,
        ganqing: that.data.marryCur,
        age: that.data.ageArr[that.data.ageIndex],
        user_height: that.data.userHeight || '',
        job: that.data.industryOne[that.data.value[0]] + (that.data.value[1] < 24 ? '-' + that.data.industryTwo[that.data.value[0]][that.data.value[1]] : ''),
        compny: that.data.compny || '',
        cart_house: that.data.houseIndex,
        likes_sports: that.data.likesSports || '',
        likes_movies: that.data.likesMovies || '',
        likes_books: that.data.likesBooks || '',
        comment: that.data.comment || '',
        photos: that.data.photos.join(',')
      },
      success () {
        // console.log('保存信息成功', res)
        wx.showToast({
          title: '保存成功',
          duration: 1000,
          mask: true
        })
        if (that.data.forOther) {
          wx.setStorageSync('forOtherInfo', upobj)
          return setTimeout(function () {
            let s = wx.getStorageSync('orderInfo')
            wx.redirectTo({
              url: '../order/order?type=forOther&id=' + s.orderId + '&title=' + s.title + '&price=' + s.price + '&address=' + s.address
            })
          }, 1000)
        }
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    }
    app.wxrequest(upobj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (e) {
    // TODO: onLoad
    let forOther
    if (e.type === 'forOther') {
      forOther = true
      wx.setNavigationBarTitle({
        title: '替Ta发起'
      })
    } else {
      forOther = false
    }
    if (e.id) {
      this.getArchives(e.id)
    }
    app.data.ageArr.splice(0, 1, '请选择Ta的年龄区间')
    app.data.industryOne.splice(0, 1, '请选择Ta所在的行业')
    app.data.industryTwo.splice(0, 1, ['请选择Ta所在的行业'])
    this.setData({
      ageArr: app.data.ageArr,
      industryOne: app.data.industryOne,
      industryTwo: app.data.industryTwo,
      forOther: forOther
    })
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
