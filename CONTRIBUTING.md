# Contributing

## Setup

This repository uses pnpm.

```sh
pnpm install
```

## Quality gate

This repository does not define `format`, `lint`, `typecheck`, or `test` scripts.
The check it defines is:

```sh
pnpm validate
```

Documentation builds with `pnpm docs:build`.
