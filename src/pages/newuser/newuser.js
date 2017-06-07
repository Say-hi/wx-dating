// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'newuser',
    photos: [],
    gender: [
      {
        name: 1,
        value: '男',
        checked: 'true'
      },
      {
        name: 2,
        value: '女',
        checked: 'true'
      }
    ]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
