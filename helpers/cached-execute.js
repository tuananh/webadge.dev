import ms from "ms";
import config from "../config";

async function cachedExecute({ key, loadFn, json }) {
  const ttlKey = `ttl:${key}`;
  let [value, ttl] = await Promise.all([badgeKV.get(key), badgeKV.get(ttlKey)]);
  const currentTimestamp = new Date().getTime();
  const shouldReload = value === null || ttl === null || ttl < currentTimestamp;
  if (shouldReload) {
    try {
      // serving the staled data if it's not yet removed from workers kv
      if (value) {
        return json ? JSON.parse(value) : value;
      } else {
        // reload
        value = await loadFn();
        setTimeout(() => {
          if (value) {
            // we don't expire key here. Instead, we use another key for storing ttl.
            // when the data is expired, we will serve the staled data and refresh in the background
            badgeKV.put(key, JSON.stringify(value), {
              expirationTtl: config.staledDataTtl,
            });
            badgeKV.put(
              ttlKey,
              currentTimestamp + config.defaultCacheDurationSecond * 1000,
              {
                expirationTtl: config.staledDataTtl,
              }
            );
          }
        }, 0);
        return json ? JSON.parse(value) : value;
      }
    } catch (err) {
      console.log("error in " + loadFn.name);
      throw err;
    }
  }
  return json ? JSON.parse(value) : value;
}

export default cachedExecute;
