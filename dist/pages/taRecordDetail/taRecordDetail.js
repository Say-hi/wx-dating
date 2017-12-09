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
    title: 'newuser',
    photos: [],
    name: '',
    // 性别
    genderCur: 0,
    genderChoose: [{
      flag: 1,
      value: '男',
      ico: 'icon-nanxing'
    }, {
      name: 2,
      value: '女',
      ico: 'icon-nvxing'
    }],
    // 婚姻
    marryCur: 0,
    marryChoose: [{
      flag: 1,
      value: '单身',
      ico: 'icon-nanxing'
    }, {
      name: 2,
      value: '非单身',
      ico: 'icon-nvxing'
    }],
    // 年龄
    ageIndex: 0,
    // 行业
    two: 0,
    industryIndex: 0,
    value: [0, 0],
    // 车房状况
    houseArr: ['请选择Ta的车房状况', '有车有房', '有车无房', '有房无车', '车房待购'],
    houseIndex: 0,
    industryShow: false,
    forOther: false,
    parmas: {}
  },
  // 替他发起订单生成
  goNextStep: function goNextStep() {
    var that = this;
    if (this.data.name.length === 0) {
      return wx.showToast({
        title: '亲，至少要填写Ta的名称哦~',
        mask: true
      });
    }
    wx.showModal({
      title: '是否保存TA的资料',
      showCancel: true,
      concelText: '取消',
      cncelColor: '#666666',
      confirmText: '确认',
      confirmColor: '#ffc4a6',
      success: function success(res) {
        if (res.confirm) {
          // console.log(1)/
          that.updateTaArchives();
        } else if (res.cancel) {
          // console.log(2)
          var foi = {
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
            photos: that.data.photos.join(','),
            mobile: that.data.mobile || '',
            archives_id: that.data.id
          };
          wx.setStorageSync('forOtherInfo', foi);
          var s = wx.getStorageSync('orderInfo');
          wx.redirectTo({
            url: '../order/order?type=forOther&id=' + s.orderId + '&title=' + s.title + '&price=' + s.price + '&address=' + s.address
          });
        }
      }
    });
  },

  // 输入框内容
  inputValue: function inputValue(e) {
    var that = this;
    app.inputValue(e, that);
  },

  // 确认
  taConfirm: function taConfirm() {
    wx.navigateTo({
      url: '../newuser/newuser'
    });
  },

  // 选择档案
  chooseTa: function chooseTa() {
    wx.redirectTo({
      url: '../taRecord/taRecord?type=choose'
    });
  },

  // 行业遮罩
  chooseIndustry: function chooseIndustry() {
    this.setData({
      industryShow: true
    });
  },

  // 去除遮罩
  noMask: function noMask() {
    this.setData({
      industryShow: false
    });
  },

  // 行业选择
  bindChange: function bindChange(e) {
    var tempValue = [];
    if (e.detail.value[0] === this.data.value[0]) {
      tempValue = e.detail.value;
    } else {
      tempValue = [e.detail.value[0], 0];
    }
    this.setData({
      two: e.detail.value[0],
      value: tempValue
    });
  },

  // 去除遮罩层
  delMask: function delMask() {
    this.setData({
      show: false
    });
  },

  // picker选择器
  bindPickerChange: function bindPickerChange(e) {
    var type = e.currentTarget.dataset.type;
    var value = e.detail.value;
    if (type === 'age') {
      this.setData({
        ageIndex: value
      });
    } else if (type === 'industry') {
      this.setData({
        industryIndex: value
      });
    } else if (type === 'house') {
      this.setData({
        houseIndex: value
      });
    }
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
        var photos = that.data.photos;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res.tempFilePaths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i = _step.value;

            // 添加到相册数组中
            // photos.push(i)
            // 上传图片
            var upImg = {
              url: useUrl.uploadPhotos,
              filePath: i,
              formData: {
                session_key: wx.getStorageSync('session_key'),
                file: i
              },
              success: function success(res) {
                // console.log(res)
                // console.log('上传成功', res.data)
                wx.hideLoading();
                var jsonObj = JSON.parse(res.data).data.res_file;
                photos.push(jsonObj);
                if (photos.length > 9) {
                  wx.showToast({
                    title: '超过9张啦,已删除多余的照片',
                    image: '../../images/jiong.png',
                    duration: 2000,
                    mask: true
                  });
                }
                photos = photos.slice(0, 9);
                that.setData({
                  photos: photos
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
      },
      fail: function fail(err) {
        console.log(err);
      }
    };
    wx.chooseImage(obj);
  },

  // 用户预览图片
  preview: function preview(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var obj = {
      current: that.data.photos[index],
      urls: that.data.photos
    };
    wx.previewImage(obj);
  },

  // 删除图片
  delphoto: function delphoto(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var photos = that.data.photos;
    photos.splice(index, 1);
    that.setData({
      photos: photos
    });
  },

  // 单项选择
  chooseChange: function chooseChange(e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var that = this;
    if (type === 'gender') {
      that.setData({
        genderCur: index
      });
    } else if (type === 'marry') {
      that.setData({
        marryCur: index
      });
    }
  },

  // 获取信息
  getArchives: function getArchives(id) {
    var that = this;
    var gc = {
      url: useUrl.getTaArchivesDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id
      },
      success: function success(res) {
        // console.log(res)
        // console.log(res.data.data)
        var job1 = res.data.data.job.split('-');
        // console.log('job1', job1)
        var v1 = that.data.industryOne.indexOf(job1[0]);
        var v2 = 0;
        if (v1 < 24) {
          v2 = that.data.industryTwo[v1].indexOf(job1[1]);
        }
        var vv = [v1, v2];
        that.setData({
          name: res.data.data.name,
          genderCur: res.data.data.sex * 1 - 1,
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
          mobile: res.data.data.mobile || '',
          id: id
        });
      }
    };
    app.wxrequest(gc);
  },

  // 手机号输入
  mobileInput: function mobileInput(e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  // 更新信息
  updateTaArchives: function updateTaArchives() {
    var that = this;
    if (that.data.name.length <= 0) {
      return wx.showToast({
        title: '请填写名字',
        image: '../../images/jiong.png',
        duration: 1500,
        mask: true
      });
    }
    var upobj = {
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
        mobile: that.data.mobile || '',
        photos: that.data.photos.join(',')
      },
      success: function success(res) {
        // console.log('保存信息成功', res)
        wx.showToast({
          title: '保存成功',
          duration: 1000,
          mask: true
        });
        // console.log('save', res)
        that.setData({
          id: res.data.data.archives_id
        });
        console.log('id', that.data.id);
        if (that.data.forOther) {
          // console.log('asdf')
          var infos = {
            url: useUrl.addUpdateTaArchives,
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
            photos: that.data.photos.join(','),
            archives_id: that.data.id
          };
          // console.log('infos', infos)
          wx.setStorageSync('forOtherInfo', infos);
          return setTimeout(function () {
            var s = wx.getStorageSync('orderInfo');
            wx.redirectTo({
              url: '../order/order?type=forOther&id=' + s.orderId + '&title=' + s.title + '&price=' + s.price + '&address=' + s.address
            });
          }, 1000);
        }
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      }
    };
    app.wxrequest(upobj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(e) {
    // TODO: onLoad
    var forOther = void 0;
    if (e.type === 'forOther') {
      forOther = true;
      wx.setNavigationBarTitle({
        title: '替Ta发起'
      });
    } else {
      forOther = false;
    }
    if (e.id) {
      this.getArchives(e.id);
    }
    app.data.ageArr.splice(0, 1, '请选择Ta的年龄区间');
    app.data.industryOne.splice(0, 1, '请选择Ta所在的行业');
    app.data.industryTwo.splice(0, 1, ['请选择Ta所在的行业']);
    this.setData({
      ageArr: app.data.ageArr,
      industryOne: app.data.industryOne,
      industryTwo: app.data.industryTwo,
      forOther: forOther
    });
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
//# sourceMappingURL=taRecordDetail.js.map
