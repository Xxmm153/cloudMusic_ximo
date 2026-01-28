<!-- user:ximo -->
<!-- name: -->
<!-- path: -->
<template>
  <div class="w-full flex flex-col gap-8 p-4">
    <!-- 顶部评论区 -->
    <div class="flex flex-col gap-4">
      <h2 class="text-lg font-bold text-foreground">全部评论</h2>

      <div
        class="flex flex-col gap-2 bg-muted/30 rounded-xl p-4 border border-border/50"
      >
        <textarea
          v-model="commentContent"
          class="w-full bg-transparent resize-none outline-none text-sm min-h-[60px] placeholder:text-muted-foreground/70"
          placeholder="说点什么吧"
          maxlength="1000"
        ></textarea>

        <div class="flex items-center justify-between mt-2">
          <span class="text-xs text-muted-foreground">{{
            1000 - commentContent.length
          }}</span>

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3 text-muted-foreground">
              <Hash
                class="size-4 hover:text-primary cursor-pointer transition-colors"
              />
              <AtSign
                class="size-4 hover:text-primary cursor-pointer transition-colors"
              />
              <Smile
                class="size-4 hover:text-primary cursor-pointer transition-colors"
              />
            </div>

            <button
              class="px-4 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-xs font-medium transition-colors"
              :disabled="!commentContent.trim()"
            >
              发布
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 最新评论列表 -->
    <div class="flex flex-col gap-4">
      <h2 class="text-sm font-bold text-foreground">最新评论</h2>

      <div class="flex flex-col gap-6">
        <div
          v-for="item in commentList"
          :key="item.commentId"
          class="flex gap-4 pb-6 border-b border-border/40 last:border-none"
        >
          <!-- 头像 -->
          <div
            class="size-10 rounded-full overflow-hidden shrink-0 border border-border/50"
          >
            <img
              :src="item.user.avatarUrl + '?param=80y80'"
              :alt="item.user.nickname"
              class="size-full object-cover"
            />
          </div>

          <!-- 内容区 -->
          <div class="flex-1 flex flex-col gap-2 min-w-0">
            <!-- 用户名 -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-primary cursor-pointer hover:underline">
                {{ item.user.nickname }}
              </span>
              <span v-if="item.user.vipRights" class="inline-block w-auto"
                >VIP</span
              >
              <!-- <img
                v-if="item.user.vipRights"
                src="https://p1.music.126.net/2zQ0d1ThZCSFFhUvxkyD5Q==/109951163968000522.png"
                class="h-3 w-auto"
                alt="vip"
              /> -->
            </div>

            <!-- 评论内容 -->
            <p class="text-sm text-foreground/90 leading-relaxed break-words">
              {{ item.content }}
            </p>

            <!-- 底部信息 -->
            <div class="flex items-center justify-between mt-1">
              <span class="text-xs text-muted-foreground">
                {{ formatCommentTime(item.time) }}
              </span>

              <div class="flex items-center gap-4 text-muted-foreground">
                <div
                  class="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors"
                >
                  <ThumbsUp class="size-3.5" />
                  <span class="text-xs" v-if="item.likedCount > 0">{{
                    formatCount(item.likedCount)
                  }}</span>
                </div>
                <div
                  class="hover:text-primary cursor-pointer transition-colors"
                >
                  <Share2 class="size-3.5" />
                </div>
                <div
                  class="hover:text-primary cursor-pointer transition-colors"
                >
                  <MessageSquare class="size-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div
        class="flex justify-center py-4"
        v-if="commentList.length > 0 && hasMore"
      >
        <button
          class="text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
          @click="loadNextPage"
          :disabled="isLoading"
        >
          {{ isLoading ? "加载中..." : "查看更多评论" }}
        </button>
      </div>
      <div
        class="flex justify-center py-4 text-xs text-muted-foreground"
        v-else-if="commentList.length > 0 && !hasMore"
      >
        没有更多评论了
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//#region 引入import
import { ref, onMounted, watch } from "vue"; //引入vue
import { songlist } from "@/api"; //引入api
import {
  Hash,
  AtSign,
  Smile,
  ThumbsUp,
  MessageSquare,
  Share2,
} from "lucide-vue-next";
import { formatCount } from "@/utils";

//#endregion 引入import

//#region 响应式数据 ref、reactive、watch、computed...
// props
const prop = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
});

// 获取歌单评论参数
const sendCommentData = ref<{
  id: number | string;
  limit: number;
  offset: number;
}>({
  id: 0,
  limit: 20,
  offset: 0,
});
const commentList = ref<any[]>([]); //当前评论列表
const commentContent = ref(""); // 评论内容
const hasMore = ref(true); // 是否还有更多评论
const isLoading = ref(false); // 是否正在加载
//#endregion 响应式数据 ref、reactive、watch、computed...

//#region 生命周期
onMounted(async () => {
  if (prop.id) {
    sendCommentData.value.id = prop.id;
    // 重置状态
    sendCommentData.value.offset = 0;
    hasMore.value = true;
    getComment();
  }
});

// 监听ID变化
watch(
  () => prop.id,
  (newVal) => {
    if (newVal) {
      sendCommentData.value.id = newVal;
      // 重置状态
      sendCommentData.value.offset = 0;
      commentList.value = [];
      hasMore.value = true;
      getComment();
    }
  },
);
//#endregion 生命周期

//#region 事件函数

//获取评论
const getComment = async (isLoadMore = false) => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const res = await songlist.getComment(sendCommentData.value as any);
    if (res.code == 200) {
      if (isLoadMore) {
        commentList.value.push(...res.comments);
      } else {
        commentList.value = res.comments;
      }

      // 更新是否有更多数据状态
      if (res.more !== undefined) {
        hasMore.value = res.more;
      } else {
        // 如果接口没返回more字段，根据返回数量判断
        hasMore.value = res.comments.length >= sendCommentData.value.limit;
      }
    }
  } catch (error) {
    console.error("获取评论失败！", error);
  } finally {
    isLoading.value = false;
  }
};

// 加载下一页
const loadNextPage = () => {
  if (!hasMore.value || isLoading.value) return;
  sendCommentData.value.offset += sendCommentData.value.limit;
  getComment(true);
};

// 格式化时间
const formatCommentTime = (time: number) => {
  const date = new Date(time);
  const now = new Date();

  // 如果是今天
  if (date.toDateString() === now.toDateString()) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // 如果是昨天
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `昨天 ${hours}:${minutes}`;
  }

  // 如果是今年
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
//#endregion 事件函数
</script>
<style lang="scss" scoped></style>
