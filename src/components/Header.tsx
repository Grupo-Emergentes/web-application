import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: any) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'services', label: 'Servicios', view: 'services' },
    { id: 'wallet', label: 'Mi Billetera', view: 'wallet' },
    { id: 'solicitudes', label: 'Solicitudes', view: 'solicitudes' },
    { id: 'ayuda', label: 'Ayuda', view: 'ayuda' },
    { id: 'admin', label: 'Panel Admin', view: 'admin' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onViewChange('dashboard')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-linear-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl bg-linear-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Perú Digital</span>
                <span className="text-xs text-slate-500">Estado Peruano</span>
              </div>
            </button>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.view)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  currentView === item.view
                    ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-red-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Avatar y menú móvil */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10 border-2 border-red-600 shadow-lg">
              <AvatarFallback className="bg-linear-to-br from-blue-600 to-blue-700 text-white">CM</AvatarFallback>
            </Avatar>
            
            {/* Botón menú móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-red-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 bg-white rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 text-left text-sm transition-all rounded-lg ${
                    currentView === item.view
                      ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-red-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
