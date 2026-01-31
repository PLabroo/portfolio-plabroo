import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

type IconName = keyof typeof Icons;

function getIcon(name: string) {
  const IconComponent = Icons[name as IconName] as React.ComponentType<{ className?: string }>;
  return IconComponent || Icons.Circle;
}

export function DesktopSidebar() {
  const location = useLocation();
  const { navigation, moreNavigation, socialLinks } = portfolioData;

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 glass-strong border-r border-border/50 z-30">
      {/* Logo / Name */}
      <div className="p-6 border-b border-border/50">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
            VK
          </div>
          <div>
            <h1 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              Vaibhav Kumar
            </h1>
            <p className="text-xs text-muted-foreground">Senior Engineer</p>
          </div>
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = getIcon(item.icon);
            const active = isActive(item.href);
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
                {active && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* More Section */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            More
          </p>
          <div className="space-y-1">
            {moreNavigation.map((item) => {
              const Icon = getIcon(item.icon);
              const active = isActive(item.href);
              
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {socialLinks.slice(0, 3).map((link) => {
              const Icon = getIcon(link.platform === 'github' ? 'Github' : link.platform === 'linkedin' ? 'Linkedin' : 'Mail');
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
