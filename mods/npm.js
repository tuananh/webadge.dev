import millify from "millify";
import { badgen } from "badgen";
import cachedExecute from "../helpers/cached-execute";

async function download(period, pkgName, tag = "latest") {
  const urlFragments = ["https://api.npmjs.org/downloads"];
  const isTotal = period === "total";

  if (isTotal) {
    urlFragments.push(`range/2005-01-01:${new Date().getFullYear() + 1}-01-01`);
  } else {
    urlFragments.push(`point/${period}`);
  }

  urlFragments.push(pkgName);
  // endpoint.push(tag)
  const url = urlFragments.join("/");
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    console.log("error fetch from npm", err);
  }
  if (resp && resp.status === 200) {
    const { downloads } = await resp.json();
    const count =
      typeof downloads === "number"
        ? downloads
        : downloads.reduce((accu, { downloads }) => {
            return accu + downloads;
          }, 0);

    const per = isTotal ? "" : period.replace("last-", "/");
    return {
      subject: "downloads",
      status: millify(count) + per,
      color: "green",
    };
  } else {
    return {
      subject: "downloads",
      status: "unknown",
      color: "grey",
    };
  }
}

async function pkgJson(pkgName, tag = "latest") {
  // const endpoint = `https://cdn.jsdelivr.net/npm/${pkg}@${tag}/package.json`
  const url = `https://unpkg.com/${pkgName}@${tag}/package.json`;
  return (await fetch(url)).json();
}

async function typesDefinition(pkgName, tag = "latest") {
  let meta = await pkgJson(pkgName, tag);

  if (typeof meta.types === "string" || typeof meta.typings === "string") {
    return {
      subject: "types",
      status: "included",
      color: "0074c1",
    };
  }

  const hasIndexDTSFile = await got
    .head(`https://unpkg.com/${pkgName}/index.d.ts`)
    .then((res) => res.statusCode === 200)
    .catch((e) => false);

  if (hasIndexDTSFile) {
    return {
      subject: "types",
      status: "included",
      color: "0074c1",
    };
  }

  const typesPkg =
    "@types/" +
    (pkgName.charAt(0) === "@" ? pkgName.slice(1).replace("/", "__") : pkgName);
  meta = await pkgJson(typesPkg).catch((e) => false);

  if (meta && meta.name === typesPkg) {
    return {
      subject: "types",
      status: meta.name,
      color: "cyan",
    };
  }

  return {
    subject: "types",
    status: "missing",
    color: "orange",
  };
}

async function handleNpm({ topic, pkgName }) {
  const pathname = ["npm", topic, pkgName].join("/");
  const unknownErr = { label: "npm", status: "unknown", color: "grey" };

  switch (topic) {
    case "v":
      try {
        const val = await cachedExecute({
          key: pathname,
          json: true,
          loadFn: async () => {
            const resp = await fetch(
              `https://registry.npmjs.org/-/package/${pkgName}/dist-tags`
            );
            if (resp.status === 200) {
              return resp.json();
            }

            if (resp.status === 404) {
              throw new Error("pkg not found");
            }

            throw new Error("bad response from npm");
          },
        });

        return badgen({ label: "npm", status: val.latest });
      } catch (err) {
        if (err.message === "pkg not found") {
          return badgen({ label: "npm", status: "pkg not found" });
        } else {
          return badgen(unknownErr);
        }
      }
    case "license":
      const info = await cachedExecute({
        key: pathname,
        json: true,
        loadFn: async () => pkgJson(pkgName, "latest"),
      });
      return badgen({ label: "license", status: info.license });
    case "dt":
    case "dd":
    case "dw":
    case "dm":
    case "dy":
      const map = {
        dt: "total",
        dd: "last-day",
        dw: "last-week",
        dm: "last-month",
        dy: "last-year",
      };
      const opts = await cachedExecute({
        key: pathname,
        json: true,
        loadFn: async () => download(map[topic], pkgName),
      });
      return badgen(opts);
    case "types":
      const def = await cachedExecute({
        key: pathname,
        json: true,
        loadFn: async () => typesDefinition(pkgName, "latest"),
      });
      return badgen({ ...def, label: "types" });
    default:
      return badgen(unknownErr);
  }
}

export default handleNpm;
