//接口公共类型
interface config{
     code:number
}

//手机号登录的参数类型
interface getCellphoneParamsType{
    phone?: string;
    email?: string;
    password:string
}

//获取轮播的入参  0: pc   1: android   2: iphone   3: ipad
 interface getBannerParamsType{
    type:0|1|2|3
}

//轮播banner数组里面的类型
interface getBannerParamsDataListType {
    bigImageUrl: string;
    imageUrl: string;
    s_ctrp: string;
    targetId: number;
    targetType: number;
    typeTitle: string;
    url: string;
}

// 获取轮播返回的类型
interface getBannerParamsDataType extends config{
    banners: getBannerParamsDataListType[];
    trp: {
        rules:string[]
    }
}
// 暴露出去
export type {
    getBannerParamsType,
    getBannerParamsDataType,
    getBannerParamsDataListType,
    getCellphoneParamsType
}