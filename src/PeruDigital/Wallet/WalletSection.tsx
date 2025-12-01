/*Hola, cuando tengas el backend listo haz simplemente esto: 
1. Comentas la sección const dniData 
2. Descomentas la sección de const [dniData, setDniData] incluido el useeffect completo
3. Descomentas el loading
*/

import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Wallet, 
  Shield, 
  Link, 
  Eye, 
  FileText, 
  Share2, 
  CheckCircle,
  Hash
} from 'lucide-react';

interface WalletSectionProps {
  onViewChange: (view: any) => void;
  fullView?: boolean;
}

export function WalletSection({ onViewChange, fullView = false }: WalletSectionProps) {
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [showDNIModal, setShowDNIModal] = useState(false);

  // Mock: ID temporal para desarrollo
  const userId = 1;

  // Datos por defecto del DNI (simulando respuesta del backend)

  const documents = [
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
      gradient: 'from-gray-800 to-gray-900'
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
      gradient: 'from-gray-700 to-gray-800'
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
      gradient: 'from-gray-600 to-gray-700'
    }
  ];

  const metrics = [
    { label: 'Documentos Activos', value: '4', icon: FileText, gradient: 'from-gray-800 to-black' },
    { label: 'Verificaciones Hoy', value: '12', icon: CheckCircle, gradient: 'from-red-600 to-red-700' },
    { label: 'Nivel de Seguridad', value: '99%', icon: Shield, gradient: 'from-black to-gray-900' },
    { label: 'Hash Blockchain', value: 'Verificado', icon: Hash, gradient: 'from-gray-700 to-gray-800' }
  ];

  if (fullView) {
    return (
      <div className="min-h-screen bg-white pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              
              <div>
                <h1 className="text-4xl font-bold text-black">
                  Mi Billetera Digital
                </h1>
                <p className="text-gray-600">Documentos oficiales del Estado Peruano con tecnología blockchain</p>
              </div>
            </div>
          </div>

          <WalletContent 
            documents={documents} 
            metrics={metrics} 
            selectedDocument={selectedDocument} 
            setSelectedDocument={setSelectedDocument} 
            onViewChange={onViewChange} 
            showDNIModal={showDNIModal} 
            setShowDNIModal={setShowDNIModal}
            userId={userId}
          />
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
          className="border-2 border-red-600 text-red-700 hover:bg-red-50 shadow-md"
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
        userId={userId}
      />
    </section>
  );
}

interface WalletContentProps {
  documents: any[];
  metrics: any[];
  selectedDocument: string;
  setSelectedDocument: (value: string) => void;
  onViewChange: (view: any) => void;
  preview?: boolean;
  showDNIModal: boolean;
  setShowDNIModal: (value: boolean) => void;
  userId: number;
}

function WalletContent({ 
  documents, 
  metrics, 
  onViewChange, 
  preview = false,
}: WalletContentProps) {
  // Datos mock del DNI (cuando el backend esté listo, descomentar el useEffect abajo)
  const dniData = {
    dniNumber: '72345678',
    cardNumber: '001234567',
    lastName: '????',
    secondLastName: 'QUISPE',
    fullName: 'CARLOS ALBERTO MENDOZA QUISPE',
    sex: 'M',
    nationality: 'PERUANA',
    birthDate: '15/03/1985',
    issueDate: '20/05/2020',
    expirationDate: '20/05/2030',
    verificationDigit: '8',
    birthUbigeo: '150101',
    votingGroup: 'A',
    address: 'AV. REPÚBLICA DE CHILE 456',
    departament: 'LIMA',
    province: 'LIMA',
    district: 'JESÚS MARÍA',
    photo: null,
    signature: null,
    verified: true,
    hashBlockchain: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    verificaciones: 142,
    hash: '0x1a2b3c4d5e6f7g8h9i0j...',
    ultimaVerificacion: '2024-01-15 14:30',
    createdAt: '2020-05-20T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  };

  // TODO: Cuando el backend esté listo, descomentar esto y comentar el dniData de arriba
  /*
  const [dniData, setDniData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDniData = async () => {
      try {
        setLoading(true);
        console.log('Fetching DNI data for userId:', userId);
        const data = await walletService.getDniByUserId(userId);
        console.log('DNI data received:', data);
        setDniData(data);
      } catch (error) {
        console.error('Error fetching DNI data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDniData();
  }, [userId]);
  */

  // Crear el objeto dniDocument SIEMPRE (con datos del servicio o valores por defecto)
  const dniDocument = {
    id: 'dni',
    name: 'DNI Digital (RENIEC)',
    number: dniData?.dniNumber || dniData?.cardNumber || '???',
    status: dniData?.verified ? 'Activo' : 'Pendiente',
    security: 'máxima',
    verifications: 142,
    lastVerification: dniData?.updatedAt || '2024-01-15 14:30',
    hash: '0x1a2b3c4d5e6f7g8h9i...',
    entity: 'RENIEC',
    gradient: 'from-red-600 to-red-700',
    fullName: dniData?.fullName || '???',
    lastName: dniData?.lastName,
    secondLastName: dniData?.secondLastName,
    sex: dniData?.sex,
    nationality: dniData?.nationality,
    birthDate: dniData?.birthDate,
    issueDate: dniData?.issueDate,
    expirationDate: dniData?.expirationDate,
    verificationDigit: dniData?.verificationDigit,
    birthUbigeo: dniData?.birthUbigeo,
    votingGroup: dniData?.votingGroup,
    address: dniData?.address,
    departament: dniData?.departament,
    province: dniData?.province,
    district: dniData?.district,
    photo: dniData?.photo,
    signature: dniData?.signature,
    verified: dniData?.verified,
    createdAt: dniData?.createdAt
  };

  // Combinar el DNI con el resto de documentos
  const allDocuments = [dniDocument, ...documents];

  // TODO: Descomentar esto cuando el backend esté listo
  /*
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
          <p className="text-slate-600">Cargando documentos...</p>
        </div>
      </div>
    );
  }
  */

  return (
    <div className="space-y-6">
      {/* Badges de seguridad */}
      <div className="flex flex-wrap gap-3">
        <Badge className="bg-white text-black border-2 border-black shadow-sm px-4 py-2 font-medium">
          <CheckCircle className="w-4 h-4 mr-1" />
          Verificada
        </Badge>
        <Badge className="bg-red-600 text-white border-2 border-red-700 shadow-sm px-4 py-2 font-medium">
          <Link className="w-4 h-4 mr-1" />
          Blockchain Activo
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
        <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-gray-900 shadow-md">
          <TabsTrigger value="documents" className="data-[state=active]:bg-red-600 data-[state=active]:text-white font-medium">
            Documentos
          </TabsTrigger>
          <TabsTrigger value="blockchain" className="data-[state=active]:bg-black data-[state=active]:text-white font-medium">
            Blockchain
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white font-medium">
            Actividad
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white font-medium">
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6 mt-6">
          {/* Lista de documentos */}
          <div className="space-y-4">
            {allDocuments.slice(0, preview ? 2 : allDocuments.length).map((doc: any) => (
              <Card key={doc.id} className="p-6 hover:shadow-xl transition-all border-2 border-gray-900 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-12 h-12 bg-linear-to-br ${doc.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-black font-semibold">{doc.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-white text-black border-2 border-black text-xs font-medium">
                            {doc.status}
                          </Badge>
                          <Badge variant="outline" className="border-2 border-gray-900 text-black text-xs font-medium">
                            Seguridad: {doc.security}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-900">
                        <span className="text-gray-600 font-medium">Número:</span>
                        <span className="ml-1 text-black font-semibold">{doc.number}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-900">
                        <span className="text-gray-600 font-medium">Verificaciones:</span>
                        <span className="ml-1 text-black font-semibold">{doc.verifications}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-900">
                        <span className="text-gray-600 font-medium">Última:</span>
                        <span className="ml-1 text-black font-semibold">{doc.lastVerification}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm bg-gray-50 p-3 rounded-lg border-2 border-gray-900">
                      <span className="text-gray-600 font-medium">Hash:</span>
                      <span className="ml-1 font-mono text-xs text-black font-semibold">{doc.hash}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      onClick={() => {
                        console.log('🔘 CLICK en botón Ver detectado!');
                        console.log('📋 doc.id:', doc.id);
                        console.log('📋 dniData existe?:', !!dniData);
                        console.log('📋 dniData:', dniData);
                        
                        // Si es el DNI, guardamos los datos en localStorage
                        if (doc.id === 'dni' && dniData) {
                          console.log('💾 WalletSection: Guardando datos del DNI en localStorage...');
                          console.log('📦 Datos a guardar:', dniData);
                          localStorage.setItem('currentDniData', JSON.stringify(dniData));
                          console.log('✅ Datos guardados exitosamente en localStorage');
                          
                          // Verificar que se guardó correctamente
                          const verificacion = localStorage.getItem('currentDniData');
                          console.log('🔍 Verificación - Datos en localStorage:', verificacion ? 'Encontrados' : 'No encontrados');
                          if (verificacion) {
                            console.log('📄 Contenido guardado (primeros 200 chars):', verificacion.substring(0, 200));
                          }
                        } else if (doc.id === 'dni' && !dniData) {
                          console.warn('⚠️ WalletSection: No hay datos del DNI para guardar (dniData es null)');
                        } else {
                          console.log('ℹ️ Este botón no es del DNI (es:', doc.id, ')');
                        }
                        
                        console.log('🚀 Navegando a digital-dni...');
                        onViewChange('digital-dni');
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white shadow-md border-2 border-red-700"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="border-2 border-gray-900 text-black hover:bg-gray-50">
                      <FileText className="w-4 h-4 mr-1" />
                      Reporte
                    </Button>
                    <Button size="sm" variant="outline" className="border-2 border-gray-900 text-black hover:bg-gray-50">
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

          
        </TabsContent>

        <TabsContent value="blockchain" className="mt-6">
          <Card className="p-6 bg-white border-2 border-gray-900 shadow-lg">
            <h3 className="text-black font-bold text-lg mb-4">Estado de Blockchain</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border-2 border-gray-900">
                <span className="text-black font-medium">Red Blockchain:</span>
                <Badge className="bg-red-600 text-white border-2 border-red-700 font-medium">Perú Chain Activa</Badge>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border-2 border-gray-900">
                <span className="text-black font-medium">Último bloque:</span>
                <span className="font-mono text-black font-bold">#2,487,391</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border-2 border-gray-900">
                <span className="text-black font-medium">Hash de verificación:</span>
                <span className="font-mono text-xs text-black font-semibold">0xa1b2c3d4e5f6789...</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card className="p-6 bg-white border-2 border-gray-900 shadow-lg">
            <h3 className="text-black font-bold text-lg mb-4">Actividad Reciente</h3>
            <div className="space-y-4">
              {[
                { action: 'Verificación DNI Digital', time: '2024-01-15 14:30', status: 'Exitosa' },
                { action: 'Verificación Licencia MTC', time: '2024-01-12 09:15', status: 'Exitosa' },
                { action: 'Acceso a certificado COVID-19', time: '2024-01-10 16:45', status: 'Exitosa' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border-2 border-gray-900">
                  <div>
                    <div className="text-black font-medium">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.time}</div>
                  </div>
                  <Badge className="bg-white text-black border-2 border-black font-medium">{activity.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="p-6 bg-white border-2 border-gray-900 shadow-lg">
            <h3 className="text-black font-bold text-lg mb-4">Configuración de Seguridad</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border-2 border-gray-900">
                <span className="text-black font-medium">Autenticación de dos factores:</span>
                <Badge className="bg-white text-black border-2 border-black font-medium">Activa</Badge>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border-2 border-gray-900">
                <span className="text-black font-medium">Notificaciones de acceso:</span>
                <Badge className="bg-white text-black border-2 border-black font-medium">Activa</Badge>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border-2 border-gray-900">
                <span className="text-black font-medium">Cifrado biométrico:</span>
                <Badge className="bg-red-600 text-white border-2 border-red-700 font-medium">Activo</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      
    </div>
  );
}