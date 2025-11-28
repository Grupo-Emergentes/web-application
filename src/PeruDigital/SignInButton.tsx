import { useAuth } from "react-oidc-context";
import { 
  LogIn, 
  Shield, 
  ChevronRight
} from 'lucide-react';

export function SignInButton() {
  const auth = useAuth();

  const handleSignIn = () => {
    auth.signinRedirect();
  };

  return (
    <button
      onClick={handleSignIn}
      className="group relative overflow-hidden bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
    >
      {/* Icono de escudo */}
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
        <Shield className="w-5 h-5 text-white" />
      </div>
      
      {/* Contenido principal */}
      <div className="flex flex-col items-start">
        <span className="text-lg">Iniciar Sesión</span>
        <span className="text-xs text-red-100">Perú Digital - Acceso Seguro</span>
      </div>
      
      {/* Icono de entrada */}
      <LogIn className="w-6 h-6" />
      
      {/* Flecha animada */}
      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"></div>
    </button>
  );
}