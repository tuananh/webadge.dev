import serveBadge from '../helpers/serve-badge'
import cachedExecute from '../helpers/cached-execute'

async function handleNpmVersion(request) {
    const { pathname } = new URL(request.url)
    const parts = pathname.split('/')
    console.log(parts)
    if (parts.length > 3) {
        const pkgName = parts[3]
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
        
    }

    return new Response('bad bad request')
}

const generateBadge = async ({ status } = {}) => {
    return serveBadge({
      label: 'npm',
      status
    })
}

export default handleNpmVersion