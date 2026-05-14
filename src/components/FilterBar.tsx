import { Category, SortKey } from '../types/project'

const CATEGORIES: { label: string; value: Category | 'all' }[] = [
  { label: '全部', value: 'all' },
  { label: '实时数字人', value: '实时数字人' },
  { label: '多模态框架', value: '多模态框架' },
  { label: '完整对话系统', value: '完整对话系统' },
  { label: '说话头像', value: '说话头像' },
  { label: '口型同步', value: '口型同步' },
  { label: '语音合成', value: '语音合成' },
  { label: '视频生成', value: '视频生成' },
  { label: '人像驱动', value: '人像驱动' },
]

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Star 数', value: 'stars' },
  { label: '更新时间', value: 'lastUpdated' },
  { label: '优先级', value: 'priority' },
]

interface FilterBarProps {
  activeCategory: Category | 'all'
  onCategoryChange: (cat: Category | 'all') => void
  sortKey: SortKey
  onSortChange: (key: SortKey) => void
  resultCount: number
}

export default function FilterBar({ activeCategory, onCategoryChange, sortKey, onSortChange, resultCount }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex flex-wrap gap-2 flex-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat.value
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-gray-500">{resultCount} 个结果</span>
        <span className="text-gray-700">|</span>
        <span className="text-xs text-gray-500">排序：</span>
        <select
          value={sortKey}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className="bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
