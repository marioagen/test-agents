import React, { useState, useEffect } from 'react';
import { Moon, Sun, Home, Layers, Users, FileText, AlertTriangle, LayoutDashboard, Key } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-gray-100 antialiased transition-colors duration-200">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-sidebar-dark border-b border-gray-200 dark:border-border-dark flex items-center justify-between px-6 z-50 transition-colors">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg">Woopi AI</span>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-active-dark transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-sidebar-dark border-r border-gray-200 dark:border-border-dark hidden md:block z-40 transition-colors">
        <nav className="p-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" to="/dashboard" />
          <SidebarItem icon={<Home className="w-5 h-5" />} label="Design System" to="/" />
          <SidebarItem icon={<Key className="w-5 h-5" />} label="Chaves" to="/chaves" />
          <SidebarItem icon={<Users className="w-5 h-5" />} label="Agentes" to="/agentes" />
          <SidebarItem icon={<AlertTriangle className="w-5 h-5" />} label="Falhas" to="/falhas" />
          <SidebarItem icon={<Layers className="w-5 h-5" />} label="Documents" to="/documents" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, to }: { icon: React.ReactNode, label: string, to: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-primary/10 text-primary dark:bg-active-dark dark:text-white font-medium' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-active-dark'
      }`}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
