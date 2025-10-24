import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DNIModal } from './DNIModal';
import { 
  Wallet, 
  ArrowLeft, 
  Shield, 
  Link, 
  Lock, 
  Eye, 
  FileText, 
  Share2, 
  QrCode,
  CheckCircle,
  Activity,
  Hash
} from 'lucide-react';

interface WalletSectionProps {
  onViewChange: (view: any) => void;
  fullView?: boolean;
}

export function WalletSection({ onViewChange, fullView = false }: WalletSectionProps) {
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [showDNIModal, setShowDNIModal] = useState(false);

  const documents = [
    {
      id: 'dni',
      name: 'DNI Digital (RENIEC)',
      number: '72345678',
      status: 'Activo',
      security: 'máxima',
      verifications: 142,
      lastVerification: '2024-01-15 14:30',
      hash: '0x1a2b3c4d5e6f7g8h9i...',
      entity: 'RENIEC',
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'license',
      name: 'Licencia de Conducir (MTC)',
      number: 'C72345678',
      status: 'Activo',
      security: 'alta',
      verifications: 67,
      lastVerification: '2024-01-12 09:15',
      hash: '0x2b3c4d5e6f7g8h9i0j...',
      entity: 'MTC',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'covid',
      name: 'Certificado COVID-19 (MINSA)',
      number: 'VAC-2024-123456',
      status: 'Activo',
      security: 'alta',
      verifications: 23,
      lastVerification: '2024-01-10 16:45',
      hash: '0x3c4d5e6f7g8h9i0j1k...',
      entity: 'MINSA',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      id: 'ruc',
      name: 'RUC (SUNAT)',
      number: '20723456781',
      status: 'Activo',
      security: 'alta',
      verifications: 89,
      lastVerification: '2024-01-08 11:20',
      hash: '0x4d5e6f7g8h9i0j1k2l...',
      entity: 'SUNAT',
      gradient: 'from-blue-500 to-blue-600'
    }
  ];

  const metrics = [
    { label: 'Documentos Activos', value: '4', icon: FileText, gradient: 'from-blue-500 to-blue-600' },
    { label: 'Verificaciones Hoy', value: '12', icon: CheckCircle, gradient: 'from-emerald-500 to-emerald-600' },
    { label: 'Nivel de Seguridad', value: '99%', icon: Shield, gradient: 'from-amber-500 to-amber-600' },
    { label: 'Verificado Hash Blockchain', value: 'Verificado', icon: Hash, gradient: 'from-purple-500 to-purple-600' }
  ];

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
                <h1 className="text-4xl bg-linear-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Mi Billetera Digital
                </h1>
                <p className="text-slate-600">Documentos oficiales del Estado Peruano con tecnología blockchain</p>
              </div>
            </div>
          </div>

          <WalletContent documents={documents} metrics={metrics} selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} onViewChange={onViewChange} showDNIModal={showDNIModal} setShowDNIModal={setShowDNIModal} />
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center space-x-3">
            <Wallet className="w-8 h-8 text-red-600" />
            <span>Mi Billetera Digital</span>
          </h2>
          <p className="text-slate-600 mt-1">Documentos oficiales del Estado Peruano con tecnología blockchain</p>
        </div>
        <Button
          variant="outline"
          onClick={() => onViewChange('wallet')}
          className="border-2 border-red-600 text-red-700 hover:bg-red-50 shadow-lg"
        >
          Ver billetera completa
        </Button>
      </div>

      <WalletContent 
        documents={documents} 
        metrics={metrics} 
        selectedDocument={selectedDocument} 
        setSelectedDocument={setSelectedDocument} 
        onViewChange={onViewChange} 
        preview={true}
        showDNIModal={showDNIModal}
        setShowDNIModal={setShowDNIModal}
      />
    </section>
  );
}

function WalletContent({ documents, metrics, selectedDocument, setSelectedDocument, onViewChange, preview = false, showDNIModal, setShowDNIModal }: any) {
  return (
    <div className="space-y-6">
      {/* Badges de seguridad */}
      <div className="flex flex-wrap gap-3">
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border shadow-sm px-4 py-2">
          <CheckCircle className="w-4 h-4 mr-1" />
          Verificada
        </Badge>
        <Badge className="bg-blue-100 text-blue-700 border-blue-300 border shadow-sm px-4 py-2">
          <Link className="w-4 h-4 mr-1" />
          Blockchain Activo
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 border-purple-300 border shadow-sm px-4 py-2">
          <Lock className="w-4 h-4 mr-1" />
          Cifrado E2E
        </Badge>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric: any, index: number) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className={`p-6 text-center border-none bg-linear-to-br ${metric.gradient} text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105`}>
              <Icon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-2xl">{metric.value}</div>
              <div className="text-sm opacity-90">{metric.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Tabs principales */}
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 shadow-sm">
          <TabsTrigger value="documents" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:text-white">
            Documentos
          </TabsTrigger>
          <TabsTrigger value="blockchain" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white">
            Blockchain
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-700 data-[state=active]:text-white">
            Actividad
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white">
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6 mt-6">
          {/* Lista de documentos */}
          <div className="space-y-4">
            {documents.slice(0, preview ? 2 : documents.length).map((doc: any) => (
              <Card key={doc.id} className="p-6 hover:shadow-xl transition-all border border-slate-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-12 h-12 bg-linear-to-br ${doc.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-slate-900">{doc.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border text-xs">
                            {doc.status}
                          </Badge>
                          <Badge variant="outline" className="border-slate-300 text-slate-700 text-xs">
                            Seguridad: {doc.security}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-600">Número:</span>
                        <span className="ml-1 text-slate-900">{doc.number}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-600">Verificaciones:</span>
                        <span className="ml-1 text-slate-900">{doc.verifications}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-600">Última:</span>
                        <span className="ml-1 text-slate-900">{doc.lastVerification}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-slate-600">Hash:</span>
                      <span className="ml-1 font-mono text-xs text-slate-900">{doc.hash}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      onClick={() => doc.id === 'dni' ? setShowDNIModal(true) : onViewChange('digital-dni')}
                      className="bg-linear-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                      <FileText className="w-4 h-4 mr-1" />
                      Reporte
                    </Button>
                    <Button size="sm" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                      <Share2 className="w-4 h-4 mr-1" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {preview && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => onViewChange('wallet')}
                className="border-2 border-red-600 text-red-700 hover:bg-red-50 shadow-lg"
              >
                Ver todos los documentos
              </Button>
            </div>
          )}

          {/* Generador QR */}
          {!preview && (
            <Card className="p-6 bg-linear-to-br from-blue-50 to-purple-50 border border-blue-200 shadow-lg">
              <h3 className="text-slate-900 mb-4">Generador QR Dinámico</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">
                    Selecciona un documento
                  </label>
                  <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                    <SelectTrigger className="bg-white border-slate-300">
                      <SelectValue placeholder="Selecciona un documento" />
                    </SelectTrigger>
                    <SelectContent>
                      {documents.map((doc: any) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          {doc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-center bg-white rounded-lg h-32 border-2 border-dashed border-blue-300">
                  {selectedDocument ? (
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">QR generado con encriptación blockchain</p>
                    </div>
                  ) : (
                    <p className="text-slate-500">El QR se generará aquí con encriptación blockchain</p>
                  )}
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="blockchain" className="mt-6">
          <Card className="p-6 bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg">
            <h3 className="text-slate-900 mb-4">Estado de Blockchain</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-blue-200">
                <span className="text-slate-700">Red Blockchain:</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border">Perú Chain Activa</Badge>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-blue-200">
                <span className="text-slate-700">Último bloque:</span>
                <span className="font-mono text-blue-700">#2,487,391</span>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-blue-200">
                <span className="text-slate-700">Hash de verificación:</span>
                <span className="font-mono text-xs text-blue-700">0xa1b2c3d4e5f6789...</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card className="p-6 bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 shadow-lg">
            <h3 className="text-slate-900 mb-4">Actividad Reciente</h3>
            <div className="space-y-4">
              {[
                { action: 'Verificación DNI Digital', time: '2024-01-15 14:30', status: 'Exitosa' },
                { action: 'Verificación Licencia MTC', time: '2024-01-12 09:15', status: 'Exitosa' },
                { action: 'Acceso a certificado COVID-19', time: '2024-01-10 16:45', status: 'Exitosa' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-emerald-200">
                  <div>
                    <div className="text-slate-900">{activity.action}</div>
                    <div className="text-sm text-slate-600">{activity.time}</div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border">{activity.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="p-6 bg-linear-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-lg">
            <h3 className="text-slate-900 mb-4">Configuración de Seguridad</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-purple-200">
                <span className="text-slate-700">Autenticación de dos factores:</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border">Activa</Badge>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-purple-200">
                <span className="text-slate-700">Notificaciones de acceso:</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border">Activa</Badge>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-purple-200">
                <span className="text-slate-700">Cifrado biométrico:</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border">Activo</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {!preview && (
        <DNIModal open={showDNIModal} onClose={() => setShowDNIModal(false)} />
      )}
    </div>
  );
}
