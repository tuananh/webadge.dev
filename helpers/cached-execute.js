import config from "../config";

function parseJsonOrNot(value, jsonFlag) {
  if (jsonFlag) {
    if (typeof value === "string") {
      return JSON.parse(value);
    }
  }
  return value;
}
async function cachedExecute({ key, loadFn, json }) {
  const ttlKey = `ttl:${key}`;
  let [value, ttl] = await Promise.all([badgeKV.get(key), badgeKV.get(ttlKey)]);
  const currentTimestamp = new Date().getTime();
  const shouldReload = value === null || ttl === null || ttl < currentTimestamp;

  async function reload() {
    const newVal = await loadFn();
    setTimeout(() => {
      if (newVal) {
        // we don't expire key here. Instead, we use another key for storing ttl.
        // when the data is expired, we will serve the staled data and refresh in the background
        badgeKV.put(key, JSON.stringify(newVal), {
          expirationTtl: config.maxCacheAgeSecond,
        });
        badgeKV.put(
          ttlKey,
          currentTimestamp + config.defaultCacheDurationSecond * 1000,
          {
            expirationTtl: config.maxCacheAgeSecond,
          }
        );
      }
    }, 0);

    return newVal;
  }

  if (shouldReload) {
    try {
      if (value) {
        // cache is there but staled
        reload();
        return parseJsonOrNot(value, json);
      } else {
        // cache not found
        const newVal = await reload();
        return parseJsonOrNot(newVal, json);
      }
    } catch (err) {
      console.log("error in " + loadFn.name);
      throw err;
    }
  }
  return parseJsonOrNot(value, json);
}

export default cachedExecute;
