<!-- user:ximo -->
<!-- name:排行榜 -->
<!-- path:/rankingList -->
<template>
  <div class="h-full py-6 max-w-[1400px] mx-auto pb-20 overflow-y-auto pr-2">
    <div v-if="loading" class="flex justify-center items-center h-60">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
      ></div>
    </div>

    <div v-else>
      <!-- 官方榜 -->
      <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <div class="w-1 h-6 bg-red-500 rounded-full"></div>
        官方榜
      </h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div
          v-for="item in officialLists"
          :key="item.id"
          class="bg-muted/30 rounded-lg p-4 flex gap-4 cursor-pointer hover:bg-muted/50 transition-colors group"
          @click="goDetail(item.id)"
        >
          <!-- 封面 -->
          <div class="relative size-32 shrink-0 rounded-lg overflow-hidden">
            <img
              :src="item.coverImgUrl"
              class="size-full object-cover"
              :alt="item.name"
            />
            <div
              class="absolute inset-0 bg-black/20 hidden group-hover:flex items-center justify-center transition-all"
            >
              <PlayCircle class="text-white size-10 opacity-90" />
            </div>
            <span
              class="absolute top-1 left-2 text-xs text-white font-medium drop-shadow-md"
            >
              {{ item.updateFrequency }}
            </span>
          </div>

          <!-- 歌曲列表 -->
          <div
            class="flex-1 flex flex-col justify-center gap-2 overflow-hidden"
          >
            <h3 class="font-bold text-lg mb-1">{{ item.name }}</h3>
            <div
              v-for="(track, index) in item.tracks"
              :key="index"
              class="text-sm text-muted-foreground truncate"
            >
              <span
                class="font-bold mr-2"
                :class="index < 3 ? 'text-red-500' : ''"
                >{{ index + 1 }}</span
              >
              <span class="text-foreground">{{ track.first }}</span>
              <span class="mx-1">-</span>
              <span>{{ track.second }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 全球榜 -->
      <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <div class="w-1 h-6 bg-red-500 rounded-full"></div>
        全球榜
      </h1>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        <div
          v-for="item in globalLists"
          :key="item.id"
          class="group cursor-pointer space-y-2"
          @click="goDetail(item.id)"
        >
          <div
            class="relative aspect-square rounded-xl overflow-hidden shadow-sm"
          >
            <img
              :src="item.coverImgUrl"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              :alt="item.name"
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
              {{ formatCount(item.playCount) }}
            </div>
          </div>
          <h3
            class="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors"
          >
            {{ item.name }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { toplist } from "@/api/home/index";
import { PlayCircle } from "lucide-vue-next";

const router = useRouter();
const loading = ref(true);
const lists = ref<any[]>([]);

// 区分官方榜和全球榜
// 通常官方榜带有 tracks 属性 (前3首)
const officialLists = computed(() => {
  return lists.value.filter(
    (item: any) => item.tracks && item.tracks.length > 0,
  );
});

const globalLists = computed(() => {
  return lists.value.filter(
    (item: any) => !item.tracks || item.tracks.length === 0,
  );
});

const fetchTopLists = async () => {
  try {
    const res = await toplist();
    if (res.code === 200) {
      lists.value = res.list;
    }
  } catch (error) {
    console.error("Failed to fetch top lists:", error);
  } finally {
    loading.value = false;
  }
};

const goDetail = (id: number) => {
  router.push({ path: "/songList", query: { id } });
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

onMounted(() => {
  fetchTopLists();
});
</script>

<style lang="scss" scoped></style>
