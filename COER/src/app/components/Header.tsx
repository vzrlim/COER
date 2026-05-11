import { Bell, User, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border shadow-sm flex items-center justify-between px-6">
      {/* Left side - could add breadcrumbs or page title */}
      <div className="flex items-center gap-4">
        <h1 className="text-foreground">Dashboard</h1>
      </div>

      {/* Right side - notifications and profile */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        {/* Settings */}
        <button
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-foreground" />
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-medium text-foreground">User Name</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </button>
      </div>
    </header>
  );
}
