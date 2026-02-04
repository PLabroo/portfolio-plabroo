import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

type IconName = keyof typeof Icons;

function getIcon(name: string) {
  const IconComponent = Icons[name as IconName] as React.ComponentType<{ className?: string }>;
  return IconComponent || Icons.Circle;
}

export function MobileNavigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const { navigation, moreNavigation, socialLinks } = portfolioData;

  const mainNavItems = navigation.slice(0, 4);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/50 pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {mainNavItems.map((item) => {
            const Icon = getIcon(item.icon);
            const active = isActive(item.href);
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 relative',
                  active ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className="h-5 w-5 relative z-10" />
                <span className="text-[10px] font-medium relative z-10">{item.label}</span>
              </NavLink>
            );
          })}
          
          {/* More Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
            aria-label="More options"
          >
            <Icons.MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong rounded-t-3xl max-h-[80vh] overflow-hidden"
            >
              {/* Handle */}
              <div className="flex justify-center py-3">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    VK
                  </div>
                  <div>
                    <h2 className="font-display font-semibold">Prateek Labroo</h2>
                    <p className="text-xs text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 rounded-xl hover:bg-secondary transition-colors"
                    aria-label="Close menu"
                  >
                    <Icons.X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh] scrollbar-hide">
                {/* More Navigation */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {moreNavigation.map((item) => {
                    const Icon = getIcon(item.icon);
                    const active = isActive(item.href);
                    
                    return (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsDrawerOpen(false)}
                        className={cn(
                          'flex items-center gap-3 p-4 rounded-2xl glass transition-all duration-200',
                          active
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'hover:bg-secondary'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <div>
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>

                {/* Social Links */}
                <div className="border-t border-border/50 pt-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Connect
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => {
                      const Icon = getIcon(
                        link.platform === 'github' ? 'Github' : 
                        link.platform === 'linkedin' ? 'Linkedin' : 
                        link.platform === 'leetcode' ? 'Code2' :
                        'Mail'
                      );
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl glass hover:bg-secondary transition-colors"
                          aria-label={link.label}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
