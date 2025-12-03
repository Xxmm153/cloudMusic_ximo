<!-- user:ximo -->
<!-- name:card组件 -->
<!-- path:false -->
<template>
  <div class="card relative overflow-hidden h-[100%] w-[100%] bg-card/30 rounded-[12px] shrink-0 shadow p-[10px] backdrop-blur-2xl hover:translate-y-[-7px] transition-all duration-400">
      <div class="w-full h-[80%] border rounded overflow-hidden">
        <img class="w-full h-[100%] object-cover transition duration-400" src="../../../common/img/img.png" alt="">
      </div>
      <div class="h-[20%] flex-col justify-center mt-2">
        <div class="text-[13px] line-clamp-1">站内收藏超千万的欧美热曲安利</div>
        <div class="text-[13px] ">31首歌曲</div>
      </div>
      <div class="flex justify-center items-center bg-[rgba(0,0,0,0.2)] size-full absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-400">
        <div class="size-[40px] rounded-xl bg-card/70 flex justify-center items-center">
           <Play/>
        </div>  
      </div>
  </div>
</template>

<script setup lang='ts'>

//#region 引入import
import { ref, reactive } from 'vue'//引入vue
import {Play} from 'lucide-vue-next'//引入lucide-vue图标库
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
<style lang='scss' scoped>
// >div:hover {
//   -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3));
//   mask: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3));
// }
.card:hover img{
  transform: scale(1.05);
}
</style>