'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var useUrl = require('../../utils/service');
var citys = require('../../utils/citys');
var QQMapWX = require('../../utils/qmapsdk');
var qqmapsdkkey = '2D3BZ-2I7WU-F22VV-43SMX-W6Z5K-PDFYQ';
var qqmapsdk = void 0;
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'plans',
    day: 20,
    month: 'May',
    setAdd: true,
    city: '定位中',
    area: '定位中',
    selectBy: '筛选',
    selectdata: 2,
    page: 1,
    content: [],
    showText: '您所在地区暂时无法提供服务，请点击左上角更换地区。'
  },
  // 选择排序方式
  selectchoose: function selectchoose(e) {
    var that = this;
    var q = e.currentTarget.dataset.choose;
    // console.log(q)
    if (q === '0') {
      this.setData({
        selectBy: '美食'
      });
    } else if (q === '1') {
      this.setData({
        selectBy: '体验'
      });
    }
    this.setData({
      selectdata: q,
      page: 1,
      statustwo: false,
      content: []
    });
    this.engagementLists(q, that.data.page);
  },

  // 排序页面展示
  select: function select() {
    var a = this.data.statustwo;
    this.setData({
      statustwo: !a,
      status: false
    });
  },

  // 逆地址解析
  reverseGeocoder: function reverseGeocoder() {
    var that = this;
    var obj = {
      success: function success(res) {
        // console.log(res)
        var city = res.result.ad_info.city;
        city = city.replace('市', '');
        // console.log(city)
        // console.log(citys[city])
        if (!citys[city]) {
          return that.setData({
            city: '点击选择城市',
            ifarrow: true,
            setAdd: false,
            lat: res.result.location.lat,
            lng: res.result.location.lng,
            area: '',
            show: true
          });
        }
        if (citys[city][0] !== '附近') {
          citys[city].unshift('附近');
        }
        that.setData({
          setAdd: false,
          city: city + '市',
          cityall: res.result.ad_info.city,
          lat: res.result.location.lat,
          lng: res.result.location.lng,
          area: '附近'
        });
        that.engagementLists(2, that.data.page);
      },
      fail: function fail(res) {
        console.log(res);
        wx.showToast({
          title: '请允许获取您的位置信息'
        });
        setTimeout(function () {
          var settingObj = {
            success: function success(res) {
              // console.log(res)
              // 授权失败
              if (!res.authSetting['scope.userLocation']) {
                wx.showToast({
                  title: '请允许获取您的地理位置信息',
                  mask: true
                });
                setTimeout(function () {
                  return that.reverseGeocoder();
                }, 1000);
              } else {
                // 授权成功
                return that.reverseGeocoder();
              }
            },
            fail: function fail(res) {
              console.log(res);
            }
          };
          wx.openSetting(settingObj);
        }, 1000);
      }
    };
    qqmapsdk.reverseGeocoder(obj);
  },

  // 城市列表
  showcitys: function showcitys() {
    // if (this.data.ifarrow) return
    if (this.data.setAdd) {
      return wx.showToast({
        title: '等待定位',
        icon: 'loading',
        mask: 'true'
      });
    }
    if (this.data.status) {
      return this.setData({
        cityslist: [],
        citydetail: [],
        status: false,
        statustwo: false
      });
    }
    var cityslist = [];
    for (var i in citys) {
      cityslist.push(i);
    }
    var index = this.data.city === '佛山' ? '0' : this.data.city === '广州' ? '1' : this.data.city === '深圳' ? '2' : '3';
    // console.log(index);
    var cl = cityslist[index];
    console.log(cl);
    this.setData({
      cityslist: cityslist,
      status: true,
      statustwo: false,
      current: cl
    });
    this.showcitydetail();
  },

  // 二级列表
  showcitydetail: function showcitydetail(e) {
    var flag = void 0;
    console.log(e);
    if (!e) {
      if (this.data.city === '佛山' || this.data.city === '广州' || this.data.city === '深圳' || this.data.city === '北京') {
        flag = this.data.city;
      } else {
        flag = '佛山';
      }
    } else {
      flag = e.currentTarget.dataset.city;
    }
    console.log(flag);
    var citydetail = citys[flag];
    this.setData({
      citydetail: citydetail,
      current: flag,
      cityone: flag
    });
  },

  // 背景遮罩层取消
  cancel: function cancel() {
    this.setData({
      status: false,
      statustwo: false
    });
  },

  // 选择区域
  choosearea: function choosearea(e) {
    var that = this;
    this.setData({
      cityslist: [],
      citydetail: [],
      status: false,
      current: null,
      page: 1,
      content: []
    });
    var area = e.currentTarget.dataset.area;
    // console.log(area)
    var cityone = this.data.cityone;
    this.setData({
      city: cityone,
      ifarrow: false,
      area: area
    });
    this.engagementLists(that.data.selectdata, that.data.page);
  },

  // 选择时间
  chooseTime: function chooseTime() {
    wx.switchTab({
      url: '../index2/index2'
    });
  },

  // 获取约会套餐列表
  engagementLists: function engagementLists(type, page) {
    var that = this;
    var time = that.data.year + '-' + (that.data.month_n < 10 ? '0' + that.data.month_n : that.data.month_n) + '-' + (that.data.day < 10 ? '0' + that.data.day : that.data.day);
    var obj = {};
    if (that.data.area === '附近') {
      if (that.data.city.length === 2) {
        that.data.city += '市';
      }
      obj = {
        url: useUrl.engagementLists,
        data: {
          session_key: wx.getStorageSync('session_key'),
          type: type || 2,
          time: time,
          city: that.data.city,
          // district: that.data.area,
          lng: that.data.lng,
          lat: that.data.lat,
          page: page
        },
        success: function success(res) {
          // console.log(res)
          if (res.data.data.length <= 0) {
            if (page === 1) {
              that.setData({
                show: true
              });
            }
            // return
            return;
            // wx.showToast({
            //   title: '暂时没有更多内容啦',
            //   image: '../../images/jiong.png',
            //   duration: 700,
            //   mask: true
            // })
          }
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = res.data.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var i = _step.value;

              that.data.content.push(i);
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

          that.setData({
            show: false,
            content: that.data.content
          });
        }
      };
    } else {
      obj = {
        url: useUrl.engagementLists,
        data: {
          session_key: wx.getStorageSync('session_key'),
          type: type || 2,
          time: time,
          city: that.data.city + '\u5E02',
          district: that.data.area,
          lng: that.data.lng,
          lat: that.data.lat,
          page: page
        },
        success: function success(res) {
          // console.log(res)
          if (res.data.data.length <= 0) {
            if (page === 1) {
              that.setData({
                show: true
              });
            }
            return;
            // wx.showToast({
            //   title: '没有更多内容啦',
            //   image: '../../images/jiong.png',
            //   duration: 1000,
            //   mask: true
            // })
          }
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = res.data.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var i = _step2.value;

              that.data.content.push(i);
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

          that.setData({
            show: false,
            content: that.data.content
          });
        }
      };
    }
    app.wxrequest(obj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    qqmapsdk = new QQMapWX({
      key: qqmapsdkkey
    });
    this.reverseGeocoder();
    var time = wx.getStorageSync('time');
    this.setData({
      year: time.y,
      month: time.m,
      month_n: time.m_n,
      day: time.d
    });
    // TODO: onLoad
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
    // let that = this
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

  // 页面触底事件
  onReachBottom: function onReachBottom() {
    this.engagementLists(this.data.selectdata, ++this.data.page);
  }
});
//# sourceMappingURL=plans.js.map
