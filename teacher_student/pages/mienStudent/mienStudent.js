//引入全局app实例获取数据
var appInstance = getApp();

Page({

  data: {
    users: [], //存储当前用户登录信息
    mienStudents: [] //存储优秀校友数据
  },

  onLoad(options) {
    //从全局获取优秀校友数据
    let {
      mienStudents,
      users
    } = appInstance.globalData;
    if (mienStudents.length > 0) {
      this.setData({
        users,
        mienStudents
      })
    }
  },
  //跳转至详情页
  go_detail(e) {
    let index = this.data.mienStudents.findIndex(item => item.id == e.currentTarget.id);
    let mienstudent = JSON.stringify(this.data.mienStudents[index]);
    wx.navigateTo({
      url: `/pages/mienStudentDetail/mienStudentDetail?mienstudent=${mienstudent}`,
    })
  }
})