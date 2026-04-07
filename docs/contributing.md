---
title: Contributing
---

# Contributing a Module

Want your GWEN module listed in the registry? Here's how.

## Requirements

Before submitting, make sure your module:

- Is published on **npm**
- Has a **README** describing what it does and how to use it
- Documents which **GWEN version** it is compatible with
- Is named `@your-org/gwen-<name>` or `gwen-<name>` (recommended convention)

## Submission Process

1. **Open an Issue** using the
   [Module Submission](https://github.com/gwenjs/modules/issues/new?template=module-submission.yml)
   template.
2. A maintainer will review your submission.
3. If approved, you'll be asked to open a **Pull Request** that adds your module
   to [`registry.json`](https://github.com/gwenjs/modules/blob/main/registry.json).
4. CI will validate the schema automatically.
5. Once approved, the PR is labelled `auto-merge` and merged automatically.

## registry.json Format

Add one entry to the `modules` array:

```json
{
  "name": "my-module",
  "displayName": "My Module",
  "description": "One sentence, max 140 characters.",
  "npm": "@your-org/gwen-my-module",
  "repo": "your-org/gwen-my-module",
  "website": "https://docs.example.com",
  "category": "Other",
  "type": "community",
  "deprecated": false,
  "compatibility": { "gwen": ">=0.1.0" }
}
```

**Allowed categories:** `Physics`, `Audio`, `Rendering`, `Debug`, `Input`,
`Networking`, `UI`, `Other`

## Pull Request Checklist

- [ ] Entry is added at the end of the `modules` array
- [ ] `name` is unique (kebab-case, lowercase)
- [ ] `npm` package name is unique and published
- [ ] `description` is ≤ 140 characters
- [ ] `pnpm validate` passes locally
