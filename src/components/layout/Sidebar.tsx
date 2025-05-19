import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BarChart3, Settings,
  LineChart, Target, X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Campaigns', path: '/dashboard/campaigns', icon: <Target className="w-5 h-5" /> },
    { name: 'Leads', path: '/dashboard/leads', icon: <Users className="w-5 h-5" /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <LineChart className="w-5 h-5" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 z-30 flex-shrink-0 w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:static lg:block transition-all duration-300 ease-in-out ${
          isOpen ? 'left-0' : '-left-64 lg:left-0'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="ml-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
              MarketingPro
            </span>
          </div>
          
          <button
            className="p-1 rounded-md lg:hidden focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 text-sm font-medium transition duration-150 ease-in-out rounded-lg
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700'}
                `}
                end={item.path === '/dashboard'}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;