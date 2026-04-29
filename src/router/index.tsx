import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import GameLayout from '../layouts/GameLayout';
import PublicLayout from '../layouts/PublicLayout';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

// 懒加载页面
const LoginPage = lazy(() => import('../pages/LoginPage'));
const LobbyPage = lazy(() => import('../pages/LobbyPage'));
const CharacterPage = lazy(() => import('../pages/CharacterPage'));
const CultivationPage = lazy(() => import('../pages/CultivationPage'));
const ExplorePage = lazy(() => import('../pages/ExplorePage'));
const QuestsPage = lazy(() => import('../pages/QuestsPage'));
const InventoryPage = lazy(() => import('../pages/InventoryPage'));
const ShopPage = lazy(() => import('../pages/ShopPage'));
const RankingPage = lazy(() => import('../pages/RankingPage'));
const SocialPage = lazy(() => import('../pages/SocialPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-48">
    <div className="space-y-3 w-80">
      <LoadingSkeleton height={20} width="60%" />
      <LoadingSkeleton height={16} rows={3} />
    </div>
  </div>
);

const router = createBrowserRouter([
  // 公开路由
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
  // 游戏主布局
  {
    element: <GameLayout />,
    children: [
      {
        path: '/lobby',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LobbyPage />
          </Suspense>
        ),
      },
      {
        path: '/character',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CharacterPage />
          </Suspense>
        ),
      },
      {
        path: '/cultivation',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CultivationPage />
          </Suspense>
        ),
      },
      {
        path: '/explore',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: '/quests',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <QuestsPage />
          </Suspense>
        ),
      },
      {
        path: '/inventory',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <InventoryPage />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ShopPage />
          </Suspense>
        ),
      },
      {
        path: '/ranking',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RankingPage />
          </Suspense>
        ),
      },
      {
        path: '/social',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SocialPage />
          </Suspense>
        ),
      },
      {
        path: '/settings',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  // 默认跳转
  { path: '/', element: <Navigate to="/lobby" replace /> },
  { path: '*', element: <Navigate to="/lobby" replace /> },
]);

const AppRouter: React.FC = () => <RouterProvider router={router} />;

export default AppRouter;
