# AGENTS.md

- 以代码为准：这个仓库当前是 `Vue 3 + Vite + TypeScript`，不是 React。`src/main.ts` 挂载应用，`src/router/index.ts` 是实际路由；`src/router/index.tsx` 是残留文件，不要把它当成入口。
- 依赖管理使用 `npm`。仓库根目录只有 `package-lock.json`，不要默认改用 pnpm / yarn。
- 主要命令：`npm run dev`、`npm run lint`、`npm run build`、`npm run preview`。
- `npm run build` 会先执行 `vue-tsc -b` 再执行 `vite build`。如果改了类型或构建相关代码，先修 `build`，再看别的问题。
- 这里没有独立的测试脚本；可用的基础验证是 `npm run lint` 和 `npm run build`。
- `vite.config.ts` 里配置了 `@ -> src` 别名。
- `pinia-plugin-persistedstate` 已在 `src/main.ts` 全局启用，涉及状态存储时要考虑持久化行为。
- 仓库现有 README 的技术栈说明已过时，不要照着它判断项目结构。
