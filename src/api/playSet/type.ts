//公共
interface config{
    code:number
}
//获取url的入参类型
// id : 音乐 id level: 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
interface exclusivedRcmdMvParamTyps{
    id: number,
    level:'standard'|'higher'|'exhigh'|'lossless'|'hires'|'jyeffect'|'sky'|'jymaster'
}

//暴露
export type {
    exclusivedRcmdMvParamTyps
}