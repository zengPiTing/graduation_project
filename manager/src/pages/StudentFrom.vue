<template>
  <div class="Container">
    <!-- 修改添加优秀学生 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="学生姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="text">
        <el-input type="textarea" :rows="7" v-model="ruleForm.text"></el-input>
      </el-form-item>
      <el-form-item label="图片上传" prop="text">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="`${Url.hostserve}/excellence/updateStudent`"
          :headers="headers"
          :on-success="handleSuccess"
          :on-error="handlerErr"
          name="file"
          :limit="1"
          :file-list="fileList"
          :auto-upload="false"
          :data="ruleForm"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg|png|bmp|jpeg|JPG|JPEG文件，且不超过10M
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Url from "@/api/config";
export default {
  name: "StudentFrom",
  data() {
    return {
      Url: Url,
      fileList: [], //上传的图片
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      ruleForm: {
        //添加优秀学生
        id: "",
        name: "",
        title: "",
        text: "",
      },
      rules: {
        name: [
          //学生姓名
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        title: [
          //文章标题
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        text: [
          //文章内容
          { required: true, message: "请填写文章内容", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    //获取路由跳转携带的数据
    if (this.$route.query) {
      this.ruleForm = this.$route.query;
    }
  },
  methods: {
    //文件上传成功后调用钩子
    handleSuccess(response, file, fileList) {
      if (response.status == 0) {
        alert(response.msg);
        this.$router.push({ name: "student" });
      }else{
        this.fileList=[]
        alert(response.message);
      }
    },
    // 文件上传失败后调用钩子
    handlerErr(err, file, fileList) {
      alert(err);
    },
    //表单提交时触发
    submitForm(value) {
      this.$refs[value].validate(async (valid) => {
        if (valid) {
          //表单填写规范后调用函数发送请求
          this.$refs.upload.submit();
        } else {
          return false;
        }
      });
    },
    //重置表单元素
    resetForm(value) {
      this.$refs[value].resetFields();
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
    width: 700px;
    margin: 100px auto;
    .el-input {
      width: 300px;
    }
  }
}
</style>