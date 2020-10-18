import config from "./config";
import Router from "cloudworker-router";
import handleStaticBadge from "./mods/static";
import handleNpm from "./mods/npm";
import handleBundlephobia from "./mods/bundlephobia";
import handlePackagephobia from "./mods/packagephobia";
import handleTravisCI from "./mods/travis";
import handleAppveyor from "./mods/appveyor";
import handleGitHub from "./mods/github";

const router = new Router();

async function responseHandler(ctx, handler) {
  const badge = await handler(ctx.params);

  ctx.body = badge;
  ctx.response.headers = {
    "content-type": "image/svg+xml",
    "Cache-Control": `max-age=${config.defaultCacheDurationSecond}`,
  };
  ctx.status = 200;
}

router.get("/badge/:label/:status/:color", (ctx) =>
  responseHandler(ctx, handleStaticBadge)
);

addEventListener("fetch", (event) => {
  event.respondWith(router.resolve(event));
});

// async function handleRequest(request) {
//   const r = new Router();
//   r.get(".*/badge/.*", () => handleStaticBadge(request));
//   r.get(".*/npm/.*", () => handleNpm(request));
//   r.get(".*/bundlephobia/.*", () => handleBundlephobia(request));
//   r.get(".*/packagephobia/.*", () => handlePackagephobia(request));
//   r.get(".*/travis/.*", () => handleTravisCI(request));
//   r.get(".*/appveyor/.*", () => handleAppveyor(request));
//   r.get(".*/github/.*", () => handleGitHub(request));

//   r.get("/", () => new Response("default backend - 404"));

//   const resp = await r.route(request);
//   return resp;
// }
