<template>
  <div class="p-8 max-w-4xl mx-auto h-full overflow-auto">
    <h1 class="text-3xl font-bold mb-8">设置</h1>

    <div class="space-y-8">
      <!-- Theme Settings -->
      <div class="bg-card/50 rounded-xl p-6 border shadow-sm">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <Palette class="size-5" />
          主题设置
        </h2>
        <div class="flex items-center justify-between">
          <span class="text-muted-foreground">深色模式</span>
          <div
            class="w-12 h-6 bg-muted rounded-full relative cursor-pointer transition-colors"
            :class="{ 'bg-primary': isDark }"
            @click="toggleDark(!isDark)"
          >
            <div
              class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"
              :class="{ 'translate-x-6': isDark }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Account Settings -->
      <div class="bg-card/50 rounded-xl p-6 border shadow-sm">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <User class="size-5" />
          账号设置
        </h2>
        <div v-if="userStore.isLogin" class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <img
              :src="userStore.userInfo?.avatarUrl"
              class="size-12 rounded-full border-2 border-primary/20"
              alt="Avatar"
            />
            <div>
              <div class="font-medium text-lg">
                {{ userStore.userInfo?.nickname }}
              </div>
              <div class="text-sm text-muted-foreground">
                ID: {{ userStore.userInfo?.userId }}
              </div>
            </div>
          </div>
          <Button variant="destructive" @click="handleLogout">退出登录</Button>
        </div>
        <div v-else class="flex flex-col items-center py-6 gap-4">
          <p class="text-muted-foreground">当前未登录，登录后可同步歌单</p>
          <Button @click="handleLogin">去登录</Button>
        </div>
      </div>

      <!-- About -->
      <div class="bg-card/50 rounded-xl p-6 border shadow-sm">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <Info class="size-5" />
          关于
        </h2>
        <div class="space-y-2 text-muted-foreground">
          <p>CloudMusic Vue 3.0</p>
          <p class="text-sm">
            基于 Vue 3 + TypeScript + TailwindCSS + Shadcn UI 开发
          </p>
          <p class="text-sm">这是一个仿网易云音乐的项目，用于学习和演示。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Palette, User, Info } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";
import useUserStore from "@/store/user";
import { homeapi } from "@/api";

const router = useRouter();
const userStore = useUserStore();
const isDark = ref(false);

const toggleDark = (val: boolean) => {
  isDark.value = val;
  if (val) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const handleLogout = async () => {
  if (confirm("确定要退出登录吗？")) {
    try {
      await homeapi.logout();
    } catch (e) {
      console.error(e);
    }
    userStore.logout();
    router.push("/");
  }
};

const handleLogin = () => {
  // Redirect to home where login modal can be triggered, or just alert
  alert("请点击页面右上角的登录按钮进行登录");
  router.push("/");
};

onMounted(() => {
  isDark.value =
    document.documentElement.classList.contains("dark") ||
    localStorage.getItem("theme") === "dark";
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  }
});
</script>

<style scoped></style>
