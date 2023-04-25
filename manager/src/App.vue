<template>
  <div id="app">
    <Hander v-show="!$route.meta.isNewPage" />
    <div class="main">
      <Aside v-show="!$route.meta.isNewPage" />
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<script>
import Hander from "./components/Header.vue";
import Aside from "./components/Aside.vue";
export default {
  name: "App",
  components: {
    Hander,
    Aside,
  },
};
</script>

<style>
.main {
  position: relative;
  width: 100%;
  height: 100%;
}
.content {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
