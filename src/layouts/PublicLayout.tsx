import React from 'react';
import { Outlet } from 'react-router-dom';

/** 公共入口布局：仅提供基础容器，用于登录等页面 */
const PublicLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(18,26,48,0.9) 0%, #0d1117 60%)',
      }}
    >
      <Outlet />
    </div>
  );
};

export default PublicLayout;
