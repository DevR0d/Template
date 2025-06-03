import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, PackageSearch, ClipboardList, Truck, 
  Users, Warehouse, BarChartBig, Settings, Menu, X, 
  LogOut, ChevronDown, Bell, Search
} from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
      ? 'bg-blue-100 text-blue-700 font-medium' 
      : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <span className={`${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
      {icon}
    </span>
    <span>{label}</span>
  </Link>
);

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const navigation = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/inventory', label: 'Inventory', icon: <PackageSearch size={20} /> },
    { path: '/orders', label: 'Orders', icon: <ClipboardList size={20} /> },
    { path: '/suppliers', label: 'Suppliers', icon: <Users size={20} /> },
    { path: '/warehouses', label: 'Warehouses', icon: <Warehouse size={20} /> },
    { path: '/deliveries', label: 'Deliveries', icon: <Truck size={20} /> },
    { path: '/reports', label: 'Reports', icon: <BarChartBig size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/" className="flex items-center gap-2">
              <Logo />
              <span className="font-semibold text-lg text-gray-900">LogisTottus</span>
            </Link>
            <button 
              onClick={toggleSidebar} 
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.path}
              />
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                AT
              </div>
              <div>
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-sm text-gray-500">admin@logistottus.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-end gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 max-w-md w-full mr-4">
                <Search size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none w-full text-sm"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 relative"
                  onClick={() => setNotificationOpen(!notificationOpen)}
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-30 border">
                    <div className="px-4 py-2 border-b">
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="px-4 py-2 hover:bg-gray-50 border-b last:border-b-0">
                          <p className="font-medium text-sm">Inventory Alert</p>
                          <p className="text-xs text-gray-500">Product #12345 is low in stock</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 text-center border-t">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme toggle */}
              <ThemeToggle />

              {/* Profile */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    AT
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                    <a
                      href="#profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <div className="border-t"></div>
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;