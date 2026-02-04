import { Outlet } from 'react-router-dom';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileNavigation } from './MobileNavigation';
import { PageTransition } from './PageTransition';
import { AnimatedBackground } from './AnimatedBackground';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

export function MainLayout() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content - dynamically adjusts based on sidebar state */}
      <main 
        className={cn(
          "min-h-screen pb-24 lg:pb-0 transition-[margin-left] duration-300 ease-in-out",
          isCollapsed ? "lg:ml-[72px]" : "lg:ml-64"
        )}
      >
        <PageTransition>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <Outlet />
          </div>
        </PageTransition>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
