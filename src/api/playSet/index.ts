import request from "../request";//引入axios
import type { exclusivedRcmdMvParamTyps } from './type'//引入类型

//获取音乐url
const exclusivedRcmdMv = (params:exclusivedRcmdMvParamTyps) => {
    return request.get<any, {code:number,data:any[]}>(`/song/url/v1`, {
        params
    })
}

//获取歌词
const lyricNew = (params: { id:number}) => {
    return request.get<any, any>(`/lyric`, {
        params
    })
}

//暴露于
export const playSetApi= {
    exclusivedRcmdMv,
    lyricNew
}