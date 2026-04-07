<script setup lang="ts">
import { ref, computed } from 'vue'
import registryData from '../../../../registry.json'

interface GwenModule {
  name: string
  displayName: string
  description: string
  npm: string
  repo: string
  website: string
  category: string
  type: 'official' | 'community'
  deprecated: boolean
  compatibility: { gwen: string }
}

const all = registryData.modules as GwenModule[]
const categories = ['All', ...Array.from(new Set(all.map((m) => m.category))).sort()]

const search = ref('')
const activeCategory = ref('All')
const activeType = ref<'all' | 'official' | 'community'>('all')
const showDeprecated = ref(false)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return all.filter((m) => {
    if (!showDeprecated.value && m.deprecated) return false
    if (activeType.value !== 'all' && m.type !== activeType.value) return false
    if (activeCategory.value !== 'All' && m.category !== activeCategory.value) return false
    if (!q) return true
    return (
      m.name.includes(q) ||
      m.displayName.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.npm.toLowerCase().includes(q)
    )
  })
})
</script>

<template>
  <div class="module-browser">
    <input
      v-model="search"
      class="search-input"
      placeholder="Search modules…"
      type="search"
      aria-label="Search modules"
    />

    <div class="filters">
      <div class="filter-group" role="group" aria-label="Filter by category">
        <button
          v-for="cat in categories"
          :key="cat"
          class="pill"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="filter-group" role="group" aria-label="Filter by type">
        <button class="pill" :class="{ active: activeType === 'all' }" @click="activeType = 'all'">All</button>
        <button class="pill" :class="{ active: activeType === 'official' }" @click="activeType = 'official'">Official</button>
        <button class="pill" :class="{ active: activeType === 'community' }" @click="activeType = 'community'">Community</button>
      </div>

      <label class="deprecated-toggle">
        <input type="checkbox" v-model="showDeprecated" />
        Show deprecated
      </label>
    </div>

    <p class="results-count">
      {{ filtered.length }} module{{ filtered.length !== 1 ? 's' : '' }}
    </p>

    <div v-if="filtered.length" class="modules-grid">
      <a
        v-for="mod in filtered"
        :key="mod.name"
        :href="`https://www.npmjs.com/package/${mod.npm}`"
        target="_blank"
        rel="noopener noreferrer"
        class="module-card"
        :class="{ deprecated: mod.deprecated }"
      >
        <div class="card-header">
          <span class="module-name">{{ mod.displayName }}</span>
          <span class="badge" :class="mod.type">{{ mod.type }}</span>
        </div>

        <p class="module-desc">{{ mod.description }}</p>

        <div class="card-footer">
          <code class="npm-name">{{ mod.npm }}</code>
          <div class="card-links">
            <a
              v-if="mod.website"
              :href="mod.website"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
            >Docs</a>
            <a
              :href="`https://github.com/${mod.repo}`"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
            >GitHub</a>
          </div>
        </div>

        <span v-if="mod.deprecated" class="deprecated-badge">Deprecated</span>
      </a>
    </div>

    <p v-else class="no-results">No modules found for "<em>{{ search }}</em>".</p>
  </div>
</template>

<style scoped>
.module-browser {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 0;
}

.search-input {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.15s;
}
.search-input:focus {
  border-color: var(--vp-c-brand-1);
}

.filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
}
.filter-group {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.pill {
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  cursor: pointer;
  font-size: 0.83rem;
  color: var(--vp-c-text-2);
  transition: all 0.15s;
  line-height: 1.4;
}
.pill:hover,
.pill.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.deprecated-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.83rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  user-select: none;
}

.results-count {
  font-size: 0.83rem;
  color: var(--vp-c-text-3);
  margin-bottom: 1.25rem;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.module-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.module-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.module-card.deprecated {
  opacity: 0.55;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
.module-name {
  font-weight: 600;
  font-size: 1rem;
}

.badge {
  flex-shrink: 0;
  font-size: 0.68rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.badge.official {
  background: #dbeafe;
  color: #1d4ed8;
}
.badge.community {
  background: #dcfce7;
  color: #15803d;
}

.module-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  flex: 1;
  margin: 0;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.npm-name {
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-mute);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%;
}
.card-links {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}
.card-links a {
  font-size: 0.78rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.card-links a:hover {
  text-decoration: underline;
}

.deprecated-badge {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  font-size: 0.63rem;
  padding: 0.1rem 0.45rem;
  background: #fef9c3;
  color: #a16207;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.no-results {
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 3rem 1rem;
  font-size: 0.95rem;
}
</style>
