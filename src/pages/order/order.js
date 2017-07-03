// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Mr.Rocky 双人火焰牛排餐',
    days: '2017.05.20(周日)',
    time: '18:00',
    address: '珠江新城华夏路6号',
    people: '寻约会对象',
    pay: '我付清',
    price: '168',
    // 意向金弹窗
    moneyshow: false,
    // 禁止发起弹窗
    cancelshow: false,
    // 发起成功弹窗
    datingSuccess: false,
    // 个人资料完善弹窗
    datashow: false,
    one: 0,
    two: 0,
    payText: '立即支付'
  },
  // 完善个人资料
  gofinishuserdata () {
    wx.redirectTo({

    })
  },
  // 选择约会对象
  cp (e) {
    let p = e.currentTarget.dataset.type
    if (p === 'noself') {
      this.setData({
        people: '寻约会对象'
      })
    } else if (p === 'self') {
      this.setData({
        people: '自带约会对象'
      })
    } else if (p === 'my') {
      this.setData({
        pay: '我付清'
      })
    } else if (p === 'both') {
      this.setData({
        pay: '各付各'
      })
    } else if (p === 'other') {
      this.setData({
        pay: 'Ta付清'
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
  // 行业选择
  bindChange (e) {
    this.setData({
      one: e.detail.value[0],
      two: e.detail.value[1],
      value: e.detail.value
    })
  },
  // 去除遮罩层
  delMask (e) {
    let type = e.currentTarget.dataset.type
    console.log(type)
    if (type === 'yxpay') {
      this.setData({
        moneyshow: false
      })
    } else {
      this.setData({
        cancelshow: false
      })
    }
  },
  // 去支付
  goPay () {
    if (this.data.people === '自带约会对象' && this.data.pay !== '我付清') {
      return wx.showToast({
        title: '自带约会对象请选择我付清',
        image: '../../images/jiong.png',
        duration: 2000,
        mask: true
      })
    }
    console.log('开始支付流程')
    this.setData({
      datingSuccess: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
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
      industryOne: industryOne
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

