// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'survey',
    userInfo: {
      // avatarUrl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // nickName: '兔子',
      // gender: 1
    },
    curChoose: 2,
    chooseArr: [
      {
        name: 'noshow',
        value: '匿名',
        text: '等待对方收到至少2份匿名问卷后才能看到'
      },
      {
        name: 'show',
        value: '交换',
        text: '需要对方填写提交后才能看到'
      },
      {
        name: 'free',
        value: '开放',
        text: '无条件开放给对方看'
      }
    ],
    write: false,
    hide: true
  },
  goUser (e) {
    wx.navigateTo({
      url: `../userInfo/userInfo?userId=${e.currentTarget.dataset.id}`
    })
  },
  delMask () {
    this.setData({
      show: false
    })
  },
  goback () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 选择交换方式
  chooseArr (e) {
    this.setData({
      curChoose: e.currentTarget.dataset.index
    })
  },
  // 获取问卷详情
  getQuestionDetail (id) {
    let that = this
    let queObj = {
      url: useUrl.questionnairesDetail,
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id
      },
      success (res) {
        // console.log(res)
        let s = res.data.data.questionnaires_info
        that.setData({
          question_one: s.question_one,
          question_two: s.question_two,
          question_three: s.question_three,
          question_four: s.question_four,
          curChoose: s.type
        })
        if (!res.data.data.user_info) return
        res.data.data.user_info.job = res.data.data.user_info.job.split('-')[1]
        that.setData({
          userInfo: res.data.data.user_info
        })
      }
    }
    app.wxrequest(queObj)
  },
  // 获取约会对象信息
  getduixiang (orderid) {
    let that = this
    let ssobj = {
      url: useUrl.editeQuestionnaires,
      data: {
        session_key: wx.getStorageSync('session_key'),
        order_id: orderid
      },
      success (res) {
        // console.log(res)
        res.data.data.job = res.data.data.job.split('-')[1]
        that.setData({
          userInfo: res.data.data
        })
      }
    }
    app.wxrequest(ssobj)
  },
  // 写入内容
  InputValue (e) {
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === 'impression') {
      this.setData({
        question_one: value
      })
    } else if (type === 'moment') {
      this.setData({
        question_two: value
      })
    } else if (type === 'possible') {
      this.setData({
        question_three: value
      })
    } else if (type === 'doing') {
      this.setData({
        question_four: value
      })
    }
  },
  // 提交信息
  sendMessage () {
    let that = this
    let sendObj = {
      url: useUrl.postQuestionnaires,
      data: {
        session_key: wx.getStorageSync('session_key'),
        user_id: that.data.userInfo.user_id,
        order_id: that.data.userInfo.order_id,
        question_one: that.data.question_one || '未填写',
        question_two: that.data.question_two || '未填写',
        question_three: that.data.question_three || '未填写',
        question_four: that.data.question_four || '未填写',
        type: that.data.curChoose
      },
      success (res) {
        // console.log(res)
        if (res.data.data === '提交成功') {
          wx.navigateBack({
            delta: 1
          })
        } else {
          console.log('提交错误', res)
          wx.showToast({
            title: '啊哦，服务器开小差了，请稍后再试'
          })
        }
      }
    }
    app.wxrequest(sendObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    // let that = this
    // 填写问卷
    if (params.id * 1 === 0) {
      this.setData({
        write: true
      })
    } else {
      // 查看自己填写的问卷
      this.getQuestionDetail(params.id)
      this.setData({
        hide: false
      })
    }
    this.getduixiang(params.orderId)
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
