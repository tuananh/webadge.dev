import badgen from "../helpers/badge";

async function handleAppveyor({ account, project, branch = "" }, options) {
  const url = branch
    ? `https://ci.appveyor.com/api/projects/${account}/${project}/branch/${branch}`
    : `https://ci.appveyor.com/api/projects/${account}/${project}${branch}`;

  const resp = await fetch(url);
  if (resp.status === 200) {
    const { build } = await resp.json();
    return badgen(
      {
        subject: "appveyor",
        status: build.status,
        color: build.status === "success" ? "green" : "red",
      },
      options
    );
  } else {
    return badgen(
      {
        subject: "appveyor",
        status: "unknown",
        color: "grey",
      },
      options
    );
  }
}

export default handleAppveyor;
