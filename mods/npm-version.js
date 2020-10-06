async function handleNpmVersion(request) {
    const { pathname } = new URL(request.url)
    const parts = pathname.split('/')
    console.log(parts)
    if (parts.length > 3) {
        const pkgName = parts[3]
        const resp = await fetch(
            `https://registry.npmjs.org/-/package/${pkgName}/dist-tags`
        )
        const json = await resp.json()
        // TODO(anh): cache response
        if (json.latest) {
            return generateBadge({ left: 'npm', right: json.latest })
        } else {
            return new Response(
                'bad bad response from npm, got ' +
                    JSON.stringify(json, null, 2)
            )
        }
    }

    return new Response('bad bad request')
}

const generateBadge = async ({ left, right } = {}) => {
    let badge = `
  <svg width="80.4" height="20" viewBox="0 0 804 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="npm: v6.0.4">
  <title>${left}: ${right}</title>
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="m"><rect width="804" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#m)">
    <rect width="349" height="200" fill="#555"/>
    <rect width="455" height="200" fill="#08C" x="349"/>
    <rect width="804" height="200" fill="url(#a)"/>
  </g>
  <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="60" y="148" textLength="249" fill="#000" opacity="0.25">${left}</text>
    <text x="50" y="138" textLength="249">${left}</text>
    <text x="404" y="148" textLength="355" fill="#000" opacity="0.25">${right}</text>
    <text x="394" y="138" textLength="355">${right}</text>
  </g>
  
  </svg>
  `

    return new Response(badge, {
        status: 200,
        headers: { 'Content-Type': 'image/svg+xml' },
    })
}

export default handleNpmVersion