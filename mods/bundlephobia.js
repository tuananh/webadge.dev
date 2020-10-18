import byteSize from "byte-size";
import { badgen } from "badgen";

async function handleBundlephobia({ topic, pkgName }) {
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
        return badgen({
          label: topic,
          status: byteSize(size, { units: "iec" })
            .toString()
            .replace(/iB\b/, "B"),
        });
      case "minzip":
        return badgen({
          label: topic,
          status: byteSize(gzip, { units: "iec" })
            .toString()
            .replace(/iB\b/, "B"),
          color: "blue",
        });
      case "dependency-count":
        return badgen({
          label: topic,
          status: dependencyCount,
          color: "blue",
        });
      case "tree-shaking":
        const isTreeShakeable = hasJSModule || hasJSNext;
        return badgen({
          label: topic,
          status: isTreeShakeable ? "supported" : "not supported",
          color: isTreeShakeable ? "green" : "red",
        });
      default:
        return badgen({
          subject: "bundlephobia",
          status: "unknown",
          color: "grey",
        });
    }
  }
  return badgen({
    subject: "bundlephobia",
    status: "unknown",
    color: "grey",
  });
}

export default handleBundlephobia;
