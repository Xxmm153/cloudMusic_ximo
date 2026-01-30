import request from "../request"; //引入二次封装axios
import type {
  getBannerParamsType,
  getBannerParamsDataType,
  getCellphoneParamsType,
  topPlaylistParamsType,
  topPlaylistType,
  pagesType,
  topaArtistsParamlist,
} from "./type"; //引入当前api类型

//生成二维码的key
const getQrkey = () => {
  return request.get<any, any>(`/login/qr/key?timestamp=${Date.now()}`);
};

//生成二维码
const getCreatQr = (key: string) => {
  return request.get<any, any>(
    `/login/qr/create?key=${key}&qrimg=11&timestamp=${Date.now()}`,
  );
};

//监测二维码
const getCheckQr = (key: string) => {
  return request.get<any, any>(
    `/login/qr/check?key=${key}&timestamp=${Date.now()}`,
  );
};

//手机号/邮箱登录
const getCellphone = (params: getCellphoneParamsType) => {
  return request.get<any, any>("/login/cellphone", {
    params,
  });
};

//获取首页轮播 数据
const getBanner = (params: getBannerParamsType) => {
  return request.get<any, getBannerParamsDataType>("/banner", {
    params,
  });
};
//获取精品歌单全部:0 华语:7 欧美:96 日本:8 韩国:16
const topSong = (params: { type: 0 | 7 | 96 | 16 }) => {
  return request.get<any, any>("top/song", {
    params,
  });
};

//歌单 ( 网友精选碟 )
const topPlaylist = (params: topPlaylistParamsType) => {
  return request.get<any, topPlaylistType>("/top/playlist", {
    params,
  });
};

//获取歌手
const topaArtistslist = (params: pagesType) => {
  return request.get<any, topaArtistsParamlist>("/top/artists", {
    params,
  });
};

//获取所有榜单
const toplist = () => {
  return request.get<any, { code: number; list: any[] }>("/toplist/detail");
};

//获取歌单榜单详情
const playlistDetail = (id: any) => {
  return request.get<any, any>(`/playlist/detail?id=${id}`);
};

//网易出品mv
const exclusivedRcmdMv = (params: { limit: number; offset: number }) => {
  return request.get<any, any>(`/mv/exclusive/rcmd`, {
    params,
  });
};

//推荐mv
const personalizedMv = () => {
  return request.get<any, any>(`personalized/mv`);
};

//歌手详情
const songerInfo = (id: number) => {
  return request.get<any, any>("/artist/detail", {
    params: {
      id,
    },
  });
};

//获取歌手歌曲
const artistTopSong = (id: number, limit: number, offset: number) => {
  return request.get<any, any>("/artist/top/song", {
    params: {
      id,
    },
  });
};

//获取歌手专辑
const getArtistAlbum = (id: number, limit: number, offset: number) => {
  return request.get<any, any>("/artist/album", {
    params: {
      id,
      limit,
      offset,
    },
  });
};

//获取歌手MV
const getArtistMv = (id: number) => {
  return request.get<any, any>("/artist/mv", {
    params: {
      id,
    },
  });
};

//获取歌手描述
const getArtistDesc = (id: number) => {
  return request.get<any, any>("/artist/desc", {
    params: {
      id,
    },
  });
};

//获取MV详情
const getMvDetail = (mvid: number) => {
  return request.get<any, any>("/mv/detail", {
    params: {
      mvid,
    },
  });
};

//获取MV播放地址
const getMvUrl = (id: number) => {
  return request.get<any, any>("/mv/url", {
    params: {
      id,
    },
  });
};

//获取相似MV
const getSimiMv = (mvid: number) => {
  return request.get<any, any>("/simi/mv", {
    params: {
      mvid,
    },
  });
};

//获取相关视频
const getRelatedVideo = (id: string | number) => {
  return request.get<any, any>("/related/allvideo", {
    params: {
      id,
    },
  });
};

//获取MV评论
const getMvComment = (id: number, limit: number = 20, offset: number = 0) => {
  return request.get<any, any>("/comment/mv", {
    params: {
      id,
      limit,
      offset,
    },
  });
};

//获取全部MV
const getAllMv = (
  area: string = "全部",
  type: string = "全部",
  order: string = "上升最快",
  limit: number = 30,
  offset: number = 0,
) => {
  return request.get<any, any>("/mv/all", {
    params: {
      area,
      type,
      order,
      limit,
      offset,
    },
  });
};

//获取MV排行
const getTopMv = (
  limit: number = 10,
  offset: number = 0,
  area: string = "",
) => {
  return request.get<any, any>("/top/mv", {
    params: {
      limit,
      offset,
      area,
    },
  });
};

//推荐歌单 ( 未登录 )
const personalized = (limit: number = 30) => {
  return request.get<any, any>("/personalized", {
    params: {
      limit,
    },
  });
};

//推荐歌单 ( 登录 )
const recommendResource = (cookie: string = "") => {
  return request.get<any, any>(`/recommend/resource?timestamp=${Date.now()}`, {
    params: {
      cookie,
    },
  });
};

//获取每日推荐歌曲 ( 登录 )
const recommendSongs = (cookie: string = "") => {
  return request.get<any, any>(`/recommend/songs?timestamp=${Date.now()}`, {
    params: {
      cookie,
    },
  });
};

//获取登录状态
const getLoginStatus = (cookie: string = "") => {
  return request.get<any, any>(`/login/status?timestamp=${Date.now()}`, {
    params: {
      cookie,
    },
  });
};

//退出登录
const logout = () => {
  return request.post<any, any>(`/logout?timestamp=${Date.now()}`);
};

//获取歌词
const getLyric = (id: number) => {
  return request.get<any, any>("/lyric", {
    params: {
      id,
    },
  });
};

// 热搜列表(详细)
const getSearchHot = () => {
  return request.get<any, any>("/search/hot/detail");
};

// 搜索 suggestion
const getSearchSuggest = (keywords: string) => {
  return request.get<any, any>("/search/suggest", {
    params: { keywords, type: "mobile" },
  });
};

// 搜索
const getCloudSearch = (
  keywords: string,
  type: number = 1,
  limit: number = 30,
  offset: number = 0,
) => {
  return request.get<any, any>("/cloudsearch", {
    params: {
      keywords,
      type,
      limit,
      offset,
    },
  });
};

// 最新专辑
const getNewAlbum = () => {
  return request.get<any, any>("/album/newest");
};

export {
  getQrkey,
  getCreatQr,
  getCheckQr,
  getCellphone,
  getBanner,
  topSong,
  topPlaylist,
  topaArtistslist,
  toplist,
  playlistDetail,
  exclusivedRcmdMv,
  personalizedMv,
  songerInfo,
  artistTopSong,
  getArtistAlbum,
  getArtistMv,
  getArtistDesc,
  getMvDetail,
  getMvUrl,
  getSimiMv,
  getRelatedVideo,
  getMvComment,
  getAllMv,
  getTopMv,
  personalized,
  recommendResource,
  recommendSongs,
  getLoginStatus,
  logout,
  getLyric,
  getSearchHot,
  getSearchSuggest,
  getCloudSearch,
  getNewAlbum,
};
