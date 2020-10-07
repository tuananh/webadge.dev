import serveBadge from '../helpers/serve-badge'

async function handlePackagephobia(request) {
    const { pathname } = new URL(request.url)
    const parts = pathname.split('/')
    console.log(parts)
    if (parts.length > 3) {
        const pkgName = parts[3]
        const resp = await fetch(
            `https://bundlephobia.com/api/size?package=${pkgName}@latest&record=true`
        )
        const json = await resp.json()
        console.log(json)
        // TODO(anh): cache response
        // TODO pretty print size
        if (json.gzip) {
            const type = parts[2]
            switch (type) {
                case 'min':
                    return serveBadge({ label: type, status: (json.size / 1024).toFixed(0) + ' KB' })
                case 'minzip':
                    return serveBadge({ label: type, status: (json.gzip / 1024).toFixed(0) + ' KB' })
                case 'dependency-count':
                    return serveBadge({ label: type, status: json.dependencyCount })
                case 'tree-shaking':
                    return serveBadge({ label: type, status: json.dependencyCount })
                default:
                    return new Response('bad request')
            }
        } else {
            return new Response(
                'bad bad response from npm, got ' +
                    JSON.stringify(json, null, 2)
            )
        }
    }

    return new Response('bad bad request')
}

export default handlePackagephobia
