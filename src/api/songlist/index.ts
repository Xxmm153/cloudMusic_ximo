import request from "../request"; //二次封装axios
//获取歌单详情
const getSonglistInfo = (id: string) => {
  return request.get<any, any>(`/playlist/detail?id=${id}`);
};
//获取歌单所哟有歌曲
const getSonglistAll = (id: string) => {
  return request.get<any, any>(`/playlist/track/all?id=${id}`);
};
//获取专辑详情
const getAlbumInfo = (id: string) => {
  return request.get<any, any>(`/album?id=${id}`);
};
//获取歌单评论
const getComment = (data: { id: number; limit: number; offset: number }) => {
  return request.get<any, any>(`/comment/playlist`, {
    params: {
      id: data.id,
      limit: data.limit,
      offset: data.offset,
    },
  });
};
//获取歌曲评论
const getSongComment = (data: {
  id: number;
  limit: number;
  offset: number;
}) => {
  return request.get<any, any>(`/comment/music`, {
    params: {
      id: data.id,
      limit: data.limit,
      offset: data.offset,
    },
  });
};

// 收藏/取消收藏歌单
const subscribePlaylist = (t: number, id: string) => {
  return request.get<any, any>(`/playlist/subscribe`, {
    params: {
      t, // 1:收藏, 2:取消收藏
      id,
    },
  });
};

//暴露出去
export {
  getSonglistInfo,
  getSonglistAll,
  getComment,
  getSongComment,
  subscribePlaylist,
  getAlbumInfo,
};
