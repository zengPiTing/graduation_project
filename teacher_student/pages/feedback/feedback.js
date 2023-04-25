// import request from '../../utils/request'
import config from '../../utils/config'
//节流全局变量
let isApply = true;

const appInstance = getApp();

Page({
  data: {
    name: '', //预留姓名
    phone: '', //预留电话
    feedback_content: '', //用户反馈内容
    photo: '', //用户反馈截图
    users: {} //用户身份
  },
  onLoad(options) {
    this.setData({
      users: appInstance.globalData.users,
      name: appInstance.globalData.users.nickname,
      phone: appInstance.globalData.users.student_phone
    })
  },
  //收集表单数据
  getInput(e) {
    let index = e.currentTarget.id;
    let value = e.detail.detail.value;
    if (index == 'name') {
      this.setData({
        name: value
      })
    };
    if (index == 'phone') {
      this.setData({
        phone: value
      })
    };
    if (index == 'fellback') {
      this.setData({
        feedback_content: value
      })
    };
  },
  //收集用户照片信息
  setPhoto() {
    let that = this;
    wx.chooseMedia({
      count: 1, //一次可以上传文件的数量
      mediaType: 'image', //上传的文件类型(image只能是照片)
      sourceType: ['album', 'camera'], //上传的方式可以是拍照和本地上传
      async success(res) {
        // console.log(res.tempFiles[0].tempFilePath);
        that.setData({
          photo: res.tempFiles[0].tempFilePath
        })
      }
    })
  },
  //提交反馈
  async getFeedback() {
    let that = this
    let {
      name,
      phone,
      feedback_content,
      photo
    } = that.data;
    let time = Date.now();
    if (!name || !phone || !feedback_content || !photo) {
      wx.showToast({
        title: '请将信息补充完整',
        icon: 'none'
      })
    } else {
      if (isApply) {
        wx.uploadFile({
          url: `${config.hostserve}/setFeedback`,
          filePath: photo,
          name: 'file',
          header: {
            Authorization: wx.getStorageSync('cookie')
          },
          formData: {
            name,
            phone,
            feedback_content,
            time
          },
          success(res) {
            let data = JSON.parse(res.data)
            // console.log(data)
            that.setData({
              name: '',
              phone: '',
              feedback_content: '',
              photo: ''
            })
            // that.setData({
            //   photo: data.url
            // });
            wx.showToast({
              title: data.msg,
              icon: 'none'
            });
            // that.setData({
            //   name: '',
            //   phone: '',
            //   feedback_content: '',
            //   photo: ''
            // })
            wx.switchTab({
              url: '/pages/user/user',
            })
          },
          fail(err) {
            wx.showToast({
              title: err,
              icon: 'none'
            });
            that.setData({
              name: '',
              phone: '',
              feedback_content: '',
              photo: ''
            })
          }
        })
        //添加节流
        isApply = false;
        setTimeout(() => {
          isApply = true;
        }, 3000);
      }
    }
  }
})