// 获取全局应用程序实例对象
const app = getApp()
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'newuser',
    photos: [],
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
    houseArr: ['请选择Ta的车房状况', '有车有房', '有车无房', '有房无车', '无房无车'],
    houseIndex: 0,
    industryShow: false,
    forOther: true
  },
  // 确认
  taConfirm () {
    wx.navigateTo({
      url: '../newuser/newuser'
    })
  },
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
      count: 9,
      success (res) {
        let photos = that.data.photos
        for (let i of res.tempFilePaths) {
          photos.push(i)
        }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (e) {
    // TODO: onLoad
    let forOther
    if (e.type === 'forOther') {
      forOther = true
    } else {
      forOther = false
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
