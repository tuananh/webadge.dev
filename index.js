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

async function routeHandler(ctx, handler) {
  const badge = await handler(ctx.params, ctx.query);

  ctx.body = badge;
  ctx.response.headers = {
    "content-type": "image/svg+xml",
    "Cache-Control": `max-age=${config.defaultCacheDurationSecond}`,
  };
  ctx.status = 200;
}

// TODO(anh): optional param is not supported yet hence we have to duplicate route
router.get("/badge/:label/:status", (ctx) =>
  routeHandler(ctx, handleStaticBadge)
);
router.get("/badge/:label/:status/:color", (ctx) =>
  routeHandler(ctx, handleStaticBadge)
);

router.get("/npm/:topic/:pkgName", (ctx) => routeHandler(ctx, handleNpm));
router.get("/github/:topic/:owner/:repo", (ctx) =>
  routeHandler(ctx, handleGitHub)
);
router.get("/bundlephobia/:topic/:pkgName", (ctx) =>
  routeHandler(ctx, handleBundlephobia)
);
router.get("/packagephobia/:topic/:pkgName", (ctx) =>
  routeHandler(ctx, handlePackagephobia)
);
router.get("/packagephobia/:topic/:scope/:pkgName", (ctx) =>
  routeHandler(ctx, handlePackagephobia)
);
router.get("/travis/:user/:repo/:branch", (ctx) =>
  routeHandler(ctx, handleTravisCI)
);
router.get("/travis/:user/:repo", (ctx) => routeHandler(ctx, handleTravisCI));
router.get("/appveyor/:account/:project/:branch", (ctx) =>
  routeHandler(ctx, handleAppveyor)
);
router.get("/appveyor/:account/:project", (ctx) =>
  routeHandler(ctx, handleAppveyor)
);

addEventListener("fetch", (event) => {
  event.respondWith(router.resolve(event));
});
