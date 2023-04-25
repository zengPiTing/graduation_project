<template>
  <div class="aside">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :active-text-color="thispages == 'aside' ? '#ffd04b' : '#fff'"
    >
      <div class="profile" v-if="user">
        <img :src="user.photo" alt="暂无照片" />
        <div class="name">{{ user.nickname }}</div>
      </div>
      <el-menu-item index="1" @click="routerPush('institute')">
        <i class="el-icon-menu"></i>
        <span slot="title">学院动态</span>
      </el-menu-item>
      <el-menu-item index="2" @click="routerPush('student')">
        <i class="el-icon-document"></i>
        <span slot="title">风采学子</span>
      </el-menu-item>
      <el-menu-item index="3" @click="routerPush('feedBack')">
        <i class="el-icon-setting"></i>
        <span slot="title">反馈处理</span>
      </el-menu-item>
      <el-menu-item index="4" @click="routerPush('everyUser')">
        <i class="el-icon-data-analysis"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AsideName",
  data() {
    return {
      thispages: "header", //此时展示的是否是aside导航的路由
    };
  },
  mounted() {
    // 接收aside组件的信息
    this.$bus.$on("isHeaderOrAside", (thispages) => {
      this.thispages = thispages;
    });
  },
  methods: {
    // 点击侧边栏进行路由跳转
    routerPush(name) {
      //此时展示的是侧边栏的路由,此时导航栏有背景样式
      this.thispages = "aside";
      // 告诉header组件，此时展示的是aside组件
      this.$bus.$emit("isAsideOrHeader", "aside");
      this.$router.push({
        name,
      });
    },
  },
  computed: {
    //将用户头像和姓名计算出来
    user() {
      let users = this.$store.state.login.users;
      if (users.id) {
        return users;
      } else {
        return JSON.parse(localStorage.getItem("user"));
      }
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  width: 250px;
}
.el-menu-vertical-demo {
  height: calc(100vh - 61px);
}
.profile {
  width: 100%;
  height: 150px;
  margin-top: 50px;
  img {
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: auto;
  }
  .name {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: white;
  }
}
</style>
