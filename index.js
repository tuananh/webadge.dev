import Router from './router'
import handleNpm from './mods/npm'
import handlePackagephobia from './mods/bundlephobia'
import handleTravisCI from './mods/travis'

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const r = new Router()
  r.get('.*/npm/.*', () => handleNpm(request))
  r.get('.*/bundlephobia/.*', () => handlePackagephobia(request))
  r.get('.*/travis/.*', () => handleTravisCI(request))

  r.get('/', () => new Response('default backend - 404'))

  const resp = await r.route(request)
  return resp
}