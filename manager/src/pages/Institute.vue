<template>
  <div class="institute">
    <!-- 头部导航 -->
    <el-tabs v-model="activeName" type="card">
      <!-- 热点新闻表格模块 -->
      <el-tab-pane label="热点新闻" name="first">
        <div class="first">
          <!-- 热点新闻上部遍历的内容模块 -->
          <div class="first_top">
            <div class="head">
              <ul>
                <li>序号</li>
                <li>标题</li>
                <li>内容</li>
                <li>操作</li>
              </ul>
            </div>
            <div
              class="table"
              v-for="(item, index) in CurrentNews"
              :key="item.id"
            >
              <ul>
                <li type="primary" @click="event_update(index, true)">
                  <span class="num">{{ index + 1 }}</span>
                </li>
                <li>{{ item.title }}</li>
                <li>{{ item.img_text }}</li>
                <li>
                  <span class="table_update" @click="event_update(index)"
                    >编辑</span
                  >
                  <span class="table_detele" @click="deleteNew(item.id)"
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
                :total="Math.ceil(hotNews.length)"
                :page-size="4"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </div>
          <!-- 下部修改添加模块 -->
          <div class="first_bottom">
            <div class="first-title">
              <div>标题</div>
              <input
                type="text"
                placeholder="请输入标题"
                v-model="thisUpdateNew.title"
              />
            </div>
            <div class="first-content">
              <div>内容</div>
              <textarea
                v-model="thisUpdateNew.img_text"
                cols="60"
                rows="8"
                placeholder="请输入内容"
              ></textarea>
            </div>
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="`${Url.hostserve}/institute/updateHotNew`"
              :headers="headers"
              :on-success="handleSuccess"
              :on-error="handlerErr"
              name="file"
              :limit="1"
              :file-list="fileList"
              :auto-upload="false"
              :data="thisUpdateNew"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg|png|bmp|jpeg|JPG|JPEG文件，且不超过10M
              </div>
            </el-upload>
            <div class="first-request" @click="axiosUpdate">
              {{ thisUpdateNew.id ? "点击修改" : "点击添加" }}
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- 专业变更模块 -->
      <el-tab-pane label="专业变更" name="second">
        <!-- 专业变更表格 -->
        <div class="second">
          <div class="first_top">
            <div class="head">
              <ul>
                <li>状态显示</li>
                <li class="admain">智能科学与工程</li>
                <li>变更操作</li>
              </ul>
            </div>
            <div class="table" v-for="item in domain" :key="item.id">
              <ul>
                <li>
                  <span v-show="item.status == 0" class="green">可用专业</span>
                  <span v-show="item.status == 1" class="red">已被删除</span>
                </li>
                <li class="admain">{{ item.title }}</li>
                <li>
                  <div v-show="item.status == 0">
                    <span class="table_update" @click="updateSchoolId(item.id)"
                      >编辑</span
                    >
                    <span class="table_detele" @click="deleteSchool(item.id)"
                      >删除</span
                    >
                  </div>
                  <div v-show="item.status == 1">
                    <span class="table_recover" @click="recoverSchool(item.id)"
                      >恢复可用</span
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="first_bottom">
            <div class="first-title">
              <div>标题</div>
              <input
                type="text"
                v-model="thisUpdateSchool.title"
                placeholder="请输入专业名称"
              />
            </div>
            <div class="first-request" @click="axiosSchool">
              {{ thisUpdateSchool.id ? "点击修改" : "点击添加" }}
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 弹窗内容 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      :size="800"
    >
      <div class="drawerContent">
        <h2>{{ thisUpdateNew.title }}</h2>
        <div class="img">
          <img
            :src="
              thisUpdateNew.url
                ? thisUpdateNew.url
                : 'https://img0.baidu.com/it/u=3213447885,3744539175&fm=253&fmt=auto&app=138&f=PNG?w=565&h=279'
            "
            alt="暂无图片"
          />
        </div>
        <p>{{ thisUpdateNew.img_text }}</p>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Url from "@/api/config";
export default {
  name: "InstituteName",
  data() {
    return {
      Url: Url,
      fileList: [], //上传的图片
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      currentPage: 1, //当前页码数
      CurrentNews: [], //当前页码的用户数据
      drawer: false, //控制弹窗弹出
      activeName: "first", //用于tab栏的交换
      thisUpdateNew: {}, //当前编辑的新闻热点
      thisUpdateSchool: {}, //当前选中的专业
    };
  },
  mounted() {
    //请求热点新闻数据
    this.axiosHandler("getHotNews");
    // console.log(this.$store.state.header.schooltitle);
    // this.domain = this.$store.state.header.schooltitle;
  },
  methods: {
    //文件上传成功后调用钩子
    handleSuccess(response, file, fileList) {
      // console.log(response, file, fileList, 111111111111);
      if (response.status == 0) {
        alert(response.msg);
      } else {
        alert(response.message);
      }
      this.axiosHandler("getHotNews");
      this.currentPage = 1;
      this.thisUpdateNew = {};
      this.fileList = [];
    },
    // 文件上传失败后调用钩子
    handlerErr(err, file, fileList) {
      // console.log(err, file, fileList, 222222222222);
      alert(err);
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.CurrentNews = this.hotNews.slice(
        (this.currentPage - 1) * 4,
        this.currentPage * 4
      );
    },
    //获取当前选中的热点新闻
    event_update(index, drawer) {
      if (drawer) {
        this.drawer = drawer;
      }
      this.thisUpdateNew = this.CurrentNews[index];
    },
    //点击修改或者新增新闻数据
    axiosUpdate() {
      // console.log(this.fileList);
      if (this.thisUpdateNew.title && this.thisUpdateNew.img_text) {
        this.$refs.upload.submit();
      } else {
        alert("信息填写不完整");
      }
    },
    //点击删除热点新闻
    deleteNew(id) {
      this.$confirm("是否删除当前热点新闻?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let result = await this.$store.dispatch("deletenew", id);
            if (result) {
              alert(result);
              this.currentPage = 1;
              this.axiosHandler("getHotNews");
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
    //请求热点新闻回调
    async axiosHandler(handlerName, data) {
      try {
        let result = await this.$store.dispatch(handlerName, data);
        if (result) {
          alert(result);
        }
      } catch (error) {
        alert(error);
      }
    },
    //同步当前编辑的专业内容
    updateSchoolId(id) {
      let index = this.domain.findIndex((item) => item.id == id);
      this.thisUpdateSchool = this.domain[index];
    },
    // 点击修改新增专业
    async axiosSchool() {
      try {
        if (this.thisUpdateSchool.id) {
          //修改专业
          let result = await this.$store.dispatch(
            "updateSchool",
            this.thisUpdateSchool
          );
          if (result) {
            alert(result);
            this.thisUpdateSchool = {};
            this.$store.dispatch("getSchoolTitle");
          }
        } else {
          //新增专业
          let result = await this.$store.dispatch(
            "setSchool",
            this.thisUpdateSchool
          );
          if (result) {
            alert(result);
            this.thisUpdateSchool = {};
            this.$store.dispatch("getSchoolTitle");
          }
        }
      } catch (error) {
        alert(error);
      }
    },
    //点击删除专业
    deleteSchool(id) {
      this.$confirm("是否删除当前专业?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let result = await this.$store.dispatch("deleteSchool", id);
            if (result) {
              alert(result);
              this.$store.dispatch("getSchoolTitle");
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
    //点击恢复专业
    async recoverSchool(id) {
      this.$confirm("是否恢复当前专业?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const result = await this.$store.dispatch("recoverDomain", id);
            alert(result);
            this.$store.dispatch("getSchoolTitle");
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
    //获取到仓库中的热点新闻
    hotNews() {
      return this.$store.state.institute.hotNews;
    },
    //获取到仓库中的未被删除专业信息
    domain() {
      return this.$store.state.header.schooltitle;
    },
  },
  watch: {
    //监视热点新闻的变化，获取初始页的热点新闻数据
    hotNews: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.CurrentNews = newValue.slice(0, 4);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.institute {
  width: calc(100% - 250px);
  .el-tabs {
    margin: 20px;
  }
  // <!-- 热点新闻表格模块 -->
  .first {
    border: 1px solid #ccc;
    margin: 5px;
    height: 550px;
    overflow-y: auto;
    .first_top {
      position: relative;
      height: 300px;
      border-bottom: 1px solid #ccc;
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
            width: 100px;
            text-align: center;
            border-right: 1px solid #ccc;
            .num {
              padding: 0 8px 5px 8px;
              border-bottom: 1px solid #ccc;
            }
            .num:hover {
              color: red;
              border-bottom: 1px solid red;
            }
          }
          li:nth-child(2) {
            width: 250px;
            padding: 0 10px;
            text-align: center;
            border-right: 1px solid #ccc;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          li:nth-child(3) {
            flex: 1;
            text-align: center;
            text-indent: 1em;
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
            background: #ff6c72;
          }
        }
      }
      .head {
        border-top: none;
        background: #ccc;
        font-size: 18px;
      }
      .pagination {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .first_bottom {
      position: relative;
      margin: 10px 20px 20px 20px;
      .first-title {
        margin-bottom: 20px;
        input {
          width: 200px;
          outline: none;
          margin-top: 5px;
          font-size: 14px;
        }
      }
      textarea {
        margin-top: 5px;
        outline: none;
        font-size: 14px;
        text-indent: 2em;
        padding: 10px;
      }
      .first-request {
        position: absolute;
        bottom: 0;
        left: 630px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 5px 10px;
        font-size: 13px;
        background: skyblue;
        color: white;
      }
      .first-request:active {
        background: #545c64;
      }
    }
  }
  // <!-- 专业变更表格 -->
  .second {
    border: 1px solid #ccc;
    margin: 5px;
    height: 550px;
    .first_top {
      height: 400px;
      overflow-y: auto;
      border-bottom: 1px solid #ccc;
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
            width: 200px;
            text-align: center;
            border-right: 1px solid #ccc;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .admain {
            flex: 1;
          }
          .table_update,
          .table_detele,
          .table_recover {
            border: 1px solid #ccc;
            padding: 5px 15px;
            border-radius: 12px;
            margin: 0 5px;
            color: white;
            font-size: 12px;
          }
          .table_update:active,
          .table_detele:active,
          .table_recover:active {
            background: #545c64;
          }
          .table_update {
            background: skyblue;
          }
          .table_detele {
            background: #ff6c72;
          }
          .table_recover {
            background: greenyellow;
          }
          .green {
            color: greenyellow;
          }
          .red {
            color: #ff6c72;
          }
        }
      }
      .head {
        border-top: none;
        background: #ccc;
        font-size: 18px;
      }
    }
    .first_bottom {
      position: relative;
      margin: 10px 20px 20px 20px;
      .first-title {
        margin-bottom: 20px;
        input {
          width: 200px;
          outline: none;
          margin-top: 5px;
          font-size: 14px;
        }
      }
      .first-request {
        position: absolute;
        bottom: -5px;
        left: 280px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 5px 10px;
        font-size: 13px;
        background: skyblue;
        color: white;
      }
      .first-request:active {
        background: #545c64;
      }
    }
  }
  // <!-- 弹窗内容 -->
  .drawerContent {
    margin: 20px;
    h2 {
      text-align: center;
      margin-bottom: 50px;
      color: red;
    }
    .img {
      width: 500px;
      height: 335px;
      margin: 0 auto;
      img {
        display: block;
        width: 500px;
        height: 335px;
      }
    }
    p {
      margin-top: 30px;
      text-indent: 2em;
      border: 1px solid #ccc;
      padding: 10px;
    }
  }
  // 图片上传
  .upload-demo {
    width: 400px;
    margin-top: 30px;
    padding-bottom: 30px;
  }
}
</style>
