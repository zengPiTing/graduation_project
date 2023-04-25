<template>
  <div class="EveryUser">
    <!-- 搜索模块 -->
    <div class="search">
      <input type="text" placeholder="请输入姓名" v-model="searchName" />
      <div
        class="search_btn"
        @click="searchName ? (drawer = true) : ''"
        type="primary"
      >
        <i class="el-icon-search"></i>查询
      </div>
      <div class="show_btn" @click="showDelete" type="primary">
        <i class="el-icon-search"></i>查看已删除用户
      </div>
      <div @click="goShowUsers" class="show_btn"> <i class="el-icon-search"></i>用户阅览</div>
      <div class="annotation">
        <span class="font">注:</span>
        <span class="icon"
          ><span class="color_red">n</span>为已匹配学生数或老师数</span
        >
        <span class="icon"
          ><span class="color_green">n</span>为已待审阅学生数</span
        >
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="head">
      <div class="class_user">
        <div class="teacher">
          <div class="topTitle">老师用户</div>
          <!-- 标题模块 -->
          <ul class="bottomTitle">
            <li>姓名</li>
            <li>账号</li>
            <li>操作</li>
          </ul>
          <div class="userContent">
            <ul v-for="item in teacherCurrentUsers" :key="item.id">
              <li>
                <span class="name">{{ item.nickname }}</span>
                <span class="icon"
                  ><span class="color_green">{{ item.recordYes.length }}</span
                  ><span class="color_red">{{
                    item.recordNull.length
                  }}</span></span
                >
              </li>
              <li>{{ item.username }}</li>
              <li>
                <span
                  class="table_update"
                  @click="thisUsers(item.id, item.isTeacher)"
                  >查看</span
                ><span
                  class="table_detele"
                  @click="deleteTeacherHandler(item.id)"
                  >删除</span
                >
              </li>
            </ul>
            <!-- 老师分页器模块 -->
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="Math.ceil(everyTeacher.length)"
                :page-size="8"
                :current-page="teacherCurrentPage"
                @current-change="handleCurrentTeacherChange"
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="student">
          <div class="topTitle">学生用户</div>
          <ul class="bottomTitle">
            <li>姓名</li>
            <li>账号</li>
            <li>操作</li>
          </ul>
          <div class="userContent">
            <ul v-for="item in studentCurrentUsers" :key="item.id">
              <li>
                <span class="name">{{ item.nickname }}</span>
                <span class="icon right"
                  ><span class="color_green">{{
                    item.daoshi_id ? "1" : "0"
                  }}</span></span
                >
              </li>
              <li>{{ item.student_number }}</li>
              <li>
                <span
                  class="table_update"
                  @click="thisUsers(item.id, item.isTeacher)"
                  >查看</span
                ><span
                  class="table_detele"
                  @click="deleteStudentHandler(item.id)"
                  >删除</span
                >
              </li>
            </ul>
            <!-- 学生分页器模块 -->
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="Math.ceil(everyStudent.length)"
                :page-size="8"
                :current-page="studentCurrentPage"
                @current-change="handleCurrentStudentChange"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗模块 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :before-close="relieveUpdate"
      :with-header="false"
      :size="800"
    >
      <!-- 未被删除的学生及老师 -->
      <div class="drawerContent" v-show="filterUsers.length > 0">
        <div
          class="studentSearchList"
          v-for="(item, index) in filterUsers"
          :key="index"
        >
          <!-- 老师用户 -->
          <div v-show="item.isTeacher == '0'">
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
                <div
                  class="btn"
                  @click="go_EveryUsersFrom(item.id, item.isTeacher)"
                >
                  点击编辑
                </div>
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
            <div class="studentList">
              <h4>我的学生</h4>
              <ul>
                <li
                  @click="drawerStudent(studentItem.id)"
                  v-for="studentItem in item.students"
                  :key="studentItem.id"
                >
                  {{ studentItem.nickname }}
                </li>
              </ul>
            </div>
            <div class="recordList">
              <h4>审批记录</h4>
              <ul class="title">
                <li>申请学生</li>
                <li>意向原因</li>
                <li>审批备注</li>
                <li>审批结果</li>
              </ul>
              <ul v-for="itemrecord in item.record" :key="itemrecord.id">
                <li>{{ itemrecord.student_name }}</li>
                <li>
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" class="slot">
                      {{ itemrecord.studentRemark }}
                    </div>
                    <div class="nowrap">{{ itemrecord.studentRemark }}</div>
                  </el-tooltip>
                </li>
                <li>
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" class="slot">
                      {{ itemrecord.comment }}
                    </div>
                    <div class="nowrap">{{ itemrecord.comment }}</div>
                  </el-tooltip>
                </li>
                <li>
                  <span class="green" v-show="itemrecord.is_yes == 'yes'"
                    >已同意</span
                  >
                  <span class="red" v-show="itemrecord.is_yes == 'no'"
                    >已驳回</span
                  >
                  <span class="blue" v-show="!itemrecord.is_yes">审阅中</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 学生用户 -->
          <div v-show="item.isTeacher == '1'">
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
                <div
                  class="btn"
                  v-if="!relieve"
                  @click="go_EveryUsersFrom(item.id, item.isTeacher)"
                >
                  点击编辑
                </div>
                <div
                  class="btn"
                  v-if="relieve"
                  @click="updateChoice(item.id, item.daoshi_id)"
                >
                  解除匹配
                </div>
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
            <h4 v-show="!item.minzu">用户未补充信息</h4>
            <h4 v-show="!item.daoshi_id">用户暂无导师</h4>
            <div class="recordList">
              <h4>审批记录</h4>
              <ul class="title">
                <li>审批老师</li>
                <li>意向原因</li>
                <li>审批备注</li>
                <li>审批结果</li>
              </ul>
              <ul v-for="itemrecord in item.record" :key="itemrecord.id">
                <li>{{ itemrecord.teacher_name }}</li>
                <li>
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" class="slot">
                      {{ itemrecord.studentRemark }}
                    </div>
                    <div class="nowrap">{{ itemrecord.studentRemark }}</div>
                  </el-tooltip>
                </li>
                <li>
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" class="slot">
                      {{ itemrecord.comment }}
                    </div>
                    <div class="nowrap">{{ itemrecord.comment }}</div>
                  </el-tooltip>
                </li>
                <li>
                  <span class="green" v-show="itemrecord.is_yes == 'yes'"
                    >已同意</span
                  >
                  <span class="red" v-show="itemrecord.is_yes == 'no'"
                    >已驳回</span
                  >
                  <span class="blue" v-show="!itemrecord.is_yes">审阅中</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 被删除的学生及老师 -->
      <div class="drawerContentNo" v-show="filterUsersNo && thisUsersId == 0">
        <h3>已删除老师</h3>
        <ul>
          <li
            v-for="item in filterUsersNo.filterTeacherNo"
            :key="item.id"
            @click="go_EveryUsersFrom(item.id, item.isTeacher)"
          >
            {{ item.nickname }}
          </li>
        </ul>
        <h3>已删除学生</h3>
        <ul>
          <li
            v-for="item in filterUsersNo.filterStudentNo"
            :key="item.id"
            @click="go_EveryUsersFrom(item.id, item.isTeacher)"
          >
            {{ item.nickname }}
          </li>
        </ul>
      </div>
      <div
        class="kongkong"
        v-show="filterUsers.length < 1 && filterUsersNo.length < 1"
      >
        <img src="@/assets/image/kongkong.webp" />
        <div>空空如也!!!</div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false, //弹窗控制
      relieve: false, //判断是去查看用户数据，还是编辑用户匹配关系
      searchName: "", //搜索内容
      thisUsersId: 0, //当前用户id
      thisIsteacher: 0, //当前用户是否是老师
      teacherCurrentPage: 1, //老师当前页码数
      teacherCurrentUsers: [], //老师当前页码的用户数据
      studentCurrentPage: 1, //学生当前页码数
      studentCurrentUsers: [], //学生当前页码的用户数据
    };
  },
  mounted() {
    this.$store.dispatch("getRecord");
    this.$store.dispatch("getEveryUsersData");
  },
  methods: {
    //关闭弹窗时回调(让学生用户relieve==false)
    relieveUpdate(done) {
      this.relieve = false;
      done();
    },
    //点击解除老师学生对应匹配
    updateChoice(id, teacher_id) {
      let ids = {
        id,
        teacher_id,
      };
      this.$confirm("是否确定解除该老师及学生匹配关系?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let result = await this.$store.dispatch("updateChoice", ids);
            if (result) {
              alert(result);
              this.$store.dispatch("getEveryUsersData");
              this.$store.dispatch("getRecord");
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
    //点击查看当前用户数据
    thisUsers(id, isTeacher) {
      this.searchName = "";
      this.drawer = true;
      // this.relieve = false;
      this.thisUsersId = id;
      this.thisIsteacher = isTeacher;
    },
    //查看已删除用户数据
    showDelete() {
      this.drawer = true;
      this.searchName = "";
      // this.relieve = false;
      this.thisUsersId = 0;
    },
    //查看所有用户，点击进行路由跳转
    goShowUsers(){
      this.$router.push({name:'everyUserShow'});
    },
    //查看老师门下学生
    drawerStudent(id) {
      this.thisUsersId = id;
      this.relieve = true;
      this.drawer = true;
      this.thisIsteacher = 1;
      this.searchName = "";
    },
    //删除老师用户
    deleteTeacherHandler(id) {
      this.$confirm("是否确定删除此老师?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let index = this.teacherCurrentUsers.findIndex(
            (item) => item.id == id
          );
          let username = this.teacherCurrentUsers[index].username;
          if (username == "2000012") {
            alert("此账号为管理员用户，无法删除");
          } else {
            try {
              let result = await this.$store.dispatch("deleteTeacher", id);
              if (result) {
                alert(result);
                this.$store.dispatch("getEveryUsersData");
                this.teacherCurrentPage = 1;
                this.studentCurrentPage = 1;
              }
            } catch (error) {
              alert(error);
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除学生用户
    deleteStudentHandler(id) {
      this.$confirm("是否确定删除此学生?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let result = await this.$store.dispatch("deleteStudent", id);
            if (result) {
              alert(result);
              this.$store.dispatch("getEveryUsersData");
              this.teacherCurrentPage = 1;
              this.studentCurrentPage = 1;
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
    //获取老师当前页
    handleCurrentTeacherChange(val) {
      this.teacherCurrentPage = val;
      this.teacherCurrentUsers = this.everyTeacher.slice(
        (this.teacherCurrentPage - 1) * 8,
        this.teacherCurrentPage * 8
      );
    },
    //获取学生当前页
    handleCurrentStudentChange(val) {
      this.studentCurrentPage = val;
      this.studentCurrentUsers = this.everyStudent.slice(
        (this.studentCurrentPage - 1) * 8,
        this.studentCurrentPage * 8
      );
    },
    //点击跳转编辑界面
    go_EveryUsersFrom(id, isTeacher) {
      if (isTeacher == 0) {
        const everyTeacherUsers = [
          ...this.everyTeacherNo,
          ...this.everyTeacher,
        ];
        const index = everyTeacherUsers.findIndex((item) => id == item.id);
        this.$router.push({
          name: "everyUserFrom",
          query: {
            redactUsers: {
              id,
              username: everyTeacherUsers[index].username,
              status: everyTeacherUsers[index].status,
              password: everyTeacherUsers[index].password,
              nickname: everyTeacherUsers[index].nickname,
              isTeacher,
            },
          },
        });
      } else {
        const everyStudentUsers = [
          ...this.everyStudentNo,
          ...this.everyStudent,
        ];
        const index = everyStudentUsers.findIndex((item) => id == item.id);
        this.$router.push({
          name: "everyUserFrom",
          query: {
            redactUsers: {
              id,
              student_number: everyStudentUsers[index].student_number,
              status: everyStudentUsers[index].status,
              password: everyStudentUsers[index].password,
              nickname: everyStudentUsers[index].nickname,
              isTeacher,
            },
          },
        });
      }
    },
  },
  computed: {
    //获取已删除学生数据
    everyStudentNo() {
      return this.$store.state.everyUsers.everyStudentNo;
    },
    //获取已删除老师数据
    everyTeacherNo() {
      return this.$store.state.everyUsers.everyTeacherNo;
    },
    //获取学生数据
    everyStudent() {
      return this.$store.state.everyUsers.everyStudent;
    },
    //获取老师数据
    everyTeacher() {
      let recordsResult = this.$store.state.everyUsers.records;
      let everyTeacherResult = this.$store.state.everyUsers.everyTeacher;
      return everyTeacherResult.map((item) => {
        item.recordYes = recordsResult.filter((value) => {
          return item.id == value.teacher_id && value.is_yes == "yes";
        });
        item.recordNull = recordsResult.filter((value) => {
          return item.nickname == value.teacher_name && value.is_yes == null;
        });
        return item;
      });
    },
    //弹窗筛选的的人员数据
    filterUsers() {
      let records = this.$store.state.everyUsers.records;
      // 搜索的人员数据
      if (this.searchName) {
        let users = [...this.everyStudent, ...this.everyTeacher];
        let thisUser = users.filter(
          (value) => value.nickname.indexOf(this.searchName) !== -1
        );
        return thisUser.map((item) => {
          if (item.isTeacher == 0) {
            item.students = this.everyStudent.filter(
              (itemss) => item.nickname == itemss.daoshi_name
            );
            item.record = records.filter(
              (items) => item.nickname == items.teacher_name
            );
            return item;
          } else {
            item.record = records.filter(
              (items) => item.nickname == items.student_name
            );
            return item;
          }
        });
      } else {
        // 点击查看的人员数据
        if (this.thisIsteacher == 0) {
          // 点击查看当前老师用户
          let thisTeacher = this.everyTeacher.filter((item) => {
            return item.id == this.thisUsersId;
          });
          return thisTeacher.map((item) => {
            // 给当前用户身上绑定审批记录数据
            item.record = records.filter(
              (items) => item.nickname == items.teacher_name
            );
            //给当前老师用户身上绑定学生数据
            item.students = this.everyStudent.filter(
              (itemss) => item.nickname == itemss.daoshi_name
            );
            return item;
          });
        } else {
          // 点击查看当前学生用户
          let thisStudent = this.everyStudent.filter((item) => {
            return item.id == this.thisUsersId;
          });
          return thisStudent.map((item) => {
            item.record = records.filter(
              (items) => item.nickname == items.student_name
            );
            return item;
          });
        }
      }
    },
    //弹窗筛选出已被删除的老师或者学生用户
    filterUsersNo() {
      // let usersNo = [...this.everyTeacherNo, ...this.everyStudentNo];
      let { everyTeacherNo, everyStudentNo } = this;
      if (this.searchName) {
        let filterTeacherNo = everyTeacherNo.filter((value) => {
          return value.nickname.indexOf(this.searchName) !== -1;
        });
        let filterStudentNo = everyStudentNo.filter((value) => {
          return value.nickname.indexOf(this.searchName) !== -1;
        });
        return {
          filterTeacherNo,
          filterStudentNo,
        };
      } else {
        let filterTeacherNo = everyTeacherNo;
        let filterStudentNo = everyStudentNo;
        return {
          filterTeacherNo,
          filterStudentNo,
        };
      }
    },
  },
  watch: {
    //监视学生的变化，控制让分页器在页面加载完成显示内容
    everyStudent: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.studentCurrentUsers = newValue.slice(0, 8);
      },
    },
    //监视老师的变化，控制让分页器在页面加载完成显示内容
    everyTeacher: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.teacherCurrentUsers = newValue.slice(0, 8);
      },
    },
  },
};
</script>
<style lang="less" scoped>
.EveryUser {
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
      background: #c0e3f5;
      font-size: 12px;
    }
    .search_btn:active {
      background: skyblue;
    }
    .show_btn {
      width: 120px;
      text-align: center;
      height: 20px;
      line-height: 20px;
      margin-left: 20px;
      border-radius: 5px;
      background: #c0e3f5;
      font-size: 12px;
    }
    .show_btn:active{
      background: skyblue;
    }
    .show_btn:active {
      background: #cccccc;
    }
    .annotation {
      margin-left: 30px;
      .font {
        color: red;
        font-size: 13px;
        margin-right: 10px;
      }
      .icon {
        color: #545c64;
        font-size: 12px;
        margin-right: 10px;
        .color_red {
          display: inline-block;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          // padding: 5px;
          border-radius: 50%;
          color: white;
          background: greenyellow;
        }
        .color_green {
          display: inline-block;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          // padding: 5px;
          border-radius: 50%;
          color: white;
          background: #ff6c72;
        }
      }
    }
  }
  // 内容模块
  .head {
    margin-left: 20px;
    margin-right: 20px;
    height: 50px;
    line-height: 50px;
    .class_user {
      display: flex;
      justify-content: space-between;
      .teacher,
      .student {
        width: 49%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        background: #f5f5f5;
        .topTitle {
          font-size: 20px;
        }
        .bottomTitle {
          display: flex;
          background: #ccc;
          li {
            width: 33%;
            text-align: center;
            list-style: none;
            font-size: 18px;
          }
        }
        .userContent {
          position: relative;
          height: 500px;
          border: 1px solid #ccc;
          ul {
            display: flex;
            border-bottom: 1px solid #ccc;
            li {
              width: 33%;
              text-align: center;
              list-style: none;
              font-size: 18px;
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
                background: #ff6c72;
              }
            }
            li:nth-of-type(2) {
              border-left: 1px solid #ccc;
              border-right: 1px solid #ccc;
            }
            li:nth-of-type(1) {
              position: relative;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              .icon {
                position: absolute;
                top: -19px;
                right: 20px;
                display: inline-block;
                .color_green {
                  display: inline-block;
                  width: 26px;
                  height: 12px;
                  margin-right: 5px;
                  font-size: 6px;
                  line-height: 12px;
                  border-bottom-left-radius: 12px;
                  border-top-left-radius: 12px;
                  color: white;
                  background: greenyellow;
                }
                .color_red {
                  display: inline-block;
                  width: 26px;
                  height: 12px;
                  font-size: 6px;
                  line-height: 12px;
                  border-bottom-left-radius: 12px;
                  border-top-left-radius: 12px;
                  color: white;
                  background: #ff6c72;
                }
              }
              .right {
                position: absolute;
                top: -19px;
                right: 40px;
              }
            }
          }
          .pagination {
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
  // 弹窗内容
  .drawerContent {
    margin: 20px;
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
      .studentList {
        width: 100%;
        margin-bottom: 30px;
        ul {
          display: flex;
          list-style: none;
          margin-top: 5px;
          border: 1px solid #ccc;
          padding: 0 20px;
          li {
            padding: 3px 5px;
            border-bottom: 1px solid #ccc;
            margin: 10px 20px;
          }
          li:hover {
            color: red;
            border-bottom: 1px solid red;
          }
        }
      }
      .recordList {
        width: 100%;
        h4 {
          margin: 10px 0;
        }
        ul {
          display: flex;
          list-style: none;
          li {
            width: 30%;
            text-align: center;
            height: 40px;
            line-height: 40px;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            .nowrap {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .green {
              color: greenyellow;
            }
            .red {
              color: #ff6c72;
            }
            .blue {
              color: skyblue;
            }
          }
          li:nth-of-type(1) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-left: 1px solid #ccc;
            width: 20%;
          }
          li:last-child {
            width: 20%;
          }
        }
        .title {
          background: #ccc;
        }
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
  .drawerContentNo {
    margin: 20px;
    ul {
      border: 1px solid #ccc;
      margin-top: 10px;
      list-style: none;
      padding: 20px;
      display: flex;
      li {
        padding: 3px 4px;
        margin: 10px;
        border-bottom: 1px solid #ccc;
      }
      li:hover {
        border-bottom: 1px solid red;
        color: red;
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