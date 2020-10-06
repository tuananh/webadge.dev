async function handlePackagephobiaPublishSize(request) {
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
            return generateBadge({ size: '0 KB' })
        } else {
            return new Response(
                'bad bad response from npm, got ' +
                    JSON.stringify(json, null, 2)
            )
        }
    }

    return new Response('bad bad request')
}

const generateBadge = async ({ size } = {}) => {
    let badge = `
    <svg width="123.4" height="20" viewBox="0 0 1234 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="publish size: ${size}">
  <title>publish size: ${size}</title>
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="m"><rect width="1234" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#m)">
    <rect width="745" height="200" fill="#555"/>
    <rect width="489" height="200" fill="#97CA00" x="745"/>
    <rect width="1234" height="200" fill="url(#a)"/>
  </g>
  <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="60" y="148" textLength="645" fill="#000" opacity="0.25">publish size</text>
    <text x="50" y="138" textLength="645">publish size</text>
    <text x="800" y="148" textLength="389" fill="#000" opacity="0.25">${size}</text>
    <text x="790" y="138" textLength="389">${size}</text>
  </g>
  
</svg>
  `

    return new Response(badge, {
        status: 200,
        headers: { 'Content-Type': 'image/svg+xml' },
    })
}

export default handlePackagephobiaPublishSize