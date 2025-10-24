import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DynamicForm } from './DynamicForm';
import { ArrowLeft, Plus, Calendar, Clock, FileText, Search, Filter } from 'lucide-react';

interface SolicitudesProps {
  onViewChange: (view: any) => void;
}

export function Solicitudes({ onViewChange }: SolicitudesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const solicitudes = [
    {
      id: 'SOL-2024-001',
      tipo: 'Certificado de Nacimiento',
      entidad: 'RENIEC',
      estado: 'En proceso',
      estadoColor: 'blue',
      fechaSolicitud: '2024-01-10',
      fechaEstimada: '2024-01-17',
      descripcion: 'Solicitud de certificado de nacimiento para trámites académicos'
    },
    {
      id: 'SOL-2024-002',
      tipo: 'Licencia de Conducir A2-B',
      entidad: 'MTC',
      estado: 'Completado',
      estadoColor: 'emerald',
      fechaSolicitud: '2024-01-05',
      fechaEstimada: '2024-01-12',
      descripcion: 'Renovación de licencia de conducir categoría A2-B'
    },
    {
      id: 'SOL-2024-003',
      tipo: 'Constancia de No Adeudo',
      entidad: 'SUNAT',
      estado: 'Pendiente',
      estadoColor: 'amber',
      fechaSolicitud: '2024-01-08',
      fechaEstimada: '2024-01-15',
      descripcion: 'Constancia de no adeudo tributario para licitación'
    }
  ];

  const citas = [
    {
      id: 'CITA-001',
      tipo: 'Renovación DNI',
      entidad: 'RENIEC',
      fecha: '2024-01-20',
      hora: '10:30',
      ubicacion: 'RENIEC Lima Centro',
      estado: 'Confirmada'
    },
    {
      id: 'CITA-002',
      tipo: 'Examen Médico Licencia',
      entidad: 'MTC',
      fecha: '2024-01-25',
      hora: '14:00',
      ubicacion: 'Centro Médico Autorizado - San Isidro',
      estado: 'Pendiente'
    }
  ];

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const matchesSearch = solicitud.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solicitud.entidad.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || solicitud.estado.toLowerCase().includes(filterStatus.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-red-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
              <h1 className="text-4xl bg-linear-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Solicitudes y Trámites
              </h1>
              <p className="text-slate-600">Gestiona tus solicitudes y programa citas</p>
            </div>
          </div>
          <Button
            onClick={() => onViewChange('services')}
            className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ir a Servicios
          </Button>
        </div>

        <Tabs defaultValue="solicitudes" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 shadow-sm">
            <TabsTrigger value="solicitudes" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:text-white">
              Mis Solicitudes
            </TabsTrigger>
            <TabsTrigger value="citas" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white">
              Mis Citas
            </TabsTrigger>
            <TabsTrigger value="historial" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white">
              Historial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solicitudes">
            {/* Filtros y búsqueda */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar solicitudes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="proceso">En proceso</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lista de solicitudes */}
            <div className="space-y-4">
              {filteredSolicitudes.map((solicitud) => (
                <Card key={solicitud.id} className="p-6 border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-slate-900">{solicitud.tipo}</h3>
                      <Badge className="bg-linear-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300 border shadow-sm">{solicitud.entidad}</Badge>
                      <Badge className={`bg-${solicitud.estadoColor}-100 text-${solicitud.estadoColor}-700 border-${solicitud.estadoColor}-300 border shadow-sm`}>
                        {solicitud.estado}
                      </Badge>
                    </div>
                    <span className="text-sm text-slate-600 font-mono">{solicitud.id}</span>
                  </div>
                  
                  <p className="text-slate-600 mb-4">{solicitud.descripcion}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-slate-600">Fecha de solicitud:</span>
                      <p className="text-slate-900">{solicitud.fechaSolicitud}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-slate-600">Fecha estimada:</span>
                      <p className="text-slate-900">{solicitud.fechaEstimada}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" size="sm" className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="citas">
            <div className="space-y-4">
              {citas.map((cita) => (
                <Card key={cita.id} className="p-6 border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-slate-900">{cita.tipo}</h3>
                      <Badge className="bg-linear-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300 border shadow-sm">{cita.entidad}</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border shadow-sm">
                        {cita.estado}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 rounded-lg border-2 border-blue-200 shadow-sm">
                      <span className="text-blue-700">Fecha:</span>
                      <p className="text-slate-900">{cita.fecha}</p>
                    </div>
                    <div className="bg-linear-to-br from-purple-50 to-purple-100 p-3 rounded-lg border-2 border-purple-200 shadow-sm">
                      <span className="text-purple-700">Hora:</span>
                      <p className="text-slate-900">{cita.hora}</p>
                    </div>
                    <div className="bg-linear-to-br from-emerald-50 to-emerald-100 p-3 rounded-lg border-2 border-emerald-200 shadow-sm">
                      <span className="text-emerald-700">Ubicación:</span>
                      <p className="text-slate-900">{cita.ubicacion}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50">
                        Reprogramar
                      </Button>
                      <Button variant="outline" size="sm" className="border-2 border-red-600 text-red-700 hover:bg-red-50">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historial">
            <Card className="p-12 text-center border-none bg-linear-to-br from-blue-50 via-purple-50 to-red-50 shadow-xl">
              <div className="w-20 h-20 bg-linear-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl text-slate-900 mb-3">Historial de Trámites</h3>
              <p className="text-slate-600">Aquí encontrarás todos tus trámites completados y archivados.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}