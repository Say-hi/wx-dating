// 获取全局应用程序实例对象
/*eslint-disable*/
const app = getApp()
// const plugin = require('../../utils/plugin')
const ccFile = require('../../utils/calendar-converter')
// const common = require('../../utils/common')
const curDate = new Date()
let calendarConverter = new ccFile.CalendarConverter()
let curYear = curDate.getFullYear()
let curMonth = curDate.getMonth()
let curDay = curDate.getDate()

//月份天数表
var DAY_OF_MONTH = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
]
var DAY_ENGLISH = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
var MONTH_ENGLISH = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',  'August', 'September', 'October', 'November', 'December']
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
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '约会日',
    userInfo: {},
    showText: '进入约会',
    vertical: true,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    i: 0,
    show: true
  },
  // 滚动去除遮罩
  scroll () {
    if (!this.data.show) return
    this.setData({
      show: false
    })
  },
  // swiper 切换月份
  swiperChange (e) {
    this.setData({
      current: e.detail.current
    })
  },
  // 设置顶部时间
  topDate (year, month, day) {
    return year + '年' + month + '月' + day
  },
  // 初始化当前月数据
  initCurDate (year, month, day) {
    let pageData = {
      dateData: {
        date: "",                //当前日期字符串
        arrIsShow: [],           //是否当前月日期
        // arrIsWeek: [],           //是否是周六日
        arrDays: [],             //关于几号的信息
        arrInfoEx: [],           //农历节假日等扩展信息
        arrInfoExShow: [],       //处理后用于显示的扩展信息
      }
    }
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
      var weekDay = new Date(curYear, curMonth, curDay).getDay()
      weekDay = weekDay == 0 ? 6 : weekDay - 1
      pageData.dateData.week = DAY_ENGLISH[weekDay]
      pageData.dateData.month = MONTH_ENGLISH[curMonth]
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
    return pageData
  },
  // 选择日期
  selectDay (e) {
    let that = this
    let i = e.currentTarget.dataset.i
    let currentMonth = this.data.dateArr[i].dateData.arrInfoEx
    let d = e.currentTarget.dataset.dayIndex
    let detailDate = {
      curYear: currentMonth[d].sYear,
      curMonth: currentMonth[d].sMonth,
      curDay:currentMonth[d].sDay,
      date: that.data.detailData.date
    }
    this.setData({
      detailData: detailDate
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 设置当前日期和判断基准日期
    let detailDate = {
      curYear: curYear,
      curMonth: curMonth === 11 ? 1 : curMonth + 1,
      curDay: curDay
    }
    detailDate.date = this.topDate(curYear, (curMonth + 1), curDay)
    this.setData({
      detailData: detailDate
    })
    // 初始化本月和后三个月的数据
    let dateArr =[]
    for (let i = 0; i <= 3; i++) {
      if( i!==0 ) curDay = 1
      dateArr.push(this.initCurDate(curYear, curMonth, curDay))
      if (curMonth === 11) {
        curMonth = 0
        ++curYear
      } else {
        curMonth = curMonth + 1
      }
    }
    this.setData({
      dateArr: dateArr
    })
    // 用户登陆

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
