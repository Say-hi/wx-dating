// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'photo',
    userPhotos: []
  },
  // 删除图片
  delphoto (e) {
    let index = e.currentTarget.dataset.index
    let photos = this.data.userPhotos
    photos.splice(index, 1)
    this.setData({
      userPhotos: photos
    })
  },
  // 获取相册信息
  getMyInfo (url) {
    let that = this
    let getMO = {
      url: url,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success (res) {
        that.setData({
          userPhotos: res.data.data
        })
      }
    }
    app.wxrequest(getMO)
  },
  // 获取他人相册
  getOther (id) {
    let that = this
    let obj = {
      url: useUrl.otherUserPhotos,
      data: {
        session_key: wx.getStorageSync('session_key'),
        user_id: id
      },
      success (res) {
        that.setData({
          userPhotos: res.data.data
        })
      }
    }
    app.wxrequest(obj)
  },
  // 显示图片
  showImg (e) {
    let index = e.currentTarget.dataset.index
    let imgArr = this.data.userPhotos
    let newImgArr = []
    for (let i of imgArr) {
      newImgArr.push(i.photo_url)
    }
    let obj = {
      current: newImgArr[index],
      urls: newImgArr
    }
    wx.previewImage(obj)
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
        let userPhotos = that.data.userPhotos
        for (let i of res.tempFilePaths) {
          let upImg = {
            url: useUrl.uploadPhotos,
            filePath: i,
            formData: {
              session_key: wx.getStorageSync('session_key'),
              file: i
            },
            success (res) {
              wx.hideLoading()
              let jsonObj = JSON.parse(res.data).data.res_file
              // console.log(jsonObj)
              userPhotos.push({
                photo_url: jsonObj,
                is_ta: 0
              })
              if (userPhotos.length > 9) {
                wx.showToast({
                  title: '超过9张啦,已删除多余的照片',
                  image: '../../images/jiong.png',
                  duration: 2000,
                  mask: true
                })
              }
              userPhotos = userPhotos.slice(0, 9)
              that.setData({
                userPhotos: userPhotos
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
  // 更新我的相册
  upMyPhoto () {
    let that = this
    let upPhoto = []
    for (let i of that.data.userPhotos) {
      upPhoto.push(i.photo_url)
    }
    let uMobj = {
      url: useUrl.updatePhotos,
      data: {
        session_key: wx.getStorageSync('session_key'),
        photos: upPhoto.join(',')
      },
      success (res) {
        if (res.data.message === '更新成功') {
          wx.showToast({
            title: '更新成功',
            mask: true
          })
        } else {
          wx.showToast({
            title: '服务开小差了，请稍后再尝试',
            mask: true
          })
        }
      }
    }
    app.wxrequest(uMobj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    if (params.id) {
      this.setData({
        id: params.id
      })
    } else {
      this.getMyInfo(useUrl.myPhotos)
    }
    if (params.type === 'other') {
      this.setData({
        type: 'other'
      })
      this.getOther(params.id)
    }
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
