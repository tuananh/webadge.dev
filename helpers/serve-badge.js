import { badgen } from 'badgen'

const serveBadge = async (badgenOpts) => {
    const svg = badgen(badgenOpts)

    return new Response(svg, {
        status: 200,
        headers: { 'Content-Type': 'image/svg+xml' },
    })
}

export default serveBadge