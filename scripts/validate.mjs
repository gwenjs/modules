import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function read(file) {
  try {
    return JSON.parse(readFileSync(join(root, file), 'utf8'))
  } catch (err) {
    console.error(`\n  ✗ Failed to parse ${file}: ${err.message}\n`)
    process.exit(1)
  }
}

const registry = read('registry.json')
const schema = read('schema.json')

// Schema validation
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
const validate = ajv.compile(schema)

if (!validate(registry)) {
  console.error('\n  ✗ registry.json failed schema validation:\n')
  for (const err of validate.errors ?? []) {
    const path = err.instancePath || '(root)'
    console.error(`    • ${path}: ${err.message}`)
  }
  console.error()
  process.exit(1)
}

// Uniqueness checks
const names = registry.modules.map((m) => m.name)
const npms = registry.modules.map((m) => m.npm)

const dupeNames = names.filter((n, i) => names.indexOf(n) !== i)
const dupeNpms = npms.filter((n, i) => npms.indexOf(n) !== i)

if (dupeNames.length > 0) {
  console.error(`\n  ✗ Duplicate module names: ${dupeNames.join(', ')}\n`)
  process.exit(1)
}
if (dupeNpms.length > 0) {
  console.error(`\n  ✗ Duplicate npm packages: ${dupeNpms.join(', ')}\n`)
  process.exit(1)
}

console.log(`\n  ✓ registry.json is valid — ${registry.modules.length} modules\n`)
