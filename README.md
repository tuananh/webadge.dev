🚥  worker-badge
================

It's just badge - built with Cloudflare Workers

I'm a huge fan of badgen.net. However, I find the images fail to load quite often. I want to use Cloudflare Workers (+ KV and maybe Unique durable object where feasible) to rebuild it.

Most of the code here is originally from [badgen repo](https://github.com/badgen/badgen.net). Credits to them for building a very nice service. 

The goal of this project is

- Eventually support all badges that supported by badgen.net
- Extremely fast but not try to refresh data as quickly as possible.
- Exclusively use Cloudflare tech stack only for learning purpose.

## Currently supported badges

|                            | Preview                                                                   | URL                                   |
| -------------------------- | ------------------------------------------------------------------------- | ------------------------------------- |
| npm version                | ![](https://badge-staging.tuananh.net/npm/v/camaro)                       | `/npm/v/camaro`                       |
| npm license                | ![](https://badge-staging.tuananh.net/npm/license/camaro)                 | `/npm/license/camaro`                 |
| npm types                  | ![](https://badge-staging.tuananh.net/npm/types/camaro)                   | `/npm/types/camaro`                   |
| Travis CI (build)          | ![](https://badge-staging.tuananh.net/travis/tuananh/camaro)              | `/travis/tuananh/camaro`              |
| Travis CI (build - branch) | ![](https://badge-staging.tuananh.net/travis/tuananh/camaro/master)       | `/travis/tuananh/camaro`              |
| Appveyor (build)           | ![](https://badge-staging.tuananh.net/appveyor/tuananh/camaro)            | `/appveyor/tuananh/camaro`            |
| Appveyor (build - branch)  | ![](https://badge-staging.tuananh.net/appveyor/tuananh/camaro/master)     | `/appveyor/tuananh/camaro/master`     |
| bundlephobia min           | ![](https://badge-staging.tuananh.net/bundlephobia/min/camaro)            | `/bundlephobia/min/camaro`            |
| bundlephobia minzip        | ![](https://badge-staging.tuananh.net/bundlephobia/minzip/camaro)         | `/bundlephobia/min/camaro`            |
| bundlephobia tree-shaking  | ![](https://badge-staging.tuananh.net/bundlephobia/tree-shaking/camaro)   | `/bundlephobia/tree-shaking/camaro`   |
| bundlephobia tree-shaking  | ![](https://badge-staging.tuananh.net/bundlephobia/tree-shaking/date-fns) | `/bundlephobia/tree-shaking/date-fns` |
| GitHub releases count      | ![](https://badge-staging.tuananh.net/github/releases/tuananh/camaro)     | `/github/releases/tuananh/camaro`     |
| GitHub latest release      | ![](https://badge-staging.tuananh.net/github/release/tuananh/camaro)      | `/github/release/tuananh/camaro`      |
| GitHub stars               | ![](https://badge-staging.tuananh.net/github/stars/tuananh/camaro)        | `/github/stars/tuananh/camaro`        |
