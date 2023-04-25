var appInstance = getApp();
import request from '../../utils/request'
import config from '../../utils/config'

Page({

  data: {
    visible1: false, //控制弹窗是否弹出
    showTitle: [], //选项内容
    users: {}, //登录用户信息
    //储存表单数据
    minzu: '',
    jiguan: '',
    student_phone: '',
    school: '智能科学与工程',
    domain: '',
    _class: '',
    enrol_year: '',
    student_dorm: '',
    date_birth: '',
    photo: ''
  },

  onLoad(options) {
    //获取用户登录情况
    const users = appInstance.globalData.users;
    const showTitle = appInstance.globalData.showTitle;
    if (users) {
      this.setData({
        showTitle,
        users,
        minzu: users.minzu,
        jiguan: users.jiguan,
        student_phone: users.student_phone,
        school: '智能科学与工程',
        domain: users.domain,
        _class: users._class,
        enrol_year: users.enrol_year,
        student_dorm: users.student_dorm,
        date_birth: users.date_birth,
        photo: users.photo
      })
    }
  },
  //点击按钮弹出弹窗
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },
  // 点击取消关闭弹窗
  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  // 点击选项进行选择
  handleClickItem1({
    detail
  }) {
    let index = detail.index;
    this.setData({
      domain: this.data.showTitle[index].title,
      visible1: false
    })
  },
  //收集表单数据
  getInput(e) {
    let index = e.currentTarget.id;
    let value = e.detail.detail.value;
    if (index == 'minzu') {
      this.setData({
        minzu: value
      })
    }
    if (index == 'jiguan') {
      this.setData({
        jiguan: value
      })
    }
    if (index == 'student_phone') {
      this.setData({
        student_phone: value
      })
    }
    if (index == 'school') {
      this.setData({
        school: value
      })
    }
    if (index == 'domain') {
      this.setData({
        domain: value
      })
    }
    if (index == '_class') {
      this.setData({
        _class: value
      })
    }
    if (index == 'enrol_year') {
      this.setData({
        enrol_year: value
      })
    }
    if (index == 'student_dorm') {
      this.setData({
        student_dorm: value
      })
    }
    if (index == 'date_birth') {
      this.setData({
        date_birth: value
      })
    }
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
        //将图片上传至服务器
        wx.uploadFile({
          url: `${config.hostserve}/bind/upload`,
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          header: {
            Authorization: wx.getStorageSync('cookie')
          },
          formData: {
            id: that.data.users.id
          },
          success(res) {
            let data = JSON.parse(res.data)
            // console.log(data)
            that.setData({
              photo: data.url
            });
            appInstance.globalData.users.photo = data.url;
          },
          fail(err) {
            wx.showToast({
              title: err,
              icon: 'none'
            })
          }
        })
      }
    })
  },
  //绑定用户信息
  async setUsers() {
    let {
      minzu,
      jiguan,
      date_birth,
      student_phone,
      school,
      domain,
      _class,
      enrol_year,
      student_dorm,
      photo,
      users
    } = this.data;
    let id = users.id;
    if (!minzu || !jiguan || !student_phone || !school || !domain || !_class || !enrol_year || !student_dorm || !date_birth || !photo) {
      wx.showToast({
        title: '请将信息填完整',
        icon: 'none'
      })
    } else {
      const result = await request('/bind/list', 'POST', {
        minzu,
        jiguan,
        student_phone,
        school,
        domain,
        _class,
        enrol_year,
        student_dorm,
        date_birth,
        photo,
        id
      });
      if (result.status !== 1) {
        wx.showToast({
          title: '绑定成功',
        });
        // 此处需要重新获取信息并储存进全局appdata中
        const results = await request(`/bind/users?id=${this.data.users.id}`, 'GET', {});
        if (results.status == 0) {
          appInstance.globalData.users = results.data[0]
        }
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/choice/choice'
          });
        }, 2000)
      } else {
        wx.showToast({
          title: result.message,
          icon: 'none'
        })
      }
    }
  }
});