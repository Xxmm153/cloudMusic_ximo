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
  if (hour >= 5 && hour < 9) return '新的一天，加油！';
  if (hour >= 9 && hour < 12) return '上午好喽';
  if (hour >= 12 && hour < 14) return '中午好';
  if (hour >= 14 && hour < 18) return '下午好';
  if (hour >= 18 && hour < 24) return '已入夜早点休息~';
  return '已经很晚啦，面对生活的前提是好的身体！';
}
