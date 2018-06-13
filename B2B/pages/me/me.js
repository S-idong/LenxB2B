//me.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowGetUser: true,
    shopimg:'',
    shopname:'',
    list: [{
      title: '收货地址',
      desc: '',
      slot: false,
      src: '/images/icons/address2.png'
    }, {
      title: '我的关注',
      desc: '',
      slot: false,
      src: '/images/icons/collect.png'
    }, {
      title: '联系客服',
      desc: '',
      slot: false,
      src: '/images/icons/CustomerService.png'
    }, {
      title: '投诉与建议',
      desc: '',
      slot: false,
      src: '/images/icons/comment.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                isShowGetUser:false,
                shopimg:res.userInfo.avatarUrl,
                shopname:res.userInfo.nickName
              });
              //缓存信息例子
              wx.setStorage({
                key: "shopinformation",
                data: res.userInfo
              });
            }
          })
        }
      }
    });
  },
  bindGetUserInfo: function (e) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                isShowGetUser: false,
                shopimg: res.userInfo.avatarUrl,
                shopname: res.userInfo.nickName
              });
            }
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})