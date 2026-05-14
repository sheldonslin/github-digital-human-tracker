/**
 * 每周自动同步 GitHub stars 和 lastUpdated
 * 同时根据 stars 增量计算 trending 状态
 * 运行方式: node scripts/sync-stars.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, '../data/projects.json')

const TRENDING_THRESHOLD = 0.05  // 周增长 > 5% 标记为 trending
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

async function fetchRepo(repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    },
  })
  if (!res.ok) {
    console.warn(`⚠️  ${repo}: HTTP ${res.status}`)
    return null
  }
  return res.json()
}

async function main() {
  const projects = JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
  let updatedCount = 0

  for (const project of projects) {
    const data = await fetchRepo(project.repo)
    if (!data) continue

    const newStars = data.stargazers_count
    const newUpdated = data.pushed_at?.slice(0, 10) ?? project.lastUpdated
    const prevStars = project.prevStars ?? project.stars

    const growth = prevStars > 0 ? (newStars - prevStars) / prevStars : 0
    project.trending = growth >= TRENDING_THRESHOLD

    project.prevStars = project.stars  // 保存本次 stars 作为下次基准
    project.stars = newStars
    project.lastUpdated = newUpdated

    if (newStars !== prevStars) {
      console.log(`✅ ${project.name}: ⭐${prevStars} → ${newStars} ${project.trending ? '🔥 trending' : ''}`)
      updatedCount++
    } else {
      console.log(`— ${project.name}: ⭐${newStars} (无变化)`)
    }

    // 避免 GitHub API 限速
    await new Promise(r => setTimeout(r, 200))
  }

  writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2) + '\n')
  console.log(`\n🎉 同步完成，${updatedCount} 个项目有变化`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
