import byteSize from "byte-size";
import badgen from "../helpers/badge";

async function handleBundlephobia({ topic, pkgName }, options) {
  const resp = await fetch(
    `https://bundlephobia.com/api/size?package=${pkgName}@latest&record=true`
  );
  if (resp.status === 200) {
    const {
      size,
      gzip,
      dependencyCount,
      hasJSModule,
      hasJSNext,
    } = await resp.json();
    switch (topic) {
      case "min":
        return badgen(
          {
            subject: topic,
            status: byteSize(size, { units: "iec" })
              .toString()
              .replace(/iB\b/, "B"),
          },
          options
        );
      case "minzip":
        return badgen(
          {
            subject: topic,
            status: byteSize(gzip, { units: "iec" })
              .toString()
              .replace(/iB\b/, "B"),
            color: "blue",
          },
          options
        );
      case "dependency-count":
        return badgen(
          {
            subject: topic,
            status: dependencyCount,
            color: "blue",
          },
          options
        );
      case "tree-shaking":
        const isTreeShakeable = hasJSModule || hasJSNext;
        return badgen(
          {
            subject: topic,
            status: isTreeShakeable ? "supported" : "not supported",
            color: isTreeShakeable ? "green" : "red",
          },
          options
        );
      default:
        return badgen(
          {
            subject: "bundlephobia",
            status: "unknown",
            color: "grey",
          },
          options
        );
    }
  }
  return badgen(
    {
      subject: "bundlephobia",
      status: "unknown",
      color: "grey",
    },
    options
  );
}

export default handleBundlephobia;
