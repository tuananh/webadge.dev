import config from "./config";
import badgen from "./helpers/badge";
import cachedExecute from "./helpers/cached-execute";
import Router from "cloudworker-router";
import * as handlers from "./mods";

const router = new Router();

async function routeHandler(ctx, handler) {
  const { pathname } = new URL(ctx.request.href);
  const body = await cachedExecute({
    key: "test:" + pathname,
    loadFn: async () => {
      const badgeOpts = await handler(ctx.params);
      return badgen(badgeOpts, ctx.query);
    },
  });
  ctx.body = body;
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

  "/vs-marketplace/:topic/:pkgName": handlers.vsmarketplace,

  "/docker/:topic/:scope/:name": handlers.docker.starPullHandler,
  "/docker/size/:scope/:name/:tag": handlers.docker.sizeHandler,
  "/docker/size/:scope/:name/:tag/:architecture": handlers.docker.sizeHandler,
  "/docker/size/:scope/:name/:tag/:architecture/:variant":
    handlers.docker.sizeHandler,
};

Object.entries(handlerMap).map(([path, handler]) => {
  router.get(path, (ctx) => routeHandler(ctx, handler));
});

addEventListener("fetch", (event) => {
  event.respondWith(router.resolve(event));
});
