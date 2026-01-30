<template>
  <div class="p-6 h-full overflow-auto">
    <div class="flex items-center gap-4 mb-6">
      <div class="w-1 h-8 bg-primary rounded-full"></div>
      <h1 class="text-2xl font-bold">我的喜欢</h1>
      <span class="text-muted-foreground text-sm" v-if="songList.length">
        共 {{ songList.length }} 首
      </span>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="!isLogin" class="text-center py-20 text-muted-foreground">
      请先登录以查看喜欢的音乐
    </div>

    <div v-else-if="songList.length === 0" class="text-center py-20 text-muted-foreground">
      暂无喜欢的音乐
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
const isLogin = ref(false);

const fetchData = async () => {
  const userInfoStr = localStorage.getItem('userInfo');
  if (!userInfoStr) {
    isLogin.value = false;
    return;
  }
  
  try {
    const userInfo = JSON.parse(userInfoStr);
    const uid = userInfo.userId || userInfo.profile?.userId;
    if (!uid) {
       isLogin.value = false;
       return;
    }
    
    isLogin.value = true;
    loading.value = true;
    
    // 1. Get like list IDs
    const likeRes = await homeapi.getLikelist(uid);
    const ids = likeRes.ids || [];
    
    if (ids.length === 0) {
      songList.value = [];
      loading.value = false;
      return;
    }
    
    // 2. Get song details
    // Note: API might limit number of IDs, need to handle batch if too many?
    // For now assume it works for reasonable number or just take first 1000
    // If ids is array of numbers, join them
    const songRes = await homeapi.getSongDetail(ids.join(','));
    songList.value = songRes.songs || [];
    
  } catch (error) {
    console.error('Failed to fetch loved music:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
