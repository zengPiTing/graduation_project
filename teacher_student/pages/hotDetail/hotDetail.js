// pages/hotDetail/hotDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotNew:[]
  },

  onLoad(options) {
    //获取到跳转详情时传递的数据
    let hotNew = JSON.parse(options.hotnew);
    this.setData({
      hotNew
    })
  },
})