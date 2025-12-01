<!-- user:ximo -->
<!-- name: 播放器控制条 -->
<!-- path:false -->
<template>
 <!-- 音乐播放控制条 -->
    <div class=" h-full z-50 flex items-center px-4 ">
      <!-- 背景渐变装饰 -->
      <!-- 歌曲信息区域 -->
      <div class="w-[240px] flex items-center gap-3 group">
        <!-- 封面图带有旋转动画 -->
        <div class="w-10 h-10 rounded-md overflow-hidden shadow-lg bg-gray-700 flex items-center justify-center group relative">
          <!-- 封面装饰效果 -->
          <div class="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
          <div class="absolute inset-0 border border-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
          
          <img 
            src="https://p3-flow-sign.byteimg.com/tos-cn-i-ik7evvg4ik/supertask_file_39746626-6e4a-4c0a-bd11-8f81a9f13723?rk3s=4e0a0f58&x-expires=1752705409&x-signature=JxZSYh9b0QJn75%2F895Zt%2F4B1Ujw%3D" 
            alt="歌曲封面" 
            class="w-full h-full object-cover album-cover-animation"
          />
        </div>
        
        <!-- 歌曲信息 -->
        <div class="flex flex-col overflow-hidden">
          <div class=" text-sm font-medium truncate group-hover:text-primary transition-colors">爱太空</div>
          <div class=" text-xs truncate  transition-colors">周芷莹</div>
        </div>
        
        <!-- 收藏按钮 -->
        <Heart class="w-4 h-4  hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
      </div>

      <!-- 播放控制区域 -->
      <div class="flex-1 flex flex-col items-center justify-center px-4 relative">
        <!-- 播放状态装饰环 -->
        <div class="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl opacity-50" />
        
        <!-- 控制按钮 -->
        <div class="flex items-center gap-6 mb-2 relative z-10">
          
          <!-- 上一首按钮 -->
          <ChevronLeft class="w-5 h-5  hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110" />
          
          <!-- 播放/暂停按钮 -->
          <button class="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary flex items-center justify-center text-white hover:scale-105 transition-all duration-300 ">
            <!-- 播放图标带光晕效果 -->
            <div class="relative">
              <div class="absolute -inset-1 bg-white/20 rounded-full blur-sm" />
              <Play class="w-4 h-4 ml-0.5 relative z-10" />
            </div>
          </button>
          
          <!-- 下一首按钮 -->
          <ChevronRight class="w-5 h-5  hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110" />
          
        </div>

        <!-- 进度条 -->
        <div class="flex items-center gap-2 w-full max-w-3xl">
          <span class="text-xs ">03:13</span>
          
          <!-- 增强版进度条 -->
          <div class="flex-1 h-1.5 bg-gray-700/50 rounded-full overflow-hidden relative group cursor-pointer hover:bg-gray-700 transition-colors">
            <!-- 背景装饰条纹 -->
            <div class="absolute inset-0 flex">
              <div v-for="i in 20" :key="i" class="flex-1 h-full bg-gray-600/10 border-r border-gray-500/10" />
            </div>
            
            <!-- 已播放部分带发光效果 -->
            <div class="absolute left-0 top-0 h-full w-[50%] bg-gradient-to-r from-primary primary to-primary rounded-full ">
              <!-- 播放状态动画指示器 -->
              <div class="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.8)] rounded-full animate-pulse" style="animation-duration: 0.8s" />
            </div>
            
            <!-- 进度指示器 -->
            <div class="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.6)] hover:scale-110" />
          </div>
          
          <span class="text-xs ">05:14</span>
        </div>
      </div>

      <!-- 音量控制区域 -->
      <div class="w-[240px] flex items-center justify-end gap-4 relative">
        <!-- 重复播放按钮 -->
        <Repeat class="w-4 h-4  hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
        <!-- 右侧装饰元素 -->
        <div class="absolute -right-10 top-1/2 -translate-y-1/2 w-16 h-16 bg-pink-500/5 rounded-full blur-xl" />
        
        <!-- 播放列表按钮 -->
        <ListMusic class="w-4 h-4  hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110" />
        
        <!-- 音量控制 -->
        <div class="flex items-center gap-2 group">
          <!-- 音量图标带光晕效果 -->
          <div class="relative">
            <div class="absolute -inset-1 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <VolumeX class="w-4 h-4  group-hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110" />
          </div>
          
          <!-- 音量滑块 -->
          <div class="w-[60px] h-1.5 bg-gray-700/50 rounded-full overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors relative">
            <!-- 音量轨道装饰 -->
            <div class="absolute inset-0 flex">
              <div v-for="i in 10" :key="i" class="flex-1 h-full bg-gray-600/10 border-r border-gray-500/10" />
            </div>
            
            <!-- 音量填充 -->
            <div class="h-full w-1/3 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full relative overflow-hidden">
              <!-- 音量填充内部的光效 -->
              <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang='ts'>

//#region 引入import
import { ref, reactive } from 'vue'//引入vue
import { Heart, ChevronLeft, Play, ChevronRight, Repeat, VolumeX, ListMusic } from 'lucide-vue-next'//引入lucide图标
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
/* 播放器控制条动画 */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 专辑封面旋转动画 */
@keyframes rotateAlbum {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 轻微脉冲效果 */
@keyframes subtlePulse {
  0%, 100% {
    box-shadow: 0 0 15px var(--primary)
  }
  50% {
    box-shadow: 0 0 20px var(--primary-hover);
  }
}

/* 应用动画 */
.fixed.bottom-0 {
  animation: slideUp 0.3s ease-out forwards;
}

.album-cover-animation {
  animation: rotateAlbum 20s linear infinite;
  transform-origin: center;
}

/* 播放按钮脉冲效果 */
.w-8.h-8.bg-gradient-to-r {
  animation: subtlePulse 2s ease-in-out infinite;
}

/* 所有图标悬停时的颜色过渡 */
.Shuffle,
.ChevronLeft,
.ChevronRight,
.Repeat,
.ListMusic,
.VolumeX,
.Heart {
  transition: all 0.3s ease;
}

/* 进度条增强效果 */
.group:hover .bg-gray-700\/50 {
  background-color: #4b5563;
}

/* 按钮交互增强 */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* 阴影效果增强 */
.fixed.bottom-0 {
  backdrop-filter: blur(10px);
}

</style>