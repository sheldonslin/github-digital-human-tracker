interface HeaderProps {
  totalCount: number
  lastUpdated: string
}

export default function Header({ totalCount, lastUpdated }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold shrink-0">
              🤖
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">数字人开源框架项目追踪</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Digital Human Open Source Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {totalCount} 个项目
            </span>
            <span>更新于 {lastUpdated}</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          覆盖实时数字人、多模态框架、完整对话系统、口型同步、语音合成、视频生成等方向
        </p>
      </div>
    </header>
  )
}
