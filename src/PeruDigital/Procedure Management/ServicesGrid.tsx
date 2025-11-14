import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Search, Baby, CreditCard, Heart, Home, FileText, Calculator, Car, Scale } from 'lucide-react';
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
      id: 'acta-nacimiento',
      name: 'Registro de Acta de Nacimiento',
      description: 'Inscripción oficial del nacimiento ante RENIEC para obtener el DNI del recién nacido',
      icon: Baby,
      status: 'Disponible',
      gradient: 'from-red-600 to-red-700',
      category: 'identificacion'
    },
    {
      id: 'renovacion-dni',
      name: 'Renovación de DNI',
      description: 'Actualización del Documento Nacional de Identidad por vencimiento o deterioro',
      icon: CreditCard,
      status: 'Disponible',
      gradient: 'from-gray-800 to-black',
      category: 'identificacion'
    },
    {
      id: 'matrimonio',
      name: 'Registro de Matrimonio Civil',
      description: 'Inscripción legal del matrimonio ante la municipalidad y registro civil',
      icon: Heart,
      status: 'Disponible',
      gradient: 'from-red-500 to-red-600',
      category: 'registro-civil'
    },
    {
      id: 'cambio-domicilio',
      name: 'Cambio de Domicilio',
      description: 'Actualización de dirección legal en RENIEC para documentos oficiales',
      icon: Home,
      status: 'Disponible',
      gradient: 'from-gray-700 to-gray-800',
      category: 'identificacion'
    },
    {
      id: 'solicitud-ruc',
      name: 'Solicitud de RUC',
      description: 'Inscripción en el Registro Único de Contribuyentes para actividades económicas',
      icon: FileText,
      status: 'Disponible',
      gradient: 'from-black to-gray-900',
      category: 'tributario'
    },
    {
      id: 'estado-tributario',
      name: 'Consulta de Estado Tributario',
      description: 'Verificación de situación fiscal, deudas y comprobantes ante SUNAT',
      icon: Calculator,
      status: 'Disponible',
      gradient: 'from-gray-600 to-gray-700',
      category: 'tributario'
    },
    {
      id: 'transferencia-vehicular',
      name: 'Transferencia Vehicular Digital',
      description: 'Cambio de propietario vehicular con validación notarial electrónica',
      icon: Car,
      status: 'Nuevo',
      gradient: 'from-gray-900 to-black',
      category: 'notarial'
    },
    {
      id: 'arrendamiento',
      name: 'Contrato de Arrendamiento',
      description: 'Formalización digital de contrato de alquiler con firma notarial electrónica',
      icon: Scale,
      status: 'Disponible',
      gradient: 'from-gray-500 to-gray-600',
      category: 'notarial'
    }
  ];

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'identificacion', label: 'Identificación y DNI' },
    { value: 'tributario', label: 'Trámites Tributarios' },
    { value: 'registro-civil', label: 'Registro Civil' },
    { value: 'notarial', label: 'Servicios Notariales' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (fullView) {
    return (
      <div className="min-h-screen bg-white pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => onViewChange('dashboard')}
                className="flex items-center space-x-2 border-2 border-black text-black hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-black">Trámites Digitales</h1>
                <p className="text-gray-600">Realiza tus trámites oficiales del Estado Peruano 100% en línea</p>
              </div>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
                <Input
                  placeholder="Buscar trámites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-black shadow-md font-medium"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="border-2 border-black shadow-md font-medium">
                <SelectValue />
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
          <h2 className="text-3xl font-bold text-black">
            Trámites Digitales
          </h2>
          <p className="text-gray-600 mt-1">Realiza tus trámites oficiales 100% en línea</p>
        </div>
        <Button
          variant="outline"
          onClick={() => onViewChange('services')}
          className="border-2 border-red-600 text-red-700 hover:bg-red-50 shadow-md font-medium"
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
            className="p-6 border-2 border-black hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 bg-white"
          >
            <div className="space-y-4">
              {/* Header con icono y estado */}
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 bg-linear-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <Badge className={`${
                  service.status === 'Disponible' ? 'bg-white text-black border-2 border-black' :
                  service.status === 'Nuevo' ? 'bg-red-600 text-white border-2 border-red-700' :
                  'bg-gray-300 text-black border-2 border-gray-900'
                } shadow-sm font-medium`}>
                  {service.status}
                </Badge>
              </div>

              {/* Contenido */}
              <div>
                <h3 className="text-black font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              {/* Botón de acción */}
              <Button 
                className={`w-full shadow-lg transition-all font-medium ${
                  service.status === 'Disponible' 
                    ? `bg-linear-to-r ${service.gradient} text-white hover:shadow-xl border-2 ${service.gradient.includes('red') ? 'border-red-700' : 'border-black'}`
                    : 'border-2 border-gray-900 text-gray-600 bg-gray-100'
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
