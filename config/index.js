import ms from "ms";

export default {
  defaultCacheDurationSecond: ms("10m") / 1000,
  staledDataTtl: ms("7d") / 1000, // the absolute ttl for data in workers kv. this is to prevent workers kv to grow non-stop
  githubGraphqlUrl: "https://api.github.com/graphql",
  githubApiUrl: "https://api.github.com/",
};
