<template>
  <div class="feedBack">
    <div class="first">
      <!-- 反馈信息 -->
      <div class="first_top">
        <!-- 头部标题 -->
        <div class="head">
          <ul>
            <li>时间</li>
            <li>反馈用户</li>
            <li>联系方式</li>
            <li>反馈详情</li>
            <li>操作处理</li>
          </ul>
        </div>
        <!-- 下部遍历内容 -->
        <div
          class="table"
          v-for="(item, index) in CurrentfeedBack"
          :key="item.id"
        >
          <ul>
            <li>{{ item.time }}</li>
            <li>{{ item.name }}</li>
            <li>{{ item.phone }}</li>
            <li>{{ item.feedback_content }}</li>
            <li>
              <span
                class="table_update"
                @click="event_update(index)"
                type="primary"
                >查看</span
              >
              <span class="table_detele" @click="deleteFeedback(item.id)"
                >删除</span
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- 分页器模块 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="Math.ceil(feedback.length)"
          :page-size="10"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <!-- 弹窗内容 -->
      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false"
        :size="800"
      >
        <!-- 弹窗出的优秀学生内容展示 -->
        <div class="drawerContent">
          <div class="time">{{ nowFeedback.time }}</div>
          <div class="total">
            <div class="img">
              <div>反馈截图</div>
              <img :src="nowFeedback.photo" alt="暂无图片" />
            </div>
            <div class="item">
              <div class="title">反馈人</div>
              <div class="name">{{ nowFeedback.name }}</div>
            </div>
            <div class="item">
              <div class="title">预留号码</div>
              <div>{{ nowFeedback.phone }}</div>
            </div>
            <div class="context">
              <div class="title">反馈内容</div>
              <div class="bottom">{{ nowFeedback.feedback_content }}</div>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import date from "@/api/date";
export default {
  name: "FeedBack",
  data() {
    return {
      drawer: false,
      nowFeedback: {}, //当前弹窗展示的内容
      currentPage: 1, //当前页码数
      CurrentfeedBack: [], //当前页码的用户数据
    };
  },
  mounted() {
    //获取反馈信息
    this.$store.dispatch("getFeedback");
  },
  methods: {
    //调整弹窗的内容
    event_update(index) {
      this.drawer = true;
      this.nowFeedback = this.feedback[index];
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.CurrentfeedBack = this.feedback.slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
    },
    //删除反馈内容
    deleteFeedback(id) {
      this.$confirm("是否确定删除此反馈信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let result = await this.$store.dispatch("deleteFeedback", id);
            if (result) {
              alert(result);
              //获取反馈信息
              this.$store.dispatch("getFeedback");
              this.currentPage = 1;
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
    //从仓库中取出反馈内容
    feedback() {
      let result = this.$store.state.feedback.feedback;
      return result.map((item) => {
        item.time = date(Number(item.time));
        return item;
      });
    },
  },
  watch: {
    //监视反馈数据的变化，控制让分页器在页面加载完成显示内容
    feedback: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.CurrentfeedBack = newValue.slice(0,10);
      },
    },
  },
};
</script>
<style lang="less" scoped>
.feedBack {
  width: calc(100% - 250px);
  .first {
    position: relative;
    margin: 5px;
    height: 650px;
    .first_top {
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
            width: 150px;
            text-align: center;
            border-right: 1px solid #ccc;
            border-left: 1px solid #ccc;
          }
          li:nth-child(2) {
            width: 150px;
            text-align: center;
            border-right: 1px solid #ccc;
          }
          li:nth-child(3) {
            width: 150px;
            text-align: center;
            border-right: 1px solid #ccc;
          }
          li:nth-child(4) {
            flex: 1;
            text-align: center;
            text-indent: 2em;
            border-right: 1px solid #ccc;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          li:nth-child(5) {
            width: 200px;
            text-align: center;
            border-right: 1px solid #ccc;
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
    }
    // 分页器
    .pagination {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
    //弹窗内容
    .drawerContent {
      padding: 20px 50px;
      .time {
        text-align: center;
        font-size: 15px;
        margin-bottom: 20px;
      }
      .total {
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        .img {
          width: 500px;
          height: 330px;
          img {
            margin-top: 10px;
            width: 100%;
            height: 280px;
            text-align: center;
          }
        }
        .item {
          display: flex;
          margin-bottom: 10px;
          .title {
            width: 100px;
            text-align: center;
            margin-right: 20px;
          }
        }
        .context {
          .title {
            width: 100px;
            text-align: center;
            margin-bottom: 5px;
          }
          .bottom {
            margin-left: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 10px;
            background: #f5f5f5;
          }
        }
      }
    }
  }
}
</style>