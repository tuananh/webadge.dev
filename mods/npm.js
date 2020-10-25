import millify from 'millify';
import cachedExecute from '../helpers/cached-execute';

// eslint-disable-next-line
async function getDownloads(period, pkgName, tag = "latest") {
  const urlFragments = ['https://api.npmjs.org/downloads'];
  const isTotal = period === 'total';

  if (isTotal) {
    urlFragments.push(`range/2005-01-01:${new Date().getFullYear() + 1}-01-01`);
  } else {
    urlFragments.push(`point/${period}`);
  }

  urlFragments.push(pkgName);
  // endpoint.push(tag)
  const url = urlFragments.join('/');
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    console.log('error fetch from npm', err);
  }
  if (resp && resp.status === 200) {
    const { downloads } = await resp.json();
    const count = typeof downloads === 'number'
      ? downloads
      : downloads.reduce((accu, { downloads: dl }) => accu + dl, 0);

    const per = isTotal ? '' : period.replace('last-', '/');
    return {
      subject: 'downloads',
      status: millify(count) + per,
      color: 'green',
    };
  }
  return {
    subject: 'downloads',
    status: 'unknown',
    color: 'grey',
  };
}

async function pkgJson(pkgName, tag = 'latest') {
  // const endpoint = `https://cdn.jsdelivr.net/npm/${pkg}@${tag}/package.json`
  const url = `https://unpkg.com/${pkgName}@${tag}/package.json`;
  return (await fetch(url)).json();
}

async function typesDefinition(pkgName, tag = 'latest') {
  let meta = await pkgJson(pkgName, tag);

  if (typeof meta.types === 'string' || typeof meta.typings === 'string') {
    return {
      subject: 'types',
      status: 'included',
      color: '0074c1',
    };
  }

  const hasIndexDTSFile = await fetch(
    `https://unpkg.com/${pkgName}/index.d.ts`,
    { method: 'HEAD' },
  )
    .then((res) => res.statusCode === 200)
    .catch((e) => {
      console.log('error while fetching index.d.ts', e.message);
      return {
        subject: 'types',
        status: 'missing',
        color: 'orange',
      };
    });

  if (hasIndexDTSFile) {
    return {
      subject: 'types',
      status: 'included',
      color: '0074c1',
    };
  }

  const typesPkg = `@types/${
    pkgName.charAt(0) === '@' ? pkgName.slice(1).replace('/', '__') : pkgName}`;
  meta = await pkgJson(typesPkg).catch((e) => {
    console.log('error while fetching pkgjson', e.message);
  });

  if (meta && meta.name === typesPkg) {
    return {
      subject: 'types',
      status: meta.name,
      color: 'cyan',
    };
  }

  return {
    subject: 'types',
    status: 'missing',
    color: 'orange',
  };
}

async function handleNpm({ topic, pkgName }) {
  const pathname = ['npm', topic, pkgName].join('/');
  const unknownErr = { subject: 'npm', status: 'unknown', color: 'grey' };

  let info;
  switch (topic) {
    case 'v':
      try {
        info = await cachedExecute({
          key: pathname,
          json: true,
          loadFn: async () => {
            const resp = await fetch(
              `https://registry.npmjs.org/-/package/${pkgName}/dist-tags`,
            );
            if (resp.status === 200) {
              return resp.json();
            }

            if (resp.status === 404) {
              throw new Error('pkg not found');
            }

            throw new Error('bad response from npm');
          },
        });

        return { subject: 'npm', status: info.latest };
      } catch (err) {
        if (err.message === 'pkg not found') {
          return { subject: 'npm', status: 'pkg not found' };
        }
        return unknownErr;
      }
    case 'license':
      info = await cachedExecute({
        key: pathname,
        json: true,
        loadFn: async () => pkgJson(pkgName, 'latest'),
      });
      return { subject: 'license', status: info.license };
    case 'dt':
    case 'dd':
    case 'dw':
    case 'dm':
    case 'dy':
      // eslint-disable-next-line
      const map = {
        dt: 'total',
        dd: 'last-day',
        dw: 'last-week',
        dm: 'last-month',
        dy: 'last-year',
      };
      info = await cachedExecute({
        key: pathname,
        json: true,
        loadFn: async () => getDownloads(map[topic], pkgName),
      });
      return info;
    case 'types':
      info = await cachedExecute({
        key: pathname,
        json: true,
        loadFn: async () => typesDefinition(pkgName, 'latest'),
      });
      return { ...info, subject: 'types' };
    default:
      return unknownErr;
  }
}

export default handleNpm;
