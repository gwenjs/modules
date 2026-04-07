# Contributing

## Adding a module to the registry

Community modules are listed in [`registry.json`](../registry.json).

### Process

1. Open an [Issue](https://github.com/gwenjs/modules/issues/new?template=module-submission.yml)
   using the **Module Submission** template.
2. A maintainer will review your package (published on npm, has README).
3. If approved, fork this repo, add your module to `registry.json`, and open a PR.
4. CI runs `pnpm validate` automatically — fix any errors reported.
5. Once approved, a maintainer applies the `auto-merge` label and the PR merges automatically.

### registry.json entry format

```json
{
  "name": "my-module",
  "displayName": "My Module",
  "description": "One sentence, max 140 characters.",
  "npm": "@your-org/gwen-my-module",
  "repo": "your-org/gwen-my-module",
  "website": "",
  "category": "Other",
  "type": "community",
  "deprecated": false,
  "compatibility": { "gwen": ">=0.1.0" }
}
```

**`name`** — unique kebab-case identifier (`^[a-z0-9][a-z0-9-]*$`)
**`category`** — one of: `Physics`, `Audio`, `Rendering`, `Debug`, `Input`, `Networking`, `UI`, `Other`
**`type`** — `official` (gwenjs org only) or `community`

### Validate locally before opening a PR

```bash
pnpm install
pnpm validate
```

### Code of conduct

Be respectful. See the [Contributor Covenant](https://www.contributor-covenant.org/).
