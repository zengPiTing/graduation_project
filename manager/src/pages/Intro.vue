<template>
  <div class="intro">
    <div class="container">
      <!-- 学院简介模块 -->
      <div class="school">
        <div class="title">学院简介</div>
        <p>
          智能科学与工程学院由原信息工程学院、新材料与机电工程学院合并组建，主要承担本科生与研究生教育教学管理工作，以卓越工程师教育为目标，以创新链、产业链为主导，以工程技术研发和工程应用创新能力培养为核心，创新人才培养机制，全面提升应用型、创新性复合人才培养质量。学院现开设电气工程及其自动化（湖北省一流专业建设点、荆楚卓越工程师计划、湖北省战略性产业人才培养计划项目、湖北省高校专业综合试点改革项目）、计算机科学与技术（国家一流专业建设点、“十二五”湖北省重点培育学科）、智能制造工程、信息安全、电子信息工程、物理学（湖北省一流专业建设点)等6个本科专业，并具有信息安全和弹性体材料先进制造2个二级学术硕士学位授权点、能源动力（电气工程）和电子信息2个一级专业硕士学位授权点。现有在校普通本科学生2408人，研究生145人。
        </p>
      </div>
      <!-- 平台简介模块 -->
      <div class="terrace">
        <div class="title">平台简介</div>
        <p>
          本后台系统为本科生导师双向自主选择小程序后台管理系统，该小程序主要用于方便湖北民族大学智能科学与工程学院本科生导师制度的实行。让老师与学生可以在线上认识了解对方，实现线上交互，并且方便管理人员管理相关数据。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IntroName",
};
</script>
<style lang="less" scoped>
.intro {
  width: calc(100vw - 250px);
  background: url("@/assets/image/bj.jpg") no-repeat top left;
  background-size: cover;
  .container {
    width: 80%;
    margin: 0 auto;
  }
  .school {
    width: 600px;
    height: 300px;
    margin: 20px 0 0 50px;
    border: 1px solid #ebebeb;
    box-shadow: 2px 2px 5px 3px #ccc;
    background: #000;
    opacity: 0.5;
    color: white;
    p {
      text-indent: 2em;
      padding: 5px;
    }
  }
  .terrace {
    width: 600px;
    height: 300px;
    margin: 30px 0 0 150px;
    border: 1px solid #ebebeb;
    box-shadow: 2px 2px 5px 3px #ccc;
    background: #000;
    opacity: 0.5;
    color: white;
    p {
      text-indent: 2em;
      padding: 5px;
    }
  }
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 30px;
    border-bottom: 1px solid white;
    font-weight: 700;
  }
}
</style>