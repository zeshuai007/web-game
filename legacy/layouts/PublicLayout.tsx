import React from 'react';
import { Outlet } from 'react-router-dom';
import BackgroundLayer from '../components/ui/BackgroundLayer';

/** 公共入口布局：仅提供基础容器，用于登录等页面 */
const PublicLayout: React.FC = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-ink)' }}
    >
      <BackgroundLayer />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
