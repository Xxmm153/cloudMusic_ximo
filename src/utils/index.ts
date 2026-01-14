// 大于一万单位为万 一千万单位千万  一亿单位亿 否正常返回
export function formatCount(count: number): string {
  if (count >= 100000000) {
    return `${(count / 100000000).toFixed(1)}亿`;
  } else if (count >= 10000000) {
    return `${(count / 10000000).toFixed(1)}千万`;
  } else if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`;
  }
  return count.toString();
}
// 根据时间获取早上、上午、中午、下午、晚上、凌晨
export function getTimePeriod(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 9) return "新的一天，加油！";
  if (hour >= 9 && hour < 12) return "上午好喽";
  if (hour >= 12 && hour < 14) return "中午好";
  if (hour >= 14 && hour < 18) return "下午好";
  if (hour >= 18 && hour < 24) return "已入夜早点休息~";
  return "已经很晚啦，面对生活的前提是好的身体！";
}
// 秒转换为 00:00:00 格式
export function formatSecondsToTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds % 1) * 1000);
  const pad = (n: number, len: number = 2) => n.toString().padStart(len, "0");
  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}
//根据传入的值判断如果是毫秒则将毫秒转换为00：00格式 如果是秒则将秒转换为00：00
export function formatMsOrSecToMinutesSeconds(
  value: number,
  isMilliseconds: boolean = false
): string {
  // 统一转成毫秒处理
  const totalMs = isMilliseconds ? value : value * 1000;
  // 计算分钟和秒
  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  // 补零
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (pad(minutes).toString() == "NaN" || pad(seconds).toString() == "NaN") {
    return "00:00";
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

// 传入一个时间字符串 分:秒.毫秒 如 00:01.123 转换为毫秒
export function formatTimeToSeconds(time: string): number {
  // 移除空格并按“:”拆分
  const parts = time.trim().split(":");
  if (parts.length < 2) return 0; // 格式不正确时返回 0

  // 解析分钟
  const minutes = Number(parts[0]);
  // 解析秒与毫秒（秒部分可能包含小数）
  const secParts = parts[1].split(".");
  const seconds = Number(secParts[0]);
  const milliseconds = secParts.length > 1 ? Number(secParts[1]) : 0;

  // 计算总毫秒
  return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
}
//时间戳的字符串，返回年月日 如2002-11-22
export function formatTime(time: string): string {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}
