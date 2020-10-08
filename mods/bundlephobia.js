import byteSize from "byte-size";
import serveBadge from "../helpers/serve-badge";

async function handlePackagephobia(request) {
  const { pathname } = new URL(request.url);
  const parts = pathname.split("/");
  console.log(parts);
  if (parts.length > 3) {
    const topic = parts[2];
    const pkgName = parts[3];
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
          return serveBadge({
            label: topic,
            status: byteSize(size, { units: "iec" })
              .toString()
              .replace(/iB\b/, "B"),
          });
        case "minzip":
          return serveBadge({
            label: topic,
            status: byteSize(gzip, { units: "iec" })
              .toString()
              .replace(/iB\b/, "B"),
            color: "blue",
          });
        case "dependency-count":
          return serveBadge({
            label: topic,
            status: dependencyCount,
            color: "blue",
          });
        case "tree-shaking":
          const isTreeShakeable = hasJSModule || hasJSNext;
          return serveBadge({
            label: topic,
            status: isTreeShakeable ? "supported" : "not supported",
            color: isTreeShakeable ? "green" : "red",
          });
        default:
          return serveBadge({
            subject: "bundlephobia",
            status: "unknown",
            color: "grey",
          });
      }
    }
    return serveBadge({ label: topic, status: json.dependencyCount });
  }

  return serveBadge({
    subject: "bundlephobia",
    status: "unknown",
    color: "grey",
  });
}

export default handlePackagephobia;
