import { defineStore } from "pinia"; //引入pinia
import type { statsType } from "./type"; //引入类型
import { playSetApi } from "@/api/playSet"; //引入api
export default defineStore("playset", {
  actions: {
    //添加播放列表
    async addPlayList(data: any, add: boolean) {
      console.log("data", this.playList);
      // 如果true则添加进去播放列表
      if (add) {
        const index = this.playList.findIndex((i: any) => {
          return i.id == data.id;
        });
        console.log("index", index);
        console.log("index", typeof index);
        if (index !== -1) {
          console.log("删除索引", index);
          this.playList.splice(index, 1);
        }
        this.playList.unshift(data);
      } else {
        this.playList = data;
      }
      // 如果当前是随机播放模式，则随机一个索引；否则默认从0开始
      if (this.sequence === 1 && this.playList.length > 1) {
        this.playIndex = Math.floor(Math.random() * this.playList.length);
      } else {
        this.playIndex = 0;
      }
      console.log("随机播放", this.playIndex);
      // 获取音乐URL
      await this.fetchCurrentMusicUrl();
      this.isPlay = true;
    },
    //上一首
    async pre() {
      this.playIndex--;
      console.log("this.playIndex", this.playIndex);
      if (this.playIndex < 0) {
        this.playIndex = this.playList.length - 1;
      }
      // 获取音乐URL
      await this.fetchCurrentMusicUrl();
      if (!this.isPlay) {
        this.isPlay = true;
      }
    },
    //下一首
    async next() {
      this.playIndex++;
      console.log("this.playIndex", this.playIndex);
      if (this.playIndex > this.playList.length - 1) {
        this.playIndex = 0;
      }
      // 获取音乐URL
      await this.fetchCurrentMusicUrl();
      if (!this.isPlay) {
        this.isPlay = true;
      }
    },
    //切换播放模式
    toggleSequence() {
      this.sequence++;
      if (this.sequence > 2) {
        this.sequence = 0;
      }
    },
    //随机播放
    async random() {
      this.playIndex = Math.floor(Math.random() * this.playList.length);
      // 获取音乐URL
      await this.fetchCurrentMusicUrl();
      if (!this.isPlay) {
        this.isPlay = true;
      }
    },
    // 获取当前音乐URL
    async fetchCurrentMusicUrl() {
      this.isPlay = false;
      try {
        if (this.playList && this.playList.length > 0) {
          const rudata = await playSetApi.exclusivedRcmdMv({
            id: this.playList[this.playIndex].id,
            level: "lossless",
          });
          this.fetchCurrentLyric();
          this.currentMusicUrl = rudata.data[0].url;
          return this.currentMusicUrl;
        }
      } catch (error) {
        console.log("获取当前音乐url失败");
        this.currentMusicUrl = "";
      }
    },
    //获取歌词
    async fetchCurrentLyric() {
      try {
        if (this.playList && this.playList.length > 0) {
          const rudata = await playSetApi.lyricNew({
            id: this.playList[this.playIndex].id,
          });
          this.currentLyric = rudata.lrc.lyric
            .split("\n")
            .map((i: any) => {
              const current = i.split("]");
              return [current[0].slice(1), current[1]];
            })
            .filter((i: any) => i[1]);
          return this.fetchCurrentLyric;
        }
      } catch (error) {
        console.log("获取当前歌词失败", error);
        this.currentLyric = "";
      }
    },
  },
  state(): statsType {
    return {
      playList: [], //音乐播放列表
      isPlay: false, //是否播放
      playIndex: 0, //当前播放音乐的索引
      currentMusicUrl: "", //当前播放音乐的URL
      currentLyric: [], //当前播放的歌词
      sequence: 0, //播放模式 0 顺序播放 1 随机播放 2 单曲循环
    };
  },
  getters: {
    //当前播放音乐
    getCurrentPlayMusic(): any {
      return this.currentMusicUrl;
    },
    //当前播放的音乐信息
    getCurrentPlayMusicInfo(): any {
      console.log(this.playList[this.playIndex]);
      return this.playList[this.playIndex] || null;
    },
  },
  persist: {
    pick: [
      "playList",
      "isPlay",
      "playIndex",
      "currentMusicUrl",
      "currentLyric",
      "sequence",
    ],
  },
});
