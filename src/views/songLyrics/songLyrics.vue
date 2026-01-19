<!-- user:ximo -->
<!-- name: -->
<!-- path: -->
<template>
  <div class="size-full overflow-auto text-foreground p-6">
    <!-- Header Section -->
    <div
      class="h-60 bg-background/30 border border-border p-6 flex gap-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div class="h-full aspect-square shrink-0">
        <img
          :src="songInfo.al.picUrl"
          alt=""
          class="size-full object-cover rounded-lg shadow-sm"
        />
      </div>
      <div class="flex-1 flex flex-col justify-around py-2">
        <div class="text-3xl font-bold tracking-tight">{{ songInfo.name }}</div>
        <div class="flex gap-10 text-muted-foreground">
          <div class="flex items-center gap-2">
            <span class="text-sm">歌手：</span>
            <span
              class="text-foreground font-medium hover:text-primary cursor-pointer transition-colors"
              >{{ songInfo.ar.map((item: any) => item.name).join(" / ") }}</span
            >
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm">专辑：</span>
            <span
              class="text-foreground font-medium hover:text-primary cursor-pointer transition-colors"
              >{{ songInfo.al.name }}</span
            >
          </div>
        </div>
        <div class="flex gap-6 mt-2">
          <button
            @click="playMusic"
            class="bg-primary text-primary-foreground px-8 py-2.5 rounded-full flex items-center gap-2 transition-all hover:opacity-90 active:scale-95 shadow-sm"
          >
            <Play class="size-5 fill-current" />
            <span class="font-bold">播放</span>
          </button>
          <button
            class="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-8 py-2.5 rounded-full flex items-center gap-2 transition-all active:scale-95 border border-border"
          >
            <span class="font-medium">查看评论</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex justify-between gap-6 mt-6 items-stretch">
      <!-- Lyrics Column -->
      <div
        class="flex-1 bg-background/30 border border-border rounded-xl shadow-sm overflow-hidden flex flex-col"
      >
        <div
          class="h-14 border-b border-border px-6 flex items-center bg-muted/30"
        >
          <span class="font-bold text-lg">歌词</span>
        </div>
        <div
          class="p-6 flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-border"
        >
          <div
            class="text-muted-foreground hover:text-foreground py-2 px-4 rounded-lg cursor-pointer flex justify-center text-center transition-colors text-lg leading-relaxed hover:bg-muted/50"
            v-for="(i, index) in getLyricsList"
            :key="index"
          >
            {{ i[1] }}
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="w-[32%] flex flex-col gap-6">
        <!-- Similar Songs -->
        <div
          class="bg-background/30 border border-border rounded-xl shadow-sm overflow-hidden flex flex-col"
        >
          <div
            class="h-14 border-b border-border px-6 flex items-center bg-muted/30"
          >
            <span class="font-bold text-lg">相似歌曲</span>
          </div>
          <div class="p-4 flex flex-col gap-2 overflow-y-auto max-h-[400px]">
            <div
              @click="playSimilarSong(i)"
              class="flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer hover:bg-muted transition-all group"
              v-for="(i, index) in songsLike"
              :key="i.id"
            >
              <div class="flex items-center gap-4 overflow-hidden">
                <div
                  class="text-muted-foreground w-6 text-center text-sm font-mono"
                >
                  {{ index + 1 }}
                </div>
                <div class="flex flex-col gap-1 overflow-hidden">
                  <div
                    class="text-sm font-medium truncate group-hover:text-primary transition-colors"
                  >
                    {{ i.name }}
                  </div>
                  <div class="text-xs text-muted-foreground truncate">
                    {{
                      i.artists ? i.artists.map((a: any) => a.name).join(" / ")
                      : i.ar ? i.ar.map((a: any) => a.name).join(" / ")
                      : "未知歌手"
                    }}
                  </div>
                </div>
              </div>
              <div class="text-xs text-muted-foreground font-mono pl-2">
                {{ formatMsOrSecToMinutesSeconds(i.duration || i.dt, true) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Similar Playlists -->
        <div
          class="bg-background/30 border border-border rounded-xl shadow-sm overflow-hidden flex flex-col"
        >
          <div
            class="h-14 border-b border-border px-6 flex items-center bg-muted/30"
          >
            <span class="font-bold text-lg">相似歌单</span>
          </div>
          <div class="p-4 grid grid-cols-2 gap-4">
            <div
              v-for="(i, index) in playlistsLike"
              :key="index"
              class="w-full flex flex-col gap-2 group cursor-pointer"
              @click="goSongList(i.id)"
            >
              <div class="aspect-square overflow-hidden rounded-lg shadow-sm">
                <img
                  :src="i.coverImgUrl"
                  alt=""
                  class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <div
                  class="line-clamp-1 text-sm font-medium group-hover:text-primary transition-colors"
                >
                  {{ i.name }}
                </div>
                <div class="text-xs text-muted-foreground mt-1">
                  {{ i.subscribedCount }}首
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//#region 引入import
import { ref, reactive, onMounted } from "vue"; //引入vue
import { Play } from "lucide-vue-next"; //引入icon-park图标
import { useRoute, useRouter } from "vue-router"; //引入useRoute
import { playSetApi, songLyricsApi } from "@/api"; //引入播放歌曲api
import { formatTimeToSeconds, formatMsOrSecToMinutesSeconds } from "@/utils";
import usePlaySetStore from "@/store/palySet"; //引入store

//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
const route = useRoute(); //使用路由
const router = useRouter(); //使用路由
const playSetStore = usePlaySetStore(); //使用store
const songInfo = reactive(JSON.parse(route.params.item as string));
const getLyricsList = ref<string[]>([]); //歌词列表
const songsLike = ref<any>([]); //相似歌曲
const playlistsLike = ref<any>([]); //相似歌单
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
onMounted(() => {
  getLyrics();
  getSongLike();
  getPlaylistLike();
});
//#endregion 生命周期

//#region 事件函数
// 播放当前音乐
const playMusic = () => {
  playSetStore.addPlayList(songInfo, true);
};

// 播放相似音乐
const playSimilarSong = (item: any) => {
  playSetStore.addPlayList(item, true);
};

// 跳转到歌单页面
const goSongList = (id: number) => {
  router.push({
    path: "/songList",
    query: {
      id,
    },
  });
};

//获取相似歌单
const getPlaylistLike = async () => {
  try {
    const rudata = await songLyricsApi.getSongPlaylist(songInfo.id);
    playlistsLike.value = rudata.playlists;
    console.log("xiangguan", rudata);
  } catch (error) {
    console.log(error);
  }
};
//获取相关歌曲
const getSongLike = async () => {
  try {
    const rudata = await songLyricsApi.getSongLyrics(songInfo.id);
    songsLike.value = rudata.songs;
  } catch (error) {
    console.log(error);
  }
};
//获取歌词信息
const getLyrics = async () => {
  try {
    const rudata = await playSetApi.lyricNew({ id: songInfo.id });
    getLyricsList.value = rudata.lrc.lyric
      .split("\n")
      .map((i: any) => {
        const current = i.split("]");
        return [current[0].slice(1), current[1]];
      })
      .filter((i: any) => i[1]);
  } catch (error) {}
};
//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息
</script>
<style lang="scss" scoped></style>
