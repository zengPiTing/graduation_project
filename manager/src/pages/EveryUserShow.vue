<template>
  <div class="userContainer">
    <nav class="navStyle">
      <el-select v-model="teacherIsStudent" placeholder="请选择用户种类">
        <el-option
          v-for="item in userOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="user_domain"
        collapse-tags
        clearable
        style="margin-left: 20px"
        placeholder="请选择专业"
      >
        <el-option
          v-for="item in options_domain"
          :key="item.id"
          :label="item.title"
          :value="item.title"
        >
        </el-option>
      </el-select>
      <div class="block pickerStyle" v-show="teacherIsStudent == '学生'">
        <el-date-picker
          v-model="student_year"
          type="year"
          placeholder="请选择选择入学年份"
        >
        </el-date-picker>
      </div>
      <button class="btn" @click="exportUsers">
        <i class="el-icon-download"></i>导出用户信息
      </button>
    </nav>
    <!-- 用户展示 -->
    <div class="user_show">
      <!-- 老师用户展示 -->
      <div v-show="teacherIsStudent == '老师'">
        <ul>
          <li class="teacherUsertitle">
            <span>专业</span>
            <span>姓名</span>
            <span>用户账号</span>
            <span>用户密码</span>
            <span>联系方式</span>
            <span>已选学生数</span>
            <span>待审阅学生数</span>
          </li>
          <li
            class="teacherUserTest"
            v-for="(item, index) in everyTeacher"
            :key="index"
          >
            <span>{{ item.domain.title || "暂无" }}</span>
            <span>{{ item.nickname || "暂无" }}</span>
            <span>{{ item.username || "暂无" }}</span>
            <span>{{ item.password || "暂无" }}</span>
            <span>{{ item.email || "暂无" }}</span>
            <span>{{ item.recordYes.length }}</span>
            <span>{{ item.recordNull.length }}</span>
          </li>
        </ul>
      </div>
      <!-- 学生用户展示 -->
      <div v-show="teacherIsStudent == '学生'">
        <ul>
          <li class="teacherUsertitle">
            <span>专业</span>
            <span>姓名</span>
            <span>账号</span>
            <span>密码</span>
            <span>导师</span>
            <span>班级</span>
            <span>联系方式</span>
          </li>
          <li
            class="teacherUserTest"
            v-for="(item, index) in everyStudent"
            :key="index"
          >
            <span>{{ item.domain || "暂无" }}</span>
            <span>{{ item.nickname || "暂无" }}</span>
            <span>{{ item.student_number || "暂无" }}</span>
            <span>{{ item.password || "暂无" }}</span>
            <span>{{ item.daoshi_name || "暂无" }}</span>
            <span>{{ item._class || "暂无" }}</span>
            <span>{{ item.student_phone || "暂无" }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      everyUsers: [], //用户数据
      userOptions: [
        {
          value: "老师",
          label: "老师",
        },
        {
          value: "学生",
          label: "学生",
        },
      ], //用户种类
      teacherIsStudent: "老师", //当前查看用户
      options_domain: [], //用户专业数组
      user_domain: "", //当前查看专业
      student_year: "", //当前查看学生年份
    };
  },
  mounted() {
    //获取老师学生匹配信息
    this.$store.dispatch("getRecord");
    this.getEveryUsers();
    this.getTitle();
    // this.student_year = new Date()
    // const { everyStudent, everyTeacher } = this.$store.state.everyUsers;
    // const options_domain = this.$store.state.header.schooltitle;
    // this.everyUsers = [...everyStudent, ...everyTeacher];
    // this.options_domain = options_domain;
  },

  methods: {
    //让组件刷新时重新调用接口获取用户信息数据及专业
    async getEveryUsers() {
      try {
        let result = await this.$store.dispatch("getEveryUsersData");
        if (result == "ok") {
          const { everyStudent } = this.$store.state.everyUsers;
          this.everyUsers = [...everyStudent, ...this.everyTeacher];
        }
      } catch (error) {
        console.log(error);
      }
    },
    //获取学院专业信息
    async getTitle() {
      try {
        let result = await this.$store.dispatch("getSchoolTitle");
        if (result) {
          this.options_domain = this.$store.state.header.schooltitle.filter(
            (item) => {
              return item.status == 0;
            }
          );
        }
      } catch (error) {
        alert(error);
      }
    },
    //导出用户信息
    exportUsers() {
      let jsonData; //需要导出的数据
      let str; // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
      if (this.teacherIsStudent == "老师") {
        jsonData = this.everyTeacher.map((value) => {
          return {
            domain: value.domain.title,
            nickname: value.nickname,
            username: value.username,
            password: value.password,
            email: value.email,
            recordYes: value.recordYes.length,
            recordNull: value.recordNull.length,
          };
        });
        str = `,专业,姓名,用户账号,用户密码,联系方式,已选学生数,待审阅学生数,`;
      } else {
        jsonData = this.everyStudent.map((value) => {
          return {
            domain: value.domain,
            nickname: value.nickname,
            student_number: value.student_number,
            password: value.password,
            daoshi_name: value.daoshi_name,
            _class: value._class,
            student_phone: value.student_phone,
          };
        });
        str = `,专业,姓名,账号,密码,导师,班级,联系方式,`;
      }
      // 增加	为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < jsonData.length; i++) {
        for (const key in jsonData[i]) {
          str += `${jsonData[i][key] + "	"},`;
        }
        str += "";
      } // encodeURIComponent解决中文乱码
      const uri = "data:text/csv;charset=utf-8,ufeff" + encodeURIComponent(str); // 通过创建a标签实现
      const link = document.createElement("a");
      link.href = uri; // 对下载的文件命名
      this.teacherIsStudent == "老师"
        ? (link.download = "导师数据表.csv")
        : (link.download = "学生数据表.csv");
      link.click();
    },
  },
  computed: {
    //获取老师数据
    everyTeacher() {
      let recordsResult = this.$store.state.everyUsers.records;
      let everyTeacherResult = this.$store.state.everyUsers.everyTeacher.filter(
        (value) => value.username !== "2000012"
      );
      let titleResult = this.$store.state.header.schooltitle;
      let teacherNoFilter = everyTeacherResult.map((item) => {
        item.recordYes = recordsResult.filter(
          (value) => item.id == value.teacher_id && value.is_yes == "yes"
        );
        item.recordNull = recordsResult.filter(
          (value) => item.nickname == value.teacher_name && value.is_yes == null
        );
        item.domain =
          titleResult.find((value) => item.domain_id == value.id) || {};
        return item;
      });
      return teacherNoFilter.filter((value) => {
        if (this.user_domain) return value.domain.title == this.user_domain;
        return teacherNoFilter;
      });
    },
    //获取学生数据
    everyStudent() {
      let studentResult = this.$store.state.everyUsers.everyStudent;
      if (this.student_year) {
        this.student_year = new Date(this.student_year)
          .getFullYear()
          .toString();
      }
      let filterCondition = {
        user_domain: this.user_domain,
        student_year: this.student_year,
      };
      if (!filterCondition.user_domain && !filterCondition.student_year) {
        return studentResult;
      } else if (!filterCondition.user_domain && filterCondition.student_year) {
        return studentResult.filter(
          (value) => value.enrol_year == filterCondition.student_year
        );
      } else if (filterCondition.user_domain && !filterCondition.student_year) {
        return studentResult.filter(
          (value) => value.domain == filterCondition.user_domain
        );
      } else {
        return studentResult.filter(
          (value) =>
            value.domain == filterCondition.user_domain &&
            value.enrol_year == filterCondition.student_year
        );
      }
    },
  },
};
</script>
<style lang="less" scoped>
.userContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.02);
  padding: 20px;
  //   background: url("@/assets/image/login_bg.jpg") no-repeat left top;
  //   background-size: 100%;
  .navStyle {
    position: relative;
    margin-bottom: 20px;
    .pickerStyle {
      margin-left: 20px;
      display: inline-block;
    }
    .btn {
      position: absolute;
      right: 50px;
      top: 5px;
      width: 130px;
      height: 30px;
      border-radius: 20px;
      background: #c0e3f5;
      border: none;
      i{
        margin-right: 5px;
      }
    }
    .btn:active{
      background: skyblue;
    }
  }
  .user_show {
    // padding: 0 20px;
    ul {
      list-style: none;
      li {
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        border-bottom: none;
        span {
          display: inline-block;
          width: 16.3%;
          border-right: 1px solid #ccc;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:nth-of-type(6) {
          width: 9%;
        }
        span:nth-of-type(7) {
          width: 9%;
          border-right: none;
        }
      }
      li:last-child {
        border-bottom: 1px solid #ccc;
      }
      .teacherUserTest:hover {
        background: #ebedee;
      }
      .teacherUsertitle {
        background: #c0e3f5;
      }
    }
  }
}
</style>
