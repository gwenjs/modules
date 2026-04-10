# GWEN Modules

[![CI](https://github.com/gwenjs/modules/actions/workflows/ci.yml/badge.svg)](https://github.com/gwenjs/modules/actions/workflows/ci.yml)

> The official module registry for the GWEN game engine — powering `gwen add`

## What is this?

[GWEN](https://github.com/gwenjs/gwen) is a composable web game engine built for web developers. This repository is the centralized registry of **official** and **community** modules that extend GWEN.

The GWEN CLI consumes this registry to discover and install modules:

```bash
gwen add physics2d
```

## Browse Modules

Explore all available modules on the registry website:

**[gwenjs.github.io/modules](https://gwenjs.github.io/modules/)**

## Contributing

Want your module listed in the registry?

1. Open an issue using the [Module Submission](https://github.com/gwenjs/modules/issues/new?template=module-submission.yml) template
2. A maintainer will review your submission
3. If approved, open a PR adding your entry to [`registry.json`](./registry.json)
4. CI validates the schema automatically and the PR is merged

See the [contributing guide](https://gwenjs.github.io/modules/contributing) for the full process and `registry.json` format.

## Development

```bash
pnpm validate   # validate registry.json against the schema
pnpm docs:dev   # browse the registry locally
```
