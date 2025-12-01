import { useState } from 'react';
import { Shield, Plus, User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { signUp } from 'aws-amplify/auth';

export function AdminSuperAdminPanel() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.name || !formData.email || !formData.password) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Aquí iría la lógica para crear el super admin
    console.log('Creando Super Admin:', formData);
    
    // Mostrar alert de éxito
    alert('Cuenta creada');
    
    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    try {
      const { userId } = await signUp({
        username: formData.name,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            "custom:role": "admin",
          }
        }
      });
      console.log("Admin registered successfully:", userId);
    } catch (error) {
        console.error("Error registering admin:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-linear-to-br from-red-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Panel de Super Administración</h1>
                <p className="text-slate-600">Gestión de Administradores</p>
                <p><a href="/" className="text-slate-600 font-semibold">← Volver a la página principal</a></p>
              </div>
            </div>
            
            {/* Botón Añadir en esquina superior derecha */}
            <Button
              onClick={() => document.getElementById('create-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Añadir Administrador
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Formulario de Creación */}
        <Card id="create-form" className="p-8 shadow-xl border-none bg-white/90 backdrop-blur-sm">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Crear Administrador</h2>
                <p className="text-slate-600">Complete la información para crear una nueva cuenta de administrador</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre Completo */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Nombre de usuario *
              </Label>
              <Input
                type="text"
                placeholder="Ingrese el nombre de usuario"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            {/* Correo Electrónico */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                Correo Electrónico *
              </Label>
              <Input
                type="email"
                placeholder="admin@ejemplo.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium flex items-center">
                <Lock className="w-4 h-4 mr-2 text-blue-600" />
                Contraseña *
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-12"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium flex items-center">
                <Lock className="w-4 h-4 mr-2 text-blue-600" />
                Confirmar Contraseña *
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Repita la contraseña"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            {/* Información de seguridad */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div className="text-sm">
                  <h4 className="font-medium text-blue-900 mb-1">Requisitos de seguridad:</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• La contraseña debe tener al menos 8 caracteres</li>
                    <li>• Se recomienda usar mayúsculas, minúsculas y números</li>
                    <li>• El super admin tendrá acceso completo al sistema</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex space-x-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Crear Administrador
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({ name: '', email: '', password: '', confirmPassword: '' })}
                className="px-8 py-6 border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Limpiar
              </Button>
            </div>
          </form>
        </Card>

        {/* Información adicional */}
        <Card className="mt-6 p-6 bg-linear-to-r from-red-50 to-blue-50 border-red-200">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Permisos de Administrador</h3>
              <p className="text-red-700 text-sm">
                Los administradores tienen acceso completo para gestionar usuarios, 
                configuraciones del sistema y todas las funcionalidades administrativas.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}