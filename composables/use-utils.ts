const byteMap = ["B", "KB", "MB", "GB", "TB", "PB"];

function log(base: number, num: number): number {
  return Math.log(num) / Math.log(base);
}

function round(num: number, precision: number = 2): number {
  const p = Math.pow(10, precision);
  return Math.round(num * p) / p;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) {
    return "0 B";
  }
  const index = Math.min(Math.floor(log(1000, bytes)), byteMap.length - 1);
  return `${round(bytes / Math.pow(1000, index))} ${byteMap[index]}`;
}

function time_convert(num: number): string {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return hours + ":" + minutes;
}
export default () => {
  return { log, formatBytes, round, time_convert };
};
