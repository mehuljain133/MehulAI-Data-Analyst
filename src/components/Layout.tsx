import React, { ReactNode } from 'react';
import SideNav from './SideNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen dark:bg-maroon-800 bg-blue-gray-50">
      <SideNav />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
