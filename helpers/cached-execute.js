import config from '../config'

async function cachedExecute({ key, loadFn, json }) {
    let value = await badgeKV.get(key)
    if (value === null) {
        try {
            value = await loadFn()
            if (value) {
                badgeKV.put(key, JSON.stringify(value), {
                    expirationTtl: config.defaultCacheDurationSecond
                })
            }
            return value
        } catch (err) {
            console.log('error in ' + loadFn.name)
            throw err
        }
    }
    if (json === true) {
        return JSON.parse(value)
    } else return value
    
}

export default cachedExecute
