'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var useUrl = require('../../utils/service');
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
  delphoto: function delphoto(e) {
    var index = e.currentTarget.dataset.index;
    var photos = this.data.userPhotos;
    photos.splice(index, 1);
    this.setData({
      userPhotos: photos
    });
  },

  // 获取相册信息
  getMyInfo: function getMyInfo(url) {
    var that = this;
    var getMO = {
      url: url,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        that.setData({
          userPhotos: res.data.data || []
        });
      }
    };
    app.wxrequest(getMO);
  },

  // 获取他人相册
  getOther: function getOther(id) {
    var that = this;
    var obj = {
      url: useUrl.otherUserPhotos,
      data: {
        session_key: wx.getStorageSync('session_key'),
        user_id: id
      },
      success: function success(res) {
        that.setData({
          userPhotos: res.data.data
        });
      }
    };
    app.wxrequest(obj);
  },

  // 显示图片
  showImg: function showImg(e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.userPhotos;
    var newImgArr = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = imgArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;

        newImgArr.push(i.photo_url);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var obj = {
      current: newImgArr[index],
      urls: newImgArr
    };
    wx.previewImage(obj);
  },

  // 用户上传图片
  upPhoto: function upPhoto() {
    var that = this;
    var obj = {
      count: 1,
      success: function success(res) {
        wx.showLoading({
          title: '图片上传中',
          mask: true
        });
        var userPhotos = that.data.userPhotos;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = res.tempFilePaths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var i = _step2.value;

            var upImg = {
              url: useUrl.uploadPhotos,
              filePath: i,
              formData: {
                session_key: wx.getStorageSync('session_key'),
                file: i
              },
              success: function success(res) {
                wx.hideLoading();
                var jsonObj = JSON.parse(res.data).data.res_file;
                // console.log(jsonObj)
                userPhotos.push({
                  photo_url: jsonObj,
                  is_ta: 0
                });
                if (userPhotos.length > 9) {
                  wx.showToast({
                    title: '超过9张啦,已删除多余的照片',
                    image: '../../images/jiong.png',
                    duration: 2000,
                    mask: true
                  });
                }
                userPhotos = userPhotos.slice(0, 9);
                that.setData({
                  userPhotos: userPhotos
                });
                // console.log('obj', JSON.parse(res.data))
              },
              fail: function fail(res) {
                console.log('上传错误', res);
                wx.showToast({
                  title: '图片上传失败，请重新尝试',
                  mask: true,
                  duration: 1000
                });
              }
            };
            app.wxUpload(upImg);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      },
      fail: function fail(err) {
        console.log(err);
      }
    };
    wx.chooseImage(obj);
  },

  // 更新我的相册
  upMyPhoto: function upMyPhoto() {
    var that = this;
    // let upPhoto = []
    // for (let i of that.data.userPhotos) {
    //   upPhoto.push(i.photo_url)
    // }
    var uMobj = {
      url: useUrl.updatePhotos,
      data: {
        session_key: wx.getStorageSync('session_key'),
        photos: JSON.stringify(that.data.userPhotos)
      },
      success: function success(res) {
        if (res.data.message === '更新成功') {
          wx.showToast({
            title: '更新成功',
            mask: true
          });
        } else {
          wx.showToast({
            title: '服务开小差了，请稍后再尝试',
            mask: true
          });
        }
      }
    };
    app.wxrequest(uMobj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    if (params.id) {
      this.setData({
        id: params.id
      });
    } else {
      this.getMyInfo(useUrl.myPhotos);
    }
    if (params.type === 'other' || params.type === 's') {
      this.setData({
        type: 'other'
      });
      wx.setNavigationBarTitle({
        title: 'Ta的相册'
      });
      this.getOther(params.id);
    }
    // TODO: onLoad
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=photo.js.map
