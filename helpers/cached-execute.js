import config from "../config";

async function cachedExecute({ key, loadFn, json }) {
  const ttlKey = `ttl:${key}`;
  let [value, ttl] = await Promise.all([badgeKV.get(key), badgeKV.get(ttlKey)]);
  const currentTimestamp = new Date().getTime();
  const shouldReload = value === null || ttl === null || ttl < currentTimestamp;
  if (shouldReload) {
    try {
      value = await loadFn();
      if (value) {
        // we don't expire key here. Instead, we use another key for storing ttl.
        // when the data is expired, we will serve the staled data and refresh in the background
        badgeKV.put(key, JSON.stringify(value));
        badgeKV.put(
          ttlKey,
          currentTimestamp + config.defaultCacheDurationSecond * 1000
        );
      }
      return value;
    } catch (err) {
      console.log("error in " + loadFn.name);
      throw err;
    }
  }
  if (json === true) {
    return JSON.parse(value);
  } else return value;
}

export default cachedExecute;
