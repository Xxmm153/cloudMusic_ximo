import request from "../request";//引入二次封装axios
import type { getBannerParamsType, getBannerParamsDataType,getCellphoneParamsType,topPlaylistParamsType ,topPlaylistType,pagesType,topaArtistsParamlist} from './type'//引入当前api类型

//生成二维码的key
const getQrkey= () => {
    return request.get<any,any>(`/login/qr/key?timestamp=${Date.now()}` )
}

//生成二维码
const getCreatQr= (key:string) => {
    return request.get<any,any>(`/login/qr/create?key=${key}&qrimg=11&timestamp=${Date.now()}`)
}

//监测二维码
const getCheckQr= (key:string) => {
    return request.get<any,any>(`/login/qr/check?key=${key}&timestamp=${Date.now()}`)
}

//手机号/邮箱登录
const getCellphone = (params:getCellphoneParamsType) => {
    return request.get<any,any>("/login/cellphone",
        {
            params
        }
    )
}

//获取首页轮播 数据
const getBanner = (params:getBannerParamsType) => {
    return request.get<any,getBannerParamsDataType>("/banner",
        {
            params
        }
    )
}
//获取精品歌单全部:0 华语:7 欧美:96 日本:8 韩国:16
const topSong = (params:{type:0|7|96|16}) => {
    return request.get<any, any>("top/song", {
        params
    })
}

//歌单 ( 网友精选碟 ) 
const topPlaylist = (params:topPlaylistParamsType) => {
    return request.get<any, topPlaylistType>("/top/playlist", {
        params
    })
}

//获取歌手
const topaArtistslist = (params:pagesType) => {
    return request.get<any, topaArtistsParamlist>("/top/artists", {
        params
    })
}

//获取所有榜单
const toplist = () => {
    return request.get<any, {code:number,list:any[]}>("/toplist/detail")
}

//获取歌单榜单详情
const playlistDetail = (id:any) => {
    return request.get<any,any>(`/playlist/detail?id=${id}`)
}

//网易出品mv
const exclusivedRcmdMv = (params:{limit:number,offset:number}) => {
    return request.get<any, any>(`/mv/exclusive/rcmd`, {
        params
    })
}

//推荐mv
const personalizedMv = () => {
    return request.get<any,any>(`personalized/mv`)
}

//暴露出去
export {
    getBanner,
    getCellphone,
    getQrkey,
    getCreatQr,
    getCheckQr,
    topSong,
    topPlaylist,
    topaArtistslist,
    toplist,
    playlistDetail,
    personalizedMv,
    exclusivedRcmdMv
}