<template>
  <div class="Container">
    <!-- 修改添加老师用户 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      v-if="routeQuery.isTeacher == 'teachers'"
    >
      <div class="flex">
        <el-form-item label="老师姓名" prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="老师账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="老师密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="school">
          <el-input v-model="ruleForm.school"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          :action="`${Url.hostserve}/getImg/upload`"
          :headers="headers"
          :on-success="
            (response, file, fileList) => {
              handleSuccess(response, file, fileList, 'ruleForm');
            }
          "
          :on-error="handlerErr"
          name="file"
          :limit="1"
          :file-list="fileListStudent"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg|png|bmp|jpeg|JPG|JPEG文件，且不超过10M
          </div>
        </el-upload>
      </div>
      <el-form-item label="所属专业" prop="domain_id">
        <el-select v-model="ruleForm.domain_id" placeholder="请选择专业信息">
          <el-option
            :label="item.title"
            :value="item.id"
            v-for="item in schooltitle"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="老师职称" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="教授" name="type"></el-checkbox>
          <el-checkbox label="副教授" name="type"></el-checkbox>
          <el-checkbox label="博士" name="type"></el-checkbox>
          <el-checkbox label="讲师及其他" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="老师身份" prop="isManager">
        <el-radio-group v-model="ruleForm.isManager">
          <el-radio label="普通老师"></el-radio>
          <el-radio label="管理员老师"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="老师简介" prop="awards">
        <el-input type="textarea" v-model="ruleForm.awards"></el-input>
      </el-form-item>
      <el-form-item label="教育背景" prop="education">
        <el-input type="textarea" v-model="ruleForm.education"></el-input>
      </el-form-item>
      <el-form-item label="领域技能" prop="epr">
        <el-input type="textarea" v-model="ruleForm.epr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 修改学生 -->
    <el-form
      :model="releFromStudent"
      :rules="rulesStudent"
      ref="releFromStudent"
      label-width="100px"
      class="demo-ruleForm"
      v-if="routeQuery.isTeacher == 'students' && routeQuery.id"
    >
      <div class="flex">
        <el-form-item label="学生姓名" prop="nickname">
          <el-input v-model="releFromStudent.nickname"></el-input>
        </el-form-item>
        <el-form-item label="学生账号" prop="student_number">
          <el-input v-model="releFromStudent.student_number"></el-input>
        </el-form-item>
        <el-form-item label="学生密码" prop="password">
          <el-input v-model="releFromStudent.password"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="student_phone">
          <el-input v-model="releFromStudent.student_phone"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="school">
          <el-input v-model="releFromStudent.school"></el-input>
        </el-form-item>
        <el-form-item label="宿舍" prop="student_dorm">
          <el-input v-model="releFromStudent.student_dorm"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="_class">
          <el-input v-model="releFromStudent._class"></el-input>
        </el-form-item>
        <el-form-item label="入学年份" prop="enrol_year">
          <el-input v-model="releFromStudent.enrol_year"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="minzu">
          <el-input v-model="releFromStudent.minzu"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="jiguan">
          <el-input v-model="releFromStudent.jiguan"></el-input>
        </el-form-item>
        <el-form-item label="出生年月" prop="date_birth">
          <el-input v-model="releFromStudent.date_birth"></el-input>
        </el-form-item>
      </div>
      <el-upload
        class="upload-demo"
        :action="`${Url.hostserve}/getImg/upload`"
        :headers="headers"
        :on-success="
          (response, file, fileList) => {
            handleSuccess(response, file, fileList, 'releFromStudent');
          }
        "
        :on-error="handlerErr"
        name="file"
        :limit="1"
        :file-list="fileListStudent"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg|png|bmp|jpeg|JPG|JPEG文件，且不超过10M
        </div>
      </el-upload>
      <el-form-item label="所属专业" prop="domain_id">
        <el-select
          v-model="releFromStudent.domain_id"
          placeholder="请选择专业信息"
        >
          <el-option
            :label="item.title"
            :value="item.id"
            v-for="item in schooltitle"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学生身份" prop="isManager">
        <el-radio-group v-model="releFromStudent.isManager">
          <el-radio label="普通学生"></el-radio>
          <el-radio label="管理员学生"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('releFromStudent')"
          >提交</el-button
        >
        <el-button @click="resetForm('releFromStudent')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加学生 -->
    <el-form
      :model="releFromSetStudent"
      :rules="rulesSetStudent"
      ref="releFromSetStudent"
      label-width="100px"
      class="demo-ruleForm setStudent"
      v-if="routeQuery.isTeacher == 'students' && !routeQuery.id"
    >
      <el-form-item label="学生姓名" prop="nickname">
        <el-input v-model="releFromSetStudent.nickname"></el-input>
      </el-form-item>
      <el-form-item label="学生账号" prop="student_number">
        <el-input v-model="releFromSetStudent.student_number"></el-input>
      </el-form-item>
      <el-form-item label="学生密码" prop="password">
        <el-input v-model="releFromSetStudent.password"></el-input>
      </el-form-item>
      <el-form-item label="学生身份" prop="isManager">
        <el-radio-group v-model="releFromSetStudent.isManager">
          <el-radio label="普通学生"></el-radio>
          <el-radio label="管理员学生"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('releFromSetStudent')"
          >提交</el-button
        >
        <el-button @click="resetForm('releFromSetStudent')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Url from "@/api/config";
export default {
  name: "UserFrom",
  data() {
    return {
      Url: Url,
      fileListStudent: [], //学生上传照片
      fileListTeacher: [], //老师上传照片
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      ruleForm: {
        //老师表单信息收集
        id: "",
        nickname: "",
        username: "",
        password: "111111",
        email: "",
        school: "智能科学与工程",
        domain_id: "",
        type: [],
        isManager: "",
        awards: "",
        education: "",
        epr: "",
        teacherClass: "",
        isTeacher: 0,
        photo: "",
      },
      releFromStudent: {
        //学生修改表单数据收集
        id: "",
        nickname: "",
        student_number: "",
        password: "",
        student_phone: "",
        school: "",
        student_dorm: "",
        _class: "",
        enrol_year:"",
        minzu: "",
        jiguan: "",
        date_birth: "",
        domain_id: "",
        isManager: "",
        photo: "",
      },
      releFromSetStudent: {
        //学生添加表单数据收集
        nickname: "",
        student_number: "",
        password: "",
        isManager: "",
        isTeacher: 1,
      },
      rulesSetStudent: {
        nickname: [
          //用户名
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        student_number: [
          //用户账号
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          //用户密码
          {
            required: true,
            message: "请输入用户密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        isManager: [
          //学生管理身份
          { required: true, message: "请选择学生管理身份", trigger: "change" },
        ],
      },
      rules: {
        nickname: [
          //用户名
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        username: [
          //用户账号
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          //用户密码
          {
            required: true,
            message: "请输入用户密码，默认111111",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "长度在6 到 20 个字符",
            trigger: "blur",
          },
        ],
        email: [
          //用户联系方式
          {
            required: true,
            message: "请输入联系方式，email或者电话",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        school: [
          //用户学院
          {
            required: true,
            message: "请输入学院，默认为智能科学与工程",
            trigger: "blur",
          },
          {
            min: 1,
            max: 15,
            message: "长度在 1到 20 个字符",
            trigger: "blur",
          },
        ],
        domain_id: [
          //用户专业
          { required: true, message: "请选择专业", trigger: "change" },
        ],
        type: [
          //老师职称
          {
            type: "array",
            required: true,
            message: "请至少选择一个职称",
            trigger: "change",
          },
        ],
        isManager: [
          //老师管理身份
          { required: true, message: "请选择老师管理身份", trigger: "change" },
        ],
        awards: [
          //老师简介
          { required: true, message: "请填写老师简介", trigger: "blur" },
        ],
        education: [
          //老师教育背景
          { required: true, message: "请填写老师简介", trigger: "blur" },
        ],
        epr: [
          //老师领域技能
          { required: true, message: "请填写老师简介", trigger: "blur" },
        ],
      },
      rulesStudent: {
        //学生用户表单数据收集
        nickname: [
          //用户名
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        student_number: [
          //用户账号
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          //用户密码
          {
            required: true,
            message: "请输入用户密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        _class: [
          //用户班级
          {
            required: true,
            message: "请输入班级,例2119401",
            trigger: "blur",
          },
          {
            min: 5,
            max: 10,
            message: "长度为5-10个字符",
            trigger: "blur",
          },
        ],
        enrol_year: [
          //用户入学年份
          {
            required: true,
            message: "请输入入学年份,如2019",
            trigger: "blur",
          },
          {
            min: 4,
            max: 4,
            message: "长度为5-10个字符",
            trigger: "blur",
          },
        ],
        minzu: [
          //用户民族
          {
            required: true,
            message: "请输入民族，例如:汉",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度为1-15个字符",
            trigger: "blur",
          },
        ],
        jiguan: [
          //用户籍贯
          {
            required: true,
            message: "请输入籍贯，例如:湖北省恩施市",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            message: "长度为2-20个字符",
            trigger: "blur",
          },
        ],
        date_birth: [
          //用户出生年月
          {
            required: true,
            message: "请输入出生年月，例如:2001年3月",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            message: "长度为2-20个字符",
            trigger: "blur",
          },
        ],
        student_phone: [
          //用户联系方式
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        school: [
          //用户学院
          {
            required: true,
            message: "请输入学院，默认为智能科学与工程",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2到 20 个字符",
            trigger: "blur",
          },
        ],
        domain_id: [
          //用户专业
          { required: true, message: "请选择专业", trigger: "change" },
        ],
        isManager: [
          //学生管理身份
          { required: true, message: "请选择学生管理身份", trigger: "change" },
        ],
        student_dorm: [
          //用户寝室
          {
            required: true,
            message: "请输入寝室,例:博学X栋XXX",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //学生老师文件上传成功后调用钩子
    handleSuccess(response, file, fileList, classresult) {
      if (classresult == "releFromStudent") {
        if (response.status == 0) {
          this.releFromStudent.photo = response.url;
        } else {
          this.fileListStudent = [];
          alert(response.message);
        }
      } else if (classresult == "ruleForm") {
        if (response.status == 0) {
          this.ruleForm.photo = response.url;
        } else {
          this.fileListTeacher = [];
          alert(response.message);
        }
      }
    },
    //学生老师文件上传失败后调用钩子
    handlerErr(err, file, fileList) {
      alert(err);
    },
    //表单提交时触发
    submitForm(value) {
      // console.log(this.$refs[value]);
      this.$refs[value].validate((valid) => {
        if (valid) {
          //表单填写规范后调用函数发送请求
          if (value == "ruleForm") {
            // console.log("我是老师修改添加");
            this.goAxiosUpdate(value, this.ruleForm);
          } else if (value == "releFromStudent") {
            // console.log("我是学生修改");
            this.goAxiosUpdate(value, this.releFromStudent);
          } else if (value == "releFromSetStudent") {
            // console.log("我是学生添加");
            this.goAxiosUpdate(value, this.releFromSetStudent);
          }
        } else {
          return false;
        }
      });
    },
    //重置表单元素
    resetForm(value) {
      this.$refs[value].resetFields();
    },
    // 发送请求增删改查用户数据
    async goAxiosUpdate(value, fromData) {
      if (value == "ruleForm") {
        //老师用户增改
        try {
          let result = await this.$store.dispatch("teacherUpdate", fromData);
          if (result) {
            alert(result);
            this.$router.push({
              name: "users",
              query: {
                thisMenuId: this.routeQuery.thisMenuId,
                studentsOrTeacher: this.routeQuery.studentsOrTeacher,
              },
            });
          }
        } catch (error) {
          alert(error);
        }
      } else if (value == "releFromStudent") {
        //学生用户修改
        try {
          let result = await this.$store.dispatch("StudentUpdate", fromData);
          if (result) {
            alert(result);
            this.$router.push({
              name: "users",
              query: {
                thisMenuId: this.routeQuery.thisMenuId,
                studentsOrTeacher: this.routeQuery.studentsOrTeacher,
              },
            });
          }
        } catch (error) {
          alert(error);
        }
      } else if (value == "releFromSetStudent") {
        //学生用户增加
        try {
          let result = await this.$store.dispatch("teacherSet", fromData);
          if (result) {
            alert(result);
            this.$router.push({
              name: "users",
              query: {
                thisMenuId: this.routeQuery.thisMenuId,
                studentsOrTeacher: this.routeQuery.studentsOrTeacher,
              },
            });
          }
        } catch (error) {
          alert(error);
        }
      }
    },
  },
  computed: {
    //拿到路由跳转时传递的用户iD及身份
    routeQuery() {
      return {
        id: this.$route.query.id,
        isTeacher: this.$route.query.isTeacher,
        thisMenuId: this.$route.query.thisMenuId,
        studentsOrTeacher: this.$route.query.studentsOrTeacher,
      };
    },
    //获取到学院专业信息
    schooltitle() {
      let result = this.$store.state.header.schooltitle;
      return result.filter((item) => item.status == 0);
    },
  },
  watch: {
    //监视用户路由跳转携带的参数
    routeQuery: {
      immediate: true,
      handler(newValue, oldValue) {
        // 老师用户
        if (newValue.isTeacher == "teachers") {
          let ruleForm = this.ruleForm;
          //从信息管理跳转而来
          let user = this.$store.state.users.user;
          //获取到当前传递过来的用户数据
          let index = user.findIndex((item) => item.id == newValue.id);
          // 双重遍历让路由获取的数据同步到data中
          for (let key1 in ruleForm) {
            for (const key2 in user[index]) {
              key1 == key2 ? (ruleForm[key1] = user[index][key2]) : "";
              if (key1 == "type" && key2 == "teacherClass") {
                ruleForm[key1] = user[index][key2].split("、");
              }
              if (key2 == "isManager" && key1 == "isManager") {
                user[index][key2] == "0"
                  ? (ruleForm[key1] = "管理员老师")
                  : (ruleForm[key1] = "普通老师");
              }
            }
          }
        } else {
          // 学生用户
          let releFromStudent = this.releFromStudent;
          let user = this.$store.state.users.user;
          //获取到当前传递过来的用户数据
          let index = user.findIndex((item) => item.id == newValue.id);
          // 双重遍历让路由获取的数据同步到data中
          for (let key1 in releFromStudent) {
            for (const key2 in user[index]) {
              key1 == key2 ? (releFromStudent[key1] = user[index][key2]) : "";
              if (key2 == "isManager" && key1 == "isManager") {
                user[index][key2] == "0"
                  ? (releFromStudent[key1] = "管理员学生")
                  : (releFromStudent[key1] = "普通学生");
              }
            }
          }
        }
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
  overflow-y: auto;
  .demo-ruleForm {
    width: 900px;
    margin: 0 auto;
    .flex {
      display: flex;
      flex-wrap: wrap;
      margin-top: 50px;
    }
    .el-input {
      width: 300px;
    }
  }
  .setStudent {
    margin-top: 200px;
    width: 400px;
  }
  .upload-demo {
    width: 400px;
    margin-left: 30px;
    padding-bottom: 30px;
  }
}
</style>