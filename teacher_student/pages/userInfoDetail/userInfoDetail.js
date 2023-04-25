
Page({
  data: {
    student:{}//存储当前学生详细信息
  },

  onLoad(options) {
    //存储当前学生详细信息
    this.setData({
      student:JSON.parse(options.student)
    })
  },

})