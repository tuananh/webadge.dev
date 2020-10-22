import { version, versionColor } from "../helpers/version";
import badgen from "../helpers/badge";
import millify from "millify";

async function queryVSM(pkgName) {
  const endpoint =
    "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery?api-version=3.0-preview.1";
  const res = await fetch(endpoint, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      filters: [{ criteria: [{ filterType: 7, value: pkgName }] }],
      flags: 914,
    }),
  }).then((res) => res.json());

  return res.results[0].extensions[0];
}

function parseStatistic(ext) {
  return ext.statistics.reduce((out, cur) => {
    out[cur.statisticName] = cur.value;
    return out;
  }, {});
}

async function handler(params, options) {
  const { topic, pkgName } = params;
  const ext = await queryVSM(pkgName);
  const statistic = parseStatistic(ext);
  switch (topic) {
    case "v":
      return {
        subject: "vs marketplace",
        status: version(ext.versions[0].version),
        color: versionColor(ext.versions[0].version),
      };
    case "i":
      return {
        subject: "installs",
        status: millify(statistic.install),
        color: "green",
      };
    case "d":
      return {
        subject: "downloads",
        status: millify(statistic.install + statistic.updateCount),
        color: "green",
      };
    case "rating":
      return {
        subject: "rating",
        status: `${statistic.averagerating.toFixed(1)}/5 (${
          statistic.ratingcount
        })`,
        color: "green",
      };
    default:
      return {
        subject: "vs-marketplace",
        status: "unknown",
        color: "grey",
      };
  }
}

export default handler;
