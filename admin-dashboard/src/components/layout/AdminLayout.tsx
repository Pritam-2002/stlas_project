
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, FileQuestion, Image, LogOut, Home,
  ChevronRight, LayoutDashboard, Newspaper
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { 
      path: '/admin', 
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    { 
      path: '/admin/users', 
      label: 'User Management',
      icon: <Users className="h-5 w-5" />
    },
    { 
      path: '/admin/questions', 
      label: 'Questions',
      icon: <FileQuestion className="h-5 w-5" />
    },
    { 
      path: '/admin/banners', 
      label: 'Banners',
      icon: <Image className="h-5 w-5" />
    },
    { 
      path: '/admin/blog', 
      label: 'Blog',
      icon: <Newspaper className='h-5 w-5' />
    }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white w-64 py-6 px-4">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pt-4 border-t border-slate-700">
        <div className="px-4 py-2 text-sm text-slate-400">
          Logged in as Admin
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 mt-1 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Back to Site</span>
        </Link>
      </div>
    </div>
  );
};

const TopBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  let title = 'Dashboard';
  
  if (currentPath.includes('/users')) {
    title = 'User Management';
  } else if (currentPath.includes('/questions')) {
    title = 'Question Management';
  } else if (currentPath.includes('/banners')) {
    title = 'Banner Management';
  }
  
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6">
      <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
    </header>
  );
};

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
