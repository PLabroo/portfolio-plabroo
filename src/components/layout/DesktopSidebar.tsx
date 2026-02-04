import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type IconName = keyof typeof Icons;

function getIcon(name: string) {
  const IconComponent = Icons[name as IconName] as React.ComponentType<{ className?: string }>;
  return IconComponent || Icons.Circle;
}

export function DesktopSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { navigation, moreNavigation, socialLinks } = portfolioData;

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 72 }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <motion.aside
      initial={false}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="hidden lg:flex flex-col h-screen fixed left-0 top-0 glass-strong border-r border-border/50 z-30 overflow-hidden"
    >
      {/* Logo / Name */}
      <div className="p-4 border-b border-border/50">
        <NavLink to="/" className="flex items-center gap-3 group">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            VK
          </motion.div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                  Vaibhav Kumar
                </h1>
                <p className="text-xs text-muted-foreground whitespace-nowrap">Senior Engineer</p>
              </motion.div>
            )}
          </AnimatePresence>
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto scrollbar-hide">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = getIcon(item.icon);
            const active = isActive(item.href);
            
            const navItem = (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative',
                  isCollapsed ? 'justify-center' : '',
                  active
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                </motion.div>
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      variants={contentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
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

            if (isCollapsed) {
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    {navItem}
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    sideOffset={12}
                    className="bg-card/95 backdrop-blur-xl border-border/50 shadow-xl"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return navItem;
          })}
        </div>

        {/* More Section */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
              >
                More
              </motion.p>
            )}
          </AnimatePresence>
          <div className="space-y-1">
            {moreNavigation.map((item) => {
              const Icon = getIcon(item.icon);
              const active = isActive(item.href);
              
              const moreNavItem = (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200',
                    isCollapsed ? 'justify-center' : '',
                    active
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        transition={{ duration: 0.15 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                      {moreNavItem}
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      sideOffset={12}
                      className="bg-card/95 backdrop-blur-xl border-border/50 shadow-xl"
                    >
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return moreNavItem;
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/50">
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col gap-2" : "justify-between"
        )}>
          <div className={cn(
            "flex",
            isCollapsed ? "flex-col gap-2" : "gap-2"
          )}>
            {socialLinks.slice(0, 3).map((link) => {
              const Icon = getIcon(link.platform === 'github' ? 'Github' : link.platform === 'linkedin' ? 'Linkedin' : 'Mail');
              const socialItem = (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={link.platform} delayDuration={0}>
                    <TooltipTrigger asChild>
                      {socialItem}
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      sideOffset={12}
                      className="bg-card/95 backdrop-blur-xl border-border/50 shadow-xl"
                    >
                      {link.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return socialItem;
            })}
          </div>
          {!isCollapsed && <ThemeToggle />}
        </div>

        {/* Collapse Toggle Button */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl",
            "bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20",
            "border border-primary/20 hover:border-primary/40",
            "text-sm font-medium text-foreground",
            "transition-all duration-300 group"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Icons.ChevronsLeft className="h-4 w-4 text-primary group-hover:text-primary/80" />
          </motion.div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Theme toggle when collapsed */}
        {isCollapsed && (
          <motion.div 
            className="mt-2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ThemeToggle />
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
