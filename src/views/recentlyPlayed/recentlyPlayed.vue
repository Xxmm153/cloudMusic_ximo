<template>
  <div class="p-6 h-full overflow-auto">
    <div class="flex items-center gap-4 mb-6">
      <div class="w-1 h-8 bg-primary rounded-full"></div>
      <h1 class="text-2xl font-bold">最近播放</h1>
      <span class="text-muted-foreground text-sm" v-if="songList.length">
        共 {{ songList.length }} 首
      </span>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="songList.length === 0" class="text-center py-20 text-muted-foreground">
      暂无播放记录
    </div>

    <SongListComponent v-else :songlistData="songList" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { homeapi } from '@/api';
import SongListComponent from '@/views/components/songList/songlist.vue';

const songList = ref<any[]>([]);
const loading = ref(false);

const fetchData = async () => {
  try {
    loading.value = true;
    const res = await homeapi.getRecentSong(100);
    if (res.data && res.data.list) {
        // Map the list items to get the actual song data
        songList.value = res.data.list.map((item: any) => item.data);
    } else {
        songList.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch recent songs:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
</style>
