// 获取全局应用程序实例对象
/*eslint-disable*/
const app = getApp()
const plugin = require('../../utils/plugin')
const ccFile = require('../../utils/calendar-converter')
const common = require('../../utils/common')
const curDate = new Date()
let calendarConverter = new ccFile.CalendarConverter()
let curYear = curDate.getFullYear()
let curMonth = curDate.getMonth()
let curDay = curDate.getDate()
let pageData = {
  dateData: {
    date: "",                //当前日期字符串
    arrIsShow: [],           //是否当前月日期
    // arrIsWeek: [],           //是否是周六日
    arrDays: [],             //关于几号的信息
    arrInfoEx: [],           //农历节假日等扩展信息
    arrInfoExShow: [],       //处理后用于显示的扩展信息
  },
  detailData: {
    curDay: '',
    curInfo1: '',
    curInfo2: ''
  }
}
let pageData2 = {
  dateData: {
    date: "",                //当前日期字符串
    arrIsShow: [],           //是否当前月日期
    // arrIsWeek: [],           //是否是周六日
    arrDays: [],             //关于几号的信息
    arrInfoEx: [],           //农历节假日等扩展信息
    arrInfoExShow: [],       //处理后用于显示的扩展信息
  },
  detailData: {
    curDay: '',
    curInfo1: '',
    curInfo2: ''
  }
}
//月份天数表
var DAY_OF_MONTH = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
]
var DAY_ENGLISH = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
//获取月份天数
var getDayCount = function(year, month){
  return DAY_OF_MONTH[isLeapYear(year)][month];
}
//判断当前年是否闰年
var isLeapYear = function(year){
  if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
    return 1
  else
    return 0
}
//获取此月第一天相对视图显示的偏移
var getOffset = function(Year, Month) {
  var offset = new Date(Year, Month, 1).getDay()
  // console.log(offset)
  offset = offset == 0 ? 6 : offset - 1//注意这个转换，Date对象的getDay函数返回返回值是 0（周日） 到 6（周六）
  return offset
}
// 刷新详细日数据
var refreshDetailData = function(pageData, index){
  var curEx = pageData.dateData.arrInfoEx[index];
  if (!curEx)
    return;
  curDay = curEx.sDay;
  pageData.detailData.curMonth = curEx.sMonth;
  pageData.detailData.curYear = curEx.sYear;
  pageData.detailData.curDay = curEx.sDay;
  pageData.detailData.showDay = curEx.sYear + "年" +  curEx.sMonth + "月";
  pageData.detailData.curInfo1 = "农历" + curEx.lunarMonth + "月" + curEx.lunarDay + " " + curEx.lunarFestival;
  pageData.detailData.curInfo2 = curEx.cYear+curEx.lunarYear + "年 " + curEx.cMonth + "月 " + curEx.cDay + "日";
}
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Index page',
    userInfo: {},
    showText: '进入约会计划',
    // 51日历api
    vacationUrl: 'http://cfg.51wnl.com/api/getconfigbyparajson.aspx?appid=ios-wnl-free&appver=2&configkey=Vocation_ZH_CN&lastupdate=',
    festivalUrl: 'http://cfg.51wnl.com/api/getconfigbyparajson.aspx?appid=ios-wnl-free&appver=2&configkey=Festival_ZH_CN&lastupdate='
  },
  // 获取51api数据
  get51Api (URL) {
    // let that = this
    let obj = {
      url: URL,
      success (res) {
        let data = res.data.replace(/[()]/g,'')
        let festivalObj = plugin.base64decode(JSON.parse(data).msg)
        console.log(festivalObj)
      }
    }
    wx.request(obj)
  },
  // 设置顶部时间
  topDate (year, month, day) {
    // let that = this
    return year + '年' + month + '月' + day
    // this.setData({
    //   showDate: year + '年' + month + '月' + day
    // })
  },
  // 初始化当前月数据
  initCurDate (year, month, day) {
    var curMonth = month
    var curYear = year
    var curDay = day
    var prevMonthDays = 0
    var nextMonthDays = 0
    var curMonthDays = 0
    // 当月天数
    curMonthDays = getDayCount(curYear, curMonth)
    // 设置顶部日期
    if (!this.data.curStatus) {
      pageData.dateData.date = this.topDate(curYear, curMonth + 1, curDay)
      pageData.dateData.curYear = curYear
      pageData.dateData.curMonth = curMonth + 1
      pageData.dateData.curDay = curDay
      pageData.dateData.week = DAY_ENGLISH[getOffset(curYear, curMonth)]
      this.setData({
        curStatus: true
      })
    }

    // 获取当月偏移
    var offset = getOffset(curYear, curMonth)
    // console.log('当月偏移'+offset)

    var offset2 = getDayCount(curYear, curMonth) + offset
    // console.log('偏移量加天数'+offset2)

    if (curMonth === 0) {
      prevMonthDays = getDayCount(curYear - 1, 11)
      nextMonthDays = getDayCount(curYear, curMonth + 1)
    } else if (curMonth === 11) {
      prevMonthDays = getDayCount(curYear, curMonth -1)
      nextMonthDays = getDayCount(curYear + 1, 0)
    } else {
      prevMonthDays = getDayCount(curYear, curMonth -1)
      nextMonthDays = getDayCount(curYear, curMonth + 1)
    }
    // 当前月
    for (var i = 0; i < 42; ++i) {
      pageData.dateData.arrIsShow[i] = i < offset || i >= offset2 ? false : true
      // pageData.dateData.arrIsWeek[i] = (i + 1) % 7 == 0 || (i + 2) % 7 == 0 ? true : false
      // pageData.dateData.arrIsWeek[i-1] = (i + 1) % 7 == 0 ? true : false
      pageData.dateData.arrDays[i] = i - offset + 1
      if (!pageData.dateData.arrIsShow[i]) {
        if ( i < curMonthDays) {
          // console.log(i)
          pageData.dateData.arrDays[i] = i - offset + 1 + prevMonthDays
        } else {
          pageData.dateData.arrDays[i] = i - offset2 + 1
        }
      }

      // 添加阴历相关数据
      var d = new Date(year, month, i - offset + 1)
      var dEx = calendarConverter.solar2lunar(d)
      pageData.dateData.arrInfoEx[i] = dEx
      if ('' != dEx.lunarFestival) {
        pageData.dateData.arrInfoExShow[i] = dEx.lunarFestival
      } else if ('初一' === dEx.lunarDay) {
        pageData.dateData.arrInfoExShow[i] = dEx.lunarMonth + '月'
      } else {
        pageData.dateData.arrInfoExShow[i] = dEx.lunarDay
      }
    }
    refreshDetailData(pageData, offset + day - 1);
    this.setData({
      dateData: pageData.dateData,
      detailData: pageData.detailData
    })
  },
  // 初始化滑动后要展示的数据
  initCurDate2 (year, month, day) {
    var curMonth = month
    var curYear = year
    var curDay = day
    var prevMonthDays = 0
    var nextMonthDays = 0
    var curMonthDays = 0
    // 当月天数
    curMonthDays = getDayCount(curYear, curMonth)
    // 设置顶部日期
    if (!this.data.curStatus2) {
      pageData2.dateData.date = this.topDate(curYear, curMonth + 1, curDay)
      pageData2.dateData.curYear = curYear
      pageData2.dateData.curMonth = curMonth + 1
      pageData2.dateData.curDay = curDay
      pageData2.dateData.week = DAY_ENGLISH[getOffset(curYear, curMonth)]
      this.setData({
        curStatus2: true
      })
    }

    // 获取当月偏移
    var offset = getOffset(curYear, curMonth)
    // console.log('当月偏移'+offset)

    var offset2 = getDayCount(curYear, curMonth) + offset
    // console.log('偏移量加天数'+offset2)

    if (curMonth === 0) {
      prevMonthDays = getDayCount(curYear - 1, 11)
      nextMonthDays = getDayCount(curYear, curMonth + 1)
    } else if (curMonth === 11) {
      prevMonthDays = getDayCount(curYear, curMonth -1)
      nextMonthDays = getDayCount(curYear + 1, 0)
    } else {
      prevMonthDays = getDayCount(curYear, curMonth -1)
      nextMonthDays = getDayCount(curYear, curMonth + 1)
    }
    // 当前月
    for (var i = 0; i < 42; ++i) {
      pageData2.dateData.arrIsShow[i] = i < offset || i >= offset2 ? false : true
      // pageData2.dateData.arrIsWeek[i] = (i + 1) % 7 == 0 || (i + 2) % 7 == 0 ? true : false
      // pageData2.dateData.arrIsWeek[i-1] = (i + 1) % 7 == 0 ? true : false
      pageData2.dateData.arrDays[i] = i - offset + 1
      if (!pageData2.dateData.arrIsShow[i]) {
        if ( i < curMonthDays) {
          // console.log(i)
          pageData2.dateData.arrDays[i] = i - offset + 1 + prevMonthDays
        } else {
          pageData2.dateData.arrDays[i] = i - offset2 + 1
        }
      }

      // 添加阴历相关数据
      var d = new Date(year, month, i - offset + 1)
      var dEx = calendarConverter.solar2lunar(d)
      pageData2.dateData.arrInfoEx[i] = dEx
      if ('' != dEx.lunarFestival) {
        pageData2.dateData.arrInfoExShow[i] = dEx.lunarFestival
      } else if ('初一' === dEx.lunarDay) {
        pageData2.dateData.arrInfoExShow[i] = dEx.lunarMonth + '月'
      } else {
        pageData2.dateData.arrInfoExShow[i] = dEx.lunarDay
      }
    }
    refreshDetailData(pageData2, offset + day - 1);
    this.setData({
      dateData2: pageData2.dateData,
      detailData2: pageData2.detailData
    })
  },
  // 上个月
  goLastMonth: function(){
    let curMonth = curMonth + 1
    if (0 == curMonth)
    {
      curMonth = 11;
      --curYear
    }
    else
    {
      --curMonth;
    }
    // console.log(curYear)
    // console.log(curMonth)
    this.initCurDate(curYear, curMonth, 1)
    this.setData({
      dateData: pageData.dateData,
      detailData: pageData.detailData
    })
  },
  goLastMonth2: function(){
    if (0 == curMonth)
    {
      curMonth = 11;
      --curYear
    }
    else
    {
      --curMonth;
    }
    // console.log(curYear)
    // console.log(curMonth)
    this.initCurDate2(curYear, curMonth, 1)
    this.setData({
      dateData2: pageData2.dateData,
      detailData: pageData2.detailData
    })
  },
  // 下个月
  goNextMonth: function(){
    if (11 == curMonth)
    {
      curMonth = 0;
      ++curYear
    }
    else
    {
      ++curMonth;
    }
    // console.log(curYear)
    // console.log(curMonth)
    // chooseDay = || 1;
    this.initCurDate(curYear, curMonth, 1);
    this.setData({
      dateData: pageData.dateData,
      detailData: pageData.detailData
    })
  },
  goNextMonth2: function(){
    if (11 == curMonth)
    {
      curMonth = 0;
      ++curYear
    }
    else
    {
      ++curMonth;
    }
    // console.log(curYear)
    // console.log(curMonth)
    // chooseDay = || 1;
    this.initCurDate2(curYear, curMonth, 1)
    console.log(pageData2)
    this.setData({
      dateData2: pageData2.dateData,
      detailData: pageData2.detailData
    })
  },
  // 回到今天
  goToday: function(){
    var curDate = new Date();
    curMonth = curDate.getMonth();
    curYear = curDate.getFullYear();
    curDay = curDate.getDate();
    this.initCurDate2(curYear, curMonth, curDay);
    this.setData({
      dateData: pageData2.dateData,
      detailData: pageData2.detailData
      // dateData2: pageData.dateData,
      // detailData2: pageData.detailData
    })
  },
  // 选择picker日期
  bindDateChange: function(e){
    var arr = e.detail.value.split("-");
    curYear = +arr[0];
    curMonth = arr[1]-1;
    curDay = +arr[2];
    // this.initCurDate(+arr[0], arr[1]-1, +arr[2]);
    this.initCurDate(curYear, curMonth, curDay);
    this.setData({
      dateData: pageData.dateData,
      detailData: pageData.detailData
    })
  },
  // 选择日期
  selectDay: function(e){
    // var that = this
    refreshDetailData(pageData, e.currentTarget.dataset.dayIndex)
    if (e.currentTarget.dataset.dayIndex < 10 && !e.currentTarget.dataset.dayFalse) {
      // this.goLastMonth()
      // this.goLastMonthAnimate()
      this.goNextMonthAnimate()
      // that.setData({
      //   one_one: 'animated fadeOutRight',
      //   two_two: 'animated fadeInLeft'
      // })
      // setTimeout(function () {
      //   that.goLastMonth()
      // }, 300)
      // setTimeout(function () {
      //   that.setData({
      //     one_one: '',
      //     two_two: ''
      //   })
      // }, 1000)
    } else if (e.currentTarget.dataset.dayIndex > 11 && !e.currentTarget.dataset.dayFalse) {
      // this.goNextMonth()

      this.goLastMonthAnimate()
      // that.setData({
      //   one_one: 'animated fadeOutLeft',
      //   two_two: 'animated fadeInRight'
      // })
      // setTimeout(function () {
      //   that.goNextMonth()
      // }, 300)
      // setTimeout(function () {
      //   that.setData({
      //     one_one: '',
      //     two_two: ''
      //   })
      // }, 1000)
    }
    // this.initCurDate(curYear, curMonth, 1);
    this.setData({
      detailData: pageData.detailData,
    })
  },
  // 触摸开始
  touchStart (e) {
    this.setData({
      startX: e.changedTouches[0].clientX
    })
  },
  // 触摸结束
  touchEnd (e) {
    if (this.data.touchStatus) return
    let that = this
    this.setData({
      touchStatus: true,
      endX: e.changedTouches[0].clientX
    })
    let distance = e.changedTouches[0].clientX - this.data.startX
    if (distance < -100) {
      // left
      // that.goNextMonth()
      that.goToLeft(that)
      // that.setData({
      //   one_one: 'animated fadeOutLeft',
      //   two_two: 'animated fadeInRight'
      // })
      // setTimeout(function () {
      //   that.goNextMonth()
      // }, 300)
      // setTimeout(function () {
      //   that.setData({
      //     touchStatus: false,
      //     one_one: '',
      //     two_two: ''
      //   })
      // }, 1000)
    } else if (distance > 100) {
      // right
      // that.goLastMonth()
      that.goToRight(that)
      // that.setData({
      //   one_one: 'animated fadeOutRight',
      //   two_two: 'animated fadeInLeft'
      // })
      // setTimeout(function () {
      //   that.goLastMonth()
      // }, 300)
      // setTimeout(function () {
      //   that.setData({
      //     touchStatus: false,
      //     one_one: '',
      //     two_two: ''
      //   })
      // }, 1000)
    } else {
      this.setData({
        touchStatus: false
      })
    }
  },
  // 动画效果
  // 向左侧滑动
  goToLeft (that) {
    that.goNextMonth2()
    that.setData({
      one_one: 'animated fadeOutLeft',
      two_two: 'animated fadeInRight'
    })
    setTimeout(function () {
      that.setData({
        dateData: that.data.dateData2
      })
    }, 600)
    setTimeout(function () {
      that.setData({
        touchStatus: false,
        one_one: '',
        two_two: ''
      })
    }, 1000)
    pageData = pageData2
  },
  goToRight (that) {
    that.goLastMonth2()
    that.setData({
      one_one: 'animated fadeOutRight',
      two_two: 'animated fadeInLeft'
    })
    setTimeout(function () {
      // that.goLastMonth()
      that.setData({
        dateData: that.data.dateData2
      })
    }, 600)
    setTimeout(function () {
      that.setData({
        touchStatus: false,
        one_one: '',
        two_two: ''
      })
    }, 1000)
    pageData = pageData2
  },
  // 点击切换月份效果
  goLastMonthAnimate () {
    this.goToLeft(this)
  },
  goNextMonthAnimate () {
    this.goToRight(this)
  },
  // 扫描二维码
  scanCode () {
    let success = res => {
      this.setData({
        code: res.result
      })
    }
    let fail = res => {
      console.log(res)
    }
    common.scanCode(success, fail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // console.log(' ---------- onLoad ----------')
    // console.dir(app.data)
    // app.getUserInfo()
    //   .then(info => this.setData({ userInfo: info }))
    //   .catch(console.info)
    // this.get51Api(this.data.vacationUrl)
    // 获取51节日信息列表
    // this.setData({
    //   festivalObj: app.data.festivalObj,
    //   festivalObj2: app.data.festivalObj2
    // })
    // 设置顶部时间
    // this.topDate(curYear, curMonth, curDay)
    // 初始化数据
    this.initCurDate(curYear, curMonth, curDay)
    this.initCurDate2(curYear, curMonth, curDay)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // console.log(' ---------- onPullDownRefresh ----------')
  }
})
