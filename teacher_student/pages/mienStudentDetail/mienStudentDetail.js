// pages/mienStudentDetail/mienStudentDetail.js
Page({

  data: {
    mienstudent:[]//存储优秀学生的数据
  },

  onLoad(options) {
    if (options.mienstudent) {
      this.setData({
        mienstudent: JSON.parse(options.mienstudent)
      })
    }
  },
})