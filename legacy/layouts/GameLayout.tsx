import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import GameHeader from '../components/game/GameHeader';
import SideMenu from '../components/game/SideMenu';
import BottomActionBar from '../components/game/BottomActionBar';
import { useUIStore } from '../store/uiStore';
import { AnimatePresence, motion } from 'framer-motion';
import ParticleBackground from '../components/ui/ParticleBackground';

/** 游戏主布局：包含导航、header 等 */
const GameLayout: React.FC = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const sideMenuOpen = useUIStore((s) => s.sideMenuOpen);
  const setSideMenuOpen = useUIStore((s) => s.setSideMenuOpen);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--color-ink)' }}>
      {/* 全局粒子背景 */}
      <ParticleBackground />

      {/* 顶部信息条 */}
      <GameHeader />

      <div className="flex flex-1 overflow-hidden relative">
        {/* 桌面侧边栏 */}
        <SideMenu />

        {/* 移动端侧边栏（抽屉形式） */}
        <AnimatePresence>
          {sideMenuOpen && (
            <>
              {/* 遮罩 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-20 lg:hidden"
                style={{ background: 'rgba(0,0,0,0.6)' }}
                onClick={() => setSideMenuOpen(false)}
              />
              {/* 移动菜单 */}
              <motion.div
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="fixed inset-y-0 left-0 z-30 lg:hidden"
              >
                <SideMenu forceOpen />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 主内容区 */}
        <main
          className="flex-1 overflow-y-auto pb-16 lg:pb-4 relative"
          style={{ background: 'var(--color-ink)' }}
        >
          <div className="max-w-6xl mx-auto px-4 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* 移动端底部快捷栏 */}
      <BottomActionBar />
    </div>
  );
};

export default GameLayout;
