import React from 'react';
import { 
  Bell, Menu, Search, Sun, Moon, User, Settings, LogOut 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import { Popover } from '../common/Popover';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  
  return (
    <header className="z-30 py-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
        {/* Left side - Mobile menu button and search */}
        <div className="flex items-center">
          <button
            className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
            onClick={toggleSidebar}
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
          
          <div className="hidden md:flex md:justify-center md:items-center">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 rounded-md text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        {/* Right side - User menu and notifications */}
        <div className="flex items-center space-x-4">
          <button
            className="p-1 rounded-full focus:outline-none"
            onClick={toggleTheme}
            aria-label="Toggle color mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          <button
            className="p-1 relative rounded-full focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"></span>
          </button>
          
          <Popover
            isOpen={isProfileOpen}
            setIsOpen={setIsProfileOpen}
            trigger={
              <button
                className="relative align-middle rounded-full focus:outline-none focus:shadow-outline-purple"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            }
          >
            <div className="py-2 bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 w-48">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                <div className="font-semibold">{user?.name || 'Alex Johnson'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || 'alex@marketingpro.com'}
                </div>
              </div>
              <a
                href="/dashboard/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </a>
              <button
                onClick={logout}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;