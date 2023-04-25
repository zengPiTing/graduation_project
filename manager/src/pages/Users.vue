<template>
  <div class="studentContainer">
    <!-- 搜索 -->
    <div class="search">
      <input type="text" placeholder="请输入姓名" v-model="searchName" />
      <div
        class="search_btn"
        @click="searchName ? (drawer = true) : ''"
        type="primary"
      >
        <i class="el-icon-search"></i>查询
      </div>
      <div class="add_btn" @click="goSetUsers()">
        <i class="el-icon-plus"></i>添加
      </div>
    </div>
    <div class="first_top">
      <!-- 标题 -->
      <div class="head">
        <ul>
          <li>姓名</li>
          <li>联系方式</li>
          <li>账号</li>
          <li>用户密码</li>
          <li>操作</li>
        </ul>
      </div>
      <!-- 内容 -->
      <div class="table" v-for="item in CurrentUsers" :key="item.id">
        <!-- 老师用户 -->
        <ul v-if="studentsOrTeacher == 'teachers'">
          <li>
            <span class="fonts" @click="go_drawer(item.id)" type="primary">{{
              item.nickname
            }}</span>
          </li>
          <li>{{ item.email }}</li>
          <li>{{ item.username }}</li>
          <li>{{ item.password }}</li>
          <li>
            <span class="table_update" @click="goSetUsers(item.id)">编辑</span>
            <span class="table_detele" @click="deleteTeacherHandler(item.id)"
              >删除</span
            >
          </li>
        </ul>
        <!-- 学生用户 -->
        <ul v-if="studentsOrTeacher == 'students'">
          <li>
            <span class="fonts" @click="go_drawer(item.id)">{{
              item.nickname
            }}</span>
          </li>
          <li>{{ item.student_phone }}</li>
          <li>{{ item.student_number }}</li>
          <li>{{ item.password }}</li>
          <li>
            <span class="table_update" @click="goSetUsers(item.id)">编辑</span>
            <span class="table_detele" @click="deleteStudentHandler(item.id)"
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
          :total="Math.ceil(users.length)"
          :page-size="8"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      :size="800"
    >
      <div class="drawerContent" v-show="filterUsers.length > 0">
        <div
          class="studentSearchList"
          v-for="(item, index) in filterUsers"
          :key="index"
        >
          <!-- 老师用户 -->
          <div v-show="studentsOrTeacher == 'teachers'">
            <h2>{{ item.nickname }}</h2>
            <div class="total">
              <img class="left" :src="item.photo" alt="暂无图片" />
              <div class="right">
                <div class="small">
                  <div class="title">学院:</div>
                  <span>{{ item.school }}</span>
                </div>
                <div class="small">
                  <div class="title">职称:</div>
                  <span>{{ item.teacherClass }}</span>
                </div>
                <div class="small">
                  <div class="title">管理身份:</div>
                  <span>{{ item.isManager == 0 ? "管理员" : "非管理员" }}</span>
                </div>
                <div class="btn" @click="goSetUsers(item.id)">点击编辑</div>
              </div>
            </div>
            <h3>个人信息</h3>
            <div>
              <h4>个人简介</h4>
              <p>{{ item.awards }}</p>
            </div>
            <div>
              <h4>教育背景</h4>
              <p>{{ item.education }}</p>
            </div>
            <div>
              <h4>领域技能</h4>
              <p>{{ item.epr }}</p>
            </div>
          </div>
          <!-- 学生用户 -->
          <div v-show="studentsOrTeacher == 'students'">
            <h2>{{ item.nickname }}</h2>
            <div class="total">
              <img
                class="left"
                :src="
                  item.photo
                    ? item.photo
                    : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_360_360%2F79%2Fa2%2F41%2F79a24104427ad18791f813353c97901e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670237827&t=349928de92facd35b02952b115fff2e3'
                "
                alt="暂无图片"
              />
              <div class="right">
                <div class="small">
                  <div class="title">学院:</div>
                  <span>{{ item.school }}</span>
                </div>
                <div class="small">
                  <div class="title">专业:</div>
                  <span>{{ item.domain }}</span>
                </div>
                <div class="small">
                  <div class="title">管理身份:</div>
                  <span>{{ item.isManager == 0 ? "管理员" : "非管理员" }}</span>
                </div>
                <div class="btn" @click="goSetUsers(item.id)">点击编辑</div>
              </div>
            </div>
            <h3>个人信息</h3>
            <div class="usersMessage">
              <!-- 个人信息 -->
              <div class="message" v-show="item.minzu">
                <div class="item">
                  <div>班级</div>
                  <div>{{ item._class }}</div>
                </div>
                <div class="item">
                  <div>入学年份</div>
                  <div>{{ item.enrol_year }}</div>
                </div>
                <div class="item">
                  <div>学号</div>
                  <div>{{ item.student_number }}</div>
                </div>
                <div class="item">
                  <div>宿舍</div>
                  <div>{{ item.student_dorm }}</div>
                </div>
                <div class="item">
                  <div>电话</div>
                  <div>{{ item.student_phone }}</div>
                </div>
                <div class="item">
                  <div>民族</div>
                  <div>{{ item.minzu }}</div>
                </div>
                <div class="item">
                  <div>籍贯</div>
                  <div>{{ item.jiguan }}</div>
                </div>
                <div class="item">
                  <div>出生年月</div>
                  <div>{{ item.date_birth }}</div>
                </div>
              </div>
              <!-- 导师相关信息 -->
              <div class="message" v-show="item.daoshi_id">
                <div class="item">
                  <div>导师</div>
                  <div>{{ item.daoshi_name }}</div>
                </div>
                <div>
                  <div class="reason">申请原因</div>
                  <div class="text">{{ item.studentRemark }}</div>
                </div>
                <div>
                  <div class="sendWord">导师寄语</div>
                  <div class="text">{{ item.comment }}</div>
                </div>
              </div>
            </div>
            <div v-show="!item.minzu">用户未补充信息</div>
            <div v-show="!item.daoshi_id">用户暂未申请导师</div>
          </div>
        </div>
      </div>
      <div class="kongkong" v-show="filterUsers.length < 1">
        <img src="@/assets/image/kongkong.webp" />
        <div>空空如也!!!</div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "UserName",
  data() {
    return {
      drawer: false,
      thisUsersId: 0,
      users: [], //总用户数据
      studentsOrTeacher: "", //当前点击的是老师还是学生用户
      searchName: "", //搜索的关键词
      currentPage: 1, //当前页码数
      CurrentUsers: [], //当前页码的用户数据
    };
  },
  methods: {
    //点击用户名称触发弹窗查看详情
    go_drawer(id) {
      this.searchName = "";
      this.drawer = true;
      this.thisUsersId = id;
    },
    //增加或者修改用户路由跳转
    goSetUsers(id) {
      if (id) {
        this.$router.push({
          name: "userfrom",
          query: {
            id,
            isTeacher: this.studentsOrTeacher,
            thisMenuId: this.usersTitle.thisMenuId,
            studentsOrTeacher: this.usersTitle.studentsOrTeacher,
          },
        });
      } else {
        this.$router.push({
          name: "userfrom",
          query: {
            isTeacher: this.studentsOrTeacher,
            thisMenuId: this.usersTitle.thisMenuId,
            studentsOrTeacher: this.usersTitle.studentsOrTeacher,
          },
        });
      }
    },
    //删除老师用户
    async deleteTeacherHandler(id) {
      try {
        let result = await this.$store.dispatch("deleteTeacher", id);
        if (result) {
          alert(result);
          this.$store.dispatch("getUsers", this.usersTitle);
        }
      } catch (error) {
        alert(error);
      }
    },
    //删除学生用户
    async deleteStudentHandler(id) {
      try {
        let result = await this.$store.dispatch("deleteStudent", id);
        if (result) {
          alert(result);
          this.$store.dispatch("getUsers", this.usersTitle);
        }
      } catch (error) {
        alert(error);
      }
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.CurrentUsers = this.users.slice(
        (this.currentPage - 1) * 8,
        this.currentPage * 8
      );
    },
  },
  computed: {
    //筛选出含有当前关键词或者直接点击用户姓名的详细内容
    filterUsers() {
      if (this.searchName) {
        return this.users.filter((value) => {
          return value.nickname.indexOf(this.searchName) !== -1;
        });
      } else {
        return this.CurrentUsers.filter((item) => {
          return item.id == this.thisUsersId;
        });
      }
    },
    //计算出点击用户导航栏传递来的专业的id和用户种类
    usersTitle() {
      return {
        thisMenuId: this.$route.query.thisMenuId,
        studentsOrTeacher: this.$route.query.studentsOrTeacher,
      };
    },
  },
  watch: {
    //监视出点击用户导航栏传递来的专业的id的变化和种类的变化，并且此处需要采用深度监视(数据传递来的是对象)
    usersTitle: {
      immediate: true,
      deep: true,
      async handler(newValue, oldValue) {
        try {
          //发起请求获取当前用户的数据
          const result = await this.$store.dispatch("getUsers", newValue);
          if (result == "ok") {
            this.users = this.$store.state.users.user;
            console.log(this.users);
            this.CurrentUsers = this.users.slice(0, 8);
            this.studentsOrTeacher = newValue.studentsOrTeacher;
          }
        } catch (error) {
          return error;
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.studentContainer {
  width: calc(100% - 250px);
  height: 100%;
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
  // 中部展示内容
  .first_top {
    // 头部标题
    .head,
    .table {
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      ul {
        display: flex;
        list-style: none;
        li {
          width: 25%;
          text-align: center;
          border-right: 1px solid #ccc;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .fonts {
            padding-bottom: 2px;
            border-bottom: 1px solid #ccc;
          }
          .fonts:hover {
            color: red;
            border-bottom: 1px solid red;
          }
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
  }
  // 弹窗内容
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
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left {
          margin-left: 30px;
          width: 150px;
          height: 200px;
          border-radius: 20px;
        }
        .right {
          position: relative;
          width: 200px;
          margin-right: 30px;
          padding: 10px;
          background: #f5f5f5;
          border-radius: 10px;
          .small {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .title {
              font-weight: 600;
            }
          }
          .btn {
            position: absolute;
            bottom: 10px;
            right: 10px;
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
      // 老师弹窗部分
      h3 {
        margin: 20px 0;
      }
      h4 {
        margin: 10px 0;
      }
      p {
        text-indent: 2em;
        margin-bottom: 30px;
        margin-top: 5px;
      }
      //学生弹窗部分
      .usersMessage {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .message {
          width: 40%;
          border: 1px solid #ccc;
          background: #f5f5f5;
          border-radius: 20px;
          padding: 10px 30px;
          .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
          }
          .reason,
          .sendWord {
            margin-bottom: 5px;
          }
          .text {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px;
            margin-bottom: 20px;
          }
        }
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
  // 分页器模块
  .pagination {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>