<!-- user:ximo -->
<!-- name: -->
<!-- path: -->
<template>
  <div>
    <Table>
      <TableCaption>专辑歌曲列表.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> # </TableHead>
          <TableHead class="w-100">歌曲</TableHead>
          <TableHead>歌手</TableHead>
          <TableHead> 专辑 </TableHead>
          <TableHead class="text-right"> 时长 </TableHead>
          <TableHead class="text-right"> 操作 </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          class="h-15 group relative"
          v-for="(i, index) in songlistData"
          :key="i.id"
          @dblclick="playSong(i)"
        >
          <TableCell class="font-medium">
            <div class="group-hover:hidden">{{ index + 1 }}</div>
            <Play
              @click="playSong(i)"
              class="size-3 hidden group-hover:block cursor-pointer"
            ></Play>
          </TableCell>
          <TableCell class="w-100">
            <div class="flex items-center gap-2">
              <img
                :src="i.al.picUrl + '?param=50y50'"
                class="size-10 rounded-md"
                alt=""
              />
              <div>{{ i.name }}</div>
            </div>
          </TableCell>
          <TableCell>{{ arCompuded(i.ar) }}</TableCell>
          <TableCell>{{ i.al.name }} </TableCell>
          <TableCell class="text-right">
            {{ formatMsOrSecToMinutesSeconds(i.dt, true) }}
          </TableCell>
          <TableCell class="h-15 flex justify-end items-center">
            <Info
              @click="showSongInfo(i)"
              class="size-4 hidden group-hover:block cursor-pointer"
            ></Info>
          </TableCell>
          <!-- 可以做一些播放的动画 -->
          <!-- <div class="absolute w-full h-0.5 bottom-0 bg-red-500 left-0"></div> -->
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
//#region 引入import
import { ref, reactive, onMounted } from "vue"; //引入vue
import { Play, Info } from "lucide-vue-next"; //引入图标
import { formatMsOrSecToMinutesSeconds } from "@/utils"; //引入时间格式化
import playsetStore from "@/store/palySet/index"; //引入store
import { useRouter } from "vue-router"; //引入路由
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; //引入tabel组件
//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
defineProps(["songlistData"]);
const useplaysetStore = playsetStore(); //引入store
const router = useRouter(); //引入路由
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
onMounted(() => {});
//#endregion 生命周期

//#region 事件函数
//查看当前歌词的信息
const showSongInfo = (item: any) => {
  router.push({
    name: "songLyrics",
    params: {
      item: JSON.stringify(item),
    },
  });
};
//播放单条
const playSong = (item: any) => {
  console.log(item);
  useplaysetStore.addPlayList(item, true);
};
//处理作者
const arCompuded = (ar: any) => {
  return ar.map((item: any) => item.name).join("/");
};

//#endregion 事件函数

//#region 暴露信息
//#endregion 暴露信息
</script>
<style lang="scss" scoped></style>
