import ms from "ms";

export default {
  defaultCacheDurationSecond: ms("10m") / 1000,
  serveStaleData: true,
  githubGraphqlUrl: "https://api.github.com/graphql",
  githubApiUrl: "https://api.github.com/",
};
