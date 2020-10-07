import serveBadge from '../helpers/serve-badge'

async function handleNpmVersion(request) {
    const { pathname } = new URL(request.url)
    const parts = pathname.split('/')
    console.log(parts)
    if (parts.length > 3) {
        const pkgName = parts[3]
        const resp = await fetch(
            `https://registry.npmjs.org/-/package/${pkgName}/dist-tags`
        )
        // TODO(anh): cache response
        if (resp.status === 200) {
            const json = await resp.json()
            return generateBadge({ status: json.latest })
        } else {
            return new Response(
                'bad bad response from npm, got ' +
                    JSON.stringify(json, null, 2)
            )
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

export default handleNpmVersion