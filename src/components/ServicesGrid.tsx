import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Search, Building2, CreditCard, Car, GraduationCap, Heart, MapPin, Briefcase, Scale } from 'lucide-react';
import { useState } from 'react';

interface ServicesGridProps {
  onViewChange: (view: any) => void;
  fullView?: boolean;
  onStartTramite?: (tramiteId: string, tramiteName: string) => void;
}

export function ServicesGrid({ onViewChange, fullView = false, onStartTramite }: ServicesGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Handler seguro para iniciar trámite
  const handleTramiteClick = (serviceId: string, serviceName: string) => {
    if (typeof onStartTramite === 'function') {
      onStartTramite(serviceId, serviceName);
    } else {
      console.warn('onStartTramite no está disponible', { serviceId, serviceName });
      // Fallback: intentar navegar a servicios
      onViewChange('services');
    }
  };

  const services = [
    {
      id: 'sunat',
      name: 'SUNAT',
      description: 'Declaraciones, pagos de impuestos, consulta RUC y comprobantes',
      icon: CreditCard,
      status: 'Disponible',
      gradient: 'from-blue-500 to-blue-600',
      category: 'tributario'
    },
    {
      id: 'reniec',
      name: 'RENIEC',
      description: 'DNI, certificados de nacimiento, defunción y estado civil',
      icon: Building2,
      status: 'Disponible',
      gradient: 'from-red-500 to-red-600',
      category: 'identificacion'
    },
    {
      id: 'mtc',
      name: 'MTC - Transportes',
      description: 'Licencias de conducir, SOAT y certificados vehiculares',
      icon: Car,
      status: 'Disponible',
      gradient: 'from-orange-500 to-orange-600',
      category: 'transporte'
    },
    {
      id: 'minedu',
      name: 'MINEDU',
      description: 'Certificados educativos, títulos profesionales y becas',
      icon: GraduationCap,
      status: 'Disponible',
      gradient: 'from-purple-500 to-purple-600',
      category: 'educacion'
    },
    {
      id: 'minsa',
      name: 'MINSA',
      description: 'SIS, certificados de vacunación y servicios de salud',
      icon: Heart,
      status: 'Disponible',
      gradient: 'from-pink-500 to-pink-600',
      category: 'salud'
    },
    {
      id: 'municipalidades',
      name: 'Municipalidades',
      description: 'Licencias de funcionamiento, predial y servicios locales',
      icon: MapPin,
      status: 'Mantenimiento',
      gradient: 'from-emerald-500 to-emerald-600',
      category: 'local'
    },
    {
      id: 'trabajo',
      name: 'Ministerio de Trabajo',
      description: 'CTS, gratificaciones y servicios laborales',
      icon: Briefcase,
      status: 'Disponible',
      gradient: 'from-amber-500 to-amber-600',
      category: 'laboral'
    },
    {
      id: 'judicial',
      name: 'Poder Judicial',
      description: 'Antecedentes penales, certificados judiciales',
      icon: Scale,
      status: 'Nuevo',
      gradient: 'from-indigo-500 to-indigo-600',
      category: 'judicial'
    }
  ];

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'tributario', label: 'Tributario' },
    { value: 'identificacion', label: 'Identificación' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'educacion', label: 'Educación' },
    { value: 'salud', label: 'Salud' },
    { value: 'local', label: 'Municipal' },
    { value: 'laboral', label: 'Laboral' },
    { value: 'judicial', label: 'Judicial' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (fullView) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-red-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => onViewChange('dashboard')}
                className="flex items-center space-x-2 border-2 border-red-600 text-red-700 hover:bg-red-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Button>
              <div>
                <h1 className="text-4xl bg-linear-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Servicios Disponibles</h1>
                <p className="text-slate-600">Accede a todos los servicios del Estado Peruano</p>
              </div>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Buscar servicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-300 shadow-sm"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="border-slate-300 shadow-sm">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ServicesContent services={filteredServices} onStartTramite={handleTramiteClick} />
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Servicios Disponibles
          </h2>
          <p className="text-slate-600 mt-1">Accede a servicios de entidades públicas peruanas</p>
        </div>
        <Button
          variant="outline"
          onClick={() => onViewChange('services')}
          className="border-2 border-red-600 text-red-700 hover:bg-red-50 shadow-lg"
        >
          Ver todos
        </Button>
      </div>

      <ServicesContent services={services} preview={true} onStartTramite={handleTramiteClick} />
    </section>
  );
}

function ServicesContent({ services, preview = false, onStartTramite }: any) {
  const displayServices = preview ? services.slice(0, 6) : services;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${preview ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
      {displayServices.map((service: any) => {
        const Icon = service.icon;
        return (
          <Card 
            key={service.id}
            className="p-6 border border-slate-200 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 bg-white"
          >
            <div className="space-y-4">
              {/* Header con icono y estado */}
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 bg-linear-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <Badge className={`${
                  service.status === 'Disponible' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' :
                  service.status === 'Nuevo' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                  'bg-amber-100 text-amber-700 border-amber-300'
                } border shadow-sm`}>
                  {service.status}
                </Badge>
              </div>

              {/* Contenido */}
              <div>
                <h3 className="text-slate-900 mb-2">{service.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
              </div>

              {/* Botón de acción */}
              <Button 
                className={`w-full shadow-lg transition-all ${
                  service.status === 'Disponible' 
                    ? `bg-linear-to-r ${service.gradient} text-white hover:shadow-xl`
                    : 'border-2 border-slate-300 text-slate-500'
                }`}
                variant={service.status === 'Disponible' ? 'default' : 'outline'}
                disabled={service.status === 'Mantenimiento'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (service.status === 'Disponible' && onStartTramite) {
                    onStartTramite(service.id, service.name);
                  }
                }}
              >
                {service.status === 'Mantenimiento' ? 'En mantenimiento' : 'Realizar Trámite'}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
