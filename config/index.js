import ms from "ms";

export default {
  defaultCacheDurationSecond: ms("1h") / 1000,
  serveStaleData: true,
};
