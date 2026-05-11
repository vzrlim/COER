import { useState } from 'react';
import { Menu, X, Home, Cloud, Zap, Eye, ScrollText, Smartphone } from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'climate', label: 'Climate & Soil', icon: Cloud },
  { id: 'energy', label: 'Energy Arbitrage', icon: Zap },
  { id: 'canopy', label: 'Canopy Vision', icon: Eye },
  { id: 'log', label: 'Agentic Log', icon: ScrollText },
];

interface SidebarProps {
  activeItem: string;
  onItemChange: (item: string) => void;
  onSwitchToMobile: () => void;
}

export function Sidebar({ activeItem, onItemChange, onSwitchToMobile }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">C</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">Project COER</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-sidebar-foreground" />
          ) : (
            <X className="w-5 h-5 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-sidebar-border">
        {!isCollapsed ? (
          <>
            <button
              onClick={onSwitchToMobile}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors mb-3"
            >
              <Smartphone className="w-5 h-5" />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Switch to Farmer App View</div>
              </div>
            </button>
            <div className="text-xs text-muted-foreground text-center">
              Smart Agriculture Platform
            </div>
          </>
        ) : (
          <button
            onClick={onSwitchToMobile}
            className="w-full flex items-center justify-center p-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            title="Switch to Farmer App View"
          >
            <Smartphone className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
}
