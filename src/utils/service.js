/**
 * Created by Administrator on 2017/6/2.
 */
let baseDomain = 'http://yuehui.lanzhangxiu.cn'
let serviceUrl = {
  // 登陆 post | code iv encryptedData
  login: baseDomain + '/api/user/login',
  // 更新用户信息 post | session_key ganqing age user_height job company residence cart_house likes_sports likes_movies likes_books
  updateUserInfo: baseDomain + '/api/user/updateUserInfo',
  // 查看用户资料
  viewUserInformation: baseDomain + '/api/user/ViewUserInformation',
  // 用户关注列表
  getUserSubscribe: baseDomain + '/api/subscribe/getUsersSubscribe',
  // 陌生人列表
  getStranger: baseDomain + '/api/subscribe/getStranger',
  // 提醒关注
  remindSubscribe: baseDomain + '/api/subscribe/remindSubscribe',
  // 忽略或者取消忽略操作
  doIgnore: baseDomain + '/api/subscribe/doIgnore',
  // 上传图片
  uploadPhotos: baseDomain + '/api/user/uploadPhotos',
  // 发起邀约生成订单
  postFaqiYaoyue: baseDomain + '/api/engagement/postFaqiYaoyue',
  // 发起邀约确认页面
  faqiYaoyue: baseDomain + '/api/engagement/faqiYaoyue',
  // 替TA发起
  postTitaFaqi: baseDomain + '/api/engagement/postTitaFaqi',
  // 替Ta发起-接受
  titaFaqiByComfire: baseDomain + '/api/engagement/titaFaqiByComfire',
  // 替Ta发起确认页面
  comfireByTitaFaqi: baseDomain + '/api/engagement/comfireByTitaFaqi',
  // 替他发起-拒绝
  titaFaqiByreject: baseDomain + '/api/engagement/titaFaqiByreject',
  // 约会套餐列表
  engagementLists: baseDomain + '/api/engagement/engagementLists',
  // 约会套餐详情
  engagementDetail: baseDomain + '/api/engagement/engagementDetail',
  // 约会对象列表
  engagementObjictList: baseDomain + '/api/engagement/engagementObjictList',
  // 关注好友的邀约
  getSubscribeUserYaoyue: baseDomain + '/api/index/getSubscribeUserYaoyue',
  // 应邀确认页面
  confirmedByInvitation: baseDomain + '/api/index/confirmedByInvitation',
  // 提交申请邀约
  addApplyByInvitation: baseDomain + '/api/index/addApplyByInvitation',
  // 本人发起的订单列表
  myOrderListsByFaqi: baseDomain + '/api/order/myOrderListsByFaqi',
  // 本人应邀
  benrenYingyaoOrderLists: baseDomain + '/api/order/benrenYingyaoOrderLists',
  // 替TA发起列表
  titafaqiOrderList: baseDomain + '/api/order/titafaqiOrderList',
  // 查看应邀者列表
  lookApplyInvitation: baseDomain + '/api/order/lookApplyInvitation',
  // 订单详情
  orderDetail: baseDomain + '/api/order/orderDetail',
  // 选择应邀者
  acceptApplyInvitation: baseDomain + '/api/order/acceptApplyInvitation',
  // 交易流水
  payLogsDetail: baseDomain + '/api/pay/payLogsDetail',
  // 充值余额
  payByAccount: baseDomain + '/api/pay/payByAccount',
  // 充值意向保证金
  payByBond: baseDomain + '/api/pay/payByBond',
  // 普通订单支付
  payByOrder: baseDomain + '/api/pay/payByOrder',
  // 替TA发起订单支付
  payByOrderTa: baseDomain + '/api/pay/payByOrderTa',
  // 礼品卷充值
  chongZhiLipingjuan: baseDomain + '/api/pay/chongZhiLipingjuan',
  // 我收到的问卷
  myReceiveQuestionnaires: baseDomain + '/api/questionnaire/myReceiveQuestionnaires',
  // 检查用户资料
  isPerfectData: baseDomain + '/api/engagement/isPerfectData',
  // 保存替他发起档案
  addUpdateTaArchives: baseDomain + '/api/archives/addUpdateTaArchives',
  // TA的档案
  getTaArchives: baseDomain + '/api/archives/getTaArchives',
  // 获取档案详情
  getTaArchivesDetail: baseDomain + '/api/archives/getTaArchivesDetail',
  // 添加反馈消息
  addFeedback: baseDomain + '/api/article/addFeedback',
  // 获取FAQ的列表信息
  getFaqLists: baseDomain + '/api/article/getFaqLists'
}
module.exports = serviceUrl
