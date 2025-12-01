<!-- user:ximo -->
<!-- name: 头部组件 -->
<!-- path:false -->
<template>
  <div class="size-full flex justify-between items-center px-[20px]">
      <!-- 容器 -->
      <div class=' h-full flex items-center gap-[10px]'>
        <!-- 左侧logo处 -->
         <!-- 图标 -->
          <!-- 随着主题颜色变换logo  繁体字体样式 -->
          <div class="iconfont icon-wangyi  text-primary" style="font-size:30px;"></div>
           <!-- 随着主题颜色变换logo  图标样式-->
          <!-- <div class="iconfont icon-wangyiyunyinle  text-primary" style="font-size:30px;"></div> -->
          <!-- 固定颜色logo -->
            <!-- <img :src="logoImage" alt="" class="h-[50%]"> -->
            <!-- 名称 -->
            <div class="text-[18px] font-bold">Ximo Muisc Player</div>
            <!-- 首页按钮 -->
            <Button variant="outline" size="sm" class="ml-[20px] h-[60%] text-[13px] hover:text-primary">
                首页
            </Button>
            <!-- 前进按钮 -->
             <Button variant="outline" size="sm"  class="h-[60%]  hover:text-primary">
               <ChevronLeft class="size-[13px]" />
            </Button>
            <!-- 回退按钮 -->
             <Button variant="outline" size="sm" class="h-[60%] hover:text-primary">
               <ChevronRight class="size-[13px]"/>
            </Button>
            <!-- 项目仓库按钮 -->
              <Button variant="outline" size="sm"  class="ml-[20px] gap-[5px] h-[60%] text-[13px] hover:text-primary" >
               <Github class="size-[12px]"/>项目仓库<ArrowUpRight class="size-[13px]"/>
            </Button>
         </div>
         <!-- 中间 -->
         <div class="flex-1 h-[100%] px-[80px] relative overflow-hidden">
             <!-- 你可以根据你的想象力再此填充一下中间空白如显示歌词/动画等 主包先空着 -->
          </div>
          <!-- 右侧输入框 登录 -->
         <div class="flex gap-[10px] h-full items-center">
            <!-- 收缩框 -->
            <InputGroup>
               <InputGroupInput  placeholder="搜索音乐、歌手、专辑..." />
               <InputGroupAddon>
                 <Search class="size-[13px]" />
               </InputGroupAddon>
            </InputGroup>
            <!-- 登录按钮 -->
            <Button variant="outline" size="sm" class="h-[60%] hover:text-primary" ><User class="size-[13px]" /><span class=" text-[13px]">登录</span></Button>
         </div>
    </div>
</template>

<script setup lang='ts'>

//#region 引入import
import { ref, reactive } from 'vue'//引入vue
import logoImage from '@/common/img/index/cloudMusic.svg'//引入logo
import {ChevronLeft,ChevronRight,Github,ArrowUpRight,User,Search} from 'lucide-vue-next'//使用lucide图标
import { Button } from '@/components/ui/button'//引入shadcn组件button
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'//引入shadcn组件input组组件
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
:deep(.border-input){
    height: 60%;
    font-size: 14px;
    input{
        font-size: 13px;
    }
}
/* 花朵精美动画效果 */
@keyframes bloom {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.05) rotate(2deg);
    opacity: 0.9;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-4px) rotate(2deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

</style>