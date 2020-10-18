import { badgen } from "badgen";

const errBadge = { subject: "packagephobia", status: "unknown", color: "grey" };
async function handlePackagephobia(request) {
  const { pathname } = new URL(request.url);
  const parts = pathname.split("/");

  if (parts.length > 3) {
    const topic = parts[2];
    let pkgName = parts[3];
    if (parts.length === 5) {
      const scope = parts[3];
      if (!scope.startsWith("@")) {
        return badgen(errBadge);
      }
      const name = parts[4];
      pkgName = scope + "/" + name;
    }
    const endpoint = `https://packagephobia.com/v2/api.json?p=${pkgName}`;
    const resp = await fetch(endpoint);

    if (resp.status === 200) {
      const { install, publish } = await resp.json();
      switch (topic) {
        case "publish":
          return badgen({
            subject: "publish size",
            status: publish.pretty,
            color: publish.color.replace("#", ""),
          });
        case "install":
          return badgen({
            subject: "install size",
            status: install.pretty,
            color: install.color.replace("#", ""),
          });
        default:
          return badgen(errBadge);
      }
    }
    return badgen(errBadge);
  }

  return badgen(errBadge);
}

export default handlePackagephobia;
