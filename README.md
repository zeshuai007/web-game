[English](./README.en.md)

# 天道仙途 · 仙侠在线

一款基于浏览器的古风仙侠修炼 RPG 游戏，无需下载客户端，打开即玩。

## 技术栈

| 技术 | 版本 |
|---|---|
| Vue | 3 |
| TypeScript | 6 |
| Vite | 6 |
| Tailwind CSS | 4 |
| Pinia | 2 |
| Vue Router | 4 |
| Axios | 1 |

## 本地部署指南

### 环境要求

- **Node.js** ≥ 18（推荐使用 LTS 版本）
- **npm** ≥ 9（随 Node.js 一起安装）

> 可从 [https://nodejs.org](https://nodejs.org) 下载安装 Node.js。

### 部署步骤

**1. 克隆仓库**

```bash
git clone https://github.com/zeshuai007/web-game.git
cd web-game
```

**2. 安装依赖**

```bash
npm install
```

**3. 启动开发服务器**

```bash
npm run dev
```

启动成功后，在浏览器中访问 [http://localhost:5173](http://localhost:5173) 即可进入游戏。

**4. 构建生产版本**

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

**5. 预览生产构建**

```bash
npm run preview
```

### 可用脚本

| 命令 | 说明 |
|---|---|
| `npm run dev` | 启动开发服务器（支持热更新 HMR） |
| `npm run build` | 类型检查 + 构建生产版本 |
| `npm run preview` | 本地预览生产构建结果 |
| `npm run lint` | 运行 ESLint 代码检查 |

## 素材与动效说明

- 素材放置：建议将页面插画、徽记等静态资源放在 `public/images/` 下，并通过 `/images/...` 直接引用（例如登录页的 `/images/sect-crest.svg`）。
- 页面氛围图：页面级半透明背景大图统一放在 `public/images/pages/` 下，并通过 `PageAtmosphere` 组件接入（例如 `/images/pages/lobby.svg`）。
- 动效开关：项目设置中有 `effectsLevel`（high/low/off），用于控制背景星点、漂浮等装饰动效强度。
- 降级策略：当系统启用 `prefers-reduced-motion: reduce` 时，动效会自动降级/关闭，即使 `effectsLevel` 为 high。

## 项目结构

```
src/
├── api/          # 各模块 HTTP 请求封装（axios）
├── assets/       # 静态资源（图片、字体等）
├── components/   # 可复用组件
├── pages/        # 页面级组件（登录、大厅、修炼、背包等）
├── router/       # 路由配置
├── store/        # 全局状态管理（Pinia）
├── styles/       # 全局样式
├── types/        # TypeScript 类型定义
├── utils/        # 工具函数
├── ws/           # WebSocket 相关逻辑
├── App.vue       # 应用根组件
└── main.ts       # 应用入口
```

## Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zeshuai007/web-game)

### 手动部署步骤

**1. 登录 Vercel**

访问 [https://vercel.com](https://vercel.com) 注册或登录账号。

**2. 导入项目**

点击 **Add New Project**，选择 **Import Git Repository**，授权并选择 `zeshuai007/web-game` 仓库。

**3. 确认构建配置**

Vercel 会自动检测到这是一个 Vite 项目，无需手动修改以下默认配置：

| 配置项 | 值 |
|---|---|
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

**4. 点击 Deploy**

等待部署完成，Vercel 会自动分配一个 `*.vercel.app` 访问域名。

### 注意事项

- **SPA 路由**：应用使用 Vue Router 的 History 模式。静态托管环境需要把 `/lobby`、`/cultivation` 等路由回退到 `index.html`，否则刷新或直链访问会 404。
- **环境变量**：当前版本无需配置环境变量。若后续接入真实后端 API，请在 Vercel 项目的 **Settings → Environment Variables** 中添加以 `VITE_` 为前缀的变量。
- **WebSocket**：项目包含 WebSocket 逻辑（`src/ws/`），Vercel Serverless 环境不支持持久 WebSocket 连接。若需启用实时功能，请将 WebSocket 服务单独部署，或使用 [Ably](https://ably.com)、[Pusher](https://pusher.com) 等托管服务。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

[MIT](./LICENSE)
