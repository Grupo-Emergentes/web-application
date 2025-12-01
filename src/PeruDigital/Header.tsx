import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

import { Avatar, AvatarFallback } from './ui/avatar';
import { useAuth } from 'react-oidc-context';
import { ROLES } from '@/utils/constants/roles';
import { ROUTE_PATHS } from '@/utils/constants/routePaths';
import { COGNITO_DOMAIN, COGNITO_CLIENT_ID, LOGOUT_REDIRECT } from '@/config';


interface HeaderProps {
  currentView: string;
  onViewChange: (view: any) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const auth = useAuth();
  const userName = auth.user?.profile["cognito:username"] || 'Usuario';
  const isUserSuperAdmin = Array.isArray(auth.user?.profile["cognito:groups"]) 
    ? auth.user.profile["cognito:groups"].includes(ROLES.SUPERADMIN)
    : false;


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
      await auth.removeUser();
      const logoutUrl =
        `${COGNITO_DOMAIN}/logout` +
        `?client_id=${COGNITO_CLIENT_ID}` +
        `&logout_uri=${LOGOUT_REDIRECT}`;
      window.location.href = logoutUrl;
  };
  
  const navigationItems = [
    { id: 'services', label: 'Servicios', view: 'services' },
    { id: 'wallet', label: 'Mi Billetera', view: 'wallet' },
    { id: 'ayuda', label: 'Ayuda', view: 'ayuda' },
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

            {isUserSuperAdmin && (
              <button
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  currentView === 'admin'
                    ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-red-600'
                }`}
              >
                <a className='text-inherit transition-none' 
                href={ROUTE_PATHS.SUPER_ADMIN_PANEL}>Panel Super Admin</a>
              </button>
            )}
          </nav>

          {/* Avatar y menú móvil */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center"
              >
                <Avatar className="w-10 h-10 border-2 border-red-600 shadow-lg cursor-pointer">
                  <AvatarFallback className="bg-linear-to-br from-blue-600 to-blue-700 text-white">
                    {String(userName || 'CM').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* Dropdown Usuario */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-slate-200 z-50">
                  <p className="px-4 py-2 text-sm text-slate-600 border-b font-semibold">{String(userName).toUpperCase()}</p>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            
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
              {isUserSuperAdmin && (
                <button
                  className={`px-4 py-3 text-left text-sm rounded-lg transition-all ${
                    currentView === 'admin'
                      ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-red-600'
                  }`}
                >
                  <a className='text-inherit transition-none' 
                    href={ROUTE_PATHS.SUPER_ADMIN_PANEL}>Panel Super Admin</a>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
