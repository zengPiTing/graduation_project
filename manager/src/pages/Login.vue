<template>
  <div class="login">
    <div class="login_content">
      <!-- 头部标题 -->
      <div class="title">本科生导师自主双向选择后台系统</div>
      <!-- 账号 -->
      <el-input
        v-show="isMessage"
        class="login_input"
        prefix-icon="el-icon-female"
        placeholder="请输入账号"
        v-model="student_number"
        clearable
      >
      </el-input>
      <div class="error" v-show="!yesOrno.student_number_joiYes && isMessage">
        <span class="el-icon-circle-close"></span
        ><span>账号输入有误,6~20位数字、字母账号</span>
      </div>
      <!-- 密码 -->
      <el-input
        class="login_input"
        prefix-icon="el-icon-unlock"
        placeholder="请输入密码"
        v-model="password"
        clearable
      >
      </el-input>
      <div class="error" v-show="!yesOrno.passwordYes">
        <span class="el-icon-circle-close"></span
        ><span>密码输入有误,6~20位数字、字母密码</span>
      </div>
      <!-- 新密码 -->
      <el-input
        v-if="!isMessage"
        class="login_input"
        prefix-icon="el-icon-unlock"
        placeholder="请输入新密码"
        v-model="newPassword"
        clearable
      >
      </el-input>
      <div class="error" v-if="!isMessage && !yesOrno.newPasswordYes">
        <span class="el-icon-circle-close"></span
        ><span>新密码输入有误,6~20位数字、字母密码</span>
      </div>

      <!-- 点击按钮模块 -->
      <div class="go_login" v-show="isMessage">
        <el-button type="primary" round @click="login">点击登录</el-button>
        <div class="test" @click="isMessage = !isMessage">修改密码></div>
      </div>
      <div class="go_update" v-show="!isMessage">
        <el-button type="primary" round @click="updatePassword"
          >点击修改</el-button
        >
        <div class="test" @click="isMessage = !isMessage">前往登录></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NameLogin",
  data() {
    return {
      student_number: "", //账号
      password: "", //密码
      newPassword: "", //新密码
      isMessage: false, //当前状态是登录状态还是修改密码状态
    };
  },
  mounted() {
    // 当从首页点击跳转至修改洁面时让此时显示修改界面
    this.isMessage = this.$route.query.isMessage;
  },
  methods: {
    // 登录按钮回调
    async login() {
      let token = localStorage.getItem("token");
      if (!token) {
        const { student_number, password } = this;
        try {
          if (
            this.isMessage &&
            this.yesOrno.student_number_joiYes &&
            this.yesOrno.passwordYes
          ) {
            await this.$store.dispatch("goLogin", {
              student_number,
              password
            });
            this.$router.push({
              name: "intro",
            });
          }
        } catch (error) {
          alert(error);
        }
      } else {
        alert("请勿重复登录");
      }
    },
    //修改密码按钮回调
    async updatePassword() {
      //从本地拿到登录信息，判断是否登陆过
      let user = JSON.parse(localStorage.getItem("user"));
      let { password, newPassword } = this;
      if (user) {
        let data = {
          id: user.id,
          oldPassword: password,
          newPassword,
          isTeacher: user.isTeacher,
        };
        try {
          this.yesOrno.passwordYes &&
            this.yesOrno.newPasswordYes &&
            (await this.$store.dispatch("updatePassword", data));
          alert("修改成功，请重新登录");
          this.isMessage = !this.isMessage;
        } catch (error) {
          alert(error);
        }
      } else {
        alert("请先登录");
      }
    },
  },
  computed: {
    //表单校验
    yesOrno() {
      let { student_number, password, newPassword } = this;
      let password_joi = /^[A-Za-z0-9]{6,20}$/;
      let student_number_joi = /^[A-Za-z0-9]{6,20}$/;
      let passwordYes = password_joi.test(password);
      let student_number_joiYes = student_number_joi.test(student_number);
      let newPasswordYes = password_joi.test(newPassword);
      return {
        passwordYes,
        student_number_joiYes,
        newPasswordYes,
      };
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("@/assets/image/login_bg.jpg") no-repeat left top;
  background-size: 100%;
  .login_content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 320px;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 5px;
    .title {
      text-align: center;
      height: 40px;
      line-height: 40px;
      color: skyblue;
      font-size: 20px;
    }
    .login_input {
      outline: none;
      margin-left: 20px;
      margin-top: 20px;
      width: 90%;
      border-radius: 10px;
    }
    .error {
      margin-left: 20px;
      font-size: 12px;
      color: red;
    }
    .go_login,
    .go_update {
      position: relative;
      margin-top: 40px;
      text-align: center;
      .test {
        font-size: 12px;
        position: absolute;
        right: 25px;
        bottom: -20px;
        color: skyblue;
        border-bottom: 1px solid skyblue;
        padding-bottom: 2px;
      }
    }
  }
}
</style>