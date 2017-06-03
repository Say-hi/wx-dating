/**
 * Created by Administrator on 2017/6/2.
 */
let baseDomain = 'https://yuehuiri.com'
let serviceUrl = {
  // 登陆 post | code iv encryptedData
  login: baseDomain + '/api/user/login',
  // 更新用户信息 post | session_key ganqing age user_height job company residence cart_house likes_sports likes_movies likes_books
  updateUserInfo: baseDomain + '/api/user/updateUserInfo',
  // 获取用户关注的好友在某天发布的邀约 post | session_key time page
  getSubscribeUserYaoyue: baseDomain + '/api/index/getSubscribeUserYaoyue',
  // 应邀确认 post | session_key order_id
  confirmByInvitation: baseDomain + '/api/index/confirmByInvitation',
  // 提交申请邀约 post | session_key order_id mobile
  addApplyByInvitation: baseDomain + '/api/user/addApplyByInvitation'
  //
}
module.exports = serviceUrl
