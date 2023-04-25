<template>
  <div class="Container">
    <!-- 已删除用户 -->
    <div class="inputsNo" v-show="redactUsersNo.id">
      <div class="itemNo">
        <div class="name">姓名</div>
        <el-input v-model="redactUsersNo.nickname" disabled></el-input>
      </div>
      <div class="itemNo">
        <div class="name">账号</div>
        <el-input
          v-show="redactUsersNo.isTeacher == 0"
          v-model="redactUsersNo.username"
          disabled
        ></el-input>
        <el-input
          v-show="redactUsersNo.isTeacher == 1"
          v-model="redactUsersNo.student_number"
          disabled
        ></el-input>
      </div>
      <div class="itemNo">
        <div class="name">密码</div>
        <el-input v-model="redactUsersNo.password" disabled></el-input>
      </div>
      <el-button class="btn" round @click="recover(redactUsersNo)"
        >恢复账号</el-button
      >
    </div>
    <!-- 未删除用户 -->
    <div class="inputs" v-show="redactUsers.id" clearable>
      <div class="item">
        <div class="flex">
          <div class="name">姓名</div>
          <el-input v-model="redactUsers.nickname" clearable></el-input>
        </div>
        <div class="err" v-show="!nickname_joi_yes">
          <i class="el-icon-circle-close"></i>请输入2~20位姓名
        </div>
      </div>
      <div class="item">
        <div class="flex" v-show="redactUsers.isTeacher == 0">
          <div class="name">账号</div>
          <el-input v-model="redactUsers.username" clearable></el-input>
        </div>
        <div
          class="err"
          v-show="!username_joi_yes && redactUsers.isTeacher == 0"
        >
          <i class="el-icon-circle-close"></i>请输入6~20位数字字母账号
        </div>
        <div class="flex" v-show="redactUsers.isTeacher == 1">
          <div class="name">账号</div>
          <el-input v-model="redactUsers.student_number" clearable></el-input>
        </div>
        <div
          class="err"
          v-show="!student_number_joi_yes && redactUsers.isTeacher == 1"
        >
          <i class="el-icon-circle-close"></i>请输入6~20位数字字母账号
        </div>
      </div>
      <div class="item">
        <div class="flex">
          <div class="name">密码</div>
          <el-input v-model="redactUsers.password" clearable></el-input>
        </div>
        <div class="err" v-show="!password_joi_yes">
          <i class="el-icon-circle-close"></i>请输入6~20位数字字母密码
        </div>
      </div>
      <el-button class="btn" round @click="recover(redactUsers)"
        >点击修改</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "EveryUserFrom",
  data() {
    return {
      redactUsers: {}, //当前未删除用户信息
      redactUsersNo: {}, //当前已删除用户信息
      password_joi_yes: false, //表单验证
      nickname_joi_yes: false, //表单验证
      student_number_joi_yes: false, //表单验证
      username_joi_yes: false, //表单验证
    };
  },
  mounted() {
    //获取路由跳转携带的数据
    let redactUsers = this.$route.query.redactUsers;
    console.log(redactUsers);
    if (redactUsers) {
      redactUsers.status == 0
        ? (this.redactUsers = redactUsers)
        : (this.redactUsersNo = redactUsers);
    }
  },
  methods: {
    //恢复及修改账号信息
    recover(recoverMessage) {
      if (recoverMessage.username == "2000012") {
        alert("此账号为管理员账号，无法修改");
      } else {
        if (recoverMessage.status == 0) {
          //恢复已删除的账号
          this.$confirm("是否确定修改?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              //修改账号信息
              try {
                const result = await this.$store.dispatch(
                  "updateUserMessage",
                  recoverMessage
                );
                alert(result);
                this.$router.push({ name: "everyUser" });
              } catch (error) {
                alert(error);
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        } else {
          //恢复已删除的账号
          this.$confirm("是否确定恢复该账号?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              try {
                const result = await this.$store.dispatch(
                  "recoverUserMessage",
                  recoverMessage
                );
                alert(result);
                this.$router.push({ name: "everyUser" });
              } catch (error) {
                alert(error);
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        }
      }
    },
  },
  watch: {
    redactUsers: {
      deep: true,
      handler(newValue) {
        let password_joi = /^[A-Za-z0-9]{6,20}$/;
        let nickname_joi = /^[\u4e00-\u9fa5A-Za-z0-9]{2,20}$/;
        let student_number_joi = /^[A-Za-z0-9]{6,20}$/;
        let username_joi = /^[A-Za-z0-9]{2,20}$/;
        this.password_joi_yes = password_joi.test(newValue.password);
        this.nickname_joi_yes = nickname_joi.test(newValue.nickname);
        this.student_number_joi_yes = student_number_joi.test(
          newValue.student_number
        );
        this.username_joi_yes = username_joi.test(newValue.username);
      },
    },
  },
};
</script>
<style lang="less" scoped>
.Container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("@/assets/image/login_bg.jpg") no-repeat left top;
  background-size: 100%;
  overflow: hidden;
  .inputsNo {
    position: relative;
    width: 350px;
    margin: 200px auto;
    .itemNo {
      height: 50px;
      margin-bottom: 10px;
      display: flex;
      .name {
        width: 80px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin-right: 10px;
      }
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: -60px;
    }
  }
  .inputs {
    position: relative;
    width: 350px;
    margin: 200px auto;
    .item {
      height: 80px;
      .flex {
        display: flex;
        .name {
          height: 40px;
          line-height: 40px;
          width: 80px;
          margin-right: 10px;
          text-align: center;
        }
      }
      .err {
        font-size: 12px;
        color: red;
        i {
          margin: 5px 10px 0 80px;
        }
      }
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: -60px;
    }
  }
}
</style>