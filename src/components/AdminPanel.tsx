import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Users, FileText, Shield, BarChart3, AlertTriangle } from 'lucide-react';

interface AdminPanelProps {
  onViewChange: (view: any) => void;
}

export function AdminPanel({ onViewChange }: AdminPanelProps) {
  const estadisticas = [
    { title: 'Usuarios Activos', value: '124,567', change: '+5.2%', icon: Users, gradient: 'from-blue-500 to-blue-600' },
    { title: 'Documentos Emitidos', value: '89,234', change: '+12.1%', icon: FileText, gradient: 'from-red-500 to-red-600' },
    { title: 'Verificaciones Hoy', value: '2,341', change: '+8.7%', icon: Shield, gradient: 'from-emerald-500 to-emerald-600' },
    { title: 'Servicios Activos', value: '8/8', change: '100%', icon: BarChart3, gradient: 'from-purple-500 to-purple-600' }
  ];

  const serviciosEstado = [
    { entidad: 'SUNAT', estado: 'Operativo', usuarios: '45,231', operaciones: '12,456', estadoColor: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
    { entidad: 'RENIEC', estado: 'Operativo', usuarios: '67,892', operaciones: '8,901', estadoColor: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
    { entidad: 'MTC', estado: 'Mantenimiento', usuarios: '23,145', operaciones: '234', estadoColor: 'bg-amber-100 text-amber-700 border-amber-300' },
    { entidad: 'MINSA', estado: 'Operativo', usuarios: '34,567', operaciones: '5,678', estadoColor: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
    { entidad: 'MINEDU', estado: 'Operativo', usuarios: '28,901', operaciones: '3,456', estadoColor: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
    { entidad: 'Municipalidades', estado: 'Degradado', usuarios: '12,345', operaciones: '123', estadoColor: 'bg-orange-100 text-orange-700 border-orange-300' }
  ];

  const alertas = [
    { tipo: 'Crítica', mensaje: 'Alto uso de CPU en servidor RENIEC', tiempo: '5 min ago', tipoColor: 'bg-red-100 text-red-700 border-red-300' },
    { tipo: 'Advertencia', mensaje: 'Mantenimiento programado MTC mañana', tiempo: '1 hora ago', tipoColor: 'bg-amber-100 text-amber-700 border-amber-300' },
    { tipo: 'Info', mensaje: 'Actualización de seguridad completada', tiempo: '2 horas ago', tipoColor: 'bg-blue-100 text-blue-700 border-blue-300' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-red-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => onViewChange('dashboard')}
              className="flex items-center space-x-2 border-2 hover:bg-red-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Panel de Administración</h1>
              <p className="text-slate-600">Monitoreo y gestión del sistema Perú Digital</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300">Sistema Operativo</Badge>
            <Badge className="bg-blue-100 text-blue-700 border border-blue-300">Admin: Carlos Mendoza</Badge>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {estadisticas.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 border-none bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm font-semibold text-emerald-600">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 bg-linear-to-br ${stat.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="bg-white border shadow-md">
            <TabsTrigger value="services" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:text-white">Estado de Servicios</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white">Gestión de Usuarios</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-700 data-[state=active]:text-white">Seguridad</TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white">Logs del Sistema</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-700 data-[state=active]:text-white">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <div className="space-y-6">
              {/* Alertas del sistema */}
              <Card className="p-6 bg-white shadow-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  Alertas del Sistema
                </h3>
                <div className="space-y-3">
                  {alertas.map((alerta, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:shadow-md transition-all">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${alerta.tipoColor} border`}>
                          {alerta.tipo}
                        </Badge>
                        <span className="text-slate-900">{alerta.mensaje}</span>
                      </div>
                      <span className="text-sm text-slate-500">{alerta.tiempo}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Estado de servicios por entidad */}
              <Card className="p-6 bg-white shadow-lg border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Estado de Servicios por Entidad</h3>
                <div className="space-y-4">
                  {serviciosEstado.map((servicio, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200 hover:shadow-md transition-all">
                      <div className="flex items-center space-x-4">
                        <h4 className="font-medium text-slate-900">{servicio.entidad}</h4>
                        <Badge className={`${servicio.estadoColor} border`}>
                          {servicio.estado}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-slate-600">
                        <div>
                          <span className="font-medium">Usuarios:</span> {servicio.usuarios}
                        </div>
                        <div>
                          <span className="font-medium">Operaciones:</span> {servicio.operaciones}
                        </div>
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                          Monitorear
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-6 bg-white shadow-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-6">Gestión de Usuarios</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-md">
                  <div className="text-3xl font-bold text-blue-700">124,567</div>
                  <div className="text-sm text-blue-600">Usuarios Registrados</div>
                </Card>
                <Card className="p-6 text-center bg-linear-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-md">
                  <div className="text-3xl font-bold text-emerald-700">98,234</div>
                  <div className="text-sm text-emerald-600">Usuarios Activos</div>
                </Card>
                <Card className="p-6 text-center bg-linear-to-br from-red-50 to-red-100 border border-red-200 shadow-md">
                  <div className="text-3xl font-bold text-red-700">1,245</div>
                  <div className="text-sm text-red-600">Cuentas Suspendidas</div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6 bg-white shadow-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Estado de Seguridad</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:shadow-md transition-all">
                  <span className="text-slate-900">Certificados SSL</span>
                  <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300">Válidos</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:shadow-md transition-all">
                  <span className="text-slate-900">Firewall</span>
                  <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300">Activo</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:shadow-md transition-all">
                  <span className="text-slate-900">Monitoreo de Amenazas</span>
                  <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-300">Operativo</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:shadow-md transition-all">
                  <span className="text-slate-900">Actualizaciones de Seguridad</span>
                  <Badge className="bg-amber-100 text-amber-700 border border-amber-300">2 Pendientes</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card className="p-6 bg-white shadow-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Logs del Sistema</h3>
              <div className="space-y-2 font-mono text-sm bg-slate-900 text-emerald-400 p-4 rounded-lg border-2 border-slate-700 max-h-96 overflow-y-auto shadow-inner">
                <div>[2024-01-15 14:30:15] INFO: Usuario 72345678 accedió a DNI digital</div>
                <div>[2024-01-15 14:29:32] INFO: Verificación blockchain completada - hash: 0x1a2b3c...</div>
                <div>[2024-01-15 14:28:45] WARN: Alto uso de CPU en servidor RENIEC</div>
                <div>[2024-01-15 14:27:12] INFO: Nueva solicitud de certificado - SOL-2024-001</div>
                <div>[2024-01-15 14:26:38] INFO: Backup automático completado</div>
                <div>[2024-01-15 14:25:55] INFO: Usuario 87654321 renovó licencia MTC</div>
                <div>[2024-01-15 14:24:12] ERROR: Timeout en conexión con base de datos SUNAT</div>
                <div>[2024-01-15 14:23:47] INFO: Sistema de notificaciones reiniciado</div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6 bg-white shadow-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Configuración del Sistema</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Configuración General</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-slate-900">Mantenimiento Programado</span>
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-slate-900">Límites de Rate Limiting</span>
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">Ajustar</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-slate-900">Configuración de Backups</span>
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">Modificar</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Integración con Entidades</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-slate-900">APIs de Entidades Públicas</span>
                      <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">Gestionar</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-slate-900">Certificados de Integración</span>
                      <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">Renovar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}