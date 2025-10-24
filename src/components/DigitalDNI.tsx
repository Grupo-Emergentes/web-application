import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Download, Share2, QrCode, Shield, Eye, EyeOff, Copy, Check } from 'lucide-react';

interface DigitalDNIProps {
  onViewChange: (view: any) => void;
}

export function DigitalDNI({ onViewChange }: DigitalDNIProps) {
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [copied, setCopied] = useState(false);

  const dniData = {
    numero: '72345678',
    nombres: 'CARLOS ALBERTO',
    apellidos: 'MENDOZA QUISPE',
    fechaNacimiento: '15/03/1985',
    sexo: 'MASCULINO',
    estadoCivil: 'SOLTERO',
    direccion: 'AV. REPÚBLICA DE CHILE 456, LIMA',
    distrito: 'JESÚS MARÍA',
    provincia: 'LIMA',
    departamento: 'LIMA',
    fechaEmision: '20/05/2020',
    fechaVencimiento: '20/05/2030',
    lugarNacimiento: 'LIMA, PERÚ',
    codigoQR: 'QR_DNI_72345678_2024',
    hashBlockchain: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    verificaciones: 142,
    ultimaVerificacion: '2024-01-15 14:30'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => onViewChange('wallet')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Billetera</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">DNI Digital</h1>
              <p className="text-gray-600">Documento Nacional de Identidad con validez legal</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-gray-200 text-gray-800 border border-gray-400">Verificado</Badge>
            <Badge className="bg-gray-300 text-gray-800 border border-gray-400">RENIEC</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* DNI Visual */}
          <div className="lg:col-span-2">
            <Card className="p-0 overflow-hidden">
              {/* Header del DNI */}
              <div className="bg-gray-700 text-white p-4 border-b-2 border-gray-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg">REPÚBLICA DEL PERÚ</h2>
                    <p className="text-sm opacity-90">DOCUMENTO NACIONAL DE IDENTIDAD</p>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-16 bg-gray-500 border-2 border-gray-400 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">P</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido del DNI */}
              <div className="p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Foto del DNI */}
                  <div className="md:col-span-1">
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">Foto DNI</p>
                        <p className="text-xs text-gray-500">Carlos Mendoza</p>
                      </div>
                    </div>
                  </div>

                  {/* Datos personales */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="block text-gray-600 font-medium mb-1">DNI N°</label>
                        <p className="text-xl font-bold text-gray-900">{dniData.numero}</p>
                      </div>
                      <div>
                        <label className="block text-gray-600 font-medium mb-1">Sexo</label>
                        <p className="text-gray-900">{dniData.sexo}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Apellidos</label>
                      <p className="text-lg font-semibold text-gray-900">{dniData.apellidos}</p>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Nombres</label>
                      <p className="text-lg font-semibold text-gray-900">{dniData.nombres}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="block text-gray-600 font-medium mb-1">Fecha de Nacimiento</label>
                        <p className="text-gray-900">
                          {showSensitiveData ? dniData.fechaNacimiento : '••/••/••••'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-gray-600 font-medium mb-1">Estado Civil</label>
                        <p className="text-gray-900">{dniData.estadoCivil}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Dirección</label>
                      <p className="text-gray-900">
                        {showSensitiveData ? dniData.direccion : '••••••••••••••••••••••••••••'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Distrito</label>
                      <p className="text-gray-900">{dniData.distrito}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Provincia</label>
                      <p className="text-gray-900">{dniData.provincia}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Departamento</label>
                      <p className="text-gray-900">{dniData.departamento}</p>
                    </div>
                  </div>
                </div>

                {/* Fechas de documento */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Fecha de Emisión</label>
                      <p className="text-gray-900">{dniData.fechaEmision}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">Fecha de Vencimiento</label>
                      <p className="text-gray-900">{dniData.fechaVencimiento}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Panel de acciones y información */}
          <div className="space-y-6">
            {/* Controles de privacidad */}
            <Card className="p-6 border-2 border-gray-300">
              <h3 className="font-semibold text-gray-900 mb-4">Controles de Privacidad</h3>
              <Button
                onClick={() => setShowSensitiveData(!showSensitiveData)}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 border-2 border-gray-800"
              >
                {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showSensitiveData ? 'Ocultar' : 'Mostrar'} datos sensibles</span>
              </Button>
            </Card>

            {/* Acciones */}
            <Card className="p-6 border-2 border-gray-300">
              <h3 className="font-semibold text-gray-900 mb-4">Acciones</h3>
              <div className="space-y-3">
                <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white border-2 border-gray-900">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button variant="outline" className="w-full border-2 border-gray-800">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
                <Button variant="outline" className="w-full border-2 border-gray-800">
                  <QrCode className="w-4 h-4 mr-2" />
                  Generar QR
                </Button>
              </div>
            </Card>

            {/* Información de seguridad */}
            <Card className="p-6 border-2 border-gray-300">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 text-gray-600 mr-2" />
                Seguridad Blockchain
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Hash de Verificación</label>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-xs bg-gray-100 p-2 rounded flex-1 truncate">
                      {dniData.hashBlockchain}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(dniData.hashBlockchain)}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Verificaciones</label>
                  <p className="text-gray-900">{dniData.verificaciones} verificaciones</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Última Verificación</label>
                  <p className="text-gray-900">{dniData.ultimaVerificacion}</p>
                </div>
              </div>
            </Card>

            {/* Estado del documento */}
            <Card className="p-6 border-2 border-gray-300">
              <h3 className="font-semibold text-gray-900 mb-4">Estado del Documento</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Validez Legal</span>
                  <Badge className="bg-gray-200 text-gray-800 border border-gray-400">Válido</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estado RENIEC</span>
                  <Badge className="bg-gray-200 text-gray-800 border border-gray-400">Activo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blockchain</span>
                  <Badge className="bg-gray-200 text-gray-800 border border-gray-400">Verificado</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs adicionales */}
        <div className="mt-8">
          <Tabs defaultValue="verification" className="w-full">
            <TabsList>
              <TabsTrigger value="verification">Historial de Verificaciones</TabsTrigger>
              <TabsTrigger value="usage">Historial de Uso</TabsTrigger>
              <TabsTrigger value="security">Configuración de Seguridad</TabsTrigger>
            </TabsList>

            <TabsContent value="verification">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Últimas Verificaciones</h3>
                <div className="space-y-3">
                  {[
                    { fecha: '2024-01-15 14:30', entidad: 'Banco Continental', tipo: 'Apertura de cuenta' },
                    { fecha: '2024-01-12 09:15', entidad: 'Universidad San Marcos', tipo: 'Matrícula académica' },
                    { fecha: '2024-01-10 16:45', entidad: 'Empresa ABC SAC', tipo: 'Proceso de contratación' }
                  ].map((verificacion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{verificacion.entidad}</p>
                        <p className="text-sm text-gray-600">{verificacion.tipo}</p>
                      </div>
                      <span className="text-xs text-gray-500">{verificacion.fecha}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="usage">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Estadísticas de Uso</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">142</div>
                    <div className="text-sm text-gray-600">Total verificaciones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-sm text-gray-600">Este mes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Esta semana</div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Configuración de Seguridad</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Notificaciones de uso</span>
                    <Badge className="bg-gray-200 text-gray-800 border border-gray-400">Activas</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Verificación biométrica</span>
                    <Badge className="bg-gray-200 text-gray-800 border border-gray-400">Habilitada</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Acceso remoto</span>
                    <Badge className="bg-gray-200 text-gray-800 border border-gray-400">Permitido</Badge>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}