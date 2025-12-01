<!-- user:ximo -->
<!-- name:导航菜单 -->
<!-- path:false -->
<template>
<nav class="w-full h-full  flex flex-col">
    <div class="flex-1 overflow-y-auto py-4 px-[10px]">
      <ul class="flex flex-col gap-[2px]">
        <!-- 首页 -->
        <li @click="routerGo('/')">
          <a  :class="{ 'bg-parimary-hover text-primary': !active }" class="flex items-center py-3 px-6  transition-colors group cursor-pointer hover:bg-parimary-hover rounded-[6px]">
            <Home class="w-5 h-5 mr-3  group-hover:text-primary" />
            <span class="text-[14px] group-hover:text-primary">首页</span>
          </a>
        </li>
        <!-- mv -->
        <li @click="routerGo('/mv')">
          <a  class="flex items-center py-3 px-6  transition-colors group cursor-pointer hover:bg-parimary-hover rounded-[6px]">
            <Video class="w-5 h-5 mr-3  group-hover:text-primary transition-colors" />
            <span class="text-[14px]  group-hover:text-primary">MV</span>
          </a>
        </li>
        <!-- 排行榜 -->
        <li @click="routerGo('/rankingList')">
          <a  class="flex items-center py-3 px-6    transition-colors group cursor-pointer hover:bg-parimary-hover rounded-[6px]">
            <BarChart3 class="w-5 h-5 mr-3  group-hover:text-primary transition-colors" />
            <span class="text-[14px]  group-hover:text-primary">排行榜</span>
          </a>
        </li>
        <!-- 搜索 -->
        <li @click="routerGo('/seach')">
          <a  class="flex items-center py-3 px-6    transition-colors group cursor-pointer hover:bg-parimary-hover rounded-[6px]">
            <Search class="w-5 h-5 mr-3  group-hover:text-primary transition-colors" />
            <span class="text-[14px]  group-hover:text-primary">搜索</span>
          </a>
        </li>
        <!-- 我的音乐 -->
        <li class="mt-6 mb-2 px-6">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">我的音乐</h3>
        </li>
        <!-- 最近播放 -->
        <li @click="routerGo('/recentlyPlayed')">
          <a  class="flex items-center py-3 px-6   hover: transition-colors group cursor-pointer hover:bg-parimary-hover rounded-[6px]">
            <Clock class="w-5 h-5 mr-3  group-hover:text-primary transition-colors" />
            <span class="text-[14px]  group-hover:text-primary">最近播放</span>
          </a>
        </li>
        <!-- 我喜欢的 -->
        <li @click="routerGo('/myLove')">
          <a class="flex items-center py-3 px-6   hover: transition-colors group cursor-pointer hover:bg-parimary-hover rounded-[6px]">
            <Heart class="w-5 h-5 mr-3  group-hover:text-primary transition-colors" />
            <span class="text-[14px] group-hover:text-primary">我喜欢的</span>
          </a>
        </li>
        <!-- 功能 -->
        <li class="mt-6 mb-2 px-6">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">功能</h3>
        </li>
        <!-- 设置 -->
        <li @click="routerGo('/set')">
          <a  class="flex items-center py-3 px-6   hover: transition-colors group cursor-pointer hover:bg-parimary-hover rounded-[6px]">
            <Settings class="w-5 h-5 mr-3  group-hover:text-primary transition-colors" />
            <span class="text-[14px] group-hover:text-primary">设置</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang='ts'>

//#region 引入import
import { ref, reactive } from 'vue'//引入vue
import {useRouter} from 'vue-router'//引入路由
import { Home, Video, BarChart3, Search, Clock, Heart, Settings } from 'lucide-vue-next'
//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
const router = useRouter()//使用路由router
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
//#endregion 生命周期

//#region 事件函数
//路由跳转
const routerGo=(path:string)=>{
  router.push(path)
}
//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息

</script>
<style lang='scss' scoped>

</style>