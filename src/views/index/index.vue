<template>
  <div class="h-[100vh] w-[100vw] bg-transparent flex justify-center items-center backdrop-filter-[blur(12px)] overflow-hidden">
    <!-- 音乐容器 -->
    <div
       id="drawerid"
      class=" h-[95%] w-[85%] rounded-[16px] bg-card/70 border-border backdrop-filter-[blur(20px)] px-[15px] py-[10px] flex flex-col gap-[10px] border overflow-hidden shadow-lg"
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
// 引入
import { ref } from "vue";
import Title from "@/views/components/index/title.vue";
import PalyCtrl from "@/views/components/index/palyCtrl.vue";
import Nav from "@/views/components/index/nav.vue";


// 响应式数据

// 事件函数

</script>

<style lang="scss">

</style>
