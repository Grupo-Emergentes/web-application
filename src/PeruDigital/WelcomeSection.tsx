import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowRight, Play, Users, Building2, Clock, Shield } from 'lucide-react';

interface WelcomeSectionProps {
  onViewChange: (view: any) => void;
}

export function WelcomeSection({ onViewChange }: WelcomeSectionProps) {
  return (
    <div className="text-center space-y-8">
      {/* Título principal con gradiente */}
      <div className="space-y-6 relative">
        <div className="absolute inset-0 bg-linear-to-r from-red-600/10 via-blue-600/10 to-red-600/10 rounded-3xl blur-3xl -z-10"></div>
        <h1 className="text-5xl md:text-6xl">
          Bienvenido a{' '}
          <span className="bg-linear-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
            Perú Digital
          </span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          La plataforma oficial del Estado Peruano para servicios digitales. 
          Gestiona tu DNI, realiza trámites en SUNAT, RENIEC y más entidades desde un solo lugar.
        </p>
      </div>

      {/* Botones de acción con gradientes */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          size="lg" 
          className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
          onClick={() => onViewChange('ayuda')}
        >
          <Play className="w-5 h-5 mr-2" />
          Comenzar Tour
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="border-2 border-red-600 text-red-700 hover:bg-red-50 px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          onClick={() => onViewChange('services')}
        >
          Servicios digitales Perú
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Estadísticas destacadas con gradientes y sombras */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        <Card className="p-6 text-center border-none bg-white text-black shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          <Users className="w-10 h-10 mx-auto mb-3 text-black" />
          <div className="text-3xl text-black">12M+</div>
          <div className="text-sm text-black">Ciudadanos registrados</div>
        </Card>
        <Card className="p-6 text-center border-none bg-white text-black shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          <Building2 className="w-10 h-10 mx-auto mb-3 text-black" />
          <div className="text-3xl text-black">8</div>
          <div className="text-sm text-black">Entidades públicas</div>
        </Card>
        <Card className="p-6 text-center border-none bg-white text-black shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          <Clock className="w-10 h-10 mx-auto mb-3 text-black" />
          <div className="text-3xl text-black">24/7</div>
          <div className="text-sm text-black">Disponibilidad</div>
        </Card>
        <Card className="p-6 text-center border-none bg-white text-black shadow-xl hover:shadow-2xl transition-all hover:scale-105">
          <Shield className="w-10 h-10 mx-auto mb-3 text-black" />
          <div className="text-3xl text-black">99%</div>
          <div className="text-sm text-black">Seguridad garantizada</div>
        </Card>
      </div>
    </div>
  );
}
