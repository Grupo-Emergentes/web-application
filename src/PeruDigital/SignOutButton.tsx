import { 
  LogOut, 
  Shield, 
  ChevronLeft
} from 'lucide-react';

interface SignOutButtonProps {
  onClick?: () => void;
}

export function SignOutButton({ onClick }: SignOutButtonProps) {
  const handleSignOut = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="group relative overflow-hidden bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
    >
      {/* Flecha animada */}
      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
      
      {/* Icono de salida */}
      <LogOut className="w-6 h-6" />
      
      {/* Contenido principal */}
      <div className="flex flex-col items-start">
        <span className="text-lg">Cerrar Sesión</span>
        <span className="text-xs text-blue-100">Sesión Segura Activa</span>
      </div>
      
      {/* Icono de escudo */}
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
        <Shield className="w-5 h-5 text-white" />
      </div>
      
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform skew-x-12 group-hover:-translate-x-full"></div>
    </button>
  );
}