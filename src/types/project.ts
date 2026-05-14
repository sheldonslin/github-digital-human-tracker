export type Category =
  | 'Talking Head'
  | 'Lip Sync'
  | 'AI Avatar'
  | 'TTS / Voice'
  | 'Video Generation'
  | 'Realtime Avatar'

export type Priority = 'high' | 'medium' | 'low'

export type SortKey = 'stars' | 'lastUpdated' | 'priority'

export interface Project {
  name: string
  repo: string
  url: string
  category: Category
  description: string
  stars: number
  lastUpdated: string
  tech: string[]
  useCase: string
  priority: Priority
  note: string
}
