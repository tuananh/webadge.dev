import serveBadge from '../helpers/serve-badge'
import cachedExecute from '../helpers/cached-execute'

async function pkgJson (pkgName, tag = 'latest') {
    // const endpoint = `https://cdn.jsdelivr.net/npm/${pkg}@${tag}/package.json`
    const url = `https://unpkg.com/${pkgName}@${tag}/package.json`
    return (await fetch(url)).json()
  }

async function handleNpm(request) {
    const { pathname } = new URL(request.url)
    const parts = pathname.split('/')
    console.log(parts)
    if (parts.length > 3) {
        const type = parts[2]
        const pkgName = parts[3]
        switch (type) {
            case 'v':
                const val = await cachedExecute({
                    key: pathname,
                    json: true,
                    loadFn: async () => {
                        const resp = await fetch(
                            `https://registry.npmjs.org/-/package/${pkgName}/dist-tags`
                        )
                        if (resp.status === 200) {
                            return resp.json()
                        }
        
                        throw new Error('bad response from npm')
                    }
                })
                return generateBadge({ status: val.latest })
            case 'license':
                const info = await cachedExecute({
                    key: pathname,
                    json: true,
                    loadFn: async () => pkgJson(pkgName, 'latest')
                })
                return generateBadge({ label: 'license', status: info.license })
            case 'dw':
            case 'dm':
            case 'dy':
            case 'dt':
            default:
                throw new Error('bad request')
        }
    }

    return new Response('bad bad request')
}

const generateBadge = async ({ status } = {}) => {
    return serveBadge({
      label: 'npm',
      status
    })
}

export default handleNpm