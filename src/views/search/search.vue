<!-- user:ximo -->
<!-- name:搜索页面 -->
<!-- path:/seach -->
<template>
  <div class="h-full p-6 max-w-[1400px] mx-auto pb-20 overflow-y-auto pr-2">
    <!-- 搜索栏 -->
    <div class="flex gap-4 mb-8 max-w-2xl mx-auto">
      <Input
        v-model="searchKeyword"
        placeholder="搜索音乐、视频、歌单、歌手..."
        class="flex-1"
        @keyup.enter="handleSearch"
      />
      <Button @click="handleSearch">搜索</Button>
    </div>

    <!-- 热门搜索 -->
    <div v-if="!showResults" class="max-w-4xl mx-auto">
      <!-- 搜索历史 -->
      <div v-if="historyList.length > 0" class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold flex items-center gap-2">
            <div class="w-1 h-5 bg-primary rounded-full"></div>
            搜索历史
          </h2>
          <Button variant="ghost" size="sm" @click="clearHistory">
            <Trash2 class="size-4" />
          </Button>
        </div>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="(item, index) in historyList"
            :key="index"
            class="group relative px-4 py-2 bg-muted/50 rounded-full text-sm cursor-pointer hover:bg-muted hover:text-primary transition-colors pr-8"
            @click="clickHot(item)"
          >
            <span>{{ item }}</span>
            <X
              class="size-3 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
              @click.stop="deleteHistoryItem(index)"
            />
          </div>
        </div>
      </div>

      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <div class="w-1 h-5 bg-red-500 rounded-full"></div>
        热门搜索
      </h2>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="(item, index) in hotList"
          :key="index"
          class="px-4 py-2 bg-muted/50 rounded-full text-sm cursor-pointer hover:bg-muted hover:text-primary transition-colors"
          @click="clickHot(item.searchWord)"
        >
          <span
            class="mr-2"
            :class="
              index < 3 ? 'text-red-500 font-bold' : 'text-muted-foreground'
            "
            >{{ index + 1 }}</span
          >
          <span>{{ item.searchWord }}</span>
          <span v-if="item.iconUrl" class="ml-1 inline-block w-3">
            <img :src="item.iconUrl" class="w-full" />
          </span>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div v-else>
      <!-- Tabs -->
      <div class="flex items-center gap-6 mb-6 border-b border-white/10 pb-2">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="pb-2 text-sm font-medium transition-colors relative"
          :class="
            currentType === tab.value ?
              'text-primary'
            : 'text-muted-foreground hover:text-foreground'
          "
          @click="changeTab(tab.value)"
        >
          {{ tab.label }}
          <div
            v-if="currentType === tab.value"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
          ></div>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        ></div>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- 单曲 -->
        <div v-if="currentType === 1">
          <SongListComponent :songlistData="songList" />
        </div>

        <!-- 歌手 -->
        <div
          v-if="currentType === 100"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <div
            v-for="artist in artistList"
            :key="artist.id"
            class="group cursor-pointer flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-muted/30 transition-colors"
            @click="goArtist(artist.id)"
          >
            <div
              class="size-32 rounded-full overflow-hidden border border-white/10"
            >
              <img
                :src="artist.picUrl + '?param=200y200'"
                class="size-full object-cover group-hover:scale-110 transition-transform duration-500"
                :alt="artist.name"
              />
            </div>
            <div class="text-center">
              <div
                class="font-medium group-hover:text-primary transition-colors"
              >
                {{ artist.name }}
              </div>
              <div
                class="text-xs text-muted-foreground mt-1"
                v-if="artist.albumSize"
              >
                专辑: {{ artist.albumSize }}
              </div>
            </div>
          </div>
        </div>

        <!-- 歌单 -->
        <div
          v-if="currentType === 1000"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <div
            v-for="playlist in playlistList"
            :key="playlist.id"
            class="group cursor-pointer space-y-2"
            @click="goPlaylist(playlist.id)"
          >
            <div class="relative aspect-square rounded-xl overflow-hidden">
              <img
                :src="playlist.coverImgUrl + '?param=300y300'"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                :alt="playlist.name"
              />
              <div
                class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <PlayCircle class="size-10 text-white" />
              </div>
              <div
                class="absolute top-1 right-2 text-xs text-white drop-shadow-md"
              >
                {{ formatCount(playlist.playCount) }}
              </div>
            </div>
            <div
              class="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors"
            >
              {{ playlist.name }}
            </div>
            <div class="text-xs text-muted-foreground">
              by {{ playlist.creator.nickname }}
            </div>
          </div>
        </div>

        <!-- MV -->
        <div
          v-if="currentType === 1004"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="mv in mvList"
            :key="mv.id"
            class="group cursor-pointer space-y-2"
            @click="goMv(mv.id)"
          >
            <div
              class="relative aspect-video rounded-xl overflow-hidden bg-muted"
            >
              <img
                :src="mv.cover + '?param=400y225'"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                :alt="mv.name"
              />
              <div
                class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <PlayCircle class="size-10 text-white" />
              </div>
              <div
                class="absolute bottom-1 right-2 text-xs text-white drop-shadow-md flex items-center gap-1"
              >
                <PlayCircle class="size-3" />
                {{ formatCount(mv.playCount) }}
              </div>
            </div>
            <div>
              <div
                class="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors"
              >
                {{ mv.name }}
              </div>
              <div class="text-xs text-muted-foreground">
                {{ mv.artistName }}
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!loading && isEmpty"
          class="text-center py-20 text-muted-foreground"
        >
          未找到相关结果
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSearchHot, getCloudSearch } from "@/api/home/index";
import SongListComponent from "@/views/components/songList/songlist.vue";
import { PlayCircle, Trash2, X } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

const searchKeyword = ref("");
const showResults = ref(false);
const hotList = ref<any[]>([]);
const loading = ref(false);
const currentType = ref(1); // 1: 单曲, 100: 歌手, 1000: 歌单, 1004: MV
const historyList = ref<string[]>([]);

// 结果数据
const songList = ref([]);
const artistList = ref([]);
const playlistList = ref([]);
const mvList = ref([]);

const tabs = [
  { label: "单曲", value: 1 },
  { label: "歌手", value: 100 },
  { label: "歌单", value: 1000 },
  { label: "视频", value: 1004 },
];

const isEmpty = computed(() => {
  if (currentType.value === 1) return songList.value.length === 0;
  if (currentType.value === 100) return artistList.value.length === 0;
  if (currentType.value === 1000) return playlistList.value.length === 0;
  if (currentType.value === 1004) return mvList.value.length === 0;
  return true;
});

const loadHistory = () => {
  const history = localStorage.getItem("searchHistory");
  if (history) {
    historyList.value = JSON.parse(history);
  }
};

const saveHistory = (keyword: string) => {
  if (!keyword.trim()) return;
  const index = historyList.value.indexOf(keyword);
  if (index !== -1) {
    historyList.value.splice(index, 1);
  }
  historyList.value.unshift(keyword);
  if (historyList.value.length > 10) {
    historyList.value.pop();
  }
  localStorage.setItem("searchHistory", JSON.stringify(historyList.value));
};

const clearHistory = () => {
  historyList.value = [];
  localStorage.removeItem("searchHistory");
};

const deleteHistoryItem = (index: number) => {
  historyList.value.splice(index, 1);
  localStorage.setItem("searchHistory", JSON.stringify(historyList.value));
};

const getHotSearch = async () => {
  try {
    const res = await getSearchHot();
    if (res.code === 200) {
      hotList.value = res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const handleSearch = () => {
  if (!searchKeyword.value.trim()) return;
  saveHistory(searchKeyword.value);
  showResults.value = true;
  fetchSearchResult();

  // 更新路由参数
  if (route.query.keyword !== searchKeyword.value) {
    router.replace({ query: { keyword: searchKeyword.value } });
  }
};

const clickHot = (word: string) => {
  searchKeyword.value = word;
  handleSearch();
};

const changeTab = (type: number) => {
  currentType.value = type;
  fetchSearchResult();
};

const fetchSearchResult = async () => {
  loading.value = true;
  try {
    const res = await getCloudSearch(searchKeyword.value, currentType.value);
    if (res.code === 200) {
      if (currentType.value === 1) songList.value = res.result.songs || [];
      if (currentType.value === 100)
        artistList.value = res.result.artists || [];
      if (currentType.value === 1000)
        playlistList.value = res.result.playlists || [];
      if (currentType.value === 1004) mvList.value = res.result.mvs || [];
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const goArtist = (id: number) => {
  router.push({ name: "songer", params: { item: id } });
};

const goPlaylist = (id: number) => {
  router.push({ path: "/songList", query: { id } });
};

const goMv = (id: number) => {
  router.push({ path: "/mv", query: { id } });
};

const formatCount = (count: number) => {
  if (count > 100000000) return (count / 100000000).toFixed(1) + "亿";
  if (count > 10000) return (count / 10000).toFixed(1) + "万";
  return count;
};

onMounted(() => {
  loadHistory();
  getHotSearch();

  if (route.query.keyword) {
    searchKeyword.value = route.query.keyword as string;
    handleSearch();
  }
});

watch(
  () => route.query.keyword,
  (newVal) => {
    if (newVal && newVal !== searchKeyword.value) {
      searchKeyword.value = newVal as string;
      handleSearch();
    }
  },
);
</script>

<style lang="scss" scoped></style>
