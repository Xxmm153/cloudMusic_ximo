<!-- user:ximo -->
<!-- name:首页二级直接显示 -->
<!-- path:/home -->
<template>
  <!-- home content -->
  <div class="size-full overflow-auto flex flex-col gap-[10px] pr-[10px]">
    <!-- 轮播 -->
    <div class="flex w-full h-[42%] gap-[10px]">
      <div class="w-[50%] h-full pl-[20px]">
        <!-- 轮播图 -->
        <div class="w-full h-full overflow-hidden shrink-0 relative">
          <Carousel
            class="w-full h-full pl-[20px] relative"
            :plugins="[plugin]"
            @mouseenter="plugin.stop"
            @mouseleave="
              [plugin.reset(), plugin.play(), console.log('Running')]
            "
          >
            <div
              class="imground absolute z-50 right-[5%] top-[50%] translate-y-[-50%] bg-card/20 backdrop-blur-xl p-[10px] rounded-full"
            >
              <div
                class="size-[110px] bg-primary rounded-full flex justify-center items-center"
              >
                <img :src="music" alt="" class="size-[60px]" />
              </div>
            </div>
            <!-- 音乐符号动画 -->
            <div
              class="music-note music-note-1 text-red-500 absolute z-[100] text-3xl"
            >
              ♪
            </div>
            <div
              class="music-note music-note-2 text-blue-400 absolute z-[100] text-2xl"
            >
              ♫
            </div>
            <div
              class="music-note music-note-3 text-green-400 absolute z-[100] text-xl"
            >
              ♬
            </div>
            <div
              class="music-note music-note-4 text-yellow-400 absolute z-[100] text-2xl"
            >
              ♭
            </div>
            <div
              class="music-note music-note-5 text-purple-400 absolute z-[100] text-3xl"
            >
              ♯
            </div>
            <CarouselContent class="w-full h-full">
              <CarouselItem
                class="w-full h-full cursor-pointer"
                v-for="(i, index) in bannerData"
                :key="index"
              >
                <div class="p-1 w-full h-full">
                  <Card class="w-full h-full bg-card/30 backdrop-blur-2xl p-0">
                    <CardContent
                      class="aspect-square w-full h-full p-0 relative"
                    >
                      <!-- <div
                        class="absolute top-[50%] left-[5%] translate-y-[-50%] text-[#fff] flex flex-col gap-[20px]"
                      >
                        <div class="text-2xl font-bold title">{{ i.typeTitle }}</div>
                        <div class="more">为你推荐新的精彩内容</div>
                        <div
                          class="but w-[120px] h-[40px] text-primary bg-[#ffffffd9] border border-primary rounded-[6px] shadow flex justify-center items-center"
                        >
                          立即播放
                        </div>
                      </div> -->
                         <div
                          class="absolute bottom-1 left-1 but w-25 h-8 text-primary bg-card/60  backdrop-blur-2xl border border-primary rounded-full shadow flex justify-center items-center"
                        >
                          {{ i.typeTitle }}
                        </div>
                      <a :href="i.url">
                        <img
                        :src="i.bigImageUrl"
                        alt=""
                        class="object-cover size-full opacity-[1] rounded-2xl"
                      />
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <!-- <CarouselPrevious /> -->
            <!-- <CarouselNext /> -->
          </Carousel>
        </div>
      </div>
      <div
        class="w-[50%] h-full border rounded-2xl p-[10px] bg-card/20 backdrop-blur-sm flex flex-col"
      >
        <div class="flex justify-between items-center pb-[5px]">
          <h3 class="font-bold text-lg">
            <span class="text-primary font-bold">下午好</span> ，猜你最近喜欢听
          </h3>
        </div>
        <div class="flex flex-col gap-[10px] flex-1 overflow-auto">
          <div class="grid grid-cols-2 gap-[10px] h-full">
            <div
              class="h-[100%] relative rounded-xl overflow-hidden cursor-pointer group transition-all"
            >
              <img
                src="https://picsum.photos/id/20/200/200"
                alt="歌单"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-all"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-[10px]"
              >
                <span class="text-white text-sm truncate">歌单</span>
              </div>
            </div>
            <div
              class="h-[100%] relative rounded-xl overflow-hidden cursor-pointer group transition-all"
            >
              <img
                src="https://picsum.photos/id/26/200/200"
                alt="歌单"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-all"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-[10px]"
              >
                <span class="text-white text-sm truncate">歌单</span>
              </div>
            </div>
            <div
              class="h-[100%] relative rounded-xl overflow-hidden cursor-pointer group transition-all"
            >
              <img
                src="https://picsum.photos/id/28/200/200"
                alt="歌单"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-all"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-[10px]"
              >
                <span class="text-white text-sm truncate">歌单</span>
              </div>
            </div>
            <div
              class="h-[100%] relative rounded-xl overflow-hidden cursor-pointer group transition-all"
            >
              <img
                src="https://picsum.photos/id/29/200/200"
                alt="歌单"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-all"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-[10px]"
              >
                <span class="text-white text-sm truncate">歌单</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 精选推荐 -->
    <div class="pl-[20px] font-bold">
      <span class="iconfont icon-bofanggedan text-primary"></span> 精选推荐
    </div>
    <div class="h-[40%] w-full shrink-0 flex gap-[5px] ml-[20px]">
      <Carousel class="relative w-full group overflow-visible">
        <CarouselContent class="h-[100%] w-[100%]">
          <CarouselItem
            class="h-[100%] w-full cursor-pointer flex grid grid-cols-7 grid-rows-1"
            v-for="(_, index) in 2"
            :key="index"
          >
            <div class="p-1 h-[100%] w-[100%]" v-for="i in 7">
              <card></card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          class="left-[5px] hidden group-hover:inline-block group-hover:flex group-hover:items-center size-[35px] text-primary"
        />
        <CarouselNext
          class="right-[20px] hidden group-hover:inline-block group-hover:flex group-hover:items-center size-[35px] text-primary"
        />
      </Carousel>
    </div>
    <!-- 热门歌单 -->
    <div class="pl-[20px] font-bold">
      <span class="iconfont icon-bofanggedan text-primary"></span> 热门歌单
    </div>
    <div class="h-[40%] w-full shrink-0 flex gap-[5px] ml-[20px]">
      <Carousel class="relative w-full group overflow-visible">
        <CarouselContent class="h-[100%] w-[100%]">
          <CarouselItem
            class="h-[100%] w-full cursor-pointer flex grid grid-cols-7 grid-rows-1"
            v-for="(_, index) in 2"
            :key="index"
          >
            <div class="p-1 h-[100%] w-[100%]" v-for="i in 7">
              <card></card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          class="left-[5px] hidden group-hover:inline-block group-hover:flex group-hover:items-center size-[35px] text-primary"
        />
        <CarouselNext
          class="right-[20px] hidden group-hover:inline-block group-hover:flex group-hover:items-center size-[35px] text-primary"
        />
      </Carousel>
    </div>
    <!-- 榜单竞选 -->
    <div class="pl-[20px] font-bold mb-[10px]">
      <span class="iconfont icon-bofanggedan text-primary"></span> 榜单竞选
    </div>
    <div class="grid grid-cols-2 gap-[10px] pl-[20px] mb-[20px]">
      <!-- 飙升榜 -->
      <div
        class="border rounded-xl p-[10px] bg-card/20 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
      >
        <div class="flex justify-between items-center mb-[10px]">
          <div class="flex items-center gap-[5px]">
            <div
              class="w-[20px] h-[20px] rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold"
            >
              榜
            </div>
            <h3 class="font-bold">飙升榜</h3>
          </div>
          <span class="text-xs text-gray-400">刚刚更新</span>
        </div>
        <div class="space-y-[8px] flex gap-[10px]">
          <div class="w-[15%] relative">
            <div
              class="border rounded-xl size-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            ></div>
            <div
              class="border rounded-xl w-full h-[80%] absolute left-[50%] top-[20%] translate-x-[-40%]"
            ></div>
            <div
              class="border rounded-xl w-full h-[50%] absolute left-[50%] top-[50%] translate-x-[-30%]"
            ></div>
          </div>
          <div class="flex-1 pl-[1px]">
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-500">1</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  Shower - Rapeter
                </div>
              </div>
              <div class="text-xs text-green-500">新</div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-400">2</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  我要搞摇滚 - 孙天宇/蒋易/土豆
                </div>
              </div>
              <div class="text-xs text-green-500">新</div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-300">3</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  Zoo (From "Zootopia 2")
                </div>
              </div>
              <div class="text-xs text-red-500 flex items-center">
                <svg
                  class="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 新歌榜 -->
      <div
        class="border rounded-xl p-[10px] bg-card/20 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
      >
        <div class="flex justify-between items-center mb-[10px]">
          <div class="flex items-center gap-[5px]">
            <div
              class="w-[20px] h-[20px] rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold"
            >
              榜
            </div>
            <h3 class="font-bold">新歌榜</h3>
          </div>
          <span class="text-xs text-gray-400">刚刚更新</span>
        </div>
        <div class="space-y-[8px] flex gap-[10px]">
          <div class="w-[15%] relative">
            <div
              class="border rounded-xl size-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            ></div>
            <div
              class="border rounded-xl w-full h-[80%] absolute left-[50%] top-[20%] translate-x-[-40%]"
            ></div>
            <div
              class="border rounded-xl w-full h-[50%] absolute left-[50%] top-[50%] translate-x-[-30%]"
            ></div>
          </div>
          <div class="flex-1 pl-[1px]">
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-500">1</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  Shower - Rapeter
                </div>
              </div>
              <div class="text-xs text-green-500">新</div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-400">2</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  我要搞摇滚 - 孙天宇/蒋易/土豆
                </div>
              </div>
              <div class="text-xs text-green-500">新</div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-300">3</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  Zoo (From "Zootopia 2")
                </div>
              </div>
              <div class="text-xs text-red-500 flex items-center">
                <svg
                  class="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 热歌榜 -->
      <div
        class="border rounded-xl p-[10px] bg-card/20 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
      >
        <div class="flex justify-between items-center mb-[10px]">
          <div class="flex items-center gap-[5px]">
            <div
              class="w-[20px] h-[20px] rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold"
            >
              榜
            </div>
            <h3 class="font-bold">热歌榜</h3>
          </div>
          <span class="text-xs text-gray-400">刚刚更新</span>
        </div>
        <div class="space-y-[8px] flex gap-[10px]">
          <div class="w-[15%] relative">
            <div
              class="border rounded-xl size-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            ></div>
            <div
              class="border rounded-xl w-full h-[80%] absolute left-[50%] top-[20%] translate-x-[-40%]"
            ></div>
            <div
              class="border rounded-xl w-full h-[50%] absolute left-[50%] top-[50%] translate-x-[-30%]"
            ></div>
          </div>
          <div class="flex-1 pl-[1px]">
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-500">1</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  Shower - Rapeter
                </div>
              </div>
              <div class="text-xs text-green-500">新</div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-400">2</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  我要搞摇滚 - 孙天宇/蒋易/土豆
                </div>
              </div>
              <div class="text-xs text-green-500">新</div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-300">3</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  Zoo (From "Zootopia 2")
                </div>
              </div>
              <div class="text-xs text-red-500 flex items-center">
                <svg
                  class="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 原创榜 -->
      <div
        class="border rounded-xl p-[10px] bg-card/20 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
      >
        <div class="flex justify-between items-center mb-[10px]">
          <div class="flex items-center gap-[5px]">
            <div
              class="w-[20px] h-[20px] rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold"
            >
              榜
            </div>
            <h3 class="font-bold">原创榜</h3>
          </div>
          <span class="text-xs text-gray-400">每周四更新</span>
        </div>
        <div class="space-y-[8px] flex gap-[10px]">
          <div class="w-[15%] relative">
            <div
              class="border rounded-xl size-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            ></div>
            <div
              class="border rounded-xl w-full h-[80%] absolute left-[50%] top-[20%] translate-x-[-40%]"
            ></div>
            <div
              class="border rounded-xl w-full h-[50%] absolute left-[50%] top-[50%] translate-x-[-30%]"
            ></div>
          </div>
          <div class="flex-1 pl-[1px]">
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-500">1</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  Shower - Rapeter
                </div>
              </div>
              <div class="text-xs text-green-500">新</div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-400">2</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  我要搞摇滚 - 孙天宇/蒋易/土豆
                </div>
              </div>
              <div class="text-xs text-green-500">新</div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
            <div
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-300">3</div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                >
                  Zoo (From "Zootopia 2")
                </div>
              </div>
              <div class="text-xs text-red-500 flex items-center">
                <svg
                  class="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-[20px] h-[20px] rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门单曲 -->
    <div class="pl-[20px] font-bold">
      <span class="iconfont icon-remen text-primary"></span>热门单曲
    </div>
    <div
      class="h-[70%] bg-card/30 backdrop-blur-2xl border shrink-0 !w-[calc(100%-20px)] ml-[20px] overflow-auto rounded-[12px] shadow"
    >
      <Table>
        <TableHeader class="h-[40px]">
          <TableRow>
            <TableCell class="w-1">#</TableCell>
            <TableCell class="">标题</TableCell>
            <TableCell class="w-[20%]">作者</TableCell>
            <TableCell class="w-[20%]">专辑</TableCell>
            <TableCell class="w-[20%]">时长</TableCell>
            <TableCell class="w-[10%]">喜欢</TableCell>
            <TableCell class="w-[10%]"></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(i, index) in tableData"
            :key="i"
            class="hover:bg-parimary-hover h-[60px] cursor-pointer group"
          >
            <TableCell>{{ index + 1 }}</TableCell>
            <TableCell class="flex items-center gap-[5px]">
              <img
                src="../../common/img/img.png"
                class="size-[40px] object-cover rounded"
                alt=""
              />
              <div>{{ i.title }}</div>
            </TableCell>
            <TableCell>{{ i.author }}</TableCell>
            <TableCell>{{ i.album }}</TableCell>
            <TableCell>{{ i.time }}</TableCell>
            <TableCell
              ><Heart
                class="size-[15px] hover:scale-[1.1] transition-all hover:text-primary"
              />
            </TableCell>
            <TableCell>
              <div
                class="size-full gap-[10px] hidden group-hover:block group-hover:flex"
              >
                <Info
                  class="size-[15px] hover:scale-[1.1] transition-all hover:text-primary"
                />
                <Play
                  class="size-[15px] hover:scale-[1.1] transition-all hover:text-primary"
                />
                <ArrowDownToLine
                  class="size-[15px] hover:scale-[1.1] transition-all hover:text-primary"
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div class="h-[10px]"></div>
  </div>

</template>

<script setup lang="ts">
//#region 引入import
import { ref, onMounted, nextTick } from "vue"; //引入vue
import Autoplay from "embla-carousel-autoplay"; //引入自动播放插件
import { Card, CardContent } from "@/components/ui/card"; //引入card组件
import card from "@/views/components/home/card.vue"; //card组件
import { Heart, ArrowDownToLine, Play, Info } from "lucide-vue-next"; //引入lucide-vue图标库
import { gsap } from "gsap";//引入gsap
import { homeapi } from '@/api'//引入api
import music from "@/common/img/home/music.svg";
import type {getBannerParamsDataListType,getBannerParamsDataType} from '@/api/type'//引入api的类型
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; //tabel组件
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; //引入轮播图

const plugin = Autoplay({
  delay: 3000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});
//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
const bannerData=ref<getBannerParamsDataListType[]>()//当前轮播图的数据
const tableData = ref([
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
  {
    id: 1,
    title: "呼吸兮沒",
    author: "ximo",
    album: "你真的不懂",
    time: "5:20",
  },
]);
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
onMounted(() => {
  gaspShow();//执行gasp动画
  getBannerData()//获取轮播数据
});
//#endregion 生命周期

//#region 事件函数

//获取轮播数据
const getBannerData = async() => {
  try {
    const rudata:getBannerParamsDataType = await homeapi.getBanner({ type: 0 })
    if (rudata.code == 200) {
      bannerData.value = rudata.banners
      nextTick(() => {
        gaspShow()
      })
      console.log('barnnerDara.value',bannerData.value)
    }
  } catch (error) {
    console.error("获取banner失败！",error)
  }
}
//gasp动画
const gaspShow = () => {
  gsap.fromTo(
    ".imground",
    { y: -100,opacity:1},
    {
      duration: 0.5, y: 0, opacity: 1, ease: "linear",
      onComplete() {
        gsap.fromTo(
    ".imground",
    { rotate: 0, y: 20 },
    { rotate: 360, duration: 5, repeat: -1, y: 0, ease: "linear" },
  )
  gsap.fromTo(
    ".imground",
    { y: 20 },
    { duration: 1.5, repeat: -1, y: 0, ease: "linear", yoyo: true }
  )
    }}
  )


  // 音乐符号动画
  // 设置初始位置
  gsap.set(".music-note-1", { right: "15%", top: "35%", opacity: 0.6 });
  gsap.set(".music-note-2", { right: "8%", top: "30%", opacity: 0.5 });
  gsap.set(".music-note-3", { right: "12%", top: "60%", opacity: 0.5 });
  gsap.set(".music-note-4", { right: "5%", top: "45%", opacity: 0.6 });
  gsap.set(".music-note-5", { right: "20%", top: "48%", opacity: 0.5 });

  // 为每个音符添加不同的动画效果，增大移动幅度和视觉变化
  gsap.fromTo(
    ".music-note-1",
    { y: 0, rotate: 0, scale: 1, opacity: 0.6 },
    {
      y: -40,
      rotate: 20,
      scale: 1.4,
      opacity: 1,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "easeInOut",
    }
  );

  gsap.fromTo(
    ".music-note-2",
    { y: 0, rotate: 0, scale: 1, opacity: 0.5 },
    {
      y: 35,
      rotate: -15,
      scale: 1.1,
      opacity: 0.9,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "easeInOut",
    }
  );

  gsap.fromTo(
    ".music-note-3",
    { y: 0, rotate: 0, scale: 1, opacity: 0.5 },
    {
      y: -30,
      rotate: 10,
      scale: 1.3,
      opacity: 0.9,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "easeInOut",
    }
  );

  gsap.fromTo(
    ".music-note-4",
    { y: 0, rotate: 0, scale: 1, opacity: 0.6 },
    {
      y: 40,
      rotate: -10,
      scale: 1.3,
      opacity: 0.9,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "easeInOut",
    }
  );

  gsap.fromTo(
    ".music-note-5",
    { y: 0, rotate: 0, scale: 1, opacity: 0.5 },
    {
      y: -35,
      rotate: 15,
      scale: 1.4,
      opacity: 1,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "easeInOut",
    }
  );
    gsap.fromTo(".but", { x: -20, opacity: 0 }, { x: 0, opacity: 2 });
  // gsap
  //   .timeline()
  //   .fromTo(".title", { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
  //   .fromTo(".more", { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
  //   .fromTo(".but", { y: 20, opacity: 0 }, { y: 0, opacity: 1 });
};
//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息
</script>
<style lang="scss" scoped>
.music-note {
  animation-timing-function: ease-in-out;
  transform-origin: center;
}

// 添加一些基础的CSS动画以确保在GSAP加载前也有动画效果
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-25px) rotate(10deg) scale(1.2);
    opacity: 0.9;
  }
}

@keyframes float-reverse {
  0%,
  100% {
    transform: translateY(0) rotate(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(25px) rotate(-10deg) scale(1.2);
    opacity: 0.9;
  }
}

@keyframes float-complex {
  0% {
    transform: translateY(0) translateX(0) rotate(0) scale(1);
    opacity: 0.5;
  }
  25% {
    transform: translateY(-30px) translateX(5px) rotate(15deg) scale(1.3);
    opacity: 0.9;
  }
  50% {
    transform: translateY(10px) translateX(-5px) rotate(5deg) scale(1.1);
    opacity: 0.7;
  }
  75% {
    transform: translateY(-15px) translateX(10px) rotate(-5deg) scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0) scale(1);
    opacity: 0.5;
  }
}

// 为每个音符设置不同的动画效果
.music-note-1 {
  animation: float-complex 4s infinite ease-in-out;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.music-note-2 {
  animation: float-complex 4.5s infinite ease-in-out 0.5s;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.music-note-3 {
  animation: float-complex 3.8s infinite ease-in-out 0.2s;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.music-note-4 {
  animation: float-complex 5s infinite ease-in-out 0.8s;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.music-note-5 {
  animation: float-complex 4.2s infinite ease-in-out 0.3s;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

// 添加额外的视觉效果
.music-note {
  animation-timing-function: ease-in-out;
  transform-origin: center;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
}
</style>
