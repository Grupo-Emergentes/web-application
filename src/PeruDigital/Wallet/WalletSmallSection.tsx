import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Wallet, 
  ArrowLeft, 
  Shield, 
  FileText, 
  CheckCircle,
  MoreVertical
} from 'lucide-react';

interface WalletSmallSectionProps {
  onViewChange: (view: any) => void;
  fullView?: boolean;
}

export function WalletSmallSection({ onViewChange, fullView = false }: WalletSmallSectionProps) {
  const [showDNIModal, setShowDNIModal] = useState(false);

  const documents = [
    {
      id: 'dni',
      name: 'DNI Digital',
      entity: 'Documento Nacional de Identidad - RENIEC',
      number: '7234 5678',
      status: 'Activo',
      validUntil: 'Válido hasta 2029-03-15',
      bg: 'bg-linear-to-br from-red-600 to-red-700',
      icon: Shield
    },
    {
      id: 'license',
      name: 'Licencia de Conducir',
      entity: 'Licencia Clase A-IIb - MTC',
      number: 'C723 4567 8',
      status: 'Activo',
      validUntil: 'Válido hasta 2026-08-20',
      bg: 'bg-linear-to-br from-gray-800 to-gray-900',
      icon: FileText
    },
    {
      id: 'covid',
      name: 'Certificado COVID-19',
      entity: 'Certificado de Vacunación - MINSA',
      number: 'VAC- 2024 -123 456',
      status: 'Activo',
      validUntil: '',
      bg: 'bg-linear-to-br from-gray-700 to-gray-800',
      icon: Shield
    },
    {
      id: 'ruc',
      name: 'RUC',
      entity: 'Registro Único de Contribuyentes - SUNAT',
      number: '2872 3456 781',
      status: 'Activo',
      validUntil: '',
      bg: 'bg-linear-to-br from-gray-600 to-gray-700',
      icon: FileText
    }
  ];

  const metrics = [
    { label: 'Documentos Activos', value: '4', icon: Shield, bg: 'bg-linear-to-br from-black to-gray-900', iconColor: 'text-white', border: 'border-black' },
    { label: 'Próximos a Vencer', value: '1', icon: FileText, bg: 'bg-linear-to-br from-red-600 to-red-700', iconColor: 'text-white', border: 'border-red-600' },
    { label: 'Certificados', value: '2', icon: CheckCircle, bg: 'bg-linear-to-br from-gray-800 to-black', iconColor: 'text-white', border: 'border-gray-800' }
  ];

  if (fullView) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => onViewChange('dashboard')}
                className="flex items-center space-x-2 border-2 border-black text-black hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-black">
                  Mi Billetera Digital
                </h1>
                <p className="text-gray-600">Documentos oficiales del Estado Peruano con tecnología blockchain</p>
              </div>
            </div>
          </div>

          <WalletContent documents={documents} metrics={metrics} onViewChange={onViewChange} showDNIModal={showDNIModal} setShowDNIModal={setShowDNIModal} />
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black flex items-center space-x-3">
            <Wallet className="w-8 h-8 text-red-600" />
            <span>Mi Billetera Digital</span>
          </h2>
          <p className="text-gray-600 mt-1">Documentos oficiales del Estado Peruano con tecnología blockchain</p>
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
        onViewChange={onViewChange} 
        preview={true}
        showDNIModal={showDNIModal}
        setShowDNIModal={setShowDNIModal}
      />
    </section>
  );
}

function WalletContent({ documents, metrics, onViewChange, preview = false, setShowDNIModal }: any) {
  return (
    <div className="space-y-6">
      {/* Header con información */}
      <Card className="bg-white border-2 border-red-600 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-1">Mi Billetera Digital</h3>
              <p className="text-sm text-gray-600 mb-3">Todos tus documentos del Estado Peruano en un solo lugar</p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-semibold text-red-600">4 documentos</span>
              </div>
            </div>
          </div>
          {!preview && (
            <Button className="bg-black text-white hover:bg-gray-800">
              + Agregar Documento
            </Button>
          )}
        </div>
      </Card>

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric: any, index: number) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className={`${metric.bg} border-2 ${metric.border} p-6 text-center`}>
              <Icon className={`w-8 h-8 mx-auto mb-2 ${metric.iconColor}`} />
              <div className="text-3xl font-bold text-white">{metric.value}</div>
              <div className="text-sm text-white mt-1">{metric.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Lista de documentos - Grid 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.slice(0, preview ? 4 : documents.length).map((doc: any) => {
          const Icon = doc.icon;
          
          return (
            <Card 
              key={doc.id} 
              className={`${doc.bg} text-white p-6 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden group`}
              onClick={() => doc.id === 'dni' ? setShowDNIModal(true) : null}
            >
              {/* Dots menu */}
              <button className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{doc.name}</h3>
                  <Badge className="bg-amber-500 text-white text-xs px-2 py-0.5 border-0">
                    {doc.status}
                  </Badge>
                </div>
                
                <p className="text-sm opacity-90">{doc.entity}</p>
                
                <div className="pt-2 space-y-1 text-sm">
                  <div className="font-semibold">{doc.number}</div>
                  {doc.validUntil && <div className="text-xs opacity-90">{doc.validUntil}</div>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {preview && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => onViewChange('wallet')}
            className="border-2 border-black text-black hover:bg-gray-100 shadow-lg"
          >
            Ver todos los documentos
          </Button>
        </div>
      )}
      
    </div>
  );
}