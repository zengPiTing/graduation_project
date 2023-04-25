<template>
  <div class="studentContainer">
    <!-- 头部搜索 -->
    <div class="search">
      <input type="text" placeholder="请输入姓名" v-model="searchName" />
      <div
        class="search_btn"
        @click="searchName ? (drawer = true) : ''"
        type="primary"
      >
        <i class="el-icon-search"></i>查询
      </div>
      <div class="add_btn" @click="update()">
        <i class="el-icon-plus"></i>添加
      </div>
    </div>
    <div class="first_top">
      <!-- 标题 -->
      <div class="head">
        <ul>
          <li>姓名</li>
          <li>标题</li>
          <li>内容</li>
          <li>操作</li>
        </ul>
      </div>
      <!-- 内容 -->
      <div class="table" v-for="item in CurrentUsers" :key="item.id">
        <ul>
          <li>
            <span
              class="fonts"
              type="primary"
              @click="thisDrawerShow(item.id)"
              >{{ item.name }}</span
            >
          </li>
          <li>{{ item.title }}</li>
          <li>{{ item.text }}</li>
          <li>
            <span class="table_update" @click="update(item.id)">编辑</span>
            <span class="table_detele" @click="deleteStudent(item.id)"
              >删除</span
            >
          </li>
        </ul>
      </div>
      <!-- 分页器模块 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="Math.ceil(students.length)"
          :page-size="8"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗内容 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      :size="800"
    >
      <!-- 弹窗出的优秀学生内容展示 -->
      <div class="drawerContent" v-show="filterStudents.length > 0">
        <div
          class="studentSearchList"
          v-for="(item, index) in filterStudents"
          :key="index"
        >
          <h2>{{ item.title }}</h2>
          <div class="total">
            <img :src="item.url" alt="暂无图片" />
            <div class="name">{{ item.name }}</div>
          </div>
          <p>{{ item.text }}</p>
          <div class="btn" @click="update(item.id)">点击编辑</div>
        </div>
      </div>
      <div class="kongkong" v-show="filterStudents.length < 1">
        <img src="@/assets/image/kongkong.webp" />
        <div>空空如也!!!</div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "StudentName",
  data() {
    return {
      drawer: false,
      searchName: "", //搜索的关键词
      currentPage: 1, //当前页码数
      CurrentUsers: [], //当前页码的用户数据
      drawerShowId: 0, //当前点击用户名弹窗展示的数据
    };
  },
  mounted() {
    //获取优秀学生数据
    this.$store.dispatch("getExcellenceStudent");
  },
  methods: {
    //跳转到修改添加页面
    update(id) {
      if (id) {
        let index = this.CurrentUsers.findIndex((item) => item.id == id);
        this.$router.push({
          name: "studentFrom",
          query: this.CurrentUsers[index],
        });
      } else {
        this.$router.push({ name: "studentFrom" });
      }
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.CurrentUsers = this.students.slice(
        (this.currentPage - 1) * 8,
        this.currentPage * 8
      );
    },
    //获取当前点击的优秀学生
    thisDrawerShow(id) {
      this.searchName = "";
      this.drawer = true;
      this.drawerShowId = id;
    },
    //点击删除对应优秀学生
    deleteStudent(id) {
      this.$confirm("是否删除当前优秀学子?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let result = await this.$store.dispatch(
              "deleteExcellenceStudent",
              id
            );
            if (result) {
              this.$store.dispatch("getExcellenceStudent");
              this.currentPage = 1;
              alert(result);
            }
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
    },
  },
  computed: {
    //从仓库中获取优秀学生数据
    students() {
      return this.$store.state.excellenceStudent.excellenceStudent;
    },
    //筛选出含有当前关键词的内容
    filterStudents() {
      if (this.searchName) {
        //搜索触发的弹窗
        return this.students.filter((value) => {
          return value.name.indexOf(this.searchName) !== -1;
        });
      } else {
        //点击用户名触发的弹窗
        return this.CurrentUsers.filter((item) => item.id == this.drawerShowId);
      }
    },
  },
  watch: {
    //监视优秀学生的变化，控制让分页器在页面加载完成显示内容
    students: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.CurrentUsers = newValue.slice(0, 8);
      },
    },
  },
};
</script>
<style lang="less" scoped>
.studentContainer {
  width: calc(100% - 250px);
  // 搜索模块
  .search {
    display: flex;
    align-items: center;
    margin-left: 20px;
    height: 50px;
    line-height: 50px;
    input {
      outline: none;
      width: 150px;
      height: 20px;
      border-radius: 10px;
      border: 1px solid #ccc;
      padding-left: 5px;
    }
    .search_btn {
      width: 50px;
      text-align: center;
      height: 20px;
      line-height: 20px;
      margin-left: 20px;
      border-radius: 5px;
      background: #ff6c72;
      font-size: 12px;
      color: white;
    }
    .add_btn {
      width: 50px;
      text-align: center;
      height: 20px;
      line-height: 20px;
      margin-left: 20px;
      border-radius: 5px;
      background: #ff9f00;
      font-size: 12px;
      color: white;
    }
    .search_btn:active,
    .add_btn:active {
      background: #cccccc;
    }
  }
  // 内容模块
  .first_top {
    position: relative;
    height: 550px;
    .head,
    .table {
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      ul {
        display: flex;
        list-style: none;
        li:nth-child(1) {
          width: 200px;
          text-align: center;
          border-right: 1px solid #ccc;
          .fonts {
            padding-bottom: 2px;
            border-bottom: 1px solid #ccc;
          }
          .fonts:hover {
            color: red;
            border-bottom: 1px solid red;
          }
        }
        li:nth-child(2) {
          width: 200px;
          text-align: center;
          padding: 0 5px;
          border-right: 1px solid #ccc;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        li:nth-child(3) {
          flex: 1;
          text-align: center;
          padding: 0 5px;
          border-right: 1px solid #ccc;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        li:nth-child(4) {
          width: 200px;
          text-align: center;
        }
        .table_update,
        .table_detele {
          border: 1px solid #ccc;
          padding: 5px 15px;
          border-radius: 12px;
          margin: 0 5px;
          color: white;
          font-size: 12px;
        }
        .table_update:active,
        .table_detele:active {
          background: #545c64;
        }
        .table_update {
          background: skyblue;
        }
        .table_detele {
          background: #ff4507;
        }
      }
    }
    .head {
      border-top: none;
      background: #ccc;
      font-size: 18px;
    }
    // 分页器
    .pagination {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  // 弹窗模块
  .drawerContent {
    margin: 20px;
    overflow-y: 100%;
    .studentSearchList {
      position: relative;
      width: 100%;
      margin-bottom: 100px;
      h2 {
        text-align: center;
        color: red;
        margin-bottom: 30px;
      }

      .total {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 300px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
      }
      p {
        text-indent: 2em;
        margin-top: 20px;
      }
      .btn {
        position: absolute;
        bottom: -40px;
        right: 0;
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: skyblue;
        border: 1px solid #ccc;
        border-radius: 10px;
      }
    }
  }
  .kongkong {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 200px;
    margin: 100px auto;
    img {
      width: 200px;
      border-radius: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>