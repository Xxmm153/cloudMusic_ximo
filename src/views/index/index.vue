<!-- user:ximo -->
<!-- name:首页 -->
<!-- path:'/' -->
<template>
  <div
    class="h-[100vh] w-[100vw] bg-transparent flex justify-center items-center backdrop-filter-[blur(12px)] overflow-hidden"
  >
    <!-- 音乐容器 -->
    <div
      class="h-[95%] w-[85%] rounded-[16px] bg-card/30 border-border backdrop-filter-[blur(20px)] px-[15px] py-[10px] flex flex-col gap-[10px] border shadow overflow-hidden"
    >
      <!-- 头部 -->
      <div class="h-[6.5%] rounded-[12px] border shadow"><Title /></div>
      <!-- 内容 -->
      <div class="flex-1 flex gap-[15px] overflow-hidden">
        <!-- nav菜单 -->
        <div class="flex-1,5 rounded-[12px] border shadow overflow-hidden">
          <Nav />
        </div>
        <!-- 二级路由 -->
        <div class="flex-8 w-full overflow-hidden">
          <router-view></router-view>
        </div>
      </div>
      <!-- 播放控制器 -->
      <div class="h-[10%] rounded-[12px] border shadow overflow-hidden">
        <PalyCtrl />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//#region 引入import
import { ref, reactive } from "vue"; //引入vue
import Title from "@/views/components/index/title.vue"; //引入头部组件
import PalyCtrl from "@/views/components/index/palyCtrl.vue"; //引入播放器组件
import Nav from "@/views/components/index/nav.vue"; //引入菜单组件
//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
//#endregion 生命周期

//#region 事件函数
//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息
</script>
<style lang="scss" scoped>
* {
  font-family: "Ximo", "Aa喵不可言";
}
</style>
