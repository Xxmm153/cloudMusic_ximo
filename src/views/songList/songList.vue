<!-- user:ximo -->
<!-- name: 歌单页面-->
<!-- path: -->
<template>
  <div class="size-full flex flex-col gap-6 overflow-auto">
    <!-- 顶部歌单信息卡片 -->
    <div
      class="bg-background/50 border rounded-xl p-3 flex gap-8 h-60"
      v-if="playCount"
    >
      <!-- 左侧封面: 保持 1:1 -->
      <div
        class="h-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/30 shrink-0"
      >
        <img
          :src="playCount?.coverImgUrl + '?param=200y200'"
          alt="cover"
          class="size-full object-cover"
        />
      </div>

      <!-- 右侧详情 -->
      <div class="flex flex-col justify-between py-1 flex-1 min-w-0">
        <div class="flex flex-col gap-1">
          <!-- 标题 -->
          <h1 class="text-2xl font-bold truncate text-foreground/90">
            {{ playCount?.name }}
          </h1>

          <!-- 作者信息 -->
          <div class="flex items-center gap-3 text-sm text-muted-foreground">
            <div
              class="size-8 rounded-full border border-white/50 overflow-hidden"
            >
              <img
                :src="playCount.creator.avatarUrl + '?param=40y40'"
                alt="avatar"
                class="size-full object-cover"
              />
            </div>
            <span class="hover:text-primary cursor-pointer transition-colors">{{
              playCount.creator.nickname
            }}</span>
            <span>·</span>
            <span>{{ formatTime(playCount.createTime) }}</span>
            <span>·</span>
            <span
              v-for="i in playCount.tags"
              class="bg-white/50 dark:bg-white/10 px-2 py-0.5 rounded text-xs"
              >{{ i }}</span
            >
          </div>

          <!-- 简介 -->
          <p
            class="text-sm text-muted-foreground line-clamp-2 leading-relaxed italic"
          >
            {{ playCount?.description }}
          </p>

          <!-- 数据统计 -->
          <div class="flex items-center gap-6 text-sm text-muted-foreground">
            <div class="flex items-center gap-1.5">
              <Music2 class="size-4" />
              <span>{{ playCount?.trackCount }} 首</span>
            </div>
            <div class="flex items-center gap-1.5">
              <PlayCircle class="size-4" />
              <span>{{ playCount?.playCount }} 次播放</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Heart class="size-4" />
              <span>{{ playCount.subscribedCount }} 收藏</span>
            </div>
          </div>
        </div>

        <!-- 交互按钮 -->
        <div class="flex items-center gap-4 mt-4">
          <button
            @click="playSongList"
            class="bg-primary text-white px-6 py-2.5 rounded-full flex items-center gap-2 transition-all active:scale-95"
          >
            <Play class="size-4 fill-current dark:text-[#000]" />
            <span class="font-medium dark:text-[#000]">播放全部</span>
          </button>

          <!-- <button
            class="text-primary dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 px-6 py-2.5 rounded-full flex items-center gap-2 border border-primary transition-all active:scale-95"
          >
            <Shuffle class="size-4" />
            <span class="font-medium text-sm">随机播放</span>
          </button> -->

          <div class="flex items-center gap-2 ml-2">
            <!-- <button
              class="p-2.5 rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
            >
              <Heart class="size-5" />
            </button> -->
            <button
              @click="handleShare"
              class="p-2.5 rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
            >
              <Share2 class="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 Tab 切换 -->
    <div
      class="flex flex-col bg-white/20 dark:bg-black/10 rounded-2xl border border-white/10"
    >
      <div class="flex items-center gap-8 px-8 py-4 border-b border-white/10">
        <div
          v-for="(tab, index) in tabs"
          :key="tab.label"
          @click="changeTab(index)"
          class="relative group cursor-pointer py-1 transition-colors"
          :class="[
            activeTab === index ? 'text-foreground' : (
              'text-muted-foreground hover:text-foreground'
            ),
          ]"
        >
          <span :class="{ 'text-primary font-bold': activeTab === index }">{{
            tab.label
          }}</span>
          <span class="text-xs ml-1">{{ tab.count }}</span>
          <div
            v-if="activeTab === index"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
          ></div>
        </div>
      </div>

      <!-- 列表内容区域 -->
      <div class="flex-1 overflow-auto p-4 min-h-[400px]">
        <component
          :is="currentComponent"
          :id="router.query.id"
          :songlistData="songlistData"
        ></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//#region 引入import
import { ref, shallowRef, markRaw, onMounted, reactive } from "vue"; //引入vue
import { useRoute } from "vue-router"; //引入路由
import { songlist } from "@/api"; //引入api
import { formatTime, deepClone } from "@/utils/index"; //引入工具函数
import playsetStore from "@/store/palySet/index"; //引入store
import {
  Play,
  Shuffle,
  Heart,
  Share2,
  Music2,
  PlayCircle,
} from "lucide-vue-next";
import type { TbabItem } from "./type"; //引入ts类型
import songListComponent from "@/views/components/songList/songlist.vue"; //引入子组件
import LoveComponent from "@/views/components/songList/love.vue"; //引入子组件
import commentComponent from "@/views/components/songList/comment.vue"; //引入子组件
//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
const router = useRoute(); //获取路由
const tabs = reactive<TbabItem>([
  { label: "歌曲", count: 0, component: markRaw(songListComponent) },
  { label: "评论", count: 0, component: markRaw(commentComponent) },
  // { label: "收藏", count: 0, component: markRaw(LoveComponent) },
]); //tab数据

const activeTab = ref(0); //tableindex
const currentComponent = shallowRef(tabs[0]?.component ?? songListComponent); //当前显示的组件
const playCount = ref<any>(); //歌单数据
const songlistData = ref<any>(); //歌单歌曲数据
const useplaysetStore = playsetStore(); //引入store
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
onMounted(() => {
  getSongList();
  getSongAllData();
});
//#endregion 生命周期

//#region 事件函数
//获取歌单数据
const playSongList = () => {
  // 存储的时候深拷贝
  useplaysetStore.addPlayList(deepClone(songlistData.value), false);
};
//获取歌单所有歌曲
const getSongAllData = async () => {
  if (!router.query.id) return;
  const routeId = router.query.id as string;
  try {
    const rudata = await songlist.getSonglistAll(routeId);
    songlistData.value = rudata.songs;
  } catch (error) {}
};
//获取歌单数据
const getSongList = async () => {
  if (!router.query.id) return;
  const routeId = router.query.id as string;
  try {
    const rudata = await songlist.getSonglistInfo(routeId);
    playCount.value = rudata.playlist;

    // 更新 tab 计数
    if (playCount.value) {
      tabs[0].count = playCount.value.trackCount || 0;
      tabs[1].count = playCount.value.commentCount || 0;
      tabs[2].count = playCount.value.subscribedCount || 0;
    }
  } catch (error) {}
};
// 分享功能
const handleShare = async () => {
  const shareData = {
    title: playCount.value?.name || "歌单分享",
    text: `我在CloudMusic发现了一个很棒的歌单：${playCount.value?.name}`,
    url: window.location.href,
  };

  try {
    // 优先使用 Web Share API (移动端体验更好)
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // PC端或不支持Share API时，复制链接
      await navigator.clipboard.writeText(window.location.href);
      // 这里暂时使用 alert，建议后续集成 Toast 组件
      alert("链接已复制到剪贴板！");
    }
  } catch (err) {
    console.error("分享失败:", err);
  }
};
//#region 按钮点击事件
const changeTab = (index: number) => {
  activeTab.value = index;
  currentComponent.value = tabs[index]?.component;
};
//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息
</script>
<style lang="scss" scoped></style>
