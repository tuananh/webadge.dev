worker-badge
============

Badges - built with Cloudflare Workers

A badget.net alternative. The reason I build this is badgen.net fails to load svg very often.

Most of the code is from [badgen repo](https://github.com/badgen/badgen.net). Credits to them for building a very nice service.

The goal is

* Eventually support all badges that supported by badgen.net
* Extremely fast.
* Exclusively use Cloudflare tech stack only for learning purpose.

## Currently supported badges

| Badge                      | Preview                                                                   | URL                                   |
|----------------------------|---------------------------------------------------------------------------|---------------------------------------|
| npm version                | ![](https://badge-staging.tuananh.net/npm/v/camaro)                       | `/npm/v/camaro`                       |
| npm license                | ![](https://badge-staging.tuananh.net/npm/license/camaro)                 | `/npm/license/camaro`                 |
| npm types                  | ![](https://badge-staging.tuananh.net/npm/types/camaro)                   | `/npm/types/camaro`                   |
| Travis CI (build)          | ![](https://badge-staging.tuananh.net/travis/tuananh/camaro)              | `/travis/tuananh/camaro`              |
| Travis CI (build - branch) | ![](https://badge-staging.tuananh.net/travis/tuananh/camaro/master)       | `/travis/tuananh/camaro`              |
| Appveyor (build)           | ![](https://badge-staging.tuananh.net/appveyor/tuananh/camaro)            | `/appveyor/tuananh/camaro`            |
| Appveyor (build - branch)  | ![](https://badge-staging.tuananh.net/appveyor/tuananh/camaro/master)     | `/appveyor/tuananh/camaro/master`     |
| bundlephobia min           | ![](https://badge-staging.tuananh.net/bundlephobia/min/camaro )           | `/bundlephobia/min/camaro`            |
| bundlephobia minzip        | ![](https://badge-staging.tuananh.net/bundlephobia/minzip/camaro )        | `/bundlephobia/min/camaro`            |
| bundlephobia tree-shaking  | ![](https://badge-staging.tuananh.net/bundlephobia/tree-shaking/camaro )  | `/bundlephobia/tree-shaking/camaro`   |
| bundlephobia tree-shaking  | ![](https://badge-staging.tuananh.net/bundlephobia/tree-shaking/date-fns) | `/bundlephobia/tree-shaking/date-fns` |
