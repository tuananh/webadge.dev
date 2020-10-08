import { badgen } from "badgen";
import ms from "ms";
import config from "../config";

const serveBadge = async (badgenOpts) => {
  const svg = badgen(badgenOpts);

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `max-age=${
        ms(config.defaultCacheDurationSecond) / 1000
      }`,
    },
  });
};

export default serveBadge;
