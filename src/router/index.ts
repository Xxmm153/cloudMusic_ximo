import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/views/index/index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/home/home.vue"),
      },
      {
        path: "/mv",
        component: () => import("@/views/mv/mv.vue"),
      },
      {
        path: "/rankingList",
        component: () => import("@/views/rankingList/rankingList.vue"),
      },
      {
        path: "/seach",
        component: () => import("@/views/seach/seach.vue"),
      },
      {
        path: "/recentlyPlayed",
        component: () => import("@/views/recentlyPlayed/recentlyPlayed.vue"),
      },
      {
        path: "/mylove",
        component: () => import("@/views/myLove/myLove.vue"),
      },
      {
        path: "/set",
        component: () => import("@/views/set/set.vue"),
      },
      {
        path: "/songList",
        component: () => import("@/views/songList/songList.vue"),
      },
      {
        path: "/songLyrics/:item",
        name: "songLyrics",
        component: () => import("@/views/songLyrics/songLyrics.vue"),
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404/404.vue"),
  },
  {
    path: "/:not(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
