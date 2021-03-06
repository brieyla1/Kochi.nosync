import { useRouter } from 'next/router';
import React, { useContext, Suspense, useEffect, lazy } from 'react';

import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { SidebarContext } from 'src/context/SidebarContext';

export default function NavbarComponent({ children, isHidden }) {
  if (isHidden) return <>{children}</>;

  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useRouter();

  useEffect(() => {
    closeSidebar();
  }, [location.asPath]);

  const { asPath } = useRouter();

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-y-auto	">
        <Header />
        <>{children}</>
      </div>
    </div>
  );
}
