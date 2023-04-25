// pages/hotNews/hotNews.js
//引入全局app实例获取数据
var appInstance = getApp();
Page({

  data: {
    users:[],//存储当前用户信息
    // hotOrnotice: 'hot', //用于判断当前展示内容是热点新闻还是通知公告
    hotNews: [] //存放热点新闻数据
  },

  onLoad(options) {
    //将全局app保存的热点新闻数据获取过来
    this.setData({
      users:appInstance.globalData.users,
      hotNews: appInstance.globalData.hotNews
    })
  },
  //点击标题导航栏切换展示内容
  // titleHandler(e) {
  //   let hotOrnotice = e.currentTarget.id;
  //   this.setData({
  //     hotOrnotice
  //   })
  // },
  //点击某热点新闻跳转至详情页
  goHotDetail(e) {
    let id = e.currentTarget.id;
    let index = this.data.hotNews.findIndex(item => item.id == id);
    let hotnew = JSON.stringify(this.data.hotNews[index]);
    wx.navigateTo({
      url: `/pages/hotDetail/hotDetail?hotnew=${hotnew}`,
    })
  }

})