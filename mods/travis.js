import { badgen } from "badgen";
import cachedExecute from "../helpers/cached-execute";

const statuses = [
  ["passed", "green"],
  ["passing", "green"],
  ["failed", "red"],
  ["failing", "red"],
  ["error", "red"],
  ["errored", "red"],
  ["pending", "yellow"],
  ["fixed", "yellow"],
  ["broken", "red"],
  ["canceled", "grey"],
];

async function handleTravisCI({ user, repo, branch = "master" }) {
  const pathname = ["travis", user, repo, branch].join("/");

  const com = `https://api.travis-ci.com/${user}/${repo}.svg?branch=${branch}`;
  const org = `https://api.travis-ci.org/${user}/${repo}.svg?branch=${branch}`;
  const [svgCom, svgOrg] = await cachedExecute({
    key: pathname,
    json: true,
    loadFn: async () => {
      const [svgCom, svgOrg] = await Promise.all([
        (await fetch(com)).text(),
        (await fetch(org)).text(),
      ]);

      return [svgCom, svgOrg];
    },
  });

  const result = statuses.find(([status]) => {
    return (
      (svgCom && svgCom.includes(status)) || (svgOrg && svgOrg.includes(status))
    );
  });

  if (result) {
    return badgen({
      subject: "travis",
      status: result[0],
      color: result[1],
    });
  } else {
    return badgen({
      subject: "travis",
      status: "unknown",
      color: "grey",
    });
  }
}

export default handleTravisCI;
