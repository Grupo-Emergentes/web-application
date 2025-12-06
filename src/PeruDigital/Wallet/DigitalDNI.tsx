import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Download, Share2, QrCode, Shield, Eye, EyeOff, Copy, Check } from 'lucide-react';

interface DigitalDNIProps {
  onViewChange: (view: any) => void;
  dniData: any;
}

export function DigitalDNI({ onViewChange, dniData }: DigitalDNIProps) {
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const dataDNIBYEmail = {
    dniNumber: dniData.dniInformation.dniNumber,
    fullName: dniData.dniInformation.fullName,
    lastName: dniData.dniInformation.lastName,
    secondLastName: dniData.dniInformation.secondLastName,
    birthDate: dniData.dniInformation.birthDate,
    sex: dniData.dniInformation.sex,
    nationality: dniData.dniInformation.nationality,
    address: dniData.dniInformation.address,
    district: dniData.dniInformation.district,
    province: dniData.dniInformation.province,
    departament: dniData.dniInformation.departament,
    issueDate: dniData.dniInformation.issueDate,
    expirationDate: dniData.dniInformation.expirationDate,
    votingGroup: dniData.dniInformation.votingGroup,
    verificationDigit: dniData.dniInformation.verificationDigit,
    verified: dniData.dniInformation.verified,
    hashBlockchain: dniData.blockChainInformation.hash,
    verificaciones: 0,
    ultimaVerificacion: 'NUNCA'
  }
  
  const formatedDate = (dateToFarmated : any) => {
    const date = new Date(dateToFarmated);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  }
  
  // Formatear el nombre completo
  const nombres = dataDNIBYEmail.fullName || `${dataDNIBYEmail.lastName || ''} ${dataDNIBYEmail.secondLastName || ''}`.trim();
  const apellidos = `${dataDNIBYEmail.lastName || ''} ${dataDNIBYEmail.secondLastName || ''}`.trim();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-8">
      {showQRCode && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowQRCode(false)}
        >
          <div 
            className="bg-white p-6 rounded-xl shadow-xl border-2 border-black relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            
            <button
              onClick={() => setShowQRCode(false)}
              className="absolute top-2 right-2 text-black hover:text-red-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-center mb-4">Código QR</h2>

            <img
              src={dniData.qrCode}
              alt="Código QR del DNI"
              className="w-64 h-64 mx-auto border-4 border-black rounded-lg shadow-md"
            />

            <p className="text-center text-gray-700 mt-4 text-sm">
              Escanéalo para verificar tu identidad digital
            </p>
          </div>
        </div>
      )}

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
                        <p className="text-xs text-gray-600 font-semibold">{dataDNIBYEmail.lastName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Datos personales */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">DNI N°</label>
                        <p className="text-xl font-bold text-black">{dataDNIBYEmail.dniNumber}</p>
                      </div>
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">Sexo</label>
                        <p className="text-black font-semibold">{dataDNIBYEmail.sex === 'M' ? 'MASCULINO' : dataDNIBYEmail.sex === 'F' ? 'FEMENINO' : dataDNIBYEmail.sex}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Apellidos</label>
                      <p className="text-lg font-bold text-black">{apellidos}</p>
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Nombres</label>
                      <p className="text-lg font-bold text-black">{nombres}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">Fecha de Nacimiento</label>
                        <p className="text-black font-semibold">
                          {showSensitiveData ? (formatedDate(dataDNIBYEmail.birthDate)) : '••/••/••••'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-gray-600 font-bold mb-1">Nacionalidad</label>
                        <p className="text-black font-semibold">{dataDNIBYEmail.nationality}</p>
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
                        {showSensitiveData ? (dataDNIBYEmail.address) : '••••••••••••••••••••••••••••'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Distrito</label>
                      <p className="text-black font-semibold">{dataDNIBYEmail.district}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Provincia</label>
                      <p className="text-black font-semibold">{dataDNIBYEmail.province}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Departamento</label>
                      <p className="text-black font-semibold">{dataDNIBYEmail.departament}</p>
                    </div>
                  </div>
                </div>

                {/* Fechas de documento */}
                <div className="mt-6 pt-6 border-t-2 border-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Fecha de Emisión</label>
                      <p className="text-black font-semibold">{formatedDate(dataDNIBYEmail.issueDate)}</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Fecha de Vencimiento</label>
                      <p className="text-black font-semibold">{formatedDate(dataDNIBYEmail.expirationDate)}</p>
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
                <Button variant="outline" className="w-full border-2 border-black hover:bg-gray-50 font-medium cursor-pointer"
                  onClick={() => setShowQRCode(true)}>
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
                      {dataDNIBYEmail.hashBlockchain}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(dataDNIBYEmail.hashBlockchain)}
                      className="border-2 border-black"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Verificaciones</label>
                  <p className="text-black font-semibold">{dataDNIBYEmail.verificaciones} verificaciones</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Última Verificación</label>
                  <p className="text-black font-semibold">{dataDNIBYEmail.ultimaVerificacion}</p>
                </div>
              </div>
            </Card>

            
          </div>
        </div>
      </div>
    </div>
  );
}