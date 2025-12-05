<!-- user:ximo -->
<!-- name:卡片类型 -->
<!-- path:false -->
<template>
  <div class="w-full h-full relative rounded-xl overflow-hidden cardtwo">
      <img :src="(data.coverImgUrl?data.coverImgUrl:data.picUrl) + '?param=300y300'" alt="" class="object-cover absolute size-full hover:scale-[1.1] transition-all">
      <div class="absolute size-full  z-20 bg-transparent text-[0.75rem] px-2 py-1.5 flex flex-col justify-between text-white ">
         <div class="self-end px-1.5 py-0.5 bg-black/50 text-white rounded-full flex items-center gap-0.5"> <Headphones class="size-2.5"  /> {{formatCount(data.playCount)  }}</div>
         <div>
           <div class="line-clamp-2">{{  data.name}}</div>
           <div class="line-clamp-1" v-if="data.artists">{{  data.artists.map(e=>e.name).join('-')}}</div>
          <div class="text-white/80 flex items-center gap-0.5" v-if="data.trackCount"> <Music2 class="size-2.5" /> {{ formatCount( data.trackCount)}}首</div>
         </div>
      </div>
      <div class="absolute z-10 size-full bg-gradient-to-t from-black/60 to-black/2"></div>
      <div class="absolute z-30 size-full  bg-black/0 flex items-center justify-center hover:bg-black/20  group transition-all">
          <div class="size-9 rounded-full flex items-center hidden justify-center bg-card group-hover:flex">
            <Play class="size-4 text-primary" />
          </div>
      </div>
  </div>
</template>

<script setup lang='ts'>

//#region 引入import
import { ref, reactive } from 'vue'//引入vue
import { formatCount } from '@/utils'//引入工具
import {Headphones,Music2,Play} from 'lucide-vue-next'//引入图标
//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
  defineProps({
    data: {
        type:Object,
        default:()=>{}
    }
})
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
//#endregion 生命周期

//#region 事件函数
//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息

</script>
<style lang='scss' scoped>
.cardtwo:hover img{
  transform: scale(1.1);
  transition: 0.5s all;
}
</style>