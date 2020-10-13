import Router from "./router";
import handleStaticBadge from "./mods/static";
import handleNpm from "./mods/npm";
import handleBundlephobia from "./mods/bundlephobia";
import handlePackagephobia from "./mods/packagephobia";
import handleTravisCI from "./mods/travis";
import handleAppveyor from "./mods/appveyor";
import handleGitHub from "./mods/github";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const r = new Router();
  r.get(".*/badge/.*", () => handleStaticBadge(request));
  r.get(".*/npm/.*", () => handleNpm(request));
  r.get(".*/bundlephobia/.*", () => handleBundlephobia(request));
  r.get(".*/packagephobia/.*", () => handlePackagephobia(request));
  r.get(".*/travis/.*", () => handleTravisCI(request));
  r.get(".*/appveyor/.*", () => handleAppveyor(request));
  r.get(".*/github/.*", () => handleGitHub(request));

  r.get("/", () => new Response("default backend - 404"));

  const resp = await r.route(request);
  return resp;
}
