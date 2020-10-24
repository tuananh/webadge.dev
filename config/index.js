import ms from "ms";

export default {
  defaultCacheDurationSecond: ms("10m") / 1000,
  // maxCacheAgeSecond: the absolute ttl for data in workers kv.
  // this is just to prevent workers kv to grow non-stop
  maxCacheAgeSecond: ms("7d") / 1000,
  githubGraphqlUrl: "https://api.github.com/graphql",
  githubApiUrl: "https://api.github.com/",
};
