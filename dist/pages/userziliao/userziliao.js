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
    userHeight: '',
    compny: '',
    likesSports: '',
    likesMovies: '',
    likesBooks: '',
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
    houseArr: ['请选择您的车房状况', '有车有房', '有车无房', '有房无车', '车房待购'],
    houseIndex: 0,
    show: true,
    industryShow: false
  },
  // 确认更新
  confirmUpdate: function confirmUpdate() {
    this.upDateMyInfo();
  },
  savePhone: function savePhone() {
    var that = this;
    app.wxrequest({
      url: useUrl.updateUserMobile,
      data: {
        session_key: wx.getStorageSync('session_key'),
        mobile: that.data.phone
      }
    });
  },

  // 首先获取自己的资料
  getMyInfo: function getMyInfo() {
    var that = this;
    var getobj = {
      url: useUrl.getUserInfoBySelf,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        var i = res.data.data;
        var job1 = i.job.split('-') || '不限';
        var v1 = that.data.industryOne.indexOf(job1[0]) || 0;
        var v2 = 0;
        // console.log(that.data.industryTwo)
        if (v1 < 24) {
          v2 = that.data.industryTwo[v1].indexOf(job1[1]) || 0;
        }
        var vv = [v1, v2];
        that.setData({
          name: i.name,
          genderCur: i.sex * 1 - 1,
          marryCur: i.ganqing,
          ageIndex: that.data.ageArr.indexOf(i.age),
          userHeight: i.user_height,
          value: vv,
          compny: i.compny,
          houseIndex: i.cart_house,
          likesSports: i.likes_sports,
          likesMovies: i.likes_movies,
          likesBooks: i.likes_books,
          comment_list: i.comment_lists,
          id: i.user_id
        });
        app.getPhone(that);
      }
    };
    app.wxrequest(getobj);
  },

  // 返回错误信息
  error: function error(text) {
    wx.showToast({
      title: text,
      image: '../../images/jiong.png',
      duration: 1500,
      mask: true
    });
  },

  // 更新用户资料
  upDateMyInfo: function upDateMyInfo() {
    var that = this;
    if (that.data.name.length <= 0) {
      return that.error('请填写名字');
    } else if (that.data.ageIndex === 0) {
      return that.error('请选择年龄');
    } else if (!that.data.phone || parseInt(that.data.phone.length) !== 11) {
      return that.error('手机号有误');
    } else if (that.data.userHeight.length <= 0) {
      return that.error('请输入身高');
    } else if (that.data.value[0] * 1 === 0 && that.data.value[1] * 1 === 0) {
      return that.error('请选择所在行业');
    } else if (that.data.compny.length <= 0) {
      return that.error('请填写公司名字');
    } else if (that.data.houseIndex * 1 === 0) {
      return that.error('请选择车房状况');
    } else if (that.data.likesSports.length <= 0) {
      return that.error('至少填写一项运动');
    } else if (that.data.likesMovies.length <= 0) {
      return that.error('至少填写一个电影');
    } else if (that.data.likesBooks.length <= 0) {
      return that.error('至少填写一本书');
    }
    wx.setStorageSync('phoneNumber', that.data.phone);
    that.savePhone();
    var upobj = {
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
      success: function success() {
        // console.log('保存信息成功', res)
        wx.showToast({
          title: '个人资料保存成功',
          duration: 1000,
          mask: true
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      }
    };
    app.wxrequest(upobj);
  },

  // 输入框内容
  inputValue: function inputValue(e) {
    var that = this;
    app.inputValue(e, that);
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
    var value = e.detail.value * 1;
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    this.setData({
      name: wx.getStorageSync('userInfo').nickName
    });
    app.data.ageArr.splice(0, 1, '请选择您的年龄区间');
    app.data.industryOne.splice(0, 1, '请选择您所在的行业');
    app.data.industryTwo.splice(0, 1, ['请选择您所在的行业']);
    this.setData({
      ageArr: app.data.ageArr,
      industryOne: app.data.industryOne,
      industryTwo: app.data.industryTwo
    });
    this.getMyInfo();
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
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '进来帮我美言几句呀！',
      imageUrl: '../../images/pingjia.png',
      path: '/pages/inviteEvaluate/inviteEvaluate?id=' + this.data.id,
      success: function success() {
        wx.showToast({
          title: '转发成功'
        });
      }
    };
  }
});
//# sourceMappingURL=userziliao.js.map
