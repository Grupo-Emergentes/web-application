import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Download, Share2, QrCode, Shield, Eye, EyeOff, Copy, Check } from 'lucide-react';

interface DigitalDNIProps {
  onViewChange: (view: any) => void;
}

export function DigitalDNI({ onViewChange }: DigitalDNIProps) {
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dniData, setDniData] = useState<any>(null);
  const [dataSource, setDataSource] = useState<'localStorage' | 'default' | 'loading'>('loading');

  // Leer datos desde localStorage al montar el componente
  useEffect(() => {
    console.log('🔍 DigitalDNI: Iniciando carga de datos...');
    
    const storedData = localStorage.getItem('currentDniData');
    
    if (!storedData) {
      console.warn('⚠️ No se encontraron datos en localStorage con la clave "currentDniData"');
      console.log('📋 Usando datos por defecto');
      setDataSource('default');
      return;
    }

    console.log('✅ Datos encontrados en localStorage');
    console.log('📦 Datos raw:', storedData.substring(0, 100) + '...');

    try {
      const parsedData = JSON.parse(storedData);
      console.log('✅ Datos parseados correctamente:', parsedData);
      
      // Validar que tenga al menos un campo clave
      if (parsedData && (parsedData.dniNumber || parsedData.cardNumber)) {
        setDniData(parsedData);
        setDataSource('localStorage');
        console.log('🎉 Datos del DNI cargados desde localStorage exitosamente');
      } else {
        console.error('❌ Los datos parseados no contienen campos válidos del DNI');
        console.log('📋 Usando datos por defecto');
        setDataSource('default');
      }
    } catch (error) {
      console.error('❌ Error al parsear datos del DNI:', error);
      console.log('📋 Usando datos por defecto');
      setDataSource('default');
    }
  }, []);

  // Datos por defecto si no hay datos en localStorage
  const defaultDniData = {
    dniNumber: '99999999',
    fullName: 'DATOS POR DEFECTO NO LOCALSTORAGE',
    lastName: '🚫🚫🚫 NO_LOCALSTORAGE',
    secondLastName: 'DEFAULT',
    birthDate: '01/01/2000',
    sex: 'X',
    nationality: 'DEFAULT',
    address: 'SIN DATOS DE LOCALSTORAGE',
    district: 'DEFAULT',
    province: 'DEFAULT',
    departament: 'DEFAULT',
    issueDate: '01/01/2000',
    expirationDate: '01/01/2000',
    votingGroup: 'X',
    verificationDigit: '0',
    verified: false,
    hashBlockchain: '0x000000000000000000000000000000000000000000',
    verificaciones: 0,
    ultimaVerificacion: 'NUNCA'
  };

  // Usar datos del localStorage o datos por defecto
  const displayData = dniData || defaultDniData;
  
  // Log del origen de los datos
  console.log('📊 Fuente de datos actual:', dataSource);
  console.log('📄 Datos a mostrar:', displayData);
  
  // Formatear el nombre completo
  const nombres = displayData.fullName || `${displayData.lastName || ''} ${displayData.secondLastName || ''}`.trim();
  const apellidos = `${displayData.lastName || ''} ${displayData.secondLastName || ''}`.trim();

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
              className="flex items-center space-x-2 border-2 border-black hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Billetera</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-black">DNI Digital</h1>
              <p className="text-gray-600">Documento Nacional de Identidad con validez legal</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Badge para indicar origen de datos */}
            {dataSource === 'localStorage' && (
              <Badge className="bg-red-600 text-white border-2 border-red-700 font-medium">Datos Reales</Badge>
            )}
            {dataSource === 'default' && (
              <Badge className="bg-gray-300 text-black border-2 border-gray-900 font-medium">Datos Demo</Badge>
            )}
            <Badge className="bg-white text-black border-2 border-black font-medium">Verificado</Badge>
            <Badge className="bg-black text-white border-2 border-black font-medium">RENIEC</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* DNI Visual */}
          <div className="lg:col-span-2">
            <Card className="p-0 overflow-hidden border-2 border-black shadow-xl">
              {/* Header del DNI */}
              <div className="bg-black text-white p-4 border-b-2 border-black">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">REPÚBLICA DEL PERÚ</h2>
                    <p className="text-sm opacity-90">DOCUMENTO NACIONAL DE IDENTIDAD</p>
                  </div>
                </div>
              </div>

              {/* Contenido del DNI */}
              <div className="p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Foto del DNI */}
                  <div className="md:col-span-1">
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-black">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm text-black font-medium">Foto DNI</p>
                        <p className="text-xs text-gray-600 font-semibold">{displayData.lastName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Datos personales */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">DNI N°</label>
                        <p className="text-xl font-bold text-black">{displayData.dniNumber || displayData.cardNumber}</p>
                      </div>
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">Sexo</label>
                        <p className="text-black font-semibold">{displayData.sex === 'M' ? 'MASCULINO' : displayData.sex === 'F' ? 'FEMENINO' : displayData.sex}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Apellidos</label>
                      <p className="text-lg font-bold text-black">{apellidos || displayData.apellidos}</p>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Nombres</label>
                      <p className="text-lg font-bold text-black">{nombres || displayData.nombres}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">Fecha de Nacimiento</label>
                        <p className="text-black font-semibold">
                          {showSensitiveData ? (displayData.birthDate || displayData.fechaNacimiento) : '••/••/••••'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">Nacionalidad</label>
                        <p className="text-black font-semibold">{displayData.nationality || displayData.estadoCivil}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="mt-6 pt-6 border-t-2 border-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Dirección</label>
                      <p className="text-black font-semibold">
                        {showSensitiveData ? (displayData.address || displayData.direccion) : '••••••••••••••••••••••••••••'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Distrito</label>
                      <p className="text-black font-semibold">{displayData.district || displayData.distrito}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Provincia</label>
                      <p className="text-black font-semibold">{displayData.province || displayData.provincia}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Departamento</label>
                      <p className="text-black font-semibold">{displayData.departament || displayData.departamento}</p>
                    </div>
                  </div>
                </div>

                {/* Fechas de documento */}
                <div className="mt-6 pt-6 border-t-2 border-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Fecha de Emisión</label>
                      <p className="text-black font-semibold">{displayData.issueDate || displayData.fechaEmision}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Fecha de Vencimiento</label>
                      <p className="text-black font-semibold">{displayData.expirationDate || displayData.fechaVencimiento}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Panel de acciones y información */}
          <div className="space-y-6">
            {/* Controles de privacidad */}
            <Card className="p-6 border-2 border-black shadow-lg">
              <h3 className="font-bold text-black text-lg mb-4">Controles de Privacidad</h3>
              <Button
                onClick={() => setShowSensitiveData(!showSensitiveData)}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 border-2 border-black hover:bg-gray-50 font-medium"
              >
                {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showSensitiveData ? 'Ocultar' : 'Mostrar'} datos sensibles</span>
              </Button>
            </Card>

            {/* Acciones */}
            <Card className="p-6 border-2 border-black shadow-lg">
              <h3 className="font-bold text-black text-lg mb-4">Acciones</h3>
              <div className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-2 border-red-700 font-medium">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-50 font-medium">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
                <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-50 font-medium">
                  <QrCode className="w-4 h-4 mr-2" />
                  Generar QR
                </Button>
              </div>
            </Card>

            {/* Información de seguridad */}
            <Card className="p-6 border-2 border-black shadow-lg">
              <h3 className="font-bold text-black text-lg mb-4 flex items-center">
                <Shield className="w-5 h-5 text-red-600 mr-2" />
                Seguridad Blockchain
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Hash de Verificación</label>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-xs bg-gray-100 p-2 rounded flex-1 truncate border-2 border-black">
                      {displayData.hashBlockchain || displayData.hash}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(displayData.hashBlockchain || displayData.hash)}
                      className="border-2 border-black"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Verificaciones</label>
                  <p className="text-black font-semibold">{displayData.verificaciones} verificaciones</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Última Verificación</label>
                  <p className="text-black font-semibold">{displayData.ultimaVerificacion || displayData.lastVerification}</p>
                </div>
              </div>
            </Card>

            
          </div>
        </div>
      </div>
    </div>
  );
}