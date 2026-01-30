<!-- user:ximo -->
<!-- name:首页二级直接显示 -->
<!-- path:/home -->
<template>
  <!-- home content -->
  <div class="size-full overflow-auto flex flex-col gap-[10px] pr-[10px]">
    <!-- 轮播 -->
    <div class="flex w-full h-[37%] gap-[10px]">
      <div class="w-[50%] h-full pl-2.5">
        <!-- 轮播图 -->
        <div class="w-full h-full overflow-hidden shrink-0 relative">
          <Carousel
            class="w-full h-full pl-2.5 relative"
            :plugins="[plugin]"
            @mouseenter="plugin.stop"
            @mouseleave="[
              plugin.reset(),
              plugin.play(),
              console.log('Running'),
            ]"
          >
            <div
              class="imground absolute z-50 right-[5%] top-[80%] translate-y-[-50%] bg-card/20 backdrop-blur-xl p-2 rounded-full"
            >
              <div
                class="size-[45px] bg-primary rounded-full flex justify-center items-center"
              >
                <img :src="music" alt="" class="size-[30px]" />
              </div>
            </div>
            <!-- 音乐符号动画 -->
            <div
              class="music-note music-note-1 text-red-500 absolute z-[100] text-xl"
            >
              ♪
            </div>
            <div
              class="music-note music-note-2 text-blue-400 absolute z-[100] text-xl"
            >
              ♫
            </div>
            <div
              class="music-note music-note-3 text-green-400 absolute z-[100] text-sm"
            >
              ♬
            </div>
            <div
              class="music-note music-note-4 text-yellow-400 absolute z-[100] text-xl"
            >
              ♭
            </div>
            <div
              class="music-note music-note-5 text-purple-400 absolute z-[100] text-xl"
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
                  <Card
                    class="w-full h-full bg-card/30 backdrop-blur-2xl p-0"
                    @click="handleBannerClick(i)"
                  >
                    <CardContent
                      class="aspect-square w-full h-full p-0 relative"
                    >
                      <div
                        class="absolute text-[0.65rem] bottom-1 left-1 but w-20 h-6 border-foreground bg-card/60 backdrop-blur-2xl rounded-full shadow flex justify-center items-center"
                      >
                        {{ i.typeTitle }}
                      </div>
                      <img
                        :src="i.bigImageUrl + '?param=800y400'"
                        alt=""
                        class="object-cover size-full opacity-[1] rounded-2xl"
                      />
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
        class="w-[50%] h-full border rounded-2xl px-4 py-5 bg-card/20 backdrop-blur-sm flex flex-col"
      >
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-sm">
            <span class="text-primary font-bold text-[1.3rem]">{{
              getTimePeriod()
            }}</span
            >,猜你最近喜欢听
          </h3>
        </div>
        <div class="flex flex-col flex-1 overflow-auto">
          <div class="grid grid-cols-4 gap-3 h-full pt-4">
            <div
              v-for="item in recommendList"
              :key="item.id"
              class="h-[100%] relative rounded-xl overflow-hidden cursor-pointer group transition-all"
              @click="goSsongList(item.id)"
            >
              <img
                :src="item.picUrl || item.coverImgUrl"
                alt="歌单"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-all"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-[10px]"
              >
                <span class="text-white text-sm truncate">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 精选推荐 -->
    <div class="pl-2.5 font-bold flex items-center justify-between">
      <div><span class="iconfont icon-bofanggedan"></span> 精选推荐</div>
      <div
        @click="router.push('/search')"
        class="text-foreground/50 text-sm flex items-center gap-0.5 cursor-pointer hover:scale-[1.02] hover:text-foreground"
      >
        查看全部 <ArrowRight class="size-4" />
      </div>
    </div>
    <div class="h-[44%] w-full shrink-0 flex gap-[5px] box-border">
      <div
        class="h-[100%] w-full cursor-pointer grid grid-cols-10 grid-rows-2 gap-2 pl-2.5"
      >
        <cardTwo
          v-for="(i, index) in topPlaylisttData"
          :key="index"
          :data="i"
          @click="goSsongList(i.id)"
        ></cardTwo>
      </div>
    </div>
    <!-- 热门歌手 -->
    <div class="pl-2.5 font-bold flex items-center justify-between">
      <div><span class="iconfont icon-bofanggedan"></span> 热门歌手</div>
      <div
        @click="router.push('/search')"
        class="text-foreground/50 text-sm flex items-center gap-0.5 cursor-pointer hover:scale-[1.02] hover:text-foreground"
      >
        查看全部 <ArrowRight class="size-4" />
      </div>
    </div>
    <div class="h-fit w-full grid grid-cols-12 pl-2.5 py-2 gap-1">
      <div
        v-for="(i, index) in hotSonger"
        :key="index"
        class="size-full flex flex-col justify-center items-center gap-1.5 content-center justify-items-center"
        @click="goSonger(i)"
      >
        <img
          :src="i.picUrl + '?param=100y100'"
          alt=""
          class="size-22 rounded-full object-cover hover:border-2 border-primary cursor-pointer"
        />
        <div class="text-sm">{{ i.name }}</div>
      </div>
    </div>
    <!-- 榜单竞选 -->
    <div class="pl-2.5 font-bold flex items-center justify-between">
      <div><span class="iconfont icon-bofanggedan"></span> 榜单竞选</div>
      <div
        @click="router.push('/rankingList')"
        class="text-foreground/50 text-sm flex items-center gap-0.5 cursor-pointer hover:scale-[1.02] hover:text-foreground"
      >
        查看全部 <ArrowRight class="size-4" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1.5 pl-2.5 mb-[20px]">
      <!-- 飙升榜 -->
      <div
        v-for="i in ToplistData.slice(0, 6)"
        :key="i.id"
        @click="goSsongList(i.id)"
        class="border rounded-xl p-[10px] bg-card/20 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
      >
        <div class="flex justify-between items-center mb-[10px]">
          <div class="flex items-center gap-[5px]">
            <div
              class="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold"
            >
              榜
            </div>
            <h3 class="font-bold">{{ i.name }}</h3>
          </div>
          <span class="text-xs text-gray-400"></span>
        </div>
        <div class="space-y-[8px] flex gap-[10px]">
          <div class="size-24 relative">
            <div
              class="border z-30 rounded-xl size-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden"
            >
              <img :src="i.tracks[0].al.picUrl" alt="" class="size-full" />
            </div>
            <div
              class="border z-20 rounded-xl w-full h-[80%] absolute left-[50%] top-[20%] translate-x-[-40%] overflow-hidden"
            >
              <img :src="i.tracks[1].al.picUrl" alt="" class="size-full" />
            </div>
            <div
              class="border rounded-xl w-full h-[50%] absolute left-[50%] top-[50%] translate-x-[-30%] overflow-hidden"
            >
              <img :src="i.tracks[2].al.picUrl" alt="" class="size-full" />
            </div>
          </div>
          <div class="flex-1 pl-6 overflow-hidden">
            <div
              v-for="(items, index) in i.tracks.slice(0, 3)"
              class="flex items-center gap-[10px] cursor-pointer group hover:bg-gray-100/20 p-[5px] rounded-lg transition-all duration-200"
            >
              <div class="w-[24px] text-center font-bold text-red-500">
                {{ index + 1 }}
              </div>
              <div class="flex-1 overflow-hidden">
                <div
                  class="text-sm w-full font-medium truncate group-hover:text-primary transition-colors line-clamp-1"
                >
                  {{ items.name }}
                  <span class="text-foreground/60"
                    >-{{ items.ar[0].name }}</span
                  >
                </div>
              </div>
              <!-- <div class="text-xs text-green-500 w-3">新</div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  class="iconfont icon-bofang1 text-primary w-2.5 h-2.5 rounded-full bg-white/20 flex items-center justify-center"
                ></span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 华语新歌 -->
    <div class="pl-2.5 font-bold flex items-center justify-between">
      <div><span class="iconfont icon-bofanggedan"></span> 华语新歌</div>
      <div
        @click="router.push('/search')"
        class="text-foreground/50 text-sm flex items-center gap-0.5 cursor-pointer hover:scale-[1.02] hover:text-foreground"
      >
        查看全部 <ArrowRight class="size-4" />
      </div>
    </div>
    <div class="!w-[calc(100%-20px)] ml-2.5 grid grid-cols-4 gap-3">
      <div
        class="flex gap-1.5 px-2.5 bg-card/20 backdrop-blur-sm py-2 rounded-xl overflow-hidden hover:shadow-xl transition-all shadow group"
        @click="playMusic(i)"
        v-for="i in newFast.slice(0, 12)"
        :key="i.id"
      >
        <div class="size-16 border rounded-sm relative cursor-pointer">
          <img
            :src="i.album.picUrl"
            alt=""
            class="size-16 rounded-sm absolute z-10 left-0 top-0"
          />
          <div
            class="bg-[rgba(0,0,0,0.2)] size-full absolute z-20 left-0 top-0 flex items-center justify-center hidden group-hover:flex"
          >
            <div class="p-1.5 bg-card rounded-full">
              <Play class="size-3.5 text-primary" />
            </div>
          </div>
        </div>
        <div class="flex-1 flex justify-between items-center">
          <div class="flex flex-col justify-center gap-1">
            <div class="text-sm line-clamp-1">{{ i.name }}</div>
            <div class="text-[0.7rem] line-clamp-1">{{ i.artistsName }}</div>
          </div>
          <div>
            <Ellipsis class="size-3 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>

    <!-- 最新专辑 -->
    <div class="pl-2.5 font-bold flex items-center justify-between mt-2">
      <div><span class="iconfont icon-bofanggedan"></span> 最新专辑</div>
      <div
        @click="router.push('/search')"
        class="text-foreground/50 text-sm flex items-center gap-0.5 cursor-pointer hover:scale-[1.02] hover:text-foreground"
      >
        查看全部 <ArrowRight class="size-4" />
      </div>
    </div>
    <div class="!w-[calc(100%-20px)] ml-2.5 grid grid-cols-6 gap-3 mb-4">
      <div
        v-for="item in newAlbums"
        :key="item.id"
        @click="goAlbumDetail(item.id)"
        class="flex flex-col gap-2 cursor-pointer group"
      >
        <div
          class="aspect-square rounded-lg overflow-hidden relative border border-border/50"
        >
          <img
            :src="item.picUrl + '?param=200y200'"
            class="size-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div
          class="text-sm line-clamp-1 font-medium group-hover:text-primary transition-colors"
        >
          {{ item.name }}
        </div>
        <div class="text-xs text-muted-foreground line-clamp-1">
          {{ item.artist.name }}
        </div>
      </div>
    </div>
    <!-- 网易出品mv -->
    <div class="pl-2.5 font-bold flex items-center justify-between">
      <div><span class="iconfont icon-bofanggedan"></span> 网易出品mv</div>
      <div
        @click="router.push('/mv')"
        class="text-foreground/50 text-sm flex items-center gap-0.5 cursor-pointer hover:scale-[1.02] hover:text-foreground"
      >
        查看全部 <ArrowRight class="size-4" />
      </div>
    </div>
    <div class="ml-2.5 w-full grid grid-cols-4 gap-1">
      <div
        v-for="i in giveWyMv"
        :key="i.id"
        class="w-full h-35 cursor-pointer"
        @click="goMvDetail(i.id)"
      >
        <cardTwo :data="i" />
      </div>
    </div>
    <!-- 欧美新歌 -->
    <div class="pl-2.5 font-bold flex items-center justify-between">
      <div><span class="iconfont icon-bofanggedan"></span> 欧美新歌</div>
      <div
        @click="router.push('/search')"
        class="text-foreground/50 text-sm flex items-center gap-0.5 cursor-pointer hover:scale-[1.02] hover:text-foreground"
      >
        查看全部 <ArrowRight class="size-4" />
      </div>
    </div>
    <div class="!w-[calc(100%-20px)] ml-2.5 grid grid-cols-4 gap-3">
      <div
        class="flex gap-1.5 px-2.5 bg-card/20 backdrop-blur-sm py-2 rounded-xl overflow-hidden hover:shadow-xl transition-all shadow group"
        v-for="i in newFastOM.slice(0, 12)"
        :key="i.id"
        @click="playMusic(i)"
      >
        <div class="size-16 border rounded-sm relative cursor-pointer">
          <img
            :src="i.album.picUrl"
            alt=""
            class="size-16 rounded-sm absolute z-10 left-0 top-0"
          />
          <div
            class="bg-[rgba(0,0,0,0.2)] size-full absolute z-20 left-0 top-0 flex items-center justify-center hidden group-hover:flex"
          >
            <div class="p-1.5 bg-card rounded-full">
              <Play class="size-3.5 text-primary" />
            </div>
          </div>
        </div>
        <div class="flex-1 flex justify-between items-center">
          <div class="flex flex-col justify-center gap-1">
            <div class="text-sm line-clamp-1">{{ i.name }}</div>
            <div class="text-[0.7rem] line-clamp-1">{{ i.artistsName }}</div>
          </div>
          <div>
            <Ellipsis class="size-3 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐mv -->
    <div class="pl-2.5 font-bold flex items-center justify-between">
      <div><span class="iconfont icon-bofanggedan"></span> 推荐mv</div>
      <div
        @click="router.push('/mv')"
        class="text-foreground/50 text-sm flex items-center gap-0.5 cursor-pointer hover:scale-[1.02] hover:text-foreground"
      >
        查看全部 <ArrowRight class="size-4" />
      </div>
    </div>
    <div class="ml-2.5 w-full grid grid-cols-4 gap-1">
      <div
        v-for="i in giveMv"
        :key="i.id"
        class="w-full h-35 cursor-pointer"
        @click="goMvDetail(i.id)"
      >
        <cardTwo :data="i" />
      </div>
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
import { getTimePeriod } from "@/utils"; //引入工具
import cardTwo from "@/views/components/home/cardTwo.vue"; //cardTwo组件
import {
  Heart,
  ArrowDownToLine,
  Play,
  Info,
  ArrowRight,
  Ellipsis,
} from "lucide-vue-next"; //引入lucide-vue图标库
import { gsap } from "gsap"; //引入gsap
import { homeapi } from "@/api"; //引入api
import music from "@/common/img/home/music.svg";
import type {
  getBannerParamsDataListType,
  getBannerParamsDataType,
} from "@/api/type"; //引入api的类型
import playSetStore from "@/store/palySet"; //引入播放设置商店
import userStore from "@/store/user"; //引入用户store
// 创建store实例
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; //引入轮播图
import { useRouter } from "vue-router"; //引入路由

const plugin = Autoplay({
  delay: 3000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});
//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
const topPlaylisttData = ref<any>([]); //当前网友精选歌单
const hotSonger = ref<any>([]); //热门歌手
const ToplistData = ref<any>([]); //榜单
const newFast = ref<any[]>([]); //华语的新歌速递
const newFastOM = ref<any[]>([]); //欧美的新歌速递
const giveMv = ref<any[]>([]); //推荐的mv
const giveWyMv = ref<any[]>([]); //网易出品mv
const bannerData = ref<getBannerParamsDataListType[]>(); //当前轮播图的数据
const usePlaySetStore = playSetStore(); //使用store
const useUserStore = userStore(); //使用用户store
const recommendList = ref<any[]>([]);
const newAlbums = ref<any[]>([]);
const router = useRouter(); //使用路由
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
onMounted(() => {
  gaspShow(); //执行gasp动画
  getBannerData(); //获取轮播数据
  getTopPlaylisttData(); //获取热门歌单
  getTopaArtistslist(); //获取热门歌手
  getToplistData(); //获取榜单
  topSongHy(); //新歌速递
  getPersonalizedMvData(); //获取推荐mv
  getExclusivedRcmdMvData(); //获取网易出品mv
  getRecommendData(); //获取推荐歌单
  getNewAlbumData(); //获取最新专辑
});
//#endregion 生命周期

//#region 事件函数
//获取推荐歌单
const getRecommendData = async () => {
  try {
    let res;
    if (useUserStore.isLogin) {
      res = await homeapi.recommendResource(useUserStore.cookie || "");
    } else {
      res = await homeapi.personalized(4);
    }

    if (res.code === 200) {
      recommendList.value = (res.recommend || res.result || []).slice(0, 4);
    }
  } catch (error) {
    console.error(error);
  }
};

//获取最新专辑
const getNewAlbumData = async () => {
  try {
    const res = await homeapi.getNewAlbum();
    if (res.code === 200) {
      newAlbums.value = res.albums.slice(0, 12);
    }
  } catch (error) {
    console.error(error);
  }
};

//跳转到专辑详情
const goAlbumDetail = (id: number) => {
  router.push({ path: "/songList", query: { id: id, type: "album" } });
};

//跳转到MV详情
const goMvDetail = (id: number) => {
  router.push({ path: "/mv", query: { id: id } });
};

//轮播图点击跳转
const handleBannerClick = async (i: any) => {
  // targetType: 1-歌曲, 10-专辑, 1000-歌单, 1004-视频/MV
  switch (i.targetType) {
    case 1: // 歌曲
      const res = await homeapi.getCloudSearch(i.typeTitle, 1, 1);
      if (res.code === 200 && res.result.songs.length > 0) {
        playMusic(res.result.songs[0]);
      }
      break;
    case 10: // 专辑
      goAlbumDetail(i.targetId);
      break;
    case 1000: // 歌单
      goSsongList(i.targetId);
      break;
    case 1004: // MV
      goMvDetail(i.targetId);
      break;
    default:
      if (i.url) window.open(i.url, "_blank");
      break;
  }
};

//跳转到歌手页面
const goSonger = (i: any) => {
  router.push({ name: "songer", params: { item: i.id } });
};
//跳转对应的歌单
const goSsongList = (id: number) => {
  router.push({ path: "/songList", query: { id: id } });
};
//播放音乐
const playMusic = async (data: any) => {
  // 转换数据格式以匹配播放列表需要的格式
  const songData = {
    id: data.id,
    name: data.name,
    ar: data.artists || data.ar,
    al: data.album || data.al,
    dt: data.duration || data.dt,
  };
  await usePlaySetStore.addPlayList(songData, true);
};
//网易出品mv
const getExclusivedRcmdMvData = async () => {
  try {
    const rudata = await homeapi.exclusivedRcmdMv({ limit: 8, offset: 1 });
    giveWyMv.value = rudata.data.map((e: any) => {
      return {
        ...e,
        coverImgUrl: e.cover,
      };
    });
  } catch (error) {
    console.error("获取网易出品mv失败", error);
  }
};
//推荐mv
const getPersonalizedMvData = async () => {
  try {
    const rudata = await homeapi.personalizedMv();
    giveMv.value = rudata.result;
  } catch (error) {
    console.error("获取推荐mv失败", error);
  }
};
//获取华语
const topSongHy = async () => {
  try {
    const rudata = await homeapi.topSong({ type: 7 });
    const rudataOM = await homeapi.topSong({ type: 96 });
    newFastOM.value = rudataOM.data.map((i: any) => {
      return {
        ...i,
        artistsName: i.artists.map((e: any) => e.name).join("-"),
      };
    });
    newFast.value = rudata.data.map((i: any) => {
      return {
        ...i,
        artistsName: i.artists.map((e: any) => e.name).join("-"),
      };
    });
  } catch (error) {
    console.log("获取新歌速递失败", error);
  }
};
//获取榜单
const getToplistData = async () => {
  try {
    const toplistreslut = await homeapi.toplist();
    const rudata = homeapi.playlistDetail(toplistreslut.list[0].id);
    const rudata2 = homeapi.playlistDetail(toplistreslut.list[1].id);
    const rudata3 = homeapi.playlistDetail(toplistreslut.list[2].id);
    const rudata4 = homeapi.playlistDetail(toplistreslut.list[3].id);
    const rudata5 = homeapi.playlistDetail(toplistreslut.list[4].id);
    const rudata6 = homeapi.playlistDetail(toplistreslut.list[5].id);
    const [res1, res2, res3, res4, res5, res6]: any = await Promise.allSettled([
      rudata,
      rudata2,
      rudata3,
      rudata4,
      rudata5,
      rudata6,
    ]);
    ToplistData.value = [
      {
        name: res1.value.playlist.name,
        tracks: res1.value.playlist.tracks,
      },
      {
        name: res2.value.playlist.name,
        tracks: res2.value.playlist.tracks,
      },
      {
        name: res3.value.playlist.name,
        tracks: res3.value.playlist.tracks,
      },
      {
        name: res4.value.playlist.name,
        tracks: res4.value.playlist.tracks,
      },
      {
        name: res5.value.playlist.name,
        tracks: res5.value.playlist.tracks,
      },
      {
        name: res6.value.playlist.name,
        tracks: res6.value.playlist.tracks,
      },
    ];
    console.error("rudata", ToplistData.value);
  } catch (error) {
    console.error("获取榜单失败", error);
  }
};
//获取热门歌手
const getTopaArtistslist = async () => {
  try {
    const rudata = await homeapi.topaArtistslist({ limit: 12, offset: 1 });
    hotSonger.value = rudata.artists;
    console.log(rudata);
  } catch (error) {
    console.error("获取热门歌手失败", error);
  }
};
//获取热门歌单
const getTopPlaylisttData = async () => {
  try {
    const rudata = await homeapi.topPlaylist({ limit: 20, offset: 1 });
    topPlaylisttData.value = rudata.playlists;
  } catch (error) {
    console.error("获取热门歌单失败", error);
  }
};
//获取轮播数据
const getBannerData = async () => {
  try {
    const rudata: getBannerParamsDataType = await homeapi.getBanner({
      type: 0,
    });
    if (rudata.code == 200) {
      bannerData.value = rudata.banners;
      nextTick(() => {
        gaspShow();
      });
      console.log("barnnerDara.value", bannerData.value);
    }
  } catch (error) {
    console.error("获取banner失败！", error);
  }
};
//gasp动画
const gaspShow = () => {
  gsap.fromTo(
    ".imground",
    { y: -100, opacity: 1 },
    {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "linear",
      onComplete() {
        gsap.fromTo(
          ".imground",
          { rotate: 0 },
          { rotate: 360, duration: 5, repeat: -1, ease: "linear" },
        );
        // gsap.fromTo(
        //   ".imground",
        //   { y: 20 },
        //   { duration: 1.5, repeat: -1, y: 0, ease: "linear", yoyo: true }
        // )
      },
    },
  );

  // 音乐符号动画
  // 设置初始位置
  gsap.set(".music-note-1", { right: "15%", top: "75%", opacity: 0.6 });
  gsap.set(".music-note-2", { right: "8%", top: "70%", opacity: 0.5 });
  gsap.set(".music-note-3", { right: "12%", top: "80%", opacity: 0.5 });
  gsap.set(".music-note-4", { right: "5%", top: "73%", opacity: 0.6 });
  gsap.set(".music-note-5", { right: "20%", top: "78%", opacity: 0.5 });

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
    },
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
    },
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
    },
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
    },
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
    },
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
