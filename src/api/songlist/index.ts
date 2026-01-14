import request from "../request"; //二次封装axios
//获取歌单详情
const getSonglistInfo = (id: string) => {
  return request.get<any, any>(`/playlist/detail?id=${id}`);
};
//获取歌单所哟有歌曲
const getSonglistAll = (id: string) => {
  return request.get<any, any>(`/playlist/track/all?id=${id}`);
};
//暴露出去
export { getSonglistInfo, getSonglistAll };
