import { useState, useMemo } from 'react'
import { Project, Category, SortKey } from './types/project'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import ProjectCard from './components/ProjectCard'
import projectsData from '../data/projects.json'

const projects = projectsData as Project[]

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 }

const lastUpdated = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric',
})

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('stars')
  const [nsfwOnly, setNsfwOnly] = useState(false)

  const filtered = useMemo(() => {
    let result = projects

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (nsfwOnly) {
      result = result.filter((p) => p.nsfw === true)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q)) ||
          p.useCase.toLowerCase().includes(q) ||
          p.note.toLowerCase().includes(q)
      )
    }

    return [...result].sort((a, b) => {
      if (sortKey === 'stars') return b.stars - a.stars
      if (sortKey === 'lastUpdated') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    })
  }, [search, activeCategory, sortKey, nsfwOnly])

  return (
    <div className="min-h-screen bg-gray-950">
      <Header totalCount={projects.length} lastUpdated={lastUpdated} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortKey={sortKey}
          onSortChange={setSortKey}
          nsfwOnly={nsfwOnly}
          onNsfwToggle={() => setNsfwOnly(v => !v)}
          resultCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm">没有找到匹配的项目</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all'); setNsfwOnly(false) }}
              className="mt-4 text-xs text-indigo-400 hover:text-indigo-300 underline"
            >
              清除筛选条件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project.repo} project={project} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-800 mt-12 py-6 text-center text-xs text-gray-600">
        数字人开源框架项目追踪 · 数据来源于 GitHub · 仅供学习参考
      </footer>
    </div>
  )
}
