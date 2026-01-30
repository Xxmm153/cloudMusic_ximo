import { defineStore } from "pinia";
import type { UserState } from "./type";

export default defineStore("user", {
  state: (): UserState => ({
    userInfo: null,
    token: null,
    isLogin: false,
    cookie: null,
  }),
  actions: {
    setUserInfo(info: any) {
      this.userInfo = info;
      this.isLogin = !!info;
    },
    setToken(token: string) {
      this.token = token;
    },
    setCookie(cookie: string) {
      this.cookie = cookie;
    },
    logout() {
      this.userInfo = null;
      this.token = null;
      this.isLogin = false;
      this.cookie = null;
      localStorage.removeItem("user");
    },
  },
  persist: true,
});
