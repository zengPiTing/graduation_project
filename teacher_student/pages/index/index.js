//导入request函数
import request from '../../utils/request'

//引入全局app实例获取数据
var appInstance = getApp();

Page({
  data: {
    showTitle: [], //存放导师信息专业分类
    teacherUsers: [], //用于存放导师数据
    students: [], //用于存放学生风采数据
    isCookies: false, //用于判断是否登录状态
    isTeacher: false, //判断当前用户是老师还是学生用户
    users: {} //当前登录用户信息
  },
  onLoad() {
    //获取首页展示数据
    this.index_request('/api/indexdata', 'GET', {});
    wx.showToast({
      "title": '目前仅支持智能科学与工程学院师生使用',
      "icon": "none"
    })
    //同步登录状态
    let users = appInstance.globalData.users;
    let cookie = wx.getStorageSync('cookie');
    if (cookie && users.id) {
      this.setData({
        isCookies: true,
        users
      })
    }
    //判断是老师还是学生用户
    if (users.isTeacher === 0) {
      this.setData({
        isTeacher: true
      })
    } else if (users.isTeacher === 1) {
      this.setData({
        isTeacher: false
      })
    }
  },
  //请求index数据的回调函数
  async index_request(url, method, data = {}) {
    let result = await request(url, method, data);
    //请求成功将首页不同数据分出去
    if (result.status == 0) {
      // 将导师数据存于全局
      appInstance.globalData.teacherUsers = result.data.indexDaoshi;
      //获取页面标题分类数据
      this.getTeacherUsers('/api/title');
      //将热点新闻数据存入全局
      appInstance.globalData.hotNews = result.data.indexHot;
      //将优秀校友存入全局
      appInstance.globalData.mienStudents = result.data.indexStudent;
      //将优秀校友文章分段后
      let mienstudent = result.data.indexStudent.map(item => {
        item.text = item.text.split('~~');
        return item
      })
      this.setData({
        students: mienstudent,
        teacherUsers: result.data.indexDaoshi
      })
    } else {
      wx.showLoading({
        title: '服务器请求出错'
      })
    }
  },
  //获取导师专业分类回调函数
  async getTeacherUsers(url) {
    const result = await request(url);
    if (result.status == 0 && appInstance.globalData.teacherUsers.length > 0) {
      //将专业数据存入全局
      appInstance.globalData.showTitle = result.data;
      //将本专业的老师数据添加到对应专业分类数据中
      let newTeacherCalss = result.data.map(item => {
        item.school = appInstance.globalData.teacherUsers.filter(value => {
          return item.id == value.domain_id
        })
        return item
      })
      if (newTeacherCalss) {
        this.setData({
          showTitle: newTeacherCalss
        })
      } else {
        console.log('加载中');
      }
    } else {
      wx.showToast({
        title: result.message,
        icon: 'none'
      })
    }
  },
  //点击导师风向标跳转至老师详情页的回调
  go_teacher_detail(e) {
    if (this.data.users.id) {
      let id = e.target.dataset.id;
      let index = this.data.teacherUsers.findIndex(item => item.id == id);
      let detailUsers = this.data.teacherUsers[index];
      wx.navigateTo({
        url: `/pages/detail/detail?users=${JSON.stringify(detailUsers)}`,
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  //点击跳转至优秀学生详情页回调
  go_student_detail(e) {
    if (this.data.users.id) {
      let index = this.data.students.findIndex(item => item.id == e.currentTarget.id);
      let mienstudent = JSON.stringify(this.data.students[index]);
      wx.navigateTo({
        url: `/pages/mienStudentDetail/mienStudentDetail?mienstudent=${mienstudent}`,
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  //登录跳转的回调
  go_login() {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  //密码修改跳转页面
  goUpdate() {
    wx.navigateTo({
      url: '/pages/password/password',
    })
  },
  //新闻通告跳转页面
  goHot() {
    wx.reLaunch({
      url: '/pages/hotNews/hotNews'
    })
  },
  //意向填报跳转页面
  goChoice() {
    if (this.data.users.school) {
      wx.navigateTo({
        url: '/pages/choice/choice',
      })
    } else {
      wx.showToast({
        title: '请先补充用户信息',
        icon: 'none'
      })
      wx.navigateTo({
        url: '/pages/bind_message/bind_message',
      })
    }

  },
  //我的学生/导师跳转页面
  goRecord() {
    if (this.data.isTeacher) {
      wx.reLaunch({
        url: '/pages/userInfo/userInfo',
      })
    } else {
      wx.navigateTo({
        url: '/pages/record/record',
      })
    }
  }

})