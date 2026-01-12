<!-- user:ximo -->
<!-- name: 播放器控制条 -->
<!-- path:false -->
<template>
  <!-- 音乐播放控制条 -->
  <div class="h-full z-50 flex items-center px-4">
    <!-- 背景渐变装饰 -->
    <!-- 歌曲信息区域 -->
    <div class="w-60 flex items-center gap-3 group" @click="showDrawer">
      <!-- 封面图带有旋转动画 -->
      <div
        class="cursor-pointer size-13 rounded-md overflow-hidden shadow-lg bg-gray-700 flex items-center justify-center group relative"
      >
        <!-- 封面装饰效果 -->
        <div
          class="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
        />
        <div
          class="absolute inset-0 border border-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
        />

        <img
          :src="usePlaySetStore.getCurrentPlayMusicInfo.album.blurPicUrl"
          alt="歌曲封面"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- 歌曲信息 -->
      <div class="flex flex-col overflow-hidden">
        <div
          class="text-sm font-medium truncate group-hover:text-primary transition-colors"
        >
          {{ usePlaySetStore.getCurrentPlayMusicInfo.name }}
        </div>
        <div class="text-xs truncate transition-colors">
          {{
            usePlaySetStore.getCurrentPlayMusicInfo.artists
              .map((i) => i.name)
              .join("-")
          }}
        </div>
      </div>

      <!-- 收藏按钮 -->
      <!-- <Heart
        class="w-4 h-4 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12"
      /> -->
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
          @click.stop="usePlaySetStore.pre"
          class="w-5 h-5 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
        />

        <!-- 播放/暂停按钮 -->
        <button
          @click.stop="playMusic(true)"
          v-if="!usePlaySetStore.isPlay"
          class="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary flex items-center justify-center text-white hover:scale-105 transition-all duration-300"
        >
          <!-- 播放图标带光晕效果 -->
          <div class="relative">
            <div class="absolute -inset-1 bg-white/20 rounded-full blur-sm" />
            <Play class="w-4 h-4 ml-0.5 relative z-10" />
          </div>
        </button>
        <button
          @click.stop="playMusic(false)"
          v-else
          class="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary flex items-center justify-center text-white hover:scale-105 transition-all duration-300"
        >
          <!-- 播放图标带光晕效果 -->
          <div class="relative">
            <div class="absolute -inset-1 bg-white/20 rounded-full blur-sm" />
            <Pause class="w-4 h-4 ml-0.5 relative z-10" />
          </div>
        </button>

        <!-- 下一首按钮 -->
        <ChevronRight
          @click.stop="usePlaySetStore.next"
          class="w-5 h-5 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
        />
      </div>

      <!-- 进度条 -->
      <div class="flex items-center gap-2 w-full max-w-3xl">
        <span class="text-xs">{{ currentTimeFrommater }}</span>

        <!-- 增强版进度条 -->
        <div
          @click.stop="changeCurrentTime($event, 'linePlay')"
          class="linePlay flex-1 h-1.5 bg-gray-700/50 rounded-full overflow-hidden relative group cursor-pointer hover:bg-gray-700 transition-colors"
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
            :style="{ width: currentTransfromBlock + '%' }"
            class="absolute left-0 top-0 h-full bg-gradient-to-r from-primary primary to-primary rounded-full transition-all"
          >
            <!-- 播放状态动画指示器 -->
            <div
              class="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.8)] rounded-full animate-pulse"
              style="animation-duration: 0.8s"
            />
          </div>

          <!-- 进度指示器 -->
          <!-- <div
            class="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.6)] hover:scale-110"
          /> -->
        </div>

        <span class="text-xs">{{ duration }}</span>
      </div>
    </div>

    <!-- 音量控制区域 -->
    <div class="w-[240px] flex items-center justify-end gap-4 relative">
      <div @click.stop="changePlayMode" class="mt-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <!-- 重复播放按钮 -->
              <Repeat
                v-if="usePlaySetStore.sequence === 0"
                class="w-4 h-4 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
              <Shuffle
                v-else-if="usePlaySetStore.sequence === 1"
                class="w-4 h-4 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12"
              ></Shuffle>
              <Repeat1
                v-else
                class="w-4 h-4 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12"
              ></Repeat1
            ></TooltipTrigger>
            <TooltipContent>
              <p v-if="usePlaySetStore.sequence === 0">顺序播放</p>
              <p v-else-if="usePlaySetStore.sequence === 1">随机播放</p>
              <p v-else>循环播放</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <!-- 右侧装饰元素 -->
      <div
        class="absolute -right-10 top-1/2 -translate-y-1/2 w-16 h-16 bg-pink-500/5 rounded-full blur-xl"
      />

      <Popover>
        <PopoverTrigger @click.stop="">
          <ListMusic
            class="w-4 h-4 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
        /></PopoverTrigger>
        <PopoverContent
          class="w-[500px] mr-10 p-0 bg-popover/95 backdrop-blur-xl border-border/50 shadow-2xl"
          side="top"
          align="end"
        >
          <div class="flex flex-col h-[500px]">
            <!-- Header -->
            <div class="px-5 py-4 border-b border-border/10">
              <h3 class="font-bold text-lg mb-1">播放列表</h3>
              <div
                class="flex items-center justify-between text-xs text-muted-foreground"
              >
                <span>{{ usePlaySetStore.playList.length }} 首歌曲</span>
                <span>{{ totalDuration }}</span>
              </div>
            </div>

            <!-- Action Bar -->
            <div
              class="flex items-center gap-6 px-5 py-3 border-b border-border/10 text-sm select-none"
            >
              <div
                class="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                @click="toggleSelectAll"
              >
                <!-- Custom Checkbox -->
                <div
                  class="w-4 h-4 rounded border border-muted-foreground/50 flex items-center justify-center transition-colors"
                  :class="{
                    'bg-primary border-primary':
                      selectedList.length === usePlaySetStore.playList.length &&
                      usePlaySetStore.playList.length > 0,
                  }"
                >
                  <Check
                    v-if="
                      selectedList.length === usePlaySetStore.playList.length &&
                      usePlaySetStore.playList.length > 0
                    "
                    class="w-3 h-3 text-primary-foreground"
                  />
                </div>
                <span>全选</span>
              </div>

              <div class="h-4 w-[1px] bg-border/20"></div>

              <div
                class="flex items-center gap-2 cursor-pointer hover:text-destructive transition-colors"
                @click="deleteSelected"
              >
                <Trash2 class="w-4 h-4" />
                <span>删除</span>
              </div>
            </div>

            <!-- List -->
            <div class="flex-1 overflow-y-auto custom-scrollbar p-1">
              <div
                v-for="(item, index) in usePlaySetStore.playList"
                :key="item.id || index"
                class="group flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer select-none"
                :class="{ 'bg-muted/30': index === usePlaySetStore.playIndex }"
                @dblclick="playMusicItem(index)"
              >
                <!-- Checkbox -->
                <div
                  class="w-6 flex items-center justify-center"
                  @click.stop="toggleSelect(item.id)"
                >
                  <div
                    class="w-4 h-4 rounded border border-muted-foreground/30 flex items-center justify-center transition-colors group-hover:border-primary/50"
                    :class="{
                      'bg-primary border-primary': selectedList.includes(
                        item.id
                      ),
                    }"
                  >
                    <Check
                      v-if="selectedList.includes(item.id)"
                      class="w-3 h-3 text-primary-foreground"
                    />
                  </div>
                </div>

                <!-- Playing Indicator -->
                <div class="w-6 flex justify-center items-center">
                  <div
                    v-if="index === usePlaySetStore.playIndex"
                    class="text-primary animate-pulse"
                  >
                    <ListMusic class="w-4 h-4" />
                  </div>
                </div>

                <!-- Cover -->
                <div
                  class="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-muted shadow-sm"
                >
                  <img
                    :src="item.al?.picUrl || item.album?.blurPicUrl"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <!-- Info -->
                <div
                  class="flex-1 min-w-0 flex flex-col justify-center gap-0.5"
                >
                  <div
                    class="truncate text-sm font-medium"
                    :class="{
                      'text-primary': index === usePlaySetStore.playIndex,
                    }"
                  >
                    {{ item.name }}
                  </div>
                  <div class="truncate text-xs text-muted-foreground/70">
                    {{
                      (item.ar || item.artists)
                        ?.map((a: any) => a.name)
                        .join(" / ")
                    }}
                  </div>
                </div>

                <!-- Duration -->
                <div class="text-xs text-muted-foreground/50 font-mono">
                  {{ formatMsOrSecToMinutesSeconds(item.dt || 0, true) }}
                </div>
              </div>

              <div
                v-if="usePlaySetStore.playList.length === 0"
                class="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm"
              >
                <span>暂无播放歌曲</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <!-- 播放列表按钮 -->

      <!-- 音量控制 -->
      <div class="flex items-center gap-2 group">
        <!-- 音量图标带光晕效果 -->
        <div @click.stop="isHasVolumn" class="relative cursor-pointer">
          <div
            class="absolute -inset-1 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <Volume1
            v-if="!muted"
            class="w-4 h-4 group-hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
          ></Volume1>
          <VolumeX
            v-else
            class="w-4 h-4 group-hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
          />
        </div>

        <!-- 音量滑块 -->
        <div
          @click.stop="changeVolumn($event, 'volumn1')"
          class="volumn1 w-[60px] h-1.5 bg-gray-700/50 rounded-full overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors relative"
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
            :style="{
              width: volumnWitdh + '%',
            }"
            class="h-full bg-gradient-to-r from-gray-300 to-gray-100 rounded-full relative overflow-hidden"
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
            :src="usePlaySetStore.getCurrentPlayMusicInfo.album.blurPicUrl"
            alt=""
            class="object-cover size-full"
          />
        </div>
        <div
          class="absolute size-full z-50 bg-card/10 backdrop-blur-3xl flex flex-col"
        >
          <div class="h-14 flex items-center justify-between px-5">
            <div class="flex h-full items-center justify-center gap-4">
              <div
                class="border border-[#fff]/30 h-5/7 w-32 rounded-xl flex items-center justify-between px-3 text-sm bg-card/1 backdrop-blur-sm text-[#fff] hover:translate-y-[-1px] transition-all"
              >
                <div
                  class="hover:text-primary cursor-pointer hover:translate-y-[-1px] transition-all flex items-center"
                  @click="decreaseFontSize"
                >
                  小 <ArrowDown class="size-[11px]" />
                </div>
                <div
                  class="hover:text-primary cursor-pointer hover:translate-y-[-1px] transition-all flex items-center"
                  @click="increaseFontSize"
                >
                  大 <ArrowUp class="size-[11px]" />
                </div>
                <div class="flex gap-2 items-center justify-center">
                  <div class="opacity-[0.3]">|</div>
                  <div
                    class="size-7 border border-[#fff]/30 rounded-lg flex justify-center items-center hover:text-primary cursor-pointer hover:text-primaryfont-bold transition-all"
                    @click="resetFontSize"
                  >
                    <RefreshCcw class="size-[11px]" />
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-between border border-[#fff]/30 bg-card/1 rounded-xl w-40 h-5/7 backdrop-blur-sm px-4 text-white text-sm cursor-pointer hover:translate-y-[-1px] transition-all"
              >
                <div>{{ currentTimeStr }}</div>
                <div class="flex items-center justify-center gap-0.5">
                  <div
                    class="size-2 rounded-full"
                    :class="isOnline ? 'bg-green-400' : 'bg-red-400'"
                  ></div>
                  {{ isOnline ? "在线" : "离线" }}
                </div>
                <div class="flex items-center justify-center gap-0.5">
                  <component
                    :is="isCharging ? SmartphoneCharging : Battery"
                    class="size-[11px]"
                  />
                  {{ batteryLevel }}%
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between h-full">
              <div
                class="min-w-20 cursor-pointer hover:translate-y-[-1px] hover:text-primary transition-all border border-card/30 bg-card/1 backdrop-blur-xl rounded-2xl h-5/7 px-5 flex items-center justify-center text-white text-sm gap-0.5"
                @click="toggleCustomFloat"
              >
                <HopOff class="size-[15px]" />自定义漂浮:
                <span class="mt-0.5 ml-0.5">{{ customFloatText }}</span>
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
          <div class="flex-1 flex overflow-hidden">
            <div
              class="flex-4 p-6 flex flex-col items-center justify-center relative overflow-hidden"
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
                    class="w-24 h-48 absolute -top-12 right-8 flex flex-col items-center rotate-310 z-20 zhen"
                    style="transform-origin: top"
                    :class="{ zhen2: usePlaySetStore.isPlay }"
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
                    class="w-56 h-56 rounded-full bg-black shadow-2xl relative overflow-hidden song animate-spin-slow"
                    :style="{
                      animationPlayState: usePlaySetStore.isPlay
                        ? 'running'
                        : 'paused',
                    }"
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
                      }"
                    ></div>

                    <!-- 中心封面 -->
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <div
                        class="size-35 rounded-full overflow-hidden border-8 border-gray-900"
                      >
                        <img
                          :src="
                            usePlaySetStore.getCurrentPlayMusicInfo.album
                              .blurPicUrl
                          "
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
                  <h2 class="text-xl font-bold text-white mb-1">
                    {{ usePlaySetStore.getCurrentPlayMusicInfo.name }}
                  </h2>
                  <p class="text-green-300 text-sm font-bold">
                    {{
                      usePlaySetStore.getCurrentPlayMusicInfo.artists
                        .map((i) => i.name)
                        .join("-")
                    }}
                  </p>
                </div>

                <!-- 进度条 -->
                <div
                  @click.stop="changeCurrentTime($event, 'linePlay2')"
                  class="linePlay2 w-full flex items-center justify-between mb-6 cursor-pointer"
                >
                  <span class="text-xs text-gray-400">{{
                    currentTimeFrommater
                  }}</span>
                  <div
                    class="flex-1 mx-3 h-1 bg-gray-700/50 rounded-full overflow-hidden"
                  >
                    <div
                      :style="{ width: currentTransfromBlock + '%' }"
                      class="h-full bg-primary transition-all"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-400">{{ duration }}</span>
                </div>

                <!-- 控制按钮 -->
                <div class="flex items-center justify-center gap-6">
                  <button
                    @click.stop="changePlayMode"
                    id="bu1"
                    class="w-9 h-9 bg-card/30 backdrop-blur-2xl rounded-full flex items-center justify-center text-white hover:text-white transition-colors"
                  >
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <!-- 重复播放按钮 -->
                            <Repeat
                              v-if="usePlaySetStore.sequence === 0"
                              class="w-3 h-3 cursor-pointer transition-all duration-300" />
                            <Shuffle
                              v-else-if="usePlaySetStore.sequence === 1"
                              class="w-3 h-3 cursor-pointer transition-all duration-300"
                            ></Shuffle>
                            <Repeat1
                              v-else
                              class="w-3 h-3 cursor-pointer transition-all duration-300"
                            ></Repeat1
                          ></TooltipTrigger>
                          <TooltipContent>
                            <p v-if="usePlaySetStore.sequence === 0">
                              顺序播放
                            </p>
                            <p v-else-if="usePlaySetStore.sequence === 1">
                              随机播放
                            </p>
                            <p v-else>循环播放</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </button>
                  <button
                    @click.stop="usePlaySetStore.pre"
                    id="bu2"
                    class="w-11 h-11 rounded-full flex items-center justify-center text-white hover:text-white transition-colors hover:text-primary cursor-pointer hover:translate-y-[-1px] transition-all flex items-center bg-card/30 backdrop-blur-2xl"
                  >
                    <ChevronLeft class="w-5 h-5" />
                  </button>
                  <button
                    @click.stop="playMusic(true)"
                    v-if="!usePlaySetStore.isPlay"
                    id="bu3"
                    class="hover:translate-y-[-1px] transition-all flex items-center bg-card/30 backdrop-blur-2xl w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 transition-all shadow-lg"
                  >
                    <Play class="w-6 h-6 ml-1" />
                  </button>
                  <button
                    @click.stop="playMusic(false)"
                    v-else
                    id="bu3"
                    class="hover:translate-y-[-1px] transition-all flex items-center bg-card/30 backdrop-blur-2xl w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 transition-all shadow-lg"
                  >
                    <Pause class="w-6 h-6 ml-1" />
                  </button>
                  <button
                    @click.stop="usePlaySetStore.next"
                    id="bu4"
                    class="hover:translate-y-[-1px] transition-all flex items-center bg-card/30 backdrop-blur-2xl w-11 h-11 rounded-full flex items-center justify-center text-white hover:text-white transition-colors"
                  >
                    <ChevronRight class="w-5 h-5" />
                  </button>
                  <button
                    id="bu5"
                    class="hover:translate-y-[-1px] transition-all flex items-center bg-card/30 backdrop-blur-2xl w-9 h-9 rounded-full flex items-center justify-center text-white hover:text-white transition-colors"
                  >
                    <Popover>
                      <PopoverTrigger @click.stop="">
                        <ListMusic
                          class="w-4 h-4 hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
                      /></PopoverTrigger>
                      <PopoverContent
                        class="w-[500px] ml-150 p-0 bg-popover/95 backdrop-blur-xl border-border/50 shadow-2xl"
                        side="top"
                        align="end"
                      >
                        <div class="flex flex-col h-[500px]">
                          <!-- Header -->
                          <div class="px-5 py-4 border-b border-border/10">
                            <h3 class="font-bold text-lg mb-1">播放列表</h3>
                            <div
                              class="flex items-center justify-between text-xs text-muted-foreground"
                            >
                              <span
                                >{{
                                  usePlaySetStore.playList.length
                                }}
                                首歌曲</span
                              >
                              <span>{{ totalDuration }}</span>
                            </div>
                          </div>

                          <!-- Action Bar -->
                          <div
                            class="flex items-center gap-6 px-5 py-3 border-b border-border/10 text-sm select-none"
                          >
                            <div
                              class="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                              @click="toggleSelectAll"
                            >
                              <!-- Custom Checkbox -->
                              <div
                                class="w-4 h-4 rounded border border-muted-foreground/50 flex items-center justify-center transition-colors"
                                :class="{
                                  'bg-primary border-primary':
                                    selectedList.length ===
                                      usePlaySetStore.playList.length &&
                                    usePlaySetStore.playList.length > 0,
                                }"
                              >
                                <Check
                                  v-if="
                                    selectedList.length ===
                                      usePlaySetStore.playList.length &&
                                    usePlaySetStore.playList.length > 0
                                  "
                                  class="w-3 h-3 text-primary-foreground"
                                />
                              </div>
                              <span>全选</span>
                            </div>

                            <div class="h-4 w-[1px] bg-border/20"></div>

                            <div
                              class="flex items-center gap-2 cursor-pointer hover:text-destructive transition-colors"
                              @click="deleteSelected"
                            >
                              <Trash2 class="w-4 h-4" />
                              <span>删除</span>
                            </div>
                          </div>

                          <!-- List -->
                          <div
                            class="flex-1 overflow-y-auto custom-scrollbar p-1"
                          >
                            <div
                              v-for="(item, index) in usePlaySetStore.playList"
                              :key="item.id || index"
                              class="group flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer select-none"
                              :class="{
                                'bg-muted/30':
                                  index === usePlaySetStore.playIndex,
                              }"
                              @dblclick="playMusicItem(index)"
                            >
                              <!-- Checkbox -->
                              <div
                                class="w-6 flex items-center justify-center"
                                @click.stop="toggleSelect(item.id)"
                              >
                                <div
                                  class="w-4 h-4 rounded border border-muted-foreground/30 flex items-center justify-center transition-colors group-hover:border-primary/50"
                                  :class="{
                                    'bg-primary border-primary':
                                      selectedList.includes(item.id),
                                  }"
                                >
                                  <Check
                                    v-if="selectedList.includes(item.id)"
                                    class="w-3 h-3 text-primary-foreground"
                                  />
                                </div>
                              </div>

                              <!-- Playing Indicator -->
                              <div class="w-6 flex justify-center items-center">
                                <div
                                  v-if="index === usePlaySetStore.playIndex"
                                  class="text-primary animate-pulse"
                                >
                                  <ListMusic class="w-4 h-4" />
                                </div>
                              </div>

                              <!-- Cover -->
                              <div
                                class="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-muted shadow-sm"
                              >
                                <img
                                  :src="
                                    item.al?.picUrl || item.album?.blurPicUrl
                                  "
                                  class="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>

                              <!-- Info -->
                              <div
                                class="flex-1 min-w-0 flex flex-col justify-center gap-0.5"
                              >
                                <div
                                  class="truncate text-sm font-medium"
                                  :class="{
                                    'text-primary':
                                      index === usePlaySetStore.playIndex,
                                  }"
                                >
                                  {{ item.name }}
                                </div>
                                <div
                                  class="truncate text-xs text-muted-foreground/70"
                                >
                                  {{
                                    (item.ar || item.artists)
                                      ?.map((a: any) => a.name)
                                      .join(" / ")
                                  }}
                                </div>
                              </div>

                              <!-- Duration -->
                              <div
                                class="text-xs text-muted-foreground/50 font-mono"
                              >
                                {{
                                  formatMsOrSecToMinutesSeconds(
                                    item.dt || 0,
                                    true
                                  )
                                }}
                              </div>
                            </div>

                            <div
                              v-if="usePlaySetStore.playList.length === 0"
                              class="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm"
                            >
                              <span>暂无播放歌曲</span>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </button>
                </div>

                <!-- 额外信息 -->
                <div class="mt-6 text-sm text-white flex gap-25 items-center">
                  <div class="flex items-center justify-center gap-1">
                    <div
                      id="showlinear1"
                      class="mr-4 flex items-center justify-center gap-2 bg-card/1 backdrop-blur-2xl h-10 px-4 rounded-xl cursor-pointer hover:scale-[1.01] transition-all hover:text-primary"
                    >
                      <MessageSquareDot class="size-[12px]" />2468评论
                    </div>

                    <!-- <div
                      id="showlinear2"
                      class="p-3 bg-card/1 backdrop-blur-2xl rounded-full cursor-pointer hover:scale-[1.01] transition-all hover:text-primary"
                    > -->
                    <!-- <Heart class="size-[16px]" /> -->
                    <!-- </div> -->
                  </div>
                  <div id="showlinear3">
                    <div class="flex items-center gap-2 group">
                      <!-- 音量图标带光晕效果 -->
                      <div
                        class="relative cursor-pointer"
                        @click.stop="isHasVolumn"
                      >
                        <div
                          class="absolute -inset-1 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <Volume1
                          v-if="!muted"
                          class="w-4 h-4 group-hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
                        ></Volume1>
                        <VolumeX
                          v-else
                          class="w-4 h-4 group-hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
                        />
                      </div>

                      <!-- 音量滑块 -->
                      <div
                        @click.stop="changeVolumn($event, 'volumn2')"
                        class="volumn2 w-[60px] h-1.5 bg-gray-700/50 rounded-full overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors relative"
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
                          :style="{ width: volumnWitdh + '%' }"
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
            <div class="flex-6 flex justify-center items-center text-white">
              <div
                class="flex flex-col overflow-auto h-9/10 w-4/5 items-center gcClass"
              >
                <div class="h-1/2 shrink-0"></div>
                <div
                  class="w-full text-center flex items-center justify-center shrink-0 h-13 transition-all"
                  :class="{
                    'isActive !text-primary bg-parimary-hover font-bold rounded-lg':
                      isActive(i, index),
                  }"
                  :style="{
                    fontSize: isActive(i, index)
                      ? lyricFontSize + 4 + 'px'
                      : lyricFontSize + 'px',
                  }"
                  v-for="(i, index) in usePlaySetStore.currentLyric"
                >
                  {{ i[1] }}
                </div>
                <div class="h-1/2 shrink-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
  <audio
    :src="usePlaySetStore.getCurrentPlayMusic"
    :volume="volumn"
    ref="audioRef"
    :muted="muted"
    class=""
    style="visibility: hidden"
    @timeupdate="updateCurrentTime"
    @play="played"
    @ended="ended"
  ></audio>

  <!-- 自定义浮窗弹窗 -->
  <Dialog v-model:open="isCustomFloatDialogOpen">
    <DialogContent
      class="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-border/50"
    >
      <DialogHeader>
        <DialogTitle>自定义漂浮文本</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex items-center gap-4">
          <Input
            id="custom-float-text"
            v-model="tempCustomFloatText"
            class="col-span-3 bg-background/50"
            placeholder="请输入漂浮文本"
            @keyup.enter="saveCustomFloatText"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="isCustomFloatDialogOpen = false"
          >取消</Button
        >
        <Button @click="saveCustomFloatText">保存</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
//#region 引入import
import {
  ref,
  onMounted,
  watch,
  nextTick,
  useTemplateRef,
  computed,
  onUnmounted,
} from "vue"; //引入vue
import playSetStore from "@/store/palySet"; //引入播放设置商店
import { formatTimeToSeconds, formatMsOrSecToMinutesSeconds } from "@/utils"; //引入工具
import dayjs from "dayjs"; //引入dayjs
import {
  MessageSquareDot,
  ChevronLeft,
  Play,
  ChevronRight,
  Repeat,
  Repeat1,
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
  Pause,
  Volume1,
  Trash2,
  Check,
  Navigation,
  Battery,
} from "lucide-vue-next"; //引入lucide图标
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"; //引入抽屉组件
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; //引入工具提示组件
import { gsap } from "gsap";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; //引入弹出组件
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//#endregion 引入import
//#region 响应式数据 ref、reactive、watch、computed...
const audioRef = useTemplateRef<HTMLAudioElement | any>("audioRef");
const usePlaySetStore = playSetStore(); //使用store
const isShowDrawer = ref(false);
const currentTimeStr = ref<string>(dayjs().format("HH:mm")); //当前时间
const batteryLevel = ref<number>(100);
const isCharging = ref<boolean>(false);
const isOnline = ref<boolean>(navigator.onLine);
const currentTimeFrommater = ref<string>("00:00");
const isCustomFloatDialogOpen = ref(false);
const customFloatText = ref(localStorage.getItem("customFloatText") || "❤");
// 歌词字体大小设置
const DEFAULT_FONT_SIZE = 18;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 30;
const lyricFontSize = ref<number>(
  parseInt(
    localStorage.getItem("lyricFontSize") || DEFAULT_FONT_SIZE.toString()
  )
);
const tempCustomFloatText = ref("");
// 从localStorage读取爱心显示状态，如果没有则默认为false
const isHeartEnabled = ref(localStorage.getItem("isHeartEnabled") === "true");
const currentTime = ref<number>(0); //当前播放的时分秒
const currentTransfrom = ref<number>(
  JSON.parse(localStorage.getItem("currentTransfrom") || "{}")
    .currentTransfrom || 0
); //当前播放的进度条位置
const currentTransfromBlock = ref<number>(
  JSON.parse(localStorage.getItem("currentTransfromBlock") || "{}")
    .currentTransfromBlock || 0
); //当前播放的进度条位置百分比
const duration = ref<string>("00:00"); //当前音乐总时长
const volumn = ref<number>(
  JSON.parse(localStorage.getItem("volumn") || "{}").volumn || 0.1
); //当前音量
const volumnWitdh = ref<number>(
  JSON.parse(localStorage.getItem("volumn") || "{}").volumnWitdh || 0
); //当前音乐的音乐长度显示
const muted = ref<boolean>(false); //是否静音
watch(volumn, (newValue) => {
  console.log("newValue", newValue);
});
// 监听爱心显示状态变化，保存到localStorage
watch(isHeartEnabled, (newValue) => {
  if (!newValue) {
  }
  localStorage.setItem("isHeartEnabled", newValue.toString());
});
watch(isShowDrawer, () => {
  if (isShowDrawer.value) {
    showGsap(); //调用gsap
    // 正确地将localStorage中的字符串转换为布尔值
    isHeartEnabled.value = localStorage.getItem("isHeartEnabled") === "true";
    console.log("爱心功能状态:", isHeartEnabled.value);

    // 使用nextTick确保DOM完全渲染后再执行
    nextTick(() => {
      // 如果爱心功能已启用，则自动显示爱心
      if (isHeartEnabled.value) {
        console.log("调用爱心动画函数");
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

//监听播放
watch(
  () => usePlaySetStore.isPlay,
  (newValue) => {
    if (newValue) {
      audioRef.value.play();
    } else {
      audioRef.value.pause();
    }
  }
);

watch(currentTransfrom, () => {
  if (!document.querySelector(".gcClass")) return;
  // 歌词行高度为h-13(52px)，滚动到当前歌词居中位置
  const lyricLineHeight = 52; // h-13 in pixels
  const container = document.querySelector(".gcClass");
  if (container) {
    const scrollPosition = currentTransfrom.value * lyricLineHeight;
    container.scrollTop = Math.max(0, scrollPosition);
  }
});
//当前播放的时长来判断当前百分比
watch(currentTime, (newValue) => {
  if (!audioRef.value?.duration) return;
  currentTransfromBlock.value = Math.floor(
    (newValue / audioRef.value?.duration) * 100
  );
});
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
let timeInterval: any = null;
onMounted(() => {
  audioRef.value.currentTime =
    JSON.parse(localStorage.getItem("currentTransfromBlock") || "{}")
      .currentTime || 0;

  // 启动时间更新定时器
  timeInterval = setInterval(() => {
    currentTimeStr.value = dayjs().format("HH:mm");
  }, 1000);

  // 获取电池信息
  if ((navigator as any).getBattery) {
    (navigator as any).getBattery().then((battery: any) => {
      // 初始值
      batteryLevel.value = Math.floor(battery.level * 100);
      isCharging.value = battery.charging;

      // 监听变化
      battery.addEventListener("levelchange", () => {
        batteryLevel.value = Math.floor(battery.level * 100);
        console.log("电量改变: " + battery.level);
      });
      battery.addEventListener("chargingchange", () => {
        isCharging.value = battery.charging;
        console.log("充电状态改变: " + battery.charging);
      });
      battery.addEventListener("chargingtimechange", function () {
        console.log("完全充电需要时间: " + battery.chargingTime);
      });
      battery.addEventListener("dischargingtimechange", function () {
        console.log("完全放电需要时间: " + battery.dischargingTime);
      });
    });
  }

  // 监听在线状态
  window.addEventListener("online", () => {
    isOnline.value = true;
  });
  window.addEventListener("offline", () => {
    isOnline.value = false;
  });
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }
});
// 监听页面刷新事件
window.addEventListener("beforeunload", () => {
  usePlaySetStore.isPlay = false;
  console.log("页面刷新，停止播放");
});
//#endregion 生命周期

//#region 事件函数
//改变当前播放方式
const changePlayMode = () => {
  usePlaySetStore.toggleSequence();
};
//静音
const isHasVolumn = () => {
  muted.value = !muted.value;
};
//点击音乐
const changeVolumn = (e: any, element: string) => {
  const { left, width } = (
    document.querySelector(`.${element}`) as HTMLDivElement
  ).getBoundingClientRect();
  const clickX = e.clientX - left;
  const percent = (clickX / width) * 100;
  volumnWitdh.value = percent;
  volumn.value = (clickX / width) * 0.5; //音量范围0-0.5
  localStorage.setItem(
    "volumn",
    JSON.stringify({ volumn: volumn.value, volumnWitdh: volumnWitdh.value })
  );
  console.log(volumn.value, volumnWitdh.value);
};

// 切换自定义浮窗
const toggleCustomFloat = () => {
  tempCustomFloatText.value = customFloatText.value;
  isCustomFloatDialogOpen.value = true;
};

// 保存自定义浮窗文本
const saveCustomFloatText = () => {
  customFloatText.value = tempCustomFloatText.value;
  localStorage.setItem("customFloatText", customFloatText.value);
  isCustomFloatDialogOpen.value = false;
};

// 字体大小调整函数
const increaseFontSize = () => {
  if (lyricFontSize.value < MAX_FONT_SIZE) {
    lyricFontSize.value += 2;
    localStorage.setItem("lyricFontSize", lyricFontSize.value.toString());
  }
};

const decreaseFontSize = () => {
  if (lyricFontSize.value > MIN_FONT_SIZE) {
    lyricFontSize.value -= 2;
    localStorage.setItem("lyricFontSize", lyricFontSize.value.toString());
  }
};

const resetFontSize = () => {
  lyricFontSize.value = DEFAULT_FONT_SIZE;
  localStorage.setItem("lyricFontSize", lyricFontSize.value.toString());
};

// 播放列表相关逻辑
const selectedList = ref<string[]>([]); // 存储选中歌曲的ID

// 切换选中状态
const toggleSelect = (id: string) => {
  const index = selectedList.value.indexOf(id);
  if (index === -1) {
    selectedList.value.push(id);
  } else {
    selectedList.value.splice(index, 1);
  }
};

// 全选/取消全选
const toggleSelectAll = () => {
  if (
    selectedList.value.length === usePlaySetStore.playList.length &&
    usePlaySetStore.playList.length > 0
  ) {
    selectedList.value = [];
  } else {
    selectedList.value = usePlaySetStore.playList.map((item: any) => item.id);
  }
};

// 删除选中
const deleteSelected = () => {
  if (selectedList.value.length === 0) return;
  // 过滤掉选中的歌曲
  const newPlayList = usePlaySetStore.playList.filter(
    (item: any) => !selectedList.value.includes(item.id)
  );
  // 更新store
  usePlaySetStore.playList = newPlayList;
  // 清空选中
  selectedList.value = [];
  ended();
  // 简单的边界处理：如果列表为空，停止播放
  if (newPlayList.length === 0) {
    usePlaySetStore.isPlay = false;
    usePlaySetStore.currentMusicUrl = "";
    usePlaySetStore.playIndex = 0;
  } else if (usePlaySetStore.playIndex >= newPlayList.length) {
    usePlaySetStore.playIndex = 0;
  }
};

// 播放列表总时长
const totalDuration = computed(() => {
  const totalMs = usePlaySetStore.playList.reduce(
    (acc: number, cur: any) => acc + (cur.dt || 0),
    0
  );
  return formatMsOrSecToMinutesSeconds(totalMs, true);
});

// 播放指定歌曲
const playMusicItem = async (index: number) => {
  usePlaySetStore.playIndex = index;
  await usePlaySetStore.fetchCurrentMusicUrl();
  usePlaySetStore.isPlay = true;
};

//点击进度条
const changeCurrentTime = (e: any, linePlay: string) => {
  const { left, width } = (
    document.querySelector(`.${linePlay}`) as HTMLDivElement
  )?.getBoundingClientRect();
  const clickX = e.clientX - left;
  currentTransfromBlock.value = Math.floor((clickX / width) * 100);
  audioRef.value.currentTime = audioRef.value?.duration * (clickX / width);
  localStorage.setItem(
    "currentTransfromBlock",
    JSON.stringify({
      currentTransfromBlock: currentTransfromBlock.value,
      currentTransfrom: currentTransfrom.value,
      currentTime: audioRef.value?.duration * (clickX / width),
    })
  );
};
//播放开始
const played = () => {};
// 播放完毕后
const ended = () => {
  // 确保 audioRef 存在且已加载
  if (!audioRef.value) return;

  // 根据播放模式决定下一首逻辑
  if (usePlaySetStore.sequence === 0) {
    // 列表循环：自动下一首
    usePlaySetStore.next();
  } else if (usePlaySetStore.sequence === 1) {
    // 随机播放：随机下一首
    usePlaySetStore.random();
  } else {
    // 单曲循环：重置当前时间并继续播放
    audioRef.value.currentTime = 0;
  }
};
//isActive
const isActive = (i: any, index: number) => {
  if (
    index == usePlaySetStore.currentLyric.length - 1 &&
    currentTime.value * 1000 >= formatTimeToSeconds(i[0])
  ) {
    return true;
  }
  if (
    currentTime.value * 1000 > formatTimeToSeconds(i[0]) &&
    currentTime.value * 1000 <
      formatTimeToSeconds(usePlaySetStore.currentLyric[index + 1][0])
  ) {
    return true;
  }
  return false;
};
//音频播放中动画
const updateCurrentTime = (e) => {
  duration.value = formatMsOrSecToMinutesSeconds(
    audioRef.value?.duration,
    false
  );
  currentTime.value = audioRef.value?.currentTime;
  currentTimeFrommater.value = formatMsOrSecToMinutesSeconds(
    audioRef.value?.currentTime,
    false
  );
  if (!isShowDrawer.value) return;
  currentTransfrom.value = Array.from(
    document.querySelector(".gcClass")?.children
  ).findIndex((i: any) => {
    return i == document.querySelector(".isActive");
  });
};
//播放动画
const playMusic = (status: boolean) => {
  usePlaySetStore.isPlay = status;
};
//gsap动画
const showGsap = () => {
  nextTick(() => {
    // 修复语法错误并使用正确的缓动函数
    gsap.fromTo(
      "#so",
      { scale: 0 },
      { scale: 1.1, duration: 1, ease: "back.out(2)" }
    );
    gsap.fromTo("#showlinear1", { scale: 0 }, { scale: 1, duration: 1 });
    gsap.fromTo("#showlinear2", { scale: 0 }, { scale: 1, duration: 1 });
    gsap.fromTo("#showlinear3", { scale: 0 }, { scale: 1, duration: 1 });
    gsap.fromTo(
      "#user",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap
      .timeline()
      .fromTo(
        "#bu5",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3 }
      )
      .fromTo(
        "#bu4",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3 }
      )
      .fromTo(
        "#bu3",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3 }
      )
      .fromTo(
        "#bu2",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3 }
      )
      .fromTo(
        "#bu1",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3 }
      );
  });
};

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

    // 移除所有漂浮元素
    const container = document.getElementById("drawid");
    if (container) {
      const hearts = container.querySelectorAll(".floating-item");
      hearts.forEach((heart) => {
        heart.remove();
      });
    }
    return;
  }

  // 获取drawid容器
  const container = document.getElementById("drawid");
  if (!container) return;

  // 清除可能存在的旧定时器
  if (window.heartAnimationInterval) {
    clearInterval(window.heartAnimationInterval);
  }

  // 移除之前可能存在的漂浮元素
  const existingHearts = container.querySelectorAll(".floating-item");
  existingHearts.forEach((heart) => {
    heart.remove();
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

      // 移除爱心数量限制，允许持续生成爱心
      // 如果需要限制数量，可以在这里添加新的逻辑
    }
  }, 4000); // 每2000毫秒生成一个新爱心
}

// 爱心动画函数，改为外部函数以确保正确调用
function createHeart(container, isActiveChecker) {
  const heart = document.createElement("div");
  heart.innerHTML = customFloatText.value || "❤";
  heart.classList.add("floating-item");

  // 随机起始位置 (0-95% 避免太靠右)
  const startLeft = Math.random() * 95;

  // 随机颜色 (如果用户没有指定自定义文字，使用红色系；如果有自定义文字，使用随机亮色)
  const colors =
    customFloatText.value && customFloatText.value !== "❤"
      ? [
          "#ff4757",
          "#2ed573",
          "#1e90ff",
          "#ffa502",
          "#a55eea",
          "#ff6b81",
          "#00d2d3",
          "#54a0ff",
        ]
      : ["#ff4757", "#ff6b81", "#ff7f50", "#fd79a8"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // 设置基础样式
  Object.assign(heart.style, {
    position: "absolute",
    color: color,
    fontSize: `${Math.random() * 16 + 16}px`,
    left: `${startLeft}%`,
    bottom: "-30px", // 从更低处开始
    opacity: "0",
    pointerEvents: "none",
    zIndex: "1000",
    fontWeight: "bold",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)", // 添加阴影
    willChange: "transform, opacity", // 性能优化
  });

  container.appendChild(heart);

  // 动画参数
  const duration = 15000 + Math.random() * 10000; // 15-25秒
  const startTime = Date.now();

  // 摇摆参数
  const swayAmplitude = 30 + Math.random() * 50; // 摇摆幅度
  const swayFrequency = 2 + Math.random() * 3; // 摇摆频率
  const swayPhase = Math.random() * Math.PI * 2; // 随机初始相位

  function animate() {
    // 检查动画是否仍应继续
    if (!isActiveChecker()) {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
      return;
    }

    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // 计算当前位置 - 上升
    const currentY = -progress * (container.offsetHeight + 100);

    // 计算横向摇摆 - 正弦波运动
    const currentX =
      Math.sin(progress * Math.PI * swayFrequency + swayPhase) * swayAmplitude;

    // 计算透明度 - 淡入淡出
    let currentOpacity = 1;
    if (progress < 0.1) {
      currentOpacity = progress * 10; // 前10%淡入
    } else if (progress > 0.8) {
      currentOpacity = (1 - progress) * 5; // 后20%淡出
    }

    // 计算缩放和旋转
    const currentScale = 0.8 + Math.sin(progress * Math.PI * 2) * 0.2; // 轻微呼吸效果
    const currentRotation = Math.sin(progress * Math.PI * 2 + swayPhase) * 15; // 轻微摆动旋转

    // 应用样式
    heart.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale}) rotate(${currentRotation}deg)`;
    heart.style.opacity = currentOpacity.toString();

    // 动画结束处理
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // 动画结束后，清理并移除爱心元素
      if (heart.parentNode) {
        try {
          heart.parentNode.removeChild(heart);
        } catch (e) {
          // 忽略DOM操作可能的错误
        }
      }
      // 递归生成逻辑
      if (isActiveChecker() && Math.random() > 0.3) {
        setTimeout(() => {
          if (isActiveChecker()) {
            createHeart(container, isActiveChecker);
          }
        }, 500);
      }
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
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
  /* 初始状态为暂停 */
  animation-play-state: paused;
}

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
.zhen2 {
  transform: rotate(30deg);
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
