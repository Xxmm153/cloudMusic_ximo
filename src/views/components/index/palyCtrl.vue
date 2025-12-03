<!-- user:ximo -->
<!-- name: 播放器控制条 -->
<!-- path:false -->
<template>
  <!-- 音乐播放控制条 -->
  <div class="h-full z-50 flex items-center px-4" @click="showDrawer">
    <!-- 背景渐变装饰 -->
    <!-- 歌曲信息区域 -->
    <div class="w-[240px] flex items-center gap-3 group">
      <!-- 封面图带有旋转动画 -->
      <div
        class="cursor-pointer w-12 h-12 rounded-md overflow-hidden shadow-lg bg-gray-700 flex items-center justify-center group relative"
      >
        <!-- 封面装饰效果 -->
        <div
          class="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
        />
        <div
          class="absolute inset-0 border border-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
        />

        <img
          src="https://p3-flow-sign.byteimg.com/tos-cn-i-ik7evvg4ik/supertask_file_39746626-6e4a-4c0a-bd11-8f81a9f13723?rk3s=4e0a0f58&x-expires=1752705409&x-signature=JxZSYh9b0QJn75%2F895Zt%2F4B1Ujw%3D"
          alt="歌曲封面"
          class="w-full h-full object-cover album-cover-animation"
        />
      </div>

      <!-- 歌曲信息 -->
      <div class="flex flex-col overflow-hidden">
        <div
          class="text-sm font-medium truncate group-hover:text-primary transition-colors"
        >
          爱太空
        </div>
        <div class="text-xs truncate transition-colors">周芷莹</div>
      </div>

      <!-- 收藏按钮 -->
      <Heart
        class="w-4 h-4 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12"
      />
    </div>

    <!-- 播放控制区域 -->
    <div class="flex-1 flex flex-col items-center justify-center px-4 relative">
      <!-- 播放状态装饰环 -->
      <div
        class="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl opacity-50"
      />

      <!-- 控制按钮 -->
      <div class="flex items-center gap-6 mb-2 relative z-10">
        <!-- 上一首按钮 -->
        <ChevronLeft
          class="w-5 h-5 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
        />

        <!-- 播放/暂停按钮 -->
        <button
          class="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary flex items-center justify-center text-white hover:scale-105 transition-all duration-300"
        >
          <!-- 播放图标带光晕效果 -->
          <div class="relative">
            <div class="absolute -inset-1 bg-white/20 rounded-full blur-sm" />
            <Play class="w-4 h-4 ml-0.5 relative z-10" />
          </div>
        </button>

        <!-- 下一首按钮 -->
        <ChevronRight
          class="w-5 h-5 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
        />
      </div>

      <!-- 进度条 -->
      <div class="flex items-center gap-2 w-full max-w-3xl">
        <span class="text-xs">03:13</span>

        <!-- 增强版进度条 -->
        <div
          class="flex-1 h-1.5 bg-gray-700/50 rounded-full overflow-hidden relative group cursor-pointer hover:bg-gray-700 transition-colors"
        >
          <!-- 背景装饰条纹 -->
          <div class="absolute inset-0 flex">
            <div
              v-for="i in 20"
              :key="i"
              class="flex-1 h-full bg-gray-600/10 border-r border-gray-500/10"
            />
          </div>

          <!-- 已播放部分带发光效果 -->
          <div
            class="absolute left-0 top-0 h-full w-[50%] bg-gradient-to-r from-primary primary to-primary rounded-full"
          >
            <!-- 播放状态动画指示器 -->
            <div
              class="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.8)] rounded-full animate-pulse"
              style="animation-duration: 0.8s"
            />
          </div>

          <!-- 进度指示器 -->
          <div
            class="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.6)] hover:scale-110"
          />
        </div>

        <span class="text-xs">05:14</span>
      </div>
    </div>

    <!-- 音量控制区域 -->
    <div class="w-[240px] flex items-center justify-end gap-4 relative">
      <!-- 重复播放按钮 -->
      <Repeat
        class="w-4 h-4 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12"
      />
      <!-- 右侧装饰元素 -->
      <div
        class="absolute -right-10 top-1/2 -translate-y-1/2 w-16 h-16 bg-pink-500/5 rounded-full blur-xl"
      />

      <!-- 播放列表按钮 -->
      <ListMusic
        class="w-4 h-4 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
      />

      <!-- 音量控制 -->
      <div class="flex items-center gap-2 group">
        <!-- 音量图标带光晕效果 -->
        <div class="relative">
          <div
            class="absolute -inset-1 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <VolumeX
            class="w-4 h-4 group-hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
          />
        </div>

        <!-- 音量滑块 -->
        <div
          class="w-[60px] h-1.5 bg-gray-700/50 rounded-full overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors relative"
        >
          <!-- 音量轨道装饰 -->
          <div class="absolute inset-0 flex">
            <div
              v-for="i in 10"
              :key="i"
              class="flex-1 h-full bg-gray-600/10 border-r border-gray-500/10"
            />
          </div>

          <!-- 音量填充 -->
          <div
            class="h-full w-1/3 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full relative overflow-hidden"
          >
            <!-- 音量填充内部的光效 -->
            <div
              class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Drawer v-model:open="isShowDrawer" class="absolute">
    <DrawerTrigger as-child> </DrawerTrigger>
    <DrawerContent class="size-full z-[999] !m-0 !max-h-[100%]">
      <div class="size-full relative" id="drawid">
        <div class="absolute size-full">
          <img
            src="../../../common/img/img4.png"
            alt=""
            class="object-cover size-full"
          />
        </div>
        <div
          class="absolute size-full z-50 bg-card/20 backdrop-blur-3xl flex flex-col"
        >
          <div class="h-14  flex items-center justify-between px-5">
            <div class="flex h-full items-center justify-center gap-4">
              <div
                class="border border-[#fff]/30 h-5/7 w-32 rounded-xl flex items-center justify-between px-3 text-sm bg-card/1 backdrop-blur-sm text-[#fff] hover:translate-y-[-1px] transition-all"
              >
                <div
                  class="hover:text-primary cursor-pointer hover:translate-y-[-1px] transition-all flex items-center"
                >
                 小      <ArrowDown class="size-[11px]" />
                </div>
                <div
                  class="hover:text-primary cursor-pointer hover:translate-y-[-1px] transition-all flex items-center"
                >
                 大    <ArrowUp class="size-[11px]" />
                </div>
                <div class="flex gap-2 items-center justify-center">
                  <div class="opacity-[0.3]">|</div>
                  <div
                    class="size-7 border border-[#fff]/30 rounded-lg flex justify-center items-center hover:text-primary cursor-pointer hover:text-primaryfont-bold transition-all"
                  >
                    <RefreshCcw class="size-[11px]" />
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-between border border-[#fff]/30 bg-card/1 rounded-xl w-40 h-5/7 backdrop-blur-sm px-4 text-white text-sm cursor-pointer hover:translate-y-[-1px] transition-all"
              >
                <div>5:20</div>
                <div class="flex items-center justify-center gap-0.5">
                  <div class="size-2 rounded-full bg-green-400"></div>
                  在线
                </div>
                <div class="flex items-center justify-center gap-0.5">
                  <SmartphoneCharging class="size-[11px]" /> 95%
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between h-full">
              <div
                class="cursor-pointer hover:translate-y-[-1px] hover:text-primary transition-all border border-card/30 bg-card/1 backdrop-blur-xl rounded-2xl h-5/7 px-5 flex items-center justify-center text-white text-sm flex items-center justify-center gap-0.5"
              >
                <HopOff class="size-[15px]" /> 自定义漂浮
              </div>
              <div
                class="cursor-pointer hover:translate-y-[-1px] hover:text-primary transition-all border border-card/30 bg-card/1 backdrop-blur-xl rounded-full size-8 flex items-center justify-center text-white font-bold ml-4"
                @click="showHeartAnimation"
              >
                <PartyPopper class="size-[15px]" />
              </div>
              <DrawerClose>
                  <div
                class="cursor-pointer hover:translate-y-[-1px] hover:text-primary transition-all border border-card/30 bg-card/1 backdrop-blur-xl rounded-full size-8 flex items-center justify-center text-white font-bold ml-4"
              >
                <ChevronDown class="size-[15px]" />
              </div>
              </DrawerClose>
            
            </div>
          </div>
          <div class="flex-1  flex">
            <div
              class="flex-4  p-6 flex flex-col items-center justify-center relative overflow-hidden"
            >
              <!-- 背景渐变效果 -->
              <div class="absolute inset-0 z-0"></div>

             

              <!-- 主要内容容器 -->
              <div
                class="relative z-10 flex flex-col items-center w-full max-w-sm"
              >
                <!-- 黑胶唱片区域 -->
                <div class="relative mb-8 flex flex-col items-center music">
                  <!-- 唱针 -->
                  <div
                    class="w-24 h-48 absolute -top-12 right-8 flex flex-col items-center z-20 rotate-310 zhen"
                    style="transform-origin: top"
                  >
                    <!-- 唱针杆 -->
                    <div class="w-2 h-36 bg-gray-700 rounded-full relative">
                      <!-- 连接点 -->
                      <div
                        class="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center"
                      >
                        <div class="w-3 h-3 rounded-full bg-gray-600"></div>
                      </div>
                    </div>
                    <!-- 唱头 -->
                    <div class="w-6 h-6 rounded-full bg-gray-600/90 mt-1"></div>
                  </div>

                  <!-- 黑胶唱片 -->
                  <div
                  id="so"
                    class="w-56 h-56 rounded-full bg-black shadow-2xl relative overflow-hidden animate-spin-slow song"
                  >
                    <!-- 唱片纹理 -->
                    <div
                      v-for="i in 12"
                      :key="i"
                      class="absolute inset-0 rounded-full border border-gray-800/50"
                      :style="{
                        width: `${100 - i * 6}%`,
                        height: `${100 - i * 6}%`,
                        top: `${i * 3}%`,
                        left: `${i * 3}%`,
                      }
                "
                    ></div>

                    <!-- 中心封面 -->
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <div
                        class="size-35 rounded-full overflow-hidden border-8 border-gray-900"
                      >
                        <img
                          src="../../../common/img/img2.png"
                          alt="歌曲封面"
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <!-- 中心圆点 -->
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <div
                        class="w-3 h-3 rounded-full bg-gray-700 border border-gray-600"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- 歌曲信息 -->
                <div class="text-center mb-6" id="user">
                  <h2 class="text-xl font-bold text-white mb-1">爱太空</h2>
                  <p class="text-green-300 text-sm">周芷莹</p>
                </div>

                <!-- 进度条 -->
                <div
                  class="w-full flex items-center justify-between mb-6 cursor-pointer"
                >
                  <span class="text-xs text-gray-400">00:00</span>
                  <div
                    class="flex-1 mx-3 h-1 bg-gray-700/50 rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full w-1/4 bg-primary"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-400">04:15</span>
                </div>

                <!-- 控制按钮 -->
                <div class="flex items-center justify-center gap-6">
                  <button
                  id="bu1"
                    class="w-9 h-9 bg-card/1 backdrop-blur-2xl rounded-full flex items-center justify-center text-white hover:text-white transition-colors"
                  >
                    <Shuffle  class="w-3 h-3" />
                  </button>
                  <button
                  id="bu2"
                    class="w-11 h-11 rounded-full flex items-center justify-center text-white hover:text-white transition-colors hover:text-primary cursor-pointer hover:translate-y-[-1px] transition-all flex items-center bg-card/1 backdrop-blur-2xl"
                  >
                    <ChevronLeft  class="w-5 h-5" />
                  </button>
                  <button
                  id="bu3"
                    class="hover:translate-y-[-1px] transition-all flex items-center bg-card/1 backdrop-blur-2xl w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 transition-all shadow-lg"
                  >
                    <Play  class="w-6 h-6 ml-1" />
                  </button>
                  <button
                  id="bu4"
                    class="hover:translate-y-[-1px] transition-all flex items-center bg-card/1 backdrop-blur-2xl w-11 h-11 rounded-full flex items-center justify-center text-white hover:text-white transition-colors"
                  >
                    <ChevronRight  class="w-5 h-5" />
                  </button>
                  <button
                   id="bu5"
                    class="hover:translate-y-[-1px] transition-all flex items-center bg-card/1 backdrop-blur-2xl w-9 h-9 rounded-full flex items-center justify-center text-white hover:text-white transition-colors"
                  >
                    <ListMusic class="w-3 h-3" />
                  </button>
                </div>

                <!-- 额外信息 -->
                <div class="mt-6 text-sm text-white flex gap-25 items-center">
                  <div class="flex items-center justify-center gap-1">
                    <div
                    id="showlinear1"
                      class=" mr-4 flex items-center justify-center gap-2 bg-card/1 backdrop-blur-2xl h-10 px-4 rounded-xl cursor-pointer hover:scale-[1.01] transition-all hover:text-primary"
                    >
                      <MessageSquareDot class="size-[12px]" />2468评论
                    </div>
                   
                    <div  id="showlinear2" class=" p-3 bg-card/1 backdrop-blur-2xl rounded-full cursor-pointer hover:scale-[1.01] transition-all hover:text-primary">
                      <Heart class="size-[16px]" />
                    </div>
                  </div>
                  <div id="showlinear3">
                    
                    <div  class=" flex items-center gap-2 group">
                      <!-- 音量图标带光晕效果 -->
                      <div class="relative">
                        <div
                          class="absolute -inset-1 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <VolumeX
                          class="w-4 h-4 group-hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
                        />
                      </div>

                      <!-- 音量滑块 -->
                      <div
                        class="w-[60px] h-1.5 bg-gray-700/50 rounded-full overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors relative"
                      >
                        <!-- 音量轨道装饰 -->
                        <div class="absolute inset-0 flex">
                          <div
                            v-for="i in 10"
                            :key="i"
                            class="flex-1 h-full bg-gray-600/10 border-r border-gray-500/10"
                          />
                        </div>

                        <!-- 音量填充 -->
                        <div
                          class="h-full w-1/3 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full relative overflow-hidden"
                        >
                          <!-- 音量填充内部的光效 -->
                          <div
                            class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-6 flex justify-center items-center text-xl text-white">
               暂无开发歌词
            </div>
          </div>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
//#region 引入import
import { ref, onMounted,watch, nextTick } from "vue"; //引入vue
import {
  MessageSquareDot,
  Heart,
  ChevronLeft,
  Play,
  ChevronRight,
  Repeat,
  VolumeX,
  ListMusic,
  ArrowDown,
  ArrowUp,
  RefreshCcw,
  SmartphoneCharging,
  ChevronDown,
  PartyPopper,
  HopOff,
  Shuffle,
} from "lucide-vue-next"; //引入lucide图标
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"; //引入抽屉组件
import { gsap } from "gsap";
//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
const isShowDrawer = ref(false);
// 从localStorage读取爱心显示状态，如果没有则默认为false
const isHeartEnabled = ref(localStorage.getItem('isHeartEnabled') === 'true'); 

// 监听爱心显示状态变化，保存到localStorage
watch(isHeartEnabled, (newValue) => {
  if (!newValue) {
    
  }
  localStorage.setItem('isHeartEnabled', newValue.toString());
  
});

watch(isShowDrawer, () => {
    if(isShowDrawer.value) {
      showGsap()//调用gsap
      // 正确地将localStorage中的字符串转换为布尔值
      isHeartEnabled.value = localStorage.getItem('isHeartEnabled') === 'true';
      console.log('爱心功能状态:', isHeartEnabled.value)
      
      // 使用nextTick确保DOM完全渲染后再执行
      nextTick(() => {
        // 如果爱心功能已启用，则自动显示爱心
        if(isHeartEnabled.value) {
          console.log('调用爱心动画函数')
          // 直接调用动画函数，传入false表示不切换状态
          showHeartAnimation(false);
        }
      });
    } else {
      // 弹窗关闭时清除定时器以避免内存泄漏
      if (window.heartAnimationInterval) {
        clearInterval(window.heartAnimationInterval);
        window.heartAnimationInterval = null;
      }
    }
  });
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
onMounted(() => {
})
//#endregion 生命周期

//#region 事件函数
//gsap动画
const showGsap = () => {
nextTick(()=>{
  // 修复语法错误并使用正确的缓动函数
  gsap.fromTo('#so', { scale: 0 }, { scale: 1.1, duration: 1, ease: "back.out(2)" })
  gsap.fromTo('#showlinear1', { scale: 0 }, { scale: 1, duration: 1 })
  gsap.fromTo('#showlinear2', { scale: 0 }, { scale: 1, duration: 1 })
  gsap.fromTo('#showlinear3', { scale: 0 }, { scale: 1, duration: 1 })
  gsap.fromTo('#user', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
  gsap.timeline()
    .fromTo('#bu5', { x:-100,opacity: 0  }, { x: 0, opacity: 1, duration: 0.3 })
    .fromTo('#bu4', { x:-100,opacity: 0  }, { x: 0, opacity: 1, duration: 0.3 })
    .fromTo('#bu3', { x:-100,opacity: 0  }, { x: 0, opacity: 1, duration: 0.3 })
    .fromTo('#bu2', { x:-100,opacity: 0  }, { x: 0, opacity: 1, duration: 0.3 })
    .fromTo('#bu1', { x:-100,opacity: 0  }, { x: 0, opacity: 1, duration: 0.3 })  
})
  
}

// 创建爱心漂浮动画
// toggleState: 是否切换状态（用户点击时）
function showHeartAnimation(toggleState = true) {
  // 只有在用户点击时才切换状态，通过watch自动保存到localStorage
  if (toggleState) {
    isHeartEnabled.value = !isHeartEnabled.value;
  }
  
  // 如果关闭爱心功能，则清除现有的动画和定时器
  if (!isHeartEnabled.value) {
    if (window.heartAnimationInterval) {
      clearInterval(window.heartAnimationInterval);
      window.heartAnimationInterval = null;
    }
    
    // 移除所有爱心元素
    const container = document.getElementById('drawid');
    if (container) {
      const hearts = container.querySelectorAll('div');
      hearts.forEach(heart => {
        if (heart.innerHTML === '❤') {
          heart.remove();
        }
      });
    }
    return;
  }
  
  // 获取drawid容器
  const container = document.getElementById('drawid');
  if (!container) return;
  
  // 清除可能存在的旧定时器
  if (window.heartAnimationInterval) {
    clearInterval(window.heartAnimationInterval);
  }
  
  // 移除之前可能存在的爱心元素
  const existingHearts = container.querySelectorAll('div');
  existingHearts.forEach(heart => {
    if (heart.innerHTML === '❤') {
      heart.remove();
    }
  });
  
  // 设置定时器持续生成爱心
  let isActive = true;
  let heartCount = 0;
  
  // 立即生成第一批爱心，间隔时间增加到500ms
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      if (isActive && isHeartEnabled.value) {
        createHeart(container, () => isActive && isHeartEnabled.value);
      }
    }, i * 500);
  }
  
  // 设置间隔生成新爱心，间隔时间增加到1000ms
  window.heartAnimationInterval = setInterval(() => {
    if (isActive && isHeartEnabled.value) {
      createHeart(container, () => isActive && isHeartEnabled.value);
      heartCount++;
      
      // 最多生成50个爱心，避免性能问题
      if (heartCount > 50) {
        isActive = false;
        clearInterval(window.heartAnimationInterval);
        // 30秒后重置计数器，允许再次点击生成
        setTimeout(() => {
          heartCount = 0;
        }, 30000);
      }
    }
  }, 2000); // 每2000毫秒生成一个新爱心
}

// 爱心动画函数，改为外部函数以确保正确调用
function createHeart(container, isActiveChecker) {
  const heart = document.createElement('div');
  heart.innerHTML = '❤';
  
  // 设置基础样式
  Object.assign(heart.style, {
    position: 'absolute',
    color: '#ff4757',
    fontSize: `${Math.random() * 16 + 16}px`,
    left: `${Math.random() * 100}%`,
    bottom: '-20px',
    opacity: '0',
    pointerEvents: 'none',
    zIndex: '1000',
    fontWeight: 'bold'
  });
  
  container.appendChild(heart);
  
  // 动画持续时间设置为15-20秒，与用户要求保持一致
  const duration = 20000 - Math.random() * 5000;
  const startTime = Date.now();
  
  function animate() {
    // 检查动画是否仍应继续
    if (!isActiveChecker()) {
      // 如果动画不再激活，清理元素
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
      return;
    }
    
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // 缓动函数 - 使用线性缓动
    const easeProgress = progress;
    
    // 计算当前位置 - 从容器底部向上漂浮
    const currentY = -easeProgress * (container.offsetHeight + 20);
    
    // 计算透明度变化 - 保持持续可见
    const currentOpacity = 1;
    
    // 计算缩放和旋转
    const currentScale = 0.5 + easeProgress * 0.5;
    const currentRotation = Math.sin(progress * Math.PI * 3) * 20;
    
    // 应用样式
    heart.style.transform = `translateY(${currentY}px) scale(${currentScale}) rotate(${currentRotation}deg)`;
    heart.style.opacity = currentOpacity.toString();
    
    // 动画结束处理
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // 动画结束后，清理并移除爱心元素
      setTimeout(() => {
        if (heart.parentNode) {
          try {
            heart.parentNode.removeChild(heart);
          } catch (e) {
            // 忽略DOM操作可能的错误
          }
        }
        // 只有当动画仍在激活状态时才创建新爱心
        if (isActiveChecker() && Math.random() > 0.3) { // 70%概率生成新爱心
          setTimeout(() => {
            if (isActiveChecker()) {
              createHeart(container, isActiveChecker);
            }
          }, 500);
        }
      }, 100);
    }
  }
  
  // 开始动画
  requestAnimationFrame(animate);
}
// 显示歌词弹窗
const showDrawer = () => {
  isShowDrawer.value = true;
};
//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息
</script>
<style lang="scss" scoped>
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
  0%,
  100% {
    box-shadow: 0 0 15px var(--primary);
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

/* 添加黑胶唱片旋转动画 */
// .animate-spin-slow {
//   animation: spin-slow 20s linear infinite;
// }

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 背景光效动画 */
.absolute.-top-20 {
  animation: pulse-glow 6s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
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

/* 唱针动画效果 */
.w-24.h-48.absolute {
  transition: transform 0.5s ease;
}

.music:hover .zhen {
  transform: rotate(5deg);
  cursor: pointer;
}
.music:hover .song {
  cursor: pointer;
}
/* 黑胶唱片交互效果 */
.w-56.h-56.rounded-full.bg-black {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease;
}

.w-56.h-56.rounded-full.bg-black:hover {
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}
</style>
















