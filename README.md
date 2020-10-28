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
| npm version                                   | ![](https://staging.webadge.dev/npm/v/camaro)                                        | `/npm/v/camaro`                                       |
| npm license                                   | ![](https://staging.webadge.dev/npm/license/camaro)                                  | `/npm/license/camaro`                                 |
| npm types                                     | ![](https://staging.webadge.dev/npm/types/camaro)                                    | `/npm/types/camaro`                                   |
| npm downloads per week                        | ![](https://staging.webadge.dev/npm/dw/lodash)                                       | `/npm/dw/lodash`                                      |
| npm downloads per month                       | ![](https://staging.webadge.dev/npm/dm/lodash)                                       | `/npm/dm/lodash`                                      |
| npm downloads per year                        | ![](https://staging.webadge.dev/npm/dy/lodash)                                       | `/npm/dy/lodash`                                      |
| npm downloads total                           | ![](https://staging.webadge.dev/npm/dt/lodash)                                       | `/npm/dt/lodash`                                      |
| Travis CI (build)                             | ![](https://staging.webadge.dev/travis/tuananh/camaro)                               | `/travis/tuananh/camaro`                              |
| Travis CI (build - branch)                    | ![](https://staging.webadge.dev/travis/tuananh/camaro/master)                        | `/travis/tuananh/camaro`                              |
| Appveyor (build)                              | ![](https://staging.webadge.dev/appveyor/tuananh/camaro)                             | `/appveyor/tuananh/camaro`                            |
| Appveyor (build - branch)                     | ![](https://staging.webadge.dev/appveyor/tuananh/camaro/master)                      | `/appveyor/tuananh/camaro/master`                     |
| bundlephobia min                              | ![](https://staging.webadge.dev/bundlephobia/min/camaro)                             | `/bundlephobia/min/camaro`                            |
| bundlephobia minzip                           | ![](https://staging.webadge.dev/bundlephobia/minzip/camaro)                          | `/bundlephobia/minzip/camaro`                         |
| bundlephobia tree-shaking                     | ![](https://staging.webadge.dev/bundlephobia/tree-shaking/camaro)                    | `/bundlephobia/tree-shaking/camaro`                   |
| bundlephobia tree-shaking                     | ![](https://staging.webadge.dev/bundlephobia/tree-shaking/date-fns)                  | `/bundlephobia/tree-shaking/date-fns`                 |
| packagephobia publish size                    | ![](https://staging.webadge.dev/packagephobia/publish/camaro)                        | `/packagephobia/publish/camaro`                       |
| packagephobia install size                    | ![](https://staging.webadge.dev/packagephobia/install/camaro)                        | `/packagephobia/install/camaro`                       |
| packagephobia scoped pkg                      | ![](https://staging.webadge.dev/packagephobia/publish/@tusbar/cache-control)         | `/packagephobia/publish/@tusbar/cache-control`        |
| GitHub releases count                         | ![](https://staging.webadge.dev/github/releases/tuananh/camaro)                      | `/github/releases/tuananh/camaro`                     |
| GitHub tags count                             | ![](https://staging.webadge.dev/github/tags/tuananh/camaro)                          | `/github/tags/tuananh/camaro`                         |
| GitHub latest release                         | ![](https://staging.webadge.dev/github/release/tuananh/camaro)                       | `/github/release/tuananh/camaro`                      |
| GitHub stars                                  | ![](https://staging.webadge.dev/github/stars/tuananh/camaro)                         | `/github/stars/tuananh/camaro`                        |
| GitHub watchers                               | ![](https://staging.webadge.dev/github/watchers/tuananh/camaro)                      | `/github/watchers/tuananh/camaro`                     |
| GitHub forks                                  | ![](https://staging.webadge.dev/github/forks/tuananh/camaro)                         | `/github/forks/tuananh/camaro`                        |
| GitHub issues                                 | ![](https://staging.webadge.dev/github/issues/tuananh/camaro)                        | `/github/issues/tuananh/camaro`                       |
| GitHub open issues                            | ![](https://staging.webadge.dev/github/open-issues/tuananh/camaro)                   | `/github/open-issues/tuananh/camaro`                  |
| GitHub closed issues                          | ![](https://staging.webadge.dev/github/closed-issues/tuananh/camaro)                 | `/github/closed-issues/tuananh/camaro`                |
| GitHub pull requests                          | ![](https://staging.webadge.dev/github/prs/tuananh/camaro)                           | `/github/prs/tuananh/camaro`                          |
| GitHub open pull requests                     | ![](https://staging.webadge.dev/github/open-prs/tuananh/camaro)                      | `/github/open-prs/tuananh/camaro`                     |
| GitHub closed pull requests                   | ![](https://staging.webadge.dev/github/closed-prs/tuananh/camaro)                    | `/github/closed-prs/tuananh/camaro`                   |
| GitHub merged pull requests                   | ![](https://staging.webadge.dev/github/merged-prs/tuananh/camaro)                    | `/github/merged-prs/tuananh/camaro`                   |
| VS Marketplace version                        | ![](https://staging.webadge.dev/vs-marketplace/v/buianhthang.xml2json)               | `/vs-marketplace/v/buianhthang.xml2json`              |
| VS Marketplace installs                       | ![](https://staging.webadge.dev/vs-marketplace/i/buianhthang.xml2json)               | `/vs-marketplace/i/buianhthang.xml2json`              |
| VS Marketplace downloads                      | ![](https://staging.webadge.dev/vs-marketplace/d/buianhthang.xml2json)               | `/vs-marketplace/d/buianhthang.xml2json`              |
| VS Marketplace rating                         | ![](https://staging.webadge.dev/vs-marketplace/rating/buianhthang.xml2json)          | `/vs-marketplace/rating/buianhthang.xml2json`         |
| Docker pulls                                  | ![](https://staging.webadge.dev/docker/pulls/library/ubuntu)                         | `/docker/pulls/library/ubuntu`                        |
| Docker size                                   | ![](https://staging.webadge.dev/docker/size/library/ubuntu)                          | `/docker/size/library/ubuntu`                         |
| Docker star                                   | ![](https://staging.webadge.dev/docker/stars/library/ubuntu)                         | `/docker/stars/library/ubuntu`                        |
| Docker stars (icon & label)                   | ![](https://staging.webadge.dev/docker/stars/library/ubuntu?icon=docker?label=stars) | `/docker/stars/library/mongo?icon=docker&label=stars` |
| Docker size (scoped/tag/architecture)         | ![](https://staging.webadge.dev//docker/size/lukechilds/bitcoind/latest/amd64)       | `/docker/size/lukechilds/bitcoind/latest/amd64`       |
| Docker size (scoped/tag/architecture/variant) | ![](https://staging.webadge.dev/docker/size/lucashalbert/curl/latest/arm/v6)         | `/docker/size/lucashalbert/curl/latest/arm/v6`        |

### Static badges

|                      | Preview                                                          | URL                                |
| -------------------- | ---------------------------------------------------------------- | ---------------------------------- |
| Swift version        | ![](https://staging.webadge.dev/badge/Swift/4.2/orange)          | `/badge/Swift/4.2/orange`          |
| License MIT          | ![](https://staging.webadge.dev/badge/license/MIT/blue)          | `/badge/license/MIT/blue`          |
| Chat on Gitter       | ![](https://staging.webadge.dev/badge/chat/on%20gitter/cyan)     | `/badge/chat/on%20gitter/cyan`     |
| star rating          | ![](https://staging.webadge.dev/badge/stars/★★★★☆)               | `/badge/stars/★★★★☆`               |
| patron               | ![](https://staging.webadge.dev/badge/become/a%20patron/F96854)  | `/badge/become/a%20patron/F96854`  |
| code style: standard | ![](https://staging.webadge.dev/badge/code%20style/standard/f2a) | `/badge/code%20style/standard/f2a` |

## Other styling options

|               | Preview                                                                | URL                                      |
| ------------- | ---------------------------------------------------------------------- | ---------------------------------------- |
| flat style    | ![](https://staging.webadge.dev/badge/Swift/4.2/orange?style=flat)     | `/badge/Swift/4.2/orange?style=flat`     |
| color         | ![](https://staging.webadge.dev/npm/v/camaro?color=yellow)             | `/npm/v/camaro?color=yellow`             |
| label         | ![](https://staging.webadge.dev/npm/v/camaro?label=npm%20registry)     | `/npm/v/camaro?label=npm%20registry`     |
| labelColor    | ![](https://staging.webadge.dev/npm/v/camaro?labelColor=red)           | `/npm/v/camaro?labelColor=red `          |
| list          | ![](https://staging.webadge.dev/badge/registry/npm,github/green?list=) | `/badge/registry/npm,github/green?list=` |
| icon          | ![](https://staging.webadge.dev/npm/v/camaro?icon=)                    | `/npm/v/camaro?icon=`                    |
| icon (custom) | ![](https://staging.webadge.dev/npm/v/camaro?icon=github)              | `/npm/v/camaro?icon=github`              |
