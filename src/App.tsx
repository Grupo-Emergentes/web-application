// App.js

import { useState } from 'react';
import { useAuth } from "react-oidc-context";
import { SignInButton } from "./components/SignInButton";
import { SignOutButton } from "./components/SignOutButton";
import { AdminSuperAdminPanel } from "./components/AdminSuperAdminPanel";
import { Shield } from 'lucide-react';

function App() {
  const auth = useAuth();
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const signOutRedirect = () => {
    const clientId = "4ih0t549ecd43jp2nmnhakoems";
    const logoutUri = "http://localhost:5173/";
    const cognitoDomain = "https://us-east-2u2uoxvhrx.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          {/* Logo animado */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-linear-to-br from-red-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <Shield className="w-12 h-12 text-white" />
            </div>
            
            {/* Círculos animados alrededor */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
          </div>
          
          {/* Título */}
          <h1 className="text-3xl font-bold bg-linear-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Perú Digital
          </h1>
          
          {/* Barra de progreso animada */}
          <div className="w-64 mx-auto mb-6">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-red-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Texto de carga */}
          <p className="text-slate-600 text-lg mb-2">Iniciando sesión segura...</p>
          <p className="text-slate-500 text-sm">Autenticando con AWS Cognito</p>
          
          {/* Puntos animados */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-200"></div>
          </div>
          
          {/* Información de seguridad */}
          <div className="mt-8 p-4 bg-white/70 rounded-lg shadow-lg max-w-sm mx-auto">
            <div className="flex items-center justify-center text-sm text-slate-600">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              <span>Conexión cifrada SSL/TLS</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    // Si se debe mostrar el panel de admin, renderizarlo
    if (showAdminPanel) {
      return <AdminSuperAdminPanel />;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-red-50 flex items-center">
          {/* Lado izquierdo - Información */}
          <div className="flex-1 flex flex-col items-center justify-center p-12">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center flex items-center justify-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                Información de Sesión
              </h2>
              <pre className="mb-4 p-4 bg-slate-50 rounded-lg text-sm"> Hello: {auth.user?.profile.email} </pre>
              <pre className="mb-4 p-4 bg-slate-50 rounded-lg text-xs break-all"> ID Token: {auth.user?.id_token} </pre>
              <pre className="mb-4 p-4 bg-slate-50 rounded-lg text-xs break-all"> Access Token: {auth.user?.access_token} </pre>
              <pre className="mb-4 p-4 bg-slate-50 rounded-lg text-xs break-all"> Refresh Token: {auth.user?.refresh_token} </pre>
            </div>
            
            <div className="mt-4 space-y-4">
              <SignOutButton onClick={signOutRedirect} />
              <button 
                onClick={() => setShowAdminPanel(true)}
                className="w-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                🛡️ Panel de Administración
              </button>
            </div>
          </div>
          
          {/* Lado derecho - Imagen */}
          <div className="flex-1 hidden lg:flex items-center justify-center p-12">
            <div className="relative">
              <div className="w-96 h-96 bg-linear-to-br from-green-100 to-blue-100 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-linear-to-br from-green-600 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                    <Shield className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Sesión Activa</h3>
                  <p className="text-slate-600">Usuario Autenticado</p>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-blue-50 flex items-center">
        {/* Lado izquierdo - Botones */}
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-linear-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Perú Digital
              </h1>
              <p className="text-slate-600 text-lg">Sistema de Autenticación Nacional</p>
            </div>
            
            {/* Botones */}
            <div className="space-y-6">
              <SignInButton />
              <SignOutButton onClick={signOutRedirect} />
            </div>
            
            {/* Información adicional */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 mb-2">✓ Conexión segura SSL/TLS</p>
              <p className="text-sm text-slate-500">✓ Protegido por el Estado Peruano</p>
            </div>
          </div>
        </div>
        
        {/* Lado derecho - Imagen */}
        <div className="flex-1 hidden lg:flex items-center justify-center p-12">
          <div className="relative">
            {/* Imagen principal */}
            <div className="w-96 h-96 bg-linear-to-br from-blue-100 to-red-100 rounded-3xl shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-linear-to-br from-red-600 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Acceso Seguro</h3>
                <p className="text-slate-600">Identidad Digital Peruana</p>
              </div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
  );
}

export default App;