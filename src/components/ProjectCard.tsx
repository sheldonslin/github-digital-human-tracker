import { useState } from 'react'
import { Project } from '../types/project'

const CATEGORY_COLORS: Record<string, string> = {
  '实时数字人': 'bg-blue-900/50 text-blue-300 border-blue-800',
  '多模态框架': 'bg-violet-900/50 text-violet-300 border-violet-800',
  '完整对话系统': 'bg-indigo-900/50 text-indigo-300 border-indigo-800',
  '说话头像': 'bg-cyan-900/50 text-cyan-300 border-cyan-800',
  '口型同步': 'bg-purple-900/50 text-purple-300 border-purple-800',
  '语音合成': 'bg-emerald-900/50 text-emerald-300 border-emerald-800',
  '视频生成': 'bg-orange-900/50 text-orange-300 border-orange-800',
  '人像驱动': 'bg-pink-900/50 text-pink-300 border-pink-800',
}

const PRIORITY_COLORS: Record<string, string> = {
  high: 'text-red-400',
  medium: 'text-yellow-400',
  low: 'text-gray-500',
}

const PRIORITY_LABELS: Record<string, string> = {
  high: '⬆ 高',
  medium: '→ 中',
  low: '⬇ 低',
}

function formatStars(stars: number): string {
  if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`
  return stars.toString()
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function ProjectCard({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false)
  const catClass = CATEGORY_COLORS[project.category] ?? 'bg-gray-800 text-gray-400 border-gray-700'

  function handleCopy() {
    const text = `【${project.name}】${project.description}\n适合用来做：${project.useCase}\nGitHub: ${project.url}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-700/50 hover:shadow-lg hover:shadow-indigo-950/30 transition-all duration-200 flex flex-col gap-3">
      {/* 标题行 */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-white hover:text-indigo-400 transition-colors leading-tight"
            >
              {project.name}
            </a>
            {project.trending && (
              <span className="shrink-0 text-xs px-1.5 py-0.5 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30 font-medium">
                🔥 热门
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 font-mono truncate">{project.repo}</p>
        </div>
        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${catClass}`}>
          {project.category}
        </span>
      </div>

      {/* 描述 */}
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{project.description}</p>

      {/* 技术栈 */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-md border border-gray-700">
            {t}
          </span>
        ))}
      </div>

      {/* 使用场景 */}
      <p className="text-xs text-gray-500">
        <span className="text-gray-600">适合：</span>{project.useCase}
      </p>

      {/* 备注 */}
      {project.note && (
        <p className="text-xs text-amber-500/80 bg-amber-950/20 border border-amber-900/30 rounded-lg px-3 py-1.5">
          💬 {project.note}
        </p>
      )}

      {/* 底栏 */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-800 mt-auto">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {formatStars(project.stars)}
          </span>
          <span>📅 {formatDate(project.lastUpdated)}</span>
          <span className={`font-medium ${PRIORITY_COLORS[project.priority]}`}>
            {PRIORITY_LABELS[project.priority]}优先
          </span>
        </div>
        <button
          onClick={handleCopy}
          title="复制推荐语"
          className={`text-xs px-2 py-1 rounded-md border transition-all ${
            copied
              ? 'bg-emerald-900/40 text-emerald-400 border-emerald-700'
              : 'bg-gray-800 text-gray-500 border-gray-700 hover:text-gray-300 hover:border-gray-600'
          }`}
        >
          {copied ? '✓ 已复制' : '复制推荐'}
        </button>
      </div>
    </div>
  )
}
