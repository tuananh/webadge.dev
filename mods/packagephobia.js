import badgen from "../helpers/badge";

const errBadge = { subject: "packagephobia", status: "unknown", color: "grey" };
async function handlePackagephobia(params, options) {
  let { topic, pkgName, scope, name } = params;
  if (scope && name) {
    if (!scope.startsWith("@")) {
      return badgen(errBadge, options);
    }
    pkgName = scope + "/" + name;
  }
  const endpoint = `https://packagephobia.com/v2/api.json?p=${pkgName}`;
  const resp = await fetch(endpoint);

  if (resp.status === 200) {
    const { install, publish } = await resp.json();
    switch (topic) {
      case "publish":
        return badgen(
          {
            subject: "publish size",
            status: publish.pretty,
            color: publish.color.replace("#", ""),
          },
          options
        );
      case "install":
        return badgen(
          {
            subject: "install size",
            status: install.pretty,
            color: install.color.replace("#", ""),
          },
          options
        );
      default:
        return badgen(errBadge, options);
    }
  }
  return badgen(errBadge, options);
}

export default handlePackagephobia;
