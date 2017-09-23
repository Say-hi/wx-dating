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
    userHeight: '',
    compny: '',
    likesSports: '',
    likesMovies: '',
    likesBooks: '',
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
    houseArr: ['请选择您的车房状况', '有车有房', '有车无房', '有房无车', '无房无车'],
    houseIndex: 0,
    show: false,
    industryShow: false
  },
  // 确认更新
  confirmUpdate () {
    // this.setData({
    //   show: true
    // })
    this.upDateMyInfo()
  },
  // 取消更新
  cancelConfirm () {
    wx.navigateBack({
      delta: 2
    })
  },
  // 首先获取自己的资料
  // getMyInfo () {
  //   let getobj = {
  //     url: useUrl.getUserInfoBySelf,
  //     data: {
  //       session_key: wx.getStorageSync('session_key')
  //     },
  //     success (res) {
  //       console.log(res)
  //     }
  //   }
  //   app.wxrequest(getobj)
  // },
  // 返回错误信息
  error (text) {
    wx.showToast({
      title: text,
      image: '../../images/jiong.png',
      duration: 1500,
      mask: true
    })
  },
  // 更新用户资料
  upDateMyInfo () {
    let that = this
    if (that.data.name.length <= 0) {
      return that.error('请填写名字')
    } else if (that.data.ageIndex === 0) {
      return that.error('请选择年龄')
    } else if (that.data.userHeight.length <= 0) {
      return that.error('请输入身高')
    } else if ((that.data.value[0] * 1 === 0) && (that.data.value[1] * 1 === 0)) {
      return that.error('请选择所在行业')
    } else if (that.data.compny.length <= 0) {
      return that.error('请填写公司名字')
    } else if (that.data.houseIndex * 1 === 0) {
      return that.error('请选择车房状况')
    } else if (that.data.likesSports.length <= 0) {
      return that.error('至少填写一项运动')
    } else if (that.data.likesMovies.length <= 0) {
      return that.error('至少填写一个电影')
    } else if (that.data.likesBooks.length <= 0) {
      return that.error('至少填写一本书')
    }
    this.setData({
      show: true
    })
    let upobj = {
      url: useUrl.updateUserInfo,
      data: {
        session_key: wx.getStorageSync('session_key'),
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
        likes_books: that.data.likesBooks || ''
      },
      success () {
        // console.log('保存信息成功', res)
        wx.showToast({
          title: '个人资料保存成功',
          duration: 1000,
          mask: true
        })
        // setTimeout(function () {
        //   wx.navigateBack({
        //     delta: 1
        //   })
        // }, 1000)
      }
    }
    app.wxrequest(upobj)
    this.upPhotoInfo()
  },
  // 更新相册列表
  upPhotoInfo () {
    let that = this
    let photoObj = {
      url: useUrl.updatePhotos,
      data: {
        session_key: wx.getStorageSync('session_key'),
        photos: JSON.stringify(that.data.photos)
      },
      success (res) {
        console.log(res)
      }
    }
    app.wxrequest(photoObj)
  },
  // 输入框内容
  inputValue (e) {
    let that = this
    app.inputValue(e, that)
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
    wx.navigateBack({
      delta: 1
    })
  },
  // picker选择器
  bindPickerChange: function (e) {
    let type = e.currentTarget.dataset.type
    let value = e.detail.value * 1
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
              photos.push({
                photo_url: jsonObj,
                is_ta: 0
              })
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
    let s = []
    that.data.photos.forEach(v => {
      s.push(v.photo_url)
    })
    let obj = {
      current: s[index],
      urls: s
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
    app.data.ageArr.splice(0, 1, '请选择您的年龄区间')
    app.data.industryOne.splice(0, 1, '请选择您所在的行业')
    app.data.industryTwo.splice(0, 1, ['请选择您所在的行业'])
    this.setData({
      ageArr: app.data.ageArr,
      industryOne: app.data.industryOne,
      industryTwo: app.data.industryTwo,
      name: wx.getStorageSync('userInfo').nickName || ''
    })
    // this.getMyInfo()
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
