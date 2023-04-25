//引入全局app实例获取数据
var appInstance = getApp();
import config from '../../utils/config'

Page({
  data: {
    users: {}, //从全局app拿到的用户数据
    nickname: '未登录', //默认用户名
    first_nickname: '未登录', //默认用户头像
    school: '智能科学与工程', //默认用户学院
    isTeacher: 1, //默认不是老师
    isManager: 1, //默认不是管理
    headphoto: '' //保存用户的头像的url
  },

  onLoad(options) {
    let result = appInstance.globalData.users;
    //从全局app实例中获取用户数据存入
    if (result.id) {
      this.setData({
        users: result,
        nickname: result.nickname,
        first_nickname: result.nickname.slice(0, 1),
        school: result.school,
        isTeacher: result.isTeacher,
        isManager: result.isManager,
        headphoto: result.headphoto
      })
    }
  },
  //未登陆时去登陆界面
  gologin() {
    if (!this.data.users.id) {
      wx.reLaunch({
        url: '/pages/login/login',
      })
    } else {
      let that = this;
      //获取本地头像
      wx.chooseMedia({
        count: 1, //一次可以上传文件的数量
        mediaType: 'image', //上传的文件类型(image只能是照片)
        sourceType: ['album', 'camera'], //上传的方式可以是拍照和本地上传
        async success(res) {
          // console.log(res.tempFiles[0].tempFilePath);
          //将图片上传至服务器
          wx.uploadFile({
            url: `${config.hostserve}/setphoto`, //仅为示例，非真实的接口地址
            filePath: res.tempFiles[0].tempFilePath,
            name: 'file',
            header: {
              Authorization: wx.getStorageSync('cookie')
            },
            formData: {
              id: that.data.users.id,
              isTeacher: that.data.users.isTeacher
            },
            success(res) {
              let data = JSON.parse(res.data)
              // console.log(data)
              that.setData({
                headphoto: data.url
              });
              appInstance.globalData.users.headphoto = data.url;

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
    }
  },

  //跳转至身份详情页面
  gouserInfo() {
    if (this.data.users.isTeacher === 1 && !this.data.users.school) {
      wx.showToast({
        title: '请先完成信息绑定',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: `/pages/userInfo/userInfo?users=${this.data.users}`,
      })
    }
  },

  //下方跳转至下一功能区
  gonext(e) {
    let Topath = e.currentTarget.id;
    if (!this.data.users.id) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      switch (true) {
        case Topath === 'xinxi':
          wx.navigateTo({
            url: '/pages/bind_message/bind_message',
          })
          break;
        case Topath === 'mima':
          wx.navigateTo({
            url: '/pages/password/password',
          })
          break;
        case Topath === 'fankui':
          wx.navigateTo({
            url: '/pages/feedback/feedback',
          })
          break;
        case Topath === 'fenxiang':
          wx.navigateTo({
            url: '/pages/share/share',
          })
          break;
        default:
          if (this.data.isManager !== 0) {
            wx.showToast({
              title: '暂无权限访问',
              icon: 'none'
            })
            break;
          } else {
            wx.navigateTo({
              url: '/pages/management/management',
            })
            break;
          }
      }
    }
  },

  //点击退出
  goOut() {
    wx.showModal({
      title: '是否退出',
      showCancel: true,
      cancelText: '暂不退出',
      cancelColor: '#7ccd70',
      confirmColor: '#f11a05',
      success(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'cookie',
            success(res) {
              appInstance.globalData = {
                users: {},
                cookie: '',
                teacherUsers: [],
                hotNews: [],
                mienStudents: [],
                showTitle: []
              }
              wx.reLaunch({
                url: '/pages/login/login'
              })
            }
          });
        }
      }
    })
  }
})