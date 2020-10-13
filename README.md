# 🚥 worker-badge

It's just badge - built with Cloudflare Workers

I'm a huge fan of badgen.net. However, I find the images fail to load quite often. I want to use Cloudflare Workers (+ KV and maybe Unique durable object where feasible) to rebuild it.

Most of the code here is originally from [badgen repo](https://github.com/badgen/badgen.net). Credits to them for building a very nice service.

The goal of this project is

- Eventually support all badges that supported by badgen.net
- Extremely fast but try to refresh data as quickly as possible.
- Exclusively use Cloudflare tech stack only for learning purpose.

## Contribute

- Install `@cloudflare/wrangler`.
- Make the changes.
- Test with `wrangler dev` or `wrangler preview`.

## Currently supported badges

### Live badges

|                            | Preview                                                                            | URL                                            |
| -------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| npm version                | ![](https://badge-staging.tuananh.net/npm/v/camaro)                                | `/npm/v/camaro`                                |
| npm license                | ![](https://badge-staging.tuananh.net/npm/license/camaro)                          | `/npm/license/camaro`                          |
| npm types                  | ![](https://badge-staging.tuananh.net/npm/types/camaro)                            | `/npm/types/camaro`                            |
| npm downloads per week     | ![](https://badge-staging.tuananh.net/npm/dw/lodash)                               | `/npm/dw/lodash`                               |
| npm downloads per month    | ![](https://badge-staging.tuananh.net/npm/dm/lodash)                               | `/npm/dm/lodash`                               |
| npm downloads per year     | ![](https://badge-staging.tuananh.net/npm/dy/lodash)                               | `/npm/dy/lodash`                               |
| npm downloads total        | ![](https://badge-staging.tuananh.net/npm/dt/lodash)                               | `/npm/dt/lodash`                               |
| Travis CI (build)          | ![](https://badge-staging.tuananh.net/travis/tuananh/camaro)                       | `/travis/tuananh/camaro`                       |
| Travis CI (build - branch) | ![](https://badge-staging.tuananh.net/travis/tuananh/camaro/master)                | `/travis/tuananh/camaro`                       |
| Appveyor (build)           | ![](https://badge-staging.tuananh.net/appveyor/tuananh/camaro)                     | `/appveyor/tuananh/camaro`                     |
| Appveyor (build - branch)  | ![](https://badge-staging.tuananh.net/appveyor/tuananh/camaro/master)              | `/appveyor/tuananh/camaro/master`              |
| bundlephobia min           | ![](https://badge-staging.tuananh.net/bundlephobia/min/camaro)                     | `/bundlephobia/min/camaro`                     |
| bundlephobia minzip        | ![](https://badge-staging.tuananh.net/bundlephobia/minzip/camaro)                  | `/bundlephobia/minzip/camaro`                  |
| bundlephobia tree-shaking  | ![](https://badge-staging.tuananh.net/bundlephobia/tree-shaking/camaro)            | `/bundlephobia/tree-shaking/camaro`            |
| packagephobia publish size | ![](https://badge-staging.tuananh.net/packagephobia/publish/camaro)                | `/packagephobia/publish/camaro`                |
| packagephobia install size | ![](https://badge-staging.tuananh.net/packagephobia/install/camaro)                | `/packagephobia/install/camaro`                |
| packagephobia scoped pkg   | ![](https://badge-staging.tuananh.net/packagephobia/publish/@tusbar/cache-control) | `/packagephobia/publish/@tusbar/cache-control` |
| bundlephobia tree-shaking  | ![](https://badge-staging.tuananh.net/bundlephobia/tree-shaking/date-fns)          | `/bundlephobia/tree-shaking/date-fns`          |
| GitHub releases count      | ![](https://badge-staging.tuananh.net/github/releases/tuananh/camaro)              | `/github/releases/tuananh/camaro`              |
| GitHub latest release      | ![](https://badge-staging.tuananh.net/github/release/tuananh/camaro)               | `/github/release/tuananh/camaro`               |
| GitHub stars               | ![](https://badge-staging.tuananh.net/github/stars/tuananh/camaro)                 | `/github/stars/tuananh/camaro`                 |

### Static badges

|                      | Preview                                                                | URL                                |
| -------------------- | ---------------------------------------------------------------------- | ---------------------------------- |
| Swift version        | ![](https://badge-staging.tuananh.net/badge/Swift/4.2/orange)          | `/badge/Swift/4.2/orange`          |
| License MIT          | ![](https://badge-staging.tuananh.net/badge/license/MIT/blue)          | `/badge/license/MIT/blue`          |
| Chat on Gitter       | ![](https://badge-staging.tuananh.net/badge/chat/on%20gitter/cyan)     | `/badge/chat/on%20gitter/cyan`     |
| star rating          | ![](https://badge-staging.tuananh.net/badge/stars/★★★★☆)               | `/badge/stars/★★★★☆`               |
| patron               | ![](https://badge-staging.tuananh.net/badge/become/a%20patron/F96854)  | `/badge/become/a%20patron/F96854`  |
| code style: standard | ![](https://badge-staging.tuananh.net/badge/code%20style/standard/f2a) | `/badge/code%20style/standard/f2a` |
