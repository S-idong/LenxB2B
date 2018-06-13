Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    placeholder: "",
    searchAd:["女装","男装","罗小黑","罗小黑大战宝可梦","宝可梦大战紫薯怪","我只需要一个响指"],
    searchHistory: wx.getStorageSync("searchHistory")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'searchAd',
      success: function (res) {
        console.log(res.data)
        that.setData({
          placeholder: res.data
        });
      }
    })
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

  },
  onInput(e) {
    console.log('input: ', e.detail.value)
  },
  onConfirm(e) {
    //输入法
    console.log('confirm: ', e)
    saveSearchHistory(e.detail.value);
    this.setData({
      searchHistory: wx.getStorageSync("searchHistory")
    });
  },
  onSearch(e) {
    //搜索
    console.log('onSearch: ', e)
  },
  submitForm(e) {
    console.log('submit', e)
  },
  openProductList(e){
    console.log(e.currentTarget.dataset.text);
  },
  clearHistroy(e) {
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent.show();
  },
  hideDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent.hide();
  },
  onHisConfirm(e) {
    wx.clearStorageSync("searchHistory");
    this.setData({
      searchHistory: ""
    });
    this.hideDialog();
  },
  onHisCancel(e) {
    this.hideDialog();
  }
})

function saveSearchHistory(inputValue) {
  var oldArray = wx.getStorageSync("searchHistory");
  if (oldArray) {
    for (var i = 0; i < oldArray.length; i++) {
      if (oldArray[i] === inputValue) {
        oldArray.splice(i, 1);
        break;
      }
    }
    oldArray.unshift(inputValue);
    wx.setStorageSync("searchHistory", oldArray);
  }
  else {
    var searchArray = [];
    searchArray.unshift(inputValue);
    wx.setStorageSync("searchHistory", searchArray);
  }
}