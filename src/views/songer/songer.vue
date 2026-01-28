<!-- user:ximo -->
<!-- name: -->
<!-- path: -->
<template>
  <div class="songer-container h-full overflow-y-auto text-foreground pb-10">
    <!-- 1. 歌手头部信息 -->
    <div class="relative h-[250px] overflow-hidden flex items-center px-8">
      <!-- 背景毛玻璃 -->
      <div
        class="absolute inset-0 bg-cover bg-center scale-110 blur-3xl opacity-40"
        :style="{ backgroundImage: `url(${singerInfo.avatar})` }"
      ></div>
      <div class="absolute inset-0 bg-background/30 rounded-md"></div>

      <div class="relative z-10 flex items-center gap-6 w-full pt-4">
        <!-- 头像 -->
        <div
          class="size-[180px] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shrink-0"
        >
          <img
            :src="singerInfo.avatar"
            class="size-full object-cover"
            alt="avatar"
          />
        </div>

        <!-- 文本信息 -->
        <div class="flex-1 min-w-0">
          <h1 class="text-4xl font-bold mb-2 text-foreground">
            {{ singerInfo.name }}
          </h1>
          <p class="text-lg text-foreground mb-4 font-medium">
            {{ singerInfo.englishName }}
          </p>

          <!-- 统计数据 -->
          <div class="flex gap-4 mb-6">
            <div
              class="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-foreground/90 transition-colors cursor-pointer"
            >
              <Music2 class="size-3.5 text-primary" />
              <span>{{ singerInfo.songCount }} 歌曲</span>
            </div>
            <div
              class="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-foreground/90 transition-colors cursor-pointer"
            >
              <Disc3 class="size-3.5 text-purple-400" />
              <span>{{ singerInfo.albumCount }} 专辑</span>
            </div>
            <div
              class="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-foreground/90 transition-colors cursor-pointer"
            >
              <Video class="size-3.5 text-blue-400" />
              <span>{{ singerInfo.mvCount }} MV</span>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex gap-3">
            <Button
              @click="playAllHot"
              class="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground border-none shadow-lg shadow-primary/20 flex gap-2 h-9 text-sm"
            >
              <Play class="size-3.5 fill-current" />
              播放热门
            </Button>
            <!-- <Button
              variant="outline"
              class="rounded-full px-6 bg-white/5 border-white/10 hover:bg-white/10 text-foreground flex gap-2 h-9 backdrop-blur-sm text-sm"
            >
              <Shuffle class="size-3.5" />
              随机播放
            </Button> -->
            <Button
              variant="outline"
              class="rounded-full px-6 bg-white/5 border-white/10 hover:bg-white/10 text-foreground flex gap-2 h-9 backdrop-blur-sm text-sm"
            >
              <Heart class="size-3.5" />
              关注
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 艺人简介 -->
    <div class="px-12 mt-8">
      <div
        class="flex items-center gap-2 mb-3 text-lg font-bold text-foreground/90"
      >
        <UserCircle class="size-5 text-primary" />
        <h3>艺人简介</h3>
      </div>
      <p
        class="text-sm leading-relaxed text-muted-foreground/80 line-clamp-3 hover:text-foreground transition-colors cursor-pointer max-w-5xl"
      >
        {{ singerInfo.introduction }}
      </p>
    </div>

    <!-- 3. 歌曲列表 -->
    <div class="px-12 mt-12">
      <div class="flex items-center gap-8 mb-6 border-b border-white/5">
        <div
          class="pb-3 border-b-2 border-primary text-primary font-bold flex items-center gap-2 cursor-pointer text-lg"
        >
          热门歌曲
          <span
            class="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/80 font-normal"
            >{{ hotSongs.length }}</span
          >
        </div>
        <div
          class="pb-3 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer text-lg"
        >
          专辑
          <span
            class="text-xs bg-white/5 px-2 py-0.5 rounded-full font-normal"
            >{{ singerInfo.albumCount }}</span
          >
        </div>
        <div
          class="pb-3 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer text-lg"
        >
          MV
          <span
            class="text-xs bg-white/5 px-2 py-0.5 rounded-full font-normal"
            >{{ singerInfo.mvCount }}</span
          >
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow class="hover:bg-transparent border-white/5">
            <TableHead class="w-[60px]">#</TableHead>
            <TableHead>歌曲</TableHead>
            <TableHead>歌手</TableHead>
            <TableHead>专辑</TableHead>
            <TableHead>时长</TableHead>
            <TableHead class="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(song, index) in hotSongs"
            :key="song.id"
            class="group border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
            @dblclick="playSong(song)"
          >
            <TableCell class="font-medium text-muted-foreground">
              {{ String(index + 1).padStart(2, "0") }}
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-3">
                <img
                  :src="song.al.picUrl"
                  class="size-10 rounded shadow-lg"
                  alt="cover"
                />
                <span class="font-medium">{{ song.name }}</span>
              </div>
            </TableCell>
            <TableCell class="text-muted-foreground">{{
              song.ar.map((a: any) => a.name).join("/")
            }}</TableCell>
            <TableCell class="text-muted-foreground">{{
              song.al.name
            }}</TableCell>
            <TableCell class="text-muted-foreground">{{
              formatDuration(song.dt)
            }}</TableCell>
            <TableCell
              class="text-right opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div class="flex justify-end gap-3">
                <PlayCircle
                  @click.stop="playSong(song)"
                  class="size-5 cursor-pointer hover:text-primary"
                />
                <!-- <PlusCircle class="size-5 cursor-pointer hover:text-primary" />
                <Download class="size-5 cursor-pointer hover:text-primary" /> -->
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <!-- 加载更多状态 -->
      <div v-if="loading" class="flex justify-center py-4">
        <div
          class="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
      <div
        v-if="!hasMore && hotSongs.length > 0"
        class="text-center py-4 text-muted-foreground text-sm"
      >
        没有更多歌曲了
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//#region 引入import
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { deepClone } from "@/utils/index";
import {
  Play,
  Shuffle,
  Heart,
  Music2,
  Disc3,
  Video,
  UserCircle,
  PlayCircle,
  PlusCircle,
  Download,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { songerInfo, artistTopSong } from "@/api/home/index";
import playSetStore from "@/store/palySet";
//#endregion 引入import

//#region 响应式数据
const route = useRoute();
const singerId = Number(route.params.item);
const playSet = playSetStore();

const singerInfo = ref({
  name: "",
  englishName: "",
  avatar: "",
  songCount: 0,
  albumCount: 0,
  mvCount: 0,
  introduction: "",
});

const hotSongs = ref<any[]>([]);
const limit = 30;
const offset = ref(0);
const loading = ref(false);
const hasMore = ref(true);
//#endregion 响应式数据

//#region 生命周期
onMounted(async () => {
  if (!singerId) return;

  try {
    // 获取歌手详情
    const res = await songerInfo(singerId);
    if (res.code === 200) {
      const artist = res.data.artist;
      singerInfo.value = {
        name: artist.name,
        englishName:
          artist.alias && artist.alias.length > 0 ? artist.alias[0] : "",
        avatar: artist.cover,
        songCount: artist.musicSize,
        albumCount: artist.albumSize,
        mvCount: artist.mvSize,
        introduction: artist.briefDesc,
      };
    }

    // 初始获取歌曲
    await fetchSongs();
  } catch (error) {
    console.error("Failed to fetch singer data:", error);
  }
});
//#endregion 生命周期

//#region 事件函数
// 获取歌曲列表
const fetchSongs = async () => {
  if (loading.value || !hasMore.value) return;

  loading.value = true;
  try {
    const songsRes = await artistTopSong(singerId, limit, offset.value);
    if (songsRes.code === 200) {
      hotSongs.value.push(...songsRes.songs);
      hasMore.value = songsRes.more;
      offset.value += limit;
    }
  } catch (error) {
    console.error("Failed to fetch songs:", error);
  } finally {
    loading.value = false;
  }
};

// 滚动监听
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const { scrollTop, scrollHeight, clientHeight } = target;

  // 距离底部 100px 时加载更多
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    fetchSongs();
  }
};

// 播放单个歌曲
const playSong = (song: any) => {
  playSet.addPlayList(song, true);
};

// 播放所有热门歌曲
const playAllHot = () => {
  if (hotSongs.value.length > 0) {
    playSet.addPlayList(deepClone(hotSongs.value), false);
  }
};

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息
</script>

<style lang="scss" scoped>
.songer-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

:deep(.table-row) {
  &:hover {
    background-color: rgba(255, 255, 255, 0.05) !important;
  }
}
</style>
