export type Category =
  | '实时数字人'
  | '多模态框架'
  | '完整对话系统'
  | '说话头像'
  | '口型同步'
  | '语音合成'
  | '语音识别'
  | '视频生成'
  | '人像驱动'

export type Priority = 'high' | 'medium' | 'low'

export type SortKey = 'stars' | 'lastUpdated' | 'priority'

export interface Project {
  name: string
  repo: string
  url: string
  category: Category
  description: string
  stars: number
  prevStars: number
  lastUpdated: string
  tech: string[]
  useCase: string
  priority: Priority
  trending?: boolean
  nsfw?: boolean
  note: string
}
