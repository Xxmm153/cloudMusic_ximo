import request from "../request"; //引入封装好的axios

//获取相似歌曲
const getSongLyrics = (id: number) => {
  return request.get<any, { code: any; songs: any[] }>("/simi/song", {
    params: {
      id,
    },
  });
};

//获取相似歌单
const getSongPlaylist = (id: number) => {
  return request.get<any, any>("/simi/playlist", {
    params: {
      id,
    },
  });
};
//暴露出去
export { getSongLyrics, getSongPlaylist };
