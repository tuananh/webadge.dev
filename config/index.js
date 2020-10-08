import ms from "ms";

export default {
  defaultCacheDurationSecond: ms("10m") / 1000,
  serveStaleData: true,
  ghGraphQLURL: "https://api.github.com/graphql",
  ghTokens: "",
};
