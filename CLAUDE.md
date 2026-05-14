# CLAUDE.md — 项目工作规范

> Claude Code 每次启动自动读取此文件。所有规则必须严格遵守，不得自行变通。

---

## 项目基本信息

- **仓库**：sheldonslin/github-digital-human-tracker
- **技术栈**：Vite + React + TypeScript + Tailwind CSS
- **部署**：GitHub Pages，push 到 `main` 自动触发
- **线上地址**：https://sheldonslin.github.io/github-digital-human-tracker/
- **数据文件**：`data/projects.json`

---

## 开发流程（必须遵守）

```
GitHub Issue 描述需求
  → 新建分支开发（不得直接改 main）
  → 完成后发起 PR，关联 Issue（Closes #N）
  → 等待确认后合并
  → GitHub Actions 自动部署
```

**禁止行为：**
- 不得直接 push 到 `main`
- 不得要求用户本地运行或预览
- 不得跳过 PR 环节

---

## 分支命名规范

| 类型 | 格式 | 示例 |
|------|------|------|
| 新功能 | `feat/<描述>` | `feat/add-filter-by-stars` |
| 数据更新 | `data/<描述>` | `data/add-talking-head-projects` |
| Bug 修复 | `fix/<描述>` | `fix/search-not-working` |
| 配置/工程 | `chore/<描述>` | `chore/update-dependencies` |

---

## Commit 规范

格式：`<type>: <中文描述>`

```
feat: 新增按 Star 数排序功能
fix: 修复移动端筛选栏样式溢出
data: 新增 5 个 Realtime Avatar 项目
chore: 更新 package-lock.json
ci: 优化 GitHub Actions 构建缓存
```

---

## 数据规范（data/projects.json）

每条记录必须包含所有字段，不得省略：

```ts
{
  name: string           // 项目展示名
  repo: string           // "owner/repo" 格式
  url: string            // 完整 GitHub URL
  category: Category     // 见下方枚举
  description: string    // 中文描述，50字以内
  stars: number          // 整数，不确定时标注 note
  lastUpdated: string    // "YYYY-MM-DD" 格式
  tech: string[]         // 技术栈数组，2-5个
  useCase: string        // 使用场景，中文，30字以内
  priority: Priority     // "high" | "medium" | "low"
  note: string           // 备注，不确定数据填"待复核"，无备注填""
}
```

**Category 枚举（严格匹配，不得新增）：**
```
"Talking Head" | "Lip Sync" | "AI Avatar" | "TTS / Voice" | "Video Generation" | "Realtime Avatar"
```

**Priority 标准：**
- `high`：stars > 5000 或高频使用场景
- `medium`：stars 1000-5000 或特定场景
- `low`：stars < 1000 或参考性项目

---

## PR 描述模板

```markdown
## 变更内容
（简述做了什么）

## 涉及文件
（列出改动文件）

## 验收方式
（如何确认功能正常）

---
Closes #<Issue 编号>
```

---

## 构建 & 部署

- **构建命令**：`npm run build`
- **输出目录**：`dist/`
- **base 路径**：`/github-digital-human-tracker/`（已配置在 vite.config.ts）
- **Node 版本**：20
- **不需要**也**不允许**要求用户本地构建验证

---

## UI 规范

- 背景色：`bg-gray-950`，不得改为浅色主题
- 品牌色：Indigo（`indigo-500/600`）
- 卡片：`bg-gray-900` + `border-gray-800`
- 新增组件放在 `src/components/`
- 新增类型放在 `src/types/`
- 不得引入新的 UI 组件库（保持零依赖 Tailwind）
