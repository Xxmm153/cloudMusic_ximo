//stateType
interface statsType {
    playList: any[];//音乐播放列表
    isPlay: boolean;//是否播放
    playIndex: number;//当前索引
    currentMusicUrl: string;//当前播放音乐的URL
    currentLyric: any[];//当前播放的歌词
    sequence: number;//播放模式 0 顺序播放 1 随机播放 2 单曲循环
}
//暴露商场
export type {
    statsType
}