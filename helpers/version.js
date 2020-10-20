/**
 * Generate color from semver string.
 *
 * Examples
 *    '1.2.3' => 'blue'
 *    '0.1.2' => 'orange'
 *    '1.2.3-beta.0' => 'cyan'
 *    '1.2.3-alpha.0' => 'cyan'
 *    '1.2.3-canary.0' => 'cyan'
 *    '0.1.2-canary.0' => 'cyan'
 */
exports.versionColor = (version) => {
  if (version.match(/\b(alpha|beta|canary|rc|dev)/i)) {
    return "cyan";
  }

  if (version.startsWith("0.")) {
    return "orange";
  }

  return "blue";
};

/**
 * Formats the given version.
 *
 * Examples
 *   '1.2.3' => 'v1.2.3'
 *   'v1.2.3' => 'v1.2.3'
 *   'dev-master' => 'dev-master',
 *   '' => 'unknown'
 *   undefined => 'unknown'
 *   0 => 'v0'
 */
exports.version = (version) => {
  if (!version && version !== 0) {
    return "unknown";
  }

  version = String(version);

  const firstChar = version.charAt(0);
  if (firstChar === "v" || isNaN(parseInt(firstChar, 10))) {
    return version;
  }

  return `v${version}`;
};
