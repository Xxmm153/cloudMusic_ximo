<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- 高强度明显动画效果 -->
    <div class="fixed inset-0 -z-10">
      <!-- 中央主要动画圆圈 - 超高对比度脉冲 -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#8b5cf6] rounded-full blur-3xl" style="animation: pulse-primary 3s ease-in-out infinite;"></div>
      
      <!-- 右上浮动圆圈 - 超大幅度快速移动 -->
      <div class="absolute top-[10%] right-[10%] w-[800px] h-[800px] bg-[#ec4899] rounded-full blur-3xl" style="animation: float-primary 4s ease-in-out infinite;"></div>
      
      <!-- 左下浮动圆圈 - 超大幅度快速移动 -->
      <div class="absolute bottom-[10%] left-[10%] w-[750px] h-[750px] bg-[#a855f7] rounded-full blur-3xl" style="animation: float-secondary 3s ease-in-out infinite;"></div>
      
      <!-- 新增强烈动态元素 -->
      <div class="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[#d946ef] rounded-full blur-3xl" style="animation: float-tertiary 3s ease-in-out infinite;"></div>
      <div class="absolute bottom-[20%] right-[20%] w-[550px] h-[550px] bg-[#f472b6] rounded-full blur-3xl" style="animation: pulse-secondary 2s ease-in-out infinite;"></div>
      
      <!-- 快速旋转元素 - 加速旋转 -->
      <div class="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-[#ef4444] rounded-full blur-2xl" style="animation: rotate-float 4.5s linear infinite;"></div>
      <div class="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-[#3b82f6] rounded-full blur-2xl" style="animation: rotate-float-reverse 8.2s linear infinite;"></div>
      
      <!-- 新增闪烁元素 -->
      <div class="absolute top-[40%] right-[15%] w-[300px] h-[300px] bg-[#10b981] rounded-full blur-3xl" style="animation: blink-flash 5.5s ease-in-out infinite;"></div>
      <div class="absolute bottom-[40%] left-[15%] w-[350px] h-[350px] bg-[#f59e0b] rounded-full blur-3xl" style="animation: blink-flash 8.8s ease-in-out infinite 0.3s;"></div>
    </div>
    
    <!-- 主要内容 -->
    <div class="relative z-10 ">
      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
/* * {
  font-family: 'Ximo';
  user-select: none;
  box-sizing: border-box;
} */
::-webkit-scrollbar{
  height: 3px;
  width: 3px;
}

/* 高强度明显动画关键帧 */
@keyframes pulse-primary {
  0%, 100% {
    opacity: 0.05;
    transform: scale(0.8) translate(-50%, -50%);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.5) translate(-50%, -50%);
  }
}

@keyframes pulse-secondary {
  0%, 100% {
    opacity: 0.08;
    transform: scale(0.7);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.8);
  }
}

@keyframes float-primary {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.1;
  }
  25% {
    transform: translate(-150px, 100px) rotate(20deg);
    opacity: 0.45;
  }
  50% {
    transform: translate(-120px, 200px) rotate(0deg);
    opacity: 0.55;
  }
  75% {
    transform: translate(80px, 100px) rotate(-20deg);
    opacity: 0.45;
  }
}

@keyframes float-secondary {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.12;
  }
  25% {
    transform: translate(150px, -120px) rotate(-20deg);
    opacity: 0.48;
  }
  50% {
    transform: translate(240px, -120px) rotate(0deg);
    opacity: 0.6;
  }
  75% {
    transform: translate(120px, 80px) rotate(20deg);
    opacity: 0.48;
  }
}

@keyframes float-tertiary {
  0%, 100% {
    transform: translate(0, 0) scale(0.9);
    opacity: 0.1;
  }
  25% {
    transform: translate(180px, 120px) scale(1.6);
    opacity: 0.45;
  }
  50% {
    transform: translate(120px, 240px) scale(2);
    opacity: 0.55;
  }
  75% {
    transform: translate(40px, 120px) scale(1.6);
    opacity: 0.45;
  }
}

/* 快速旋转动画 */
@keyframes rotate-float {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(0.9);
    opacity: 0.1;
  }
  25% {
    transform: translate(100px, 100px) rotate(90deg) scale(1.5);
    opacity: 0.4;
  }
  50% {
    transform: translate(200px, 0) rotate(180deg) scale(0.9);
    opacity: 0.1;
  }
  75% {
    transform: translate(100px, -100px) rotate(270deg) scale(1.5);
    opacity: 0.4;
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(0.9);
    opacity: 0.1;
  }
}

@keyframes rotate-float-reverse {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(0.8);
    opacity: 0.08;
  }
  25% {
    transform: translate(-100px, -100px) rotate(-90deg) scale(1.7);
    opacity: 0.38;
  }
  50% {
    transform: translate(-200px, 0) rotate(-180deg) scale(0.8);
    opacity: 0.08;
  }
  75% {
    transform: translate(-100px, 100px) rotate(-270deg) scale(1.7);
    opacity: 0.38;
  }
  100% {
    transform: translate(0, 0) rotate(-360deg) scale(0.8);
    opacity: 0.08;
  }
}

/* 新增闪烁动画 */
@keyframes blink-flash {
  0%, 100% {
    opacity: 0.05;
    transform: scale(0.6);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.7);
  }
}
</style>