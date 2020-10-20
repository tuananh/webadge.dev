import millify from "millify";
import badgen from "../helpers/badge";

// TODO(anh): cache stuff, maybe consider using this fech options provided by cf
// along side with cachedExecute?
// https://developers.cloudflare.com/workers/examples/cache-using-fetch
const errBadge = {
  subject: "docker",
  status: "unknown topic",
  color: "grey",
};
async function starPullHandler({ topic, scope, name }, options) {
  if (!["stars", "pulls"].includes(topic)) {
    return badgen(errBadge, options);
  }

  const url = `https://hub.docker.com/v2/repositories/${scope}/${name}`;
  const resp = await fetch(url);
  if (resp.status === 200) {
    const { pull_count, star_count } = await resp.json();

    switch (topic) {
      case "stars":
        return badgen(
          {
            subject: "docker stars",
            status: millify(star_count),
            color: "blue",
          },
          options
        );
      case "pulls":
        return badgen(
          {
            subject: "docker pulls",
            status: millify(pull_count),
            color: "blue",
          },
          options
        );
    }
  } else {
    return badgen(errBadge, options);
  }
}

async function sizeHandler(
  { scope, name, tag, architecture, variant },
  options
) {
  tag = tag || "latest";
  architecture = architecture || "amd64";
  variant = variant || "";
  const url = `https://hub.docker.com/v2/repositories/${scope}/${name}/tags`;
  let resp = await fetch(url);
  if (resp.status === 200) {
    let body = await resp.json();
    let results = [...body.results];
    while (body.next) {
      resp = await fetch(body.next);
      body = await resp.json();
      results = [...results, ...body.results];
    }

    const tagData = results.find((tagData) => tagData.name === tag);
    if (!tagData) {
      return badgen(
        {
          subject: "docker",
          status: "unknown tag",
          color: "grey",
        },
        options
      );
    }

    let imageData = tagData.images.find(
      (image) => image.architecture === architecture
    );

    if (!imageData) {
      return badgen(
        {
          subject: "docker",
          status: "unknown architecture",
          color: "grey",
        },
        options
      );
    }

    if (variant) {
      imageData = tagData.images
        .filter((image) => image.architecture === architecture)
        .find((image) => image.variant === variant);

      if (!imageData) {
        return badgen(
          {
            subject: "docker",
            status: "unknown variant",
            color: "grey",
          },
          options
        );
      }
    }

    const sizeInMegabytes = (imageData.size / 1024 / 1024).toFixed(2);

    return badgen(
      {
        subject: "docker image size",
        status: `${sizeInMegabytes} MB`,
        color: "blue",
      },
      options
    );
  }
}

export default { starPullHandler, sizeHandler };
