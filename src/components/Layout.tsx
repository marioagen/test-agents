import React, { useState, useEffect } from 'react';
import { Moon, Sun, Home, Layers, Users, FileText, AlertTriangle, LayoutDashboard, Key, Wrench, ChevronDown, ChevronRight, ClipboardList, ChevronLeft } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <aside className={`fixed left-0 top-16 bottom-0 ${isCollapsed ? 'w-[72px]' : 'w-64'} bg-white dark:bg-sidebar-dark border-r border-gray-200 dark:border-border-dark hidden md:flex flex-col z-40 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-200 dark:border-border-dark flex justify-center">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-active-dark rounded w-full flex justify-center items-center transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        <nav className="p-3 space-y-2 overflow-y-auto flex-1">
          <SidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="Painel de Consumo" to="/dashboard" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Home className="w-5 h-5" />} label="Style Guide" to="/" isCollapsed={isCollapsed} />
          
          <SidebarGroup icon={<Wrench className="w-5 h-5" />} label="Ferramentas" activePathPrefix="/agentes" isCollapsed={isCollapsed}>
            <SidebarItem icon={<Users className="w-5 h-5" />} label="Agentes" to="/agentes" isSubItem isCollapsed={isCollapsed} />
          </SidebarGroup>
          
          <SidebarItem icon={<AlertTriangle className="w-5 h-5" />} label="Falhas" to="/falhas" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Layers className="w-5 h-5" />} label="Documents" to="/documents" isCollapsed={isCollapsed} />
          <SidebarItem icon={<ClipboardList className="w-5 h-5" />} label="Auditoria" to="/auditoria" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Key className="w-5 h-5" />} label="Chaves" to="/chaves" isCollapsed={isCollapsed} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`${isCollapsed ? 'md:ml-[72px]' : 'md:ml-64'} pt-16 min-h-screen transition-all duration-300`}>
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarGroup({ icon, label, children, activePathPrefix, isCollapsed }: { icon: React.ReactNode, label: string, children: React.ReactNode, activePathPrefix: string, isCollapsed: boolean }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(activePathPrefix);
  const [isOpen, setIsOpen] = useState(isActive);

  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  return (
    <div className="space-y-1 group">
      <button 
        onClick={() => {
          if (!isCollapsed) setIsOpen(!isOpen);
        }}
        className={`w-full flex items-center justify-between ${isCollapsed ? 'px-0 justify-center' : 'px-3'} py-3 rounded-lg transition-colors ${
          isActive && (!isOpen || isCollapsed)
            ? 'bg-primary/5 text-primary dark:bg-active-dark dark:text-white font-medium'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-active-dark'
        }`}
        title={isCollapsed ? label : undefined}
      >
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center mx-auto' : ''}`}>
          {icon}
          {!isCollapsed && <span>{label}</span>}
        </div>
        {!isCollapsed && (
          isOpen ? <ChevronDown className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />
        )}
      </button>
      {/* If collapsed, show children via tooltips or just hide them? Or maybe show subitems under it? 
          For simple UX, if collapsed, we can still show subitems icons, but without group indentation. 
          Actually, since it's "Ferramentas" group with "Agentes" inside, let's just render the subitems 
          in place when collapsed if it's active or always, or just use a flyout?
          The easiest is to list the subitems if collapsed without indentation, or keep it closed?
          Wait, if collapsed we could force isOpen=true visually or just render the children if active. */}
      {(!isCollapsed && isOpen) && (
        <div className="pl-4 space-y-1 mt-1">
          {children}
        </div>
      )}
      {/* If collapsed, let's just render the children without indentation so user can click them. */}
      {isCollapsed && (
        <div className="space-y-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
}

function SidebarItem({ icon, label, to, isSubItem, isCollapsed }: { icon: React.ReactNode, label: string, to: string, isSubItem?: boolean, isCollapsed: boolean }) {
  return (
    <NavLink 
      to={to} 
      title={isCollapsed ? label : undefined}
      className={({ isActive }) => `flex items-center gap-3 py-3 rounded-lg transition-colors ${
        isCollapsed ? 'justify-center px-0' : 'px-3'
      } ${
        isActive 
          ? 'bg-primary/10 text-primary dark:bg-active-dark dark:text-white font-medium' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-active-dark'
      } ${isSubItem && !isCollapsed ? 'text-sm py-2 px-3' : ''} ${isSubItem && isCollapsed ? 'mt-1' : ''}`}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
}

