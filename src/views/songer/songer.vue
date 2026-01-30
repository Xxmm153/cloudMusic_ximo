<!-- user:ximo -->
<!-- name: -->
<!-- path: -->
<template>
  <div
    class="songer-container h-full overflow-y-auto text-foreground pb-10"
    @scroll="handleScroll"
  >
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
          @click="switchTab('songs')"
          class="pb-3 cursor-pointer text-lg transition-colors relative"
          :class="
            activeTab === 'songs' ?
              'text-primary font-bold'
            : 'text-muted-foreground hover:text-foreground'
          "
        >
          热门歌曲
          <span
            class="text-xs bg-white/10 px-2 py-0.5 rounded-full font-normal ml-1"
            :class="activeTab === 'songs' ? 'text-white/80' : ''"
            >{{ singerInfo.songCount }}</span
          >
          <div
            v-if="activeTab === 'songs'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          ></div>
        </div>
        <div
          @click="switchTab('albums')"
          class="pb-3 cursor-pointer text-lg transition-colors relative"
          :class="
            activeTab === 'albums' ?
              'text-primary font-bold'
            : 'text-muted-foreground hover:text-foreground'
          "
        >
          专辑
          <span
            class="text-xs bg-white/5 px-2 py-0.5 rounded-full font-normal ml-1"
            >{{ singerInfo.albumCount }}</span
          >
          <div
            v-if="activeTab === 'albums'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          ></div>
        </div>
        <div
          @click="switchTab('mvs')"
          class="pb-3 cursor-pointer text-lg transition-colors relative"
          :class="
            activeTab === 'mvs' ?
              'text-primary font-bold'
            : 'text-muted-foreground hover:text-foreground'
          "
        >
          MV
          <span
            class="text-xs bg-white/5 px-2 py-0.5 rounded-full font-normal ml-1"
            >{{ singerInfo.mvCount }}</span
          >
          <div
            v-if="activeTab === 'mvs'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          ></div>
        </div>
        <div
          @click="switchTab('desc')"
          class="pb-3 cursor-pointer text-lg transition-colors relative"
          :class="
            activeTab === 'desc' ?
              'text-primary font-bold'
            : 'text-muted-foreground hover:text-foreground'
          "
        >
          歌手详情
          <div
            v-if="activeTab === 'desc'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          ></div>
        </div>
      </div>

      <!-- 热门歌曲列表 -->
      <div v-if="activeTab === 'songs'">
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
                    :src="song.al.picUrl + '?param=20/y20'"
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
                  <PlusCircle
                    class="size-5 cursor-pointer hover:text-primary"
                  />
                  <Download class="size-5 cursor-pointer hover:text-primary" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- 专辑列表 -->
      <div
        v-else-if="activeTab === 'albums'"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <div
          v-for="album in albums"
          :key="album.id"
          class="group cursor-pointer"
          @click="goAlbumDetail(album.id)"
        >
          <div class="relative aspect-square mb-3 overflow-hidden rounded-xl">
            <img
              :src="album.picUrl + '?param=50/y50'"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              :alt="album.name"
            />
            <div
              class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <div
                class="size-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform"
              >
                <Play class="size-6 fill-current" />
              </div>
            </div>
          </div>
          <h4 class="font-medium truncate mb-1">{{ album.name }}</h4>
          <p class="text-xs text-muted-foreground">
            {{ new Date(album.publishTime).toLocaleDateString() }}
          </p>
        </div>
      </div>

      <!-- MV 列表 -->
      <div
        v-else-if="activeTab === 'mvs'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="mv in mvs"
          :key="mv.id"
          class="group cursor-pointer"
          @click="goMvDetail(mv.id)"
        >
          <div
            class="relative aspect-video mb-3 overflow-hidden rounded-xl bg-muted"
          >
            <img
              :src="mv.imgurl16v9"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              :alt="mv.name"
            />
            <div
              class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <PlayCircle class="size-12 text-white shadow-2xl" />
            </div>
            <div
              class="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] text-white"
            >
              {{ formatDuration(mv.duration) }}
            </div>
          </div>
          <h4 class="font-medium truncate mb-1">{{ mv.name }}</h4>
          <p class="text-xs text-muted-foreground">{{ mv.publishTime }}</p>
        </div>
      </div>

      <!-- 歌手详情 -->
      <div v-else-if="activeTab === 'desc'" class="space-y-8 max-w-5xl">
        <div v-if="singerInfo.introduction">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <div class="w-1 h-5 bg-primary rounded-full"></div>
            歌手简介
          </h3>
          <p
            class="text-sm text-muted-foreground leading-loose whitespace-pre-wrap"
          >
            {{ singerInfo.introduction }}
          </p>
        </div>

        <div v-for="item in introductionList" :key="item.ti">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <div class="w-1 h-5 bg-primary rounded-full"></div>
            {{ item.ti }}
          </h3>
          <p
            class="text-sm text-muted-foreground leading-loose whitespace-pre-wrap"
          >
            {{ item.txt }}
          </p>
        </div>
      </div>

      <!-- 加载更多状态 -->
      <div v-if="loading" class="flex justify-center py-8">
        <div
          class="size-8 border-3 border-primary border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
      <div
        v-if="
          activeTab === 'songs' && !hasMore && hotSongs.length > 0 && !loading
        "
        class="text-center py-8 text-muted-foreground text-sm"
      >
        没有更多歌曲了
      </div>
      <div
        v-if="
          activeTab === 'albums' &&
          !albumHasMore &&
          albums.length > 0 &&
          !loading
        "
        class="text-center py-8 text-muted-foreground text-sm"
      >
        没有更多专辑了
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//#region 引入import
import { ref, onMounted, onActivated, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
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
import {
  songerInfo,
  artistTopSong,
  getArtistAlbum,
  getArtistMv,
  getArtistDesc,
} from "@/api/home/index";
import playSetStore from "@/store/palySet";
//#endregion 引入import

//#region 响应式数据
const router = useRouter();
const route = useRoute();
const singerId = computed(() => Number(route.params.item));
const playSet = playSetStore();

const activeTab = ref("songs"); // songs, albums, mvs, desc

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
const albums = ref<any[]>([]);
const mvs = ref<any[]>([]);
const introductionList = ref<any[]>([]); // 详细介绍

const limit = 30;
const offset = ref(0);
const albumOffset = ref(0);
const loading = ref(false);
const hasMore = ref(true);
const albumHasMore = ref(true);
//#endregion 响应式数据

//#region 生命周期
const initData = async () => {
  if (!singerId.value) return;

  // 重置数据
  hotSongs.value = [];
  albums.value = [];
  mvs.value = [];
  offset.value = 0;
  albumOffset.value = 0;
  hasMore.value = true;
  albumHasMore.value = true;
  activeTab.value = "songs";

  try {
    // 获取歌手详情
    const res = await songerInfo(singerId.value);
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
    // 获取歌手描述
    fetchArtistDesc();
  } catch (error) {
    console.error("Failed to fetch singer data:", error);
  }
};

onMounted(() => {
  initData();
});

onActivated(() => {
  initData();
});

watch(
  () => route.params.item,
  () => {
    initData();
  },
);
//#endregion 生命周期

//#region 事件函数
// 切换标签
const switchTab = (tab: string) => {
  activeTab.value = tab;
  if (tab === "albums" && albums.value.length === 0) {
    fetchAlbums();
  } else if (tab === "mvs" && mvs.value.length === 0) {
    fetchMvs();
  }
};

// 获取歌曲列表
const fetchSongs = async () => {
  if (loading.value || !hasMore.value) return;

  loading.value = true;
  try {
    const songsRes = await artistTopSong(singerId.value, limit, offset.value);
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

// 获取专辑列表
const fetchAlbums = async () => {
  if (loading.value || !albumHasMore.value) return;

  loading.value = true;
  try {
    const res = await getArtistAlbum(singerId.value, limit, albumOffset.value);
    if (res.code === 200) {
      albums.value.push(...res.hotAlbums);
      albumHasMore.value = res.more;
      albumOffset.value += limit;
    }
  } catch (error) {
    console.error("Failed to fetch albums:", error);
  } finally {
    loading.value = false;
  }
};

// 获取MV列表
const fetchMvs = async () => {
  loading.value = true;
  try {
    const res = await getArtistMv(singerId.value);
    if (res.code === 200) {
      mvs.value = res.mvs;
    }
  } catch (error) {
    console.error("Failed to fetch mvs:", error);
  } finally {
    loading.value = false;
  }
};

// 获取歌手详细描述
const fetchArtistDesc = async () => {
  try {
    const res = await getArtistDesc(singerId.value);
    if (res.code === 200) {
      introductionList.value = res.introduction;
    }
  } catch (error) {
    console.error("Failed to fetch artist desc:", error);
  }
};

// 滚动监听
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const { scrollTop, scrollHeight, clientHeight } = target;

  // 距离底部 100px 时加载更多
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    if (activeTab.value === "songs") {
      fetchSongs();
    } else if (activeTab.value === "albums") {
      fetchAlbums();
    }
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

// 跳转专辑详情
const goAlbumDetail = (id: number) => {
  router.push({ path: "/songList", query: { id: id, type: "album" } });
};

// 跳转MV播放
const goMvDetail = (id: number) => {
  router.push({ path: "/mv", query: { id: id } });
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
