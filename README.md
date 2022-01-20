# 🚥 WeBadge.dev

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

|                                               | Preview                                                                              | URL                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| npm version                                   | ![](https://webadge.tuananh.net/npm/v/camaro)                                        | `/npm/v/camaro`                                       |
| npm license                                   | ![](https://webadge.tuananh.net/npm/license/camaro)                                  | `/npm/license/camaro`                                 |
| npm types                                     | ![](https://webadge.tuananh.net/npm/types/camaro)                                    | `/npm/types/camaro`                                   |
| npm downloads per week                        | ![](https://webadge.tuananh.net/npm/dw/lodash)                                       | `/npm/dw/lodash`                                      |
| npm downloads per month                       | ![](https://webadge.tuananh.net/npm/dm/lodash)                                       | `/npm/dm/lodash`                                      |
| npm downloads per year                        | ![](https://webadge.tuananh.net/npm/dy/lodash)                                       | `/npm/dy/lodash`                                      |
| npm downloads total                           | ![](https://webadge.tuananh.net/npm/dt/lodash)                                       | `/npm/dt/lodash`                                      |
| Travis CI (build)                             | ![](https://webadge.tuananh.net/travis/tuananh/camaro)                               | `/travis/tuananh/camaro`                              |
| Travis CI (build - branch)                    | ![](https://webadge.tuananh.net/travis/tuananh/camaro/master)                        | `/travis/tuananh/camaro`                              |
| Appveyor (build)                              | ![](https://webadge.tuananh.net/appveyor/tuananh/camaro)                             | `/appveyor/tuananh/camaro`                            |
| Appveyor (build - branch)                     | ![](https://webadge.tuananh.net/appveyor/tuananh/camaro/master)                      | `/appveyor/tuananh/camaro/master`                     |
| bundlephobia min                              | ![](https://webadge.tuananh.net/bundlephobia/min/camaro)                             | `/bundlephobia/min/camaro`                            |
| bundlephobia minzip                           | ![](https://webadge.tuananh.net/bundlephobia/minzip/camaro)                          | `/bundlephobia/minzip/camaro`                         |
| bundlephobia tree-shaking                     | ![](https://webadge.tuananh.net/bundlephobia/tree-shaking/camaro)                    | `/bundlephobia/tree-shaking/camaro`                   |
| bundlephobia tree-shaking                     | ![](https://webadge.tuananh.net/bundlephobia/tree-shaking/date-fns)                  | `/bundlephobia/tree-shaking/date-fns`                 |
| packagephobia publish size                    | ![](https://webadge.tuananh.net/packagephobia/publish/camaro)                        | `/packagephobia/publish/camaro`                       |
| packagephobia install size                    | ![](https://webadge.tuananh.net/packagephobia/install/camaro)                        | `/packagephobia/install/camaro`                       |
| packagephobia scoped pkg                      | ![](https://webadge.tuananh.net/packagephobia/publish/@tusbar/cache-control)         | `/packagephobia/publish/@tusbar/cache-control`        |
| GitHub releases count                         | ![](https://webadge.tuananh.net/github/releases/tuananh/camaro)                      | `/github/releases/tuananh/camaro`                     |
| GitHub tags count                             | ![](https://webadge.tuananh.net/github/tags/tuananh/camaro)                          | `/github/tags/tuananh/camaro`                         |
| GitHub latest release                         | ![](https://webadge.tuananh.net/github/release/tuananh/camaro)                       | `/github/release/tuananh/camaro`                      |
| GitHub stars                                  | ![](https://webadge.tuananh.net/github/stars/tuananh/camaro)                         | `/github/stars/tuananh/camaro`                        |
| GitHub watchers                               | ![](https://webadge.tuananh.net/github/watchers/tuananh/camaro)                      | `/github/watchers/tuananh/camaro`                     |
| GitHub forks                                  | ![](https://webadge.tuananh.net/github/forks/tuananh/camaro)                         | `/github/forks/tuananh/camaro`                        |
| GitHub issues                                 | ![](https://webadge.tuananh.net/github/issues/tuananh/camaro)                        | `/github/issues/tuananh/camaro`                       |
| GitHub open issues                            | ![](https://webadge.tuananh.net/github/open-issues/tuananh/camaro)                   | `/github/open-issues/tuananh/camaro`                  |
| GitHub closed issues                          | ![](https://webadge.tuananh.net/github/closed-issues/tuananh/camaro)                 | `/github/closed-issues/tuananh/camaro`                |
| GitHub pull requests                          | ![](https://webadge.tuananh.net/github/prs/tuananh/camaro)                           | `/github/prs/tuananh/camaro`                          |
| GitHub open pull requests                     | ![](https://webadge.tuananh.net/github/open-prs/tuananh/camaro)                      | `/github/open-prs/tuananh/camaro`                     |
| GitHub closed pull requests                   | ![](https://webadge.tuananh.net/github/closed-prs/tuananh/camaro)                    | `/github/closed-prs/tuananh/camaro`                   |
| GitHub merged pull requests                   | ![](https://webadge.tuananh.net/github/merged-prs/tuananh/camaro)                    | `/github/merged-prs/tuananh/camaro`                   |
| VS Marketplace version                        | ![](https://webadge.tuananh.net/vs-marketplace/v/buianhthang.xml2json)               | `/vs-marketplace/v/buianhthang.xml2json`              |
| VS Marketplace installs                       | ![](https://webadge.tuananh.net/vs-marketplace/i/buianhthang.xml2json)               | `/vs-marketplace/i/buianhthang.xml2json`              |
| VS Marketplace downloads                      | ![](https://webadge.tuananh.net/vs-marketplace/d/buianhthang.xml2json)               | `/vs-marketplace/d/buianhthang.xml2json`              |
| VS Marketplace rating                         | ![](https://webadge.tuananh.net/vs-marketplace/rating/buianhthang.xml2json)          | `/vs-marketplace/rating/buianhthang.xml2json`         |
| Docker pulls                                  | ![](https://webadge.tuananh.net/docker/pulls/library/ubuntu)                         | `/docker/pulls/library/ubuntu`                        |
| Docker size                                   | ![](https://webadge.tuananh.net/docker/size/library/ubuntu)                          | `/docker/size/library/ubuntu`                         |
| Docker star                                   | ![](https://webadge.tuananh.net/docker/stars/library/ubuntu)                         | `/docker/stars/library/ubuntu`                        |
| Docker stars (icon & label)                   | ![](https://webadge.tuananh.net/docker/stars/library/ubuntu?icon=docker?label=stars) | `/docker/stars/library/mongo?icon=docker&label=stars` |
| Docker size (scoped/tag/architecture)         | ![](https://webadge.tuananh.net//docker/size/lukechilds/bitcoind/latest/amd64)       | `/docker/size/lukechilds/bitcoind/latest/amd64`       |
| Docker size (scoped/tag/architecture/variant) | ![](https://webadge.tuananh.net/docker/size/lucashalbert/curl/latest/arm/v6)         | `/docker/size/lucashalbert/curl/latest/arm/v6`        |

### Static badges

|                      | Preview                                                          | URL                                |
| -------------------- | ---------------------------------------------------------------- | ---------------------------------- |
| Swift version        | ![](https://webadge.tuananh.net/badge/Swift/4.2/orange)          | `/badge/Swift/4.2/orange`          |
| License MIT          | ![](https://webadge.tuananh.net/badge/license/MIT/blue)          | `/badge/license/MIT/blue`          |
| Chat on Gitter       | ![](https://webadge.tuananh.net/badge/chat/on%20gitter/cyan)     | `/badge/chat/on%20gitter/cyan`     |
| star rating          | ![](https://webadge.tuananh.net/badge/stars/★★★★☆)               | `/badge/stars/★★★★☆`               |
| patron               | ![](https://webadge.tuananh.net/badge/become/a%20patron/F96854)  | `/badge/become/a%20patron/F96854`  |
| code style: standard | ![](https://webadge.tuananh.net/badge/code%20style/standard/f2a) | `/badge/code%20style/standard/f2a` |

## Other styling options

|               | Preview                                                                | URL                                      |
| ------------- | ---------------------------------------------------------------------- | ---------------------------------------- |
| flat style    | ![](https://webadge.tuananh.net/badge/Swift/4.2/orange?style=flat)     | `/badge/Swift/4.2/orange?style=flat`     |
| color         | ![](https://webadge.tuananh.net/npm/v/camaro?color=yellow)             | `/npm/v/camaro?color=yellow`             |
| label         | ![](https://webadge.tuananh.net/npm/v/camaro?label=npm%20registry)     | `/npm/v/camaro?label=npm%20registry`     |
| labelColor    | ![](https://webadge.tuananh.net/npm/v/camaro?labelColor=red)           | `/npm/v/camaro?labelColor=red `          |
| list          | ![](https://webadge.tuananh.net/badge/registry/npm,github/green?list=) | `/badge/registry/npm,github/green?list=` |
| icon          | ![](https://webadge.tuananh.net/npm/v/camaro?icon=)                    | `/npm/v/camaro?icon=`                    |
| icon (custom) | ![](https://webadge.tuananh.net/npm/v/camaro?icon=github)              | `/npm/v/camaro?icon=github`              |
