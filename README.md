[English](./README.en.md)

# 天道仙途 · 仙侠在线

一款基于浏览器的古风仙侠修炼 RPG 游戏，无需下载客户端，打开即玩。

## 技术栈

| 技术 | 版本 |
|---|---|
| React | 19 |
| TypeScript | 6 |
| Vite | 8 |
| Tailwind CSS | 4 |
| Zustand | 5 |
| Framer Motion | 12 |
| React Router | 7 |
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

## 项目结构

```
src/
├── api/          # 各模块 HTTP 请求封装（axios）
├── assets/       # 静态资源（图片、字体等）
├── components/   # 可复用 UI 组件及游戏组件
│   ├── game/     # 游戏专属组件
│   └── ui/       # 通用 UI 组件
├── constants/    # 全局常量
├── layouts/      # 页面布局组件
├── mock/         # Mock 数据
├── pages/        # 页面级组件（登录、大厅、修炼、背包等）
├── router/       # 路由配置
├── store/        # 全局状态管理（Zustand）
├── styles/       # 全局样式
├── types/        # TypeScript 类型定义
├── utils/        # 工具函数
├── ws/           # WebSocket 相关逻辑
├── App.tsx       # 应用根组件
└── main.tsx      # 应用入口
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

[MIT](./LICENSE)
