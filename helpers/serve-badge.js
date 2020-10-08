import { badgen } from "badgen";
import config from "../config";

const serveBadge = async (badgenOpts) => {
  const svg = badgen(badgenOpts);

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `max-age=${config.defaultCacheDurationSecond}`,
    },
  });
};

export default serveBadge;
