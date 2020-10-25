const errBadge = { subject: 'packagephobia', status: 'unknown', color: 'grey' };
async function handlePackagephobia(params) {
  const { topic, scope, name } = params;
  let { pkgName } = params;
  if (scope && name) {
    if (!scope.startsWith('@')) {
      return errBadge;
    }
    pkgName = `${scope}/${name}`;
  }
  const endpoint = `https://packagephobia.com/v2/api.json?p=${pkgName}`;
  const resp = await fetch(endpoint);

  if (resp.status === 200) {
    const { install, publish } = await resp.json();
    switch (topic) {
      case 'publish':
        return {
          subject: 'publish size',
          status: publish.pretty,
          color: publish.color.replace('#', ''),
        };
      case 'install':
        return {
          subject: 'install size',
          status: install.pretty,
          color: install.color.replace('#', ''),
        };
      default:
        return errBadge;
    }
  }
  return errBadge;
}

export default handlePackagephobia;
