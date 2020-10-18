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
// router.get("/npm/:topic/:pkgName", (ctx) =>
//   responseHandler(ctx, handleNpm)
// );
router.get("/github/:topic/:owner/:repo", (ctx) =>
  responseHandler(ctx, handleGitHub)
);
router.get("/bundlephobia/:topic/:pkgName", (ctx) =>
  responseHandler(ctx, handleBundlephobia)
);
// router.get("/packagephobia/:topic/:pkgName", (ctx) =>
//   responseHandler(ctx, handlePackagephobia)
// );
// router.get("/travis/:user/:repo/:branch", (ctx) =>
//   responseHandler(ctx, handleTravisCI)
// );
router.get("/appveyor/:account/:project/:branch", (ctx) =>
  responseHandler(ctx, handleAppveyor)
);
router.get("/appveyor/:account/:project", (ctx) =>
  responseHandler(ctx, handleAppveyor)
);

addEventListener("fetch", (event) => {
  event.respondWith(router.resolve(event));
});
