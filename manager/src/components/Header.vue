<template>
  <div>
    <!-- 头部导航栏 -->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      :active-text-color="thispages == 'header' ? '#ffd04b' : '#fff'"
      default-active="1"
    >
      <div class="title">大学生导师双向自主选择系统</div>
      <el-menu-item class="right end" @click="outLogin">退出登录</el-menu-item>
      <el-menu-item class="right" @click="goUpdataPassword">修改密码</el-menu-item>
      <el-menu-item class="right" index="3"
        ><a href="https://www.hbmzu.edu.cn/soise/index.htm" target="_blank"
          >学院官网</a
        ></el-menu-item
      >
      <el-menu-item class="right" index="1" @click="routerPush('intro')"
        >平台简介</el-menu-item
      >
      <el-submenu class="right" index="2">
        <template slot="title">信息管理</template>
        <el-submenu index="2-1">
          <template slot="title">学生用户</template>
          <el-menu-item
            index="2-1-1"
            v-for="item in schooltitle"
            :key="item.id"
            :style="
              thisStudentMenuId == item.id && thispages == 'header'? 'color:#ffd04b' : 'color:#fff'
            "
            @click="routerPushUsers('users', item.id, 'students')"
            >{{ item.title }}</el-menu-item
          >
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">老师用户</template>
          <el-menu-item
            index="item.id"
            v-for="item in schooltitle"
            :key="item.id"
            :style="
              thisTeacherMenuId == item.id && thispages == 'header'
                ? 'color:#ffd04b'
                : 'color:#fff'
            "
            @click="routerPushUsers('users', item.id, 'teachers')"
            >{{ item.title }}</el-menu-item
          >
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "HanderName",
  data() {
    return {
      thispages: "", //当前是header组件
      thisStudentMenuId: 0, //当前点击的是学生用户的哪个专业，控制导航样式
      thisTeacherMenuId: 0, //当前点击的是老师用户的哪个专业，控制导航样式
    };
  },
  mounted() {
    // 接收aside组件的信息
    this.$bus.$on("isAsideOrHeader", (thispages) => {
      this.thispages = thispages;
    });
    //发起请求获取学院专业的信息，用于用户导航，调用回调
    this.getTitle();
  },
  methods: {
    //路由跳转至用户界面
    routerPushUsers(name, thisMenuId, studentsOrTeacher) {
      //向aside组件传递内容，告诉他此时展示的是header组件
      this.$bus.$emit("isHeaderOrAside", "header");
      this.thispages = "header";
      //跳转至user界面
      this.$router.push({
        name,
        query: { thisMenuId, studentsOrTeacher },
      });
      //改变当前用户导航的样式
      if (studentsOrTeacher == "teachers") {
        this.thisTeacherMenuId = thisMenuId;
        this.thisStudentMenuId = 0;
      } else {
        this.thisStudentMenuId = thisMenuId;
        this.thisTeacherMenuId = 0;
      }
    },
    // 路由跳转至简介界面
    routerPush(name) {
      //向aside组件传递内容，告诉他此时展示的是header组件
      this.$bus.$emit("isHeaderOrAside", "header");
      this.thispages = "header";
      //跳转至简介界面
      this.$router.push({ name });
      //让用户导航menu全部清除样式
      this.thisStudentMenuId = 0;
      this.thisTeacherMenuId = 0;
    },
    //修改密码
    goUpdataPassword() {
      // 跳转到登录界面
      this.$router.replace({
        name: "login",
        query: { isMessage: false },
      });
    },
    //退出登录
    outLogin(){
      this.$router.replace({
        name: "login",
        query: { isMessage: true }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    //获取学院专业的信息，用于用户导航的方法回调
    async getTitle() {
      try {
        await this.$store.dispatch("getSchoolTitle");
      } catch (error) {
        alert(error);
      }
    },
  },
  computed: {
    //从仓库中获取学院专业信息
    schooltitle() {
      let result = this.$store.state.header.schooltitle;
      return result.filter((item) => item.status == 0);
    },
  },
};
</script>
<style lang="less" scoped>
.el-menu--horizontal {
  position: relative;
  width: 100%;
  border-top: #ccc;
  .right {
    float: right;
    .fontColor {
      color: white;
    }
    .ActiveFontColor {
      color: #ffd04b;
    }
  }
  .end {
    margin-right: 30px;
  }
}
.title {
  position: absolute;
  left: 0;
  top: 0;
  width: 250px;
  text-align: center;
  height: 61px;
  line-height: 61px;
  color: white;
}
</style>