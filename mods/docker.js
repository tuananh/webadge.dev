import millify from 'millify';

const errBadge = {
  subject: 'docker',
  status: 'unknown error',
  color: 'grey',
};

async function sizeHandler({
  scope, name, tag, architecture, variant,
}) {
  /* eslint-disable */
  tag = tag || "latest";
  architecture = architecture || "amd64";
  variant = variant || "";
  /* eslint-enable */
  const url = `https://hub.docker.com/v2/repositories/${scope}/${name}/tags`;
  let resp = await fetch(url);
  if (resp.status === 200) {
    let body = await resp.json();
    let results = [...body.results];
    while (body.next) {
      resp = await fetch(body.next); // eslint-disable-line
      body = await resp.json(); // eslint-disable-line
      results = [...results, ...body.results];
    }

    const tagData = results.find((i) => i.name === tag);
    if (!tagData) {
      return {
        subject: 'docker',
        status: 'unknown tag',
        color: 'grey',
      };
    }

    let imageData = tagData.images.find(
      (image) => image.architecture === architecture,
    );

    if (!imageData) {
      return {
        subject: 'docker',
        status: 'unknown architecture',
        color: 'grey',
      };
    }

    if (variant) {
      imageData = tagData.images
        .filter((image) => image.architecture === architecture)
        .find((image) => image.variant === variant);

      if (!imageData) {
        return {
          subject: 'docker',
          status: 'unknown variant',
          color: 'grey',
        };
      }
    }

    const sizeInMegabytes = (imageData.size / 1024 / 1024).toFixed(2);

    return {
      subject: 'docker image size',
      status: `${sizeInMegabytes} MB`,
      color: 'blue',
    };
  }

  return errBadge;
}

async function dockerHandler({
  topic,
  scope,
  name,
  tag,
  architecture,
  variant,
}) {
  if (!['stars', 'pulls', 'size'].includes(topic)) {
    return errBadge;
  }

  const url = `https://hub.docker.com/v2/repositories/${scope}/${name}`;
  const resp = await fetch(url);
  if (resp.status === 200) {
    const { pull_count: pullCount, star_count: starCount } = await resp.json();

    switch (topic) {
      case 'stars':
        return {
          subject: 'docker stars',
          status: millify(starCount),
          color: 'blue',
        };
      case 'pulls':
        return {
          subject: 'docker pulls',
          status: millify(pullCount),
          color: 'blue',
        };
      case 'size':
        return sizeHandler({
          scope, name, tag, architecture, variant,
        });
      default:
        return errBadge;
    }
  } else {
    return errBadge;
  }
}

export default dockerHandler;
