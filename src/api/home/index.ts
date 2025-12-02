import request from "../request";//引入二次封装axios
import type { getBannerParamsType, getBannerParamsDataType,getCellphoneParamsType } from './type'//引入当前api类型

//生成二维码的key
const getQrkey= () => {
    return request.get<any,any>(`/api/login/qr/key?timestamp=${Date.now()}` )
}

//生成二维码
const getCreatQr= (key:string) => {
    return request.get<any,any>(`/api/login/qr/create?key=${key}&qrimg=11&timestamp=${Date.now()}`)
}

//监测二维码
const getCheckQr= (key:string) => {
    return request.get<any,any>(`/api/login/qr/check?key=${key}&timestamp=${Date.now()}`)
}

//手机号/邮箱登录
const getCellphone = (params:getCellphoneParamsType) => {
    return request.get<any,any>("/api/login/cellphone",
        {
            params
        }
    )
}

//获取首页轮播 数据
const getBanner = (params:getBannerParamsType) => {
    return request.get<any,getBannerParamsDataType>("/api/banner",
        {
            params
        }
    )
}
//暴露出去
export const homeapi={
    getBanner,
    getCellphone,
    getQrkey,
    getCreatQr,
    getCheckQr
}