import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { 
  Download, 
  Share2, 
  QrCode, 
  Link2, 
  Shield,
  CheckCircle,
  Calendar,
  MapPin,
  User,
  Hash
} from 'lucide-react';

interface DNIModalProps {
  open: boolean;
  onClose: () => void;
}

export function DNIModal({ open, onClose }: DNIModalProps) {
  const [showQR, setShowQR] = useState(false);
  // const [shareMethod] = useState<'sms' | 'link' | null>(null);

  // Datos mock del DNI
  const dniData = {
    numero: '72345678',
    nombres: 'CARLOS ALBERTO',
    apellidos: 'MENDOZA GARCÍA',
    fechaNacimiento: '15/03/1990',
    lugarNacimiento: 'Lima, Perú',
    estadoCivil: 'Soltero',
    direccion: 'Av. Arequipa 1234, Miraflores, Lima',
    fechaEmision: '10/01/2020',
    fechaExpiracion: '10/01/2028',
    genero: 'Masculino',
    grupoSanguineo: 'O+',
    hashBlockchain: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
    ultimaVerificacion: '15/01/2024 14:30:00'
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto border-none p-0 shadow-2xl">
        <div className="p-6 border-b border-slate-200 bg-linear-to-r from-red-50 via-white to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-linear-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white">DNI</span>
              </div>
              <div>
                <h2 className="text-2xl bg-linear-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Documento Nacional de Identidad
                </h2>
                <p className="text-slate-600">Digital - Verificado por RENIEC</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 border px-3 py-1 shadow-sm">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verificado
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300 border px-3 py-1 shadow-sm">
                <Shield className="w-3 h-3 mr-1" />
                Blockchain
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Documento DNI Visual - Diseño tipo tarjeta DNI real */}
          <Card className="border-none overflow-hidden shadow-2xl">
            {/* Header del DNI */}
            <div className="bg-linear-to-r from-red-600 via-red-700 to-red-800 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl">REPÚBLICA DEL PERÚ</h3>
                  <p className="text-xl opacity-90 mt-2">DOCUMENTO NACIONAL DE IDENTIDAD</p>
                </div>
                <div className="w-24 h-24 bg-white/20 border-2 border-white/40 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl">
                  <span className="text-5xl">🇵🇪</span>
                </div>
              </div>
            </div>

            {/* Contenido del DNI */}
            <div className="p-8 bg-linear-to-br from-white via-slate-50 to-blue-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Foto y Huella */}
                <div className="space-y-4">
                  <div className="w-full aspect-3/4 bg-linear-to-br from-blue-100 to-blue-200 border-4 border-white rounded-xl flex items-center justify-center shadow-xl">
                    <User className="w-32 h-32 text-blue-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-700 mb-2">Huella Digital</p>
                    <div className="w-full aspect-square bg-linear-to-br from-purple-100 to-purple-200 border-4 border-white rounded-xl flex items-center justify-center shadow-xl">
                      <Hash className="w-16 h-16 text-purple-400" />
                    </div>
                  </div>
                </div>

                {/* Datos principales */}
                <div className="md:col-span-2 space-y-6">
                  <div className="space-y-4">
                    <div className="bg-linear-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-5 shadow-lg">
                      <Label className="text-sm text-red-700">DNI Número</Label>
                      <p className="text-5xl text-red-800 tracking-wider mt-2">{dniData.numero}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-lg">
                        <Label className="text-xs text-blue-700">Apellidos</Label>
                        <p className="text-lg text-slate-900 mt-1">{dniData.apellidos}</p>
                      </div>
                      <div className="bg-white border-2 border-blue-200 rounded-xl p-4 shadow-lg">
                        <Label className="text-xs text-blue-700">Nombres</Label>
                        <p className="text-lg text-slate-900 mt-1">{dniData.nombres}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white border-2 border-purple-200 rounded-lg p-3 shadow-md">
                        <Label className="text-xs text-purple-700">Género</Label>
                        <p className="text-slate-900 mt-1">{dniData.genero}</p>
                      </div>
                      <div className="bg-white border-2 border-purple-200 rounded-lg p-3 shadow-md">
                        <Label className="text-xs text-purple-700">Grupo Sanguíneo</Label>
                        <p className="text-slate-900 mt-1">{dniData.grupoSanguineo}</p>
                      </div>
                      <div className="bg-white border-2 border-purple-200 rounded-lg p-3 shadow-md">
                        <Label className="text-xs text-purple-700">Estado Civil</Label>
                        <p className="text-slate-900 mt-1">{dniData.estadoCivil}</p>
                      </div>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="border-t-2 border-slate-200 pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-linear-to-br from-emerald-50 to-emerald-100 p-3 rounded-lg border-2 border-emerald-200 shadow-md">
                        <Label className="text-xs text-emerald-700 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Fecha de Nacimiento
                        </Label>
                        <p className="text-slate-900 mt-1">{dniData.fechaNacimiento}</p>
                      </div>
                      <div className="bg-linear-to-br from-amber-50 to-amber-100 p-3 rounded-lg border-2 border-amber-200 shadow-md">
                        <Label className="text-xs text-amber-700 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          Lugar de Nacimiento
                        </Label>
                        <p className="text-slate-900 mt-1">{dniData.lugarNacimiento}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 rounded-lg border-2 border-blue-200 shadow-md">
                        <Label className="text-xs text-blue-700">Fecha de Emisión</Label>
                        <p className="text-slate-900 mt-1">{dniData.fechaEmision}</p>
                      </div>
                      <div className="bg-linear-to-br from-indigo-50 to-indigo-100 p-3 rounded-lg border-2 border-indigo-200 shadow-md">
                        <Label className="text-xs text-indigo-700">Fecha de Expiración</Label>
                        <p className="text-slate-900 mt-1">{dniData.fechaExpiracion}</p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border-2 border-slate-200 shadow-md">
                      <Label className="text-xs text-slate-700">Dirección</Label>
                      <p className="text-slate-900 mt-1">{dniData.direccion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer con Blockchain */}
            <div className="bg-linear-to-r from-blue-50 via-purple-50 to-blue-50 border-t-2 border-blue-200 p-6 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs text-blue-700">Hash Blockchain</Label>
                    <p className="text-sm font-mono text-slate-900 break-all">{dniData.hashBlockchain}</p>
                  </div>
                </div>
                <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-600 text-right bg-white/50 px-3 py-2 rounded-lg">
                Última verificación: {dniData.ultimaVerificacion}
              </div>
            </div>
          </Card>

          {/* Panel de acciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Código QR */}
            <Card className="p-6 border-none bg-linear-to-br from-blue-50 to-blue-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">Código QR</h3>
                  <p className="text-sm text-slate-600">
                    Genera un código QR temporal con validación blockchain
                  </p>
                </div>
                <Button 
                  onClick={() => setShowQR(!showQR)}
                  className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl"
                >
                  {showQR ? 'Ocultar QR' : 'Generar QR'}
                </Button>
                {showQR && (
                  <div className="mt-4 p-4 bg-white rounded-xl border-2 border-blue-200 shadow-lg">
                    <div className="w-full aspect-square bg-linear-to-br from-blue-100 to-purple-100 border-2 border-blue-300 rounded-lg flex items-center justify-center mb-3">
                      <QrCode className="w-32 h-32 text-blue-600" />
                    </div>
                    <p className="text-xs text-slate-700 bg-blue-50 p-2 rounded-lg">
                      <strong>Válido por:</strong> 5 minutos<br />
                      <strong>Expira:</strong> 14:35:00
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Compartir documento */}
            <Card className="p-6 border-none bg-linear-to-br from-purple-50 to-purple-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">Compartir</h3>
                  <p className="text-sm text-slate-600">
                    Comparte tu documento de forma segura
                  </p>
                </div>
                <Button className="w-full bg-linear-to-r from-purple-600 to-purple-700 text-white hover:shadow-xl">
                  <Link2 className="w-4 h-4 mr-2" />
                  Generar Enlace
                </Button>
                <p className="text-xs text-slate-600 bg-white/70 p-2 rounded-lg">
                  Enlace válido por 24 horas con acceso limitado
                </p>
              </div>
            </Card>

            {/* Descargar PDF */}
            <Card className="p-6 border-none bg-linear-to-br from-emerald-50 to-emerald-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">Descargar</h3>
                  <p className="text-sm text-slate-600">
                    Descarga tu DNI en formato PDF oficial
                  </p>
                </div>
                <Button className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 text-white hover:shadow-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <p className="text-xs text-slate-600 bg-white/70 p-2 rounded-lg">
                  Documento oficial con código de verificación
                </p>
              </div>
            </Card>
          </div>

          {/* Información de seguridad */}
          <Card className="p-6 border-none bg-linear-to-r from-emerald-50 via-blue-50 to-purple-50 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-linear-to-br from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-lg text-slate-900 mb-2">Documento Verificado y Protegido</p>
                <p className="text-slate-700">
                  Este documento está protegido con tecnología blockchain y validado por RENIEC. 
                  Todos los accesos y verificaciones quedan registrados en la cadena de bloques 
                  para garantizar su autenticidad e integridad.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
