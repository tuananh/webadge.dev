import serveBadge from '../helpers/serve-badge'

async function handleAppveyor(request) {
    const { pathname } = new URL(request.url)
    const parts = pathname.split('/')
    if (!(parts.length === 4 || parts.length == 5)) {
        throw new Error('bad request')
    }
    const account = parts[2]
    const project = parts[3]
    const branch = parts.length === 5 ? `/branch/` + parts[4] : ''
    const url = `https://ci.appveyor.com/api/projects/${account}/${project}${branch}`
    const resp = await fetch(url)
    if (resp.status === 200) {
        const { build } = await resp.json()
        return serveBadge({
            subject: 'appveyor',
            status: build.status,
            color: build.status === 'success' ? 'green' : 'red',
        })
    } else {
        return serveBadge({
            subject: 'appveyor',
            status: 'unknown',
            color: 'grey',
        })
    }
}

export default handleAppveyor
