import config from "./config";
import Router from "cloudworker-router";
import * as handlers from "./mods";

const router = new Router();

async function routeHandler(ctx, handler) {
  const badge = await handler(ctx.params, ctx.query);

  ctx.body = badge;
  ctx.response.headers = {
    "content-type": "image/svg+xml",
    "Cache-Control": `max-age=${config.defaultCacheDurationSecond}`,
  };
  ctx.status = 200;
}

const handlerMap = {
  "/badge/:label/:status": handlers.badge,
  "/badge/:label/:status/:color": handlers.badge,
  "/npm/:topic/:pkgName": handlers.npm,
  "/github/:topic/:owner/:repo": handlers.github,
  "/bundlephobia/:topic/:pkgName": handlers.bundlephobia,
  "/packagephobia/:topic/:pkgName": handlers.packagephobia,
  "/packagephobia/:topic/:scope/:pkgName": handlers.packagephobia,
  "/travis/:user/:repo/:branch": handlers.travis,
  "/travis/:user/:repo": handlers.travis,
  "/appveyor/:account/:project/:branch": handlers.appveyor,
  "/appveyor/:account/:project": handlers.appveyor,
};

Object.entries(handlerMap).map(([path, handler]) => {
  router.get(path, (ctx) => routeHandler(ctx, handler));
});

addEventListener("fetch", (event) => {
  event.respondWith(router.resolve(event));
});
