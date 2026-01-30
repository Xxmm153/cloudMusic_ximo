<!-- user:ximo -->
<!-- name:mv页面 -->
<!-- path:/mv -->
<template>
  <div class="mv-container h-full overflow-y-auto pb-10">
    <div
      v-if="mvId"
      class="max-w-[1400px] mx-auto py-8 flex flex-col lg:flex-row gap-8"
    >
      <!-- 左侧：播放器和详情 -->
      <div class="flex-1 min-w-0">
        <!-- 视频播放器 -->
        <div
          class="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl mb-6"
        >
          <vue3VideoPlay
            v-if="mvUrl"
            v-bind="options"
            @play="onPlay"
            @pause="onPause"
            class="size-full"
          />
          <div
            v-else
            class="size-full flex items-center justify-center bg-muted animate-pulse"
          >
            <div class="text-muted-foreground flex flex-col items-center gap-4">
              <Video class="size-12 opacity-20" />
              <span>正在加载视频...</span>
            </div>
          </div>
        </div>

        <!-- MV 信息 -->
        <div class="space-y-6">
          <div class="flex flex-col gap-4">
            <h1 class="text-2xl font-bold line-clamp-2">{{ mvDetail.name }}</h1>
            <div class="flex items-center gap-4 text-sm text-muted-foreground">
              <div
                class="flex items-center gap-1.5 hover:text-primary cursor-pointer transition-colors"
                @click="goArtistDetail(mvDetail.artistId)"
              >
                <UserCircle class="size-4" />
                <span>{{ mvDetail.artistName }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <PlayCircle class="size-4" />
                <span>{{ formatCount(mvDetail.playCount) }} 次播放</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Calendar class="size-4" />
                <span>发布于 {{ mvDetail.publishTime }}</span>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-wrap gap-4 border-y border-white/5 py-6">
            <Button variant="secondary" class="rounded-full gap-2 px-6">
              <ThumbsUp class="size-4" />
              <span>点赞</span>
            </Button>
            <Button variant="secondary" class="rounded-full gap-2 px-6">
              <FolderPlus class="size-4" />
              <span>收藏</span>
            </Button>
            <Button variant="secondary" class="rounded-full gap-2 px-6">
              <Share2 class="size-4" />
              <span>分享</span>
            </Button>
            <Button variant="secondary" class="rounded-full gap-2 px-6">
              <Download class="size-4" />
              <span>下载</span>
            </Button>
          </div>

          <!-- MV 简介 -->
          <div v-if="mvDetail.desc" class="bg-white/5 rounded-2xl p-6">
            <h3 class="font-bold mb-3 flex items-center gap-2">
              <div class="w-1 h-4 bg-primary rounded-full"></div>
              视频简介
            </h3>
            <p
              class="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap"
            >
              {{ mvDetail.desc }}
            </p>
          </div>

          <!-- 评论区 (简略展示) -->
          <div class="mt-10">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-xl font-bold flex items-center gap-2">
                评论
                <span class="text-sm font-normal text-muted-foreground ml-2"
                  >({{ commentTotal }})</span
                >
              </h3>
            </div>

            <div class="space-y-8">
              <div
                v-for="comment in comments"
                :key="comment.commentId"
                class="flex gap-4"
              >
                <img
                  :src="comment.user.avatarUrl + '?param=40y40'"
                  class="size-10 rounded-full shrink-0"
                  alt="avatar"
                />
                <div class="flex-1 min-w-0 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-foreground/90">{{
                      comment.user.nickname
                    }}</span>
                    <span class="text-xs text-muted-foreground">{{
                      comment.timeStr
                    }}</span>
                  </div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    {{ comment.content }}
                  </p>
                  <div class="flex items-center gap-4 pt-1">
                    <button
                      class="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ThumbsUp class="size-3.5" />
                      {{ comment.likedCount || "" }}
                    </button>
                    <button
                      class="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      回复
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：相关推荐 -->
      <div class="w-full lg:w-[380px] shrink-0 space-y-6">
        <h3 class="text-lg font-bold flex items-center gap-2">相关视频</h3>
        <div class="space-y-4">
          <div
            v-for="item in relatedVideos"
            :key="item.vid"
            class="flex gap-3 group cursor-pointer"
            @click="switchMv(item.vid)"
          >
            <div
              class="relative w-40 aspect-video rounded-lg overflow-hidden bg-muted shrink-0"
            >
              <img
                :src="item.coverUrl + '?param=160y90'"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                :alt="item.title"
              />
              <div
                class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <PlayCircle class="size-8 text-white" />
              </div>
              <div
                class="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white"
              >
                {{ formatDuration(item.durationms) }}
              </div>
            </div>
            <div class="flex-1 min-w-0 flex flex-col justify-center gap-1">
              <h4
                class="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors"
              >
                {{ item.title }}
              </h4>
              <p class="text-xs text-muted-foreground truncate">
                by {{ item.creator?.[0]?.userName || "未知" }}
              </p>
              <div
                class="flex items-center gap-1 text-[10px] text-muted-foreground"
              >
                <PlayCircle class="size-3" />
                <span>{{ formatCount(item.playTime) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 列表页 -->
    <div v-else class="max-w-[1400px] mx-auto py-8">
      <h1 class="text-2xl font-bold mb-6">全部 MV</h1>

      <!-- 筛选器 -->
      <div class="mb-8 space-y-4">
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium whitespace-nowrap">地区：</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="area in areas"
              :key="area"
              class="px-3 py-1 text-sm rounded-full transition-colors"
              :class="
                currentArea === area ?
                  'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
              "
              @click="handleFilterChange('area', area)"
            >
              {{ area }}
            </button>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium whitespace-nowrap">类型：</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in types"
              :key="type"
              class="px-3 py-1 text-sm rounded-full transition-colors"
              :class="
                currentType === type ?
                  'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
              "
              @click="handleFilterChange('type', type)"
            >
              {{ type }}
            </button>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium whitespace-nowrap">排序：</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="order in orders"
              :key="order"
              class="px-3 py-1 text-sm rounded-full transition-colors"
              :class="
                currentOrder === order ?
                  'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
              "
              @click="handleFilterChange('order', order)"
            >
              {{ order }}
            </button>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <div
          v-for="mv in mvList"
          :key="mv.id"
          class="group cursor-pointer space-y-3"
          @click="switchMv(mv.id)"
        >
          <div
            class="relative aspect-video rounded-lg overflow-hidden bg-muted"
          >
            <img
              :src="mv.cover"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              :alt="mv.name"
            />
            <div
              class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <PlayCircle class="size-10 text-white" />
            </div>
            <div
              class="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white flex items-center gap-1"
            >
              <PlayCircle class="size-3" />
              {{ formatCount(mv.playCount) }}
            </div>
          </div>
          <div class="space-y-1">
            <h3
              class="font-medium line-clamp-2 group-hover:text-primary transition-colors"
            >
              {{ mv.name }}
            </h3>
            <p class="text-sm text-muted-foreground">{{ mv.artistName }}</p>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="mt-8 flex justify-center" v-if="mvList.length > 0">
        <Button variant="outline" :disabled="loading" @click="loadMore">
          {{ loading ? "加载中..." : "加载更多" }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Video,
  UserCircle,
  PlayCircle,
  Calendar,
  ThumbsUp,
  Share2,
  Download,
  FolderPlus,
  MessageCircle,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  getMvDetail,
  getMvUrl,
  getSimiMv,
  getRelatedVideo,
  getMvComment,
  getAllMv,
  getTopMv,
} from "@/api/home/index";
import playSetStore from "@/store/palySet";

const route = useRoute();
const router = useRouter();
const usePlaySet = playSetStore();

const mvId = ref(route.query.id);
const mvUrl = ref("");
const mvDetail = ref<any>({});
const relatedVideos = ref<any[]>([]);
const comments = ref<any[]>([]);
const commentTotal = ref(0);

const loading = ref(false);
const mvList = ref<any[]>([]);
const topMvList = ref<any[]>([]);
const offset = ref(0);
const limit = 30;

const currentArea = ref("全部");
const currentType = ref("全部");
const currentOrder = ref("上升最快");

const areas = ["全部", "内地", "港台", "欧美", "日本", "韩国"];
const types = ["全部", "官方版", "原生", "现场版", "网易出品"];
const orders = ["上升最快", "最热", "最新"];

// 视频播放器配置
const options = reactive({
  width: "100%",
  height: "100%",
  color: "#ff4d4f", // 主题色
  title: "", // 视频标题
  src: "", // 视频源
  poster: "", // 视频封面
  muted: false, // 是否静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], // 播放倍速
  autoPlay: true, // 自动播放
  loop: false, // 循环播放
  mirror: false, // 镜像画面
  ligthOff: false, // 关灯模式
  volume: 0.3, // 默认音量
  control: true, // 是否显示控制器
});

const fetchMvData = async (id: any) => {
  try {
    // 停止音频播放
    usePlaySet.isPlay = false;

    // 转换 id 为数字类型，如果是数字字符串
    const numericId = Number(id);

    // 获取视频地址
    const urlRes = await getMvUrl(numericId);
    if (urlRes.code === 200) {
      mvUrl.value = urlRes.data.url;
      options.src = urlRes.data.url;
    }

    // 获取详情
    const detailRes = await getMvDetail(numericId);
    if (detailRes.code === 200) {
      mvDetail.value = detailRes.data;
      options.title = detailRes.data.name;
      options.poster = detailRes.data.cover;
    }

    // 获取相关视频
    const relatedRes = await getRelatedVideo(id);
    if (relatedRes.code === 200) {
      relatedVideos.value = relatedRes.data;
    }

    // 获取评论
    const commentRes = await getMvComment(numericId);
    if (commentRes.code === 200) {
      comments.value = commentRes.comments;
      commentTotal.value = commentRes.total;
    }
  } catch (error) {
    console.error("Failed to fetch MV data:", error);
  }
};

const switchMv = (id: string | number) => {
  router.push({ path: "/mv", query: { id } });
};

const goArtistDetail = (id: number) => {
  router.push({ name: "songer", params: { item: id } });
};

const onPlay = () => {
  console.log("Video playing");
};

const onPause = () => {
  console.log("Video paused");
};

const formatCount = (count: number) => {
  if (count > 100000000) {
    return (count / 100000000).toFixed(1) + "亿";
  }
  if (count > 10000) {
    return (count / 10000).toFixed(1) + "万";
  }
  return count;
};

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const fetchMvList = async (isLoadMore = false) => {
  if (loading.value) return;
  loading.value = true;

  try {
    const res = await getAllMv(
      currentArea.value,
      currentType.value,
      currentOrder.value,
      limit,
      offset.value,
    );
    if (res.code === 200) {
      if (isLoadMore) {
        mvList.value = [...mvList.value, ...res.data];
      } else {
        mvList.value = res.data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch MV list:", error);
  } finally {
    loading.value = false;
  }
};

const fetchTopMvList = async () => {
  try {
    const res = await getTopMv(10); // 获取前10个热门MV
    if (res.code === 200) {
      topMvList.value = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch Top MV list:", error);
  }
};

const handleFilterChange = (filterType: string, value: string) => {
  if (filterType === "area") currentArea.value = value;
  if (filterType === "type") currentType.value = value;
  if (filterType === "order") currentOrder.value = value;

  offset.value = 0;
  fetchMvList();
};

const loadMore = () => {
  offset.value += limit;
  fetchMvList(true);
};

// 监听路由变化，处理详情页和列表页的切换
watch(
  () => route.query.id,
  (newId) => {
    mvId.value = newId as any;
    if (newId) {
      fetchMvData(newId);
    } else {
      // 如果没有 ID，说明回到了列表页，确保列表数据已加载
      if (mvList.value.length === 0) {
        fetchMvList();
      }
    }
  },
);

// 首次加载
onMounted(() => {
  if (mvId.value) {
    fetchMvData(mvId.value);
  } else {
    fetchMvList();
  }
});

// 处理 keep-alive 缓存情况
onActivated(() => {
  mvId.value = route.query.id as any;
  if (mvId.value) {
    // 如果进入的是详情页，可能需要重新获取数据或者保持原样
    // 这里简单处理：如果 URL 有 ID 但当前数据不匹配，则刷新
    if (String(mvDetail.value?.id) !== String(mvId.value)) {
      fetchMvData(mvId.value);
    }
  } else {
    // 如果进入的是列表页
    if (mvList.value.length === 0) {
      fetchMvList();
    }
  }
});
</script>

<style lang="scss" scoped>
.mv-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}
</style>
