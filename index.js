import Router from './router'
import handleNpmVersion from './mods/npm-version'
import handlePackagephobiaPublishSize from './mods/bundlephobia'

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const r = new Router()
  r.get('.*/npm/v/.*', () => handleNpmVersion(request))
  r.get('.*/packagephobia/publish/.*', () => handlePackagephobiaPublishSize(request))

  r.get('/', () => new Response('default backend - 404'))

  const resp = await r.route(request)
  return resp
}