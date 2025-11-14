import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  CreditCard, 
  CheckCircle,
  Upload,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

interface FormSchema {
  tramite: string;
  descripcion: string;
  datosPersonales: FormField[];
  documentosAdjuntos: {
    name: string;
    label: string;
    required?: boolean;
  }[];
  requierePago: boolean;
  montoPago?: number;
}

interface DynamicFormProps {
  onClose: () => void;
  schema?: FormSchema;
  tramiteName?: string;
}

// Schema por defecto
const defaultSchema: FormSchema = {
  tramite: 'Certificado de Nacimiento',
  descripcion: 'Solicitud de certificado de nacimiento digital',
  datosPersonales: [
    { name: 'nombreCompleto', label: 'Nombre completo', type: 'text', required: true },
    { name: 'email', label: 'Correo electrónico', type: 'email', required: true },
    { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+51 999 999 999' },
    { name: 'edad', label: 'Edad', type: 'number', required: true },
    { name: 'genero', label: 'Género', type: 'select', required: true, options: ['Masculino', 'Femenino', 'Otro'] }
  ],
  documentosAdjuntos: [
    { name: 'curriculum', label: 'Currículum Vitae', required: true },
    { name: 'fotografia', label: 'Fotografía' }
  ],
  requierePago: true,
  montoPago: 35.50
};

export function DynamicForm({ onClose, schema = defaultSchema, tramiteName }: DynamicFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    datosPadres: [
      { tipo: 'MADRE', nombres: '', dni: '' },
      { tipo: 'PADRE', nombres: '', dni: '' }
    ]
  });
  const [files, setFiles] = useState<any>({});
  const [showCurrentData, setShowCurrentData] = useState(false);

  const steps = [
    { id: 0, name: 'Documentos Adjuntos', icon: FileText },
    ...(schema.requierePago ? [{ id: 1, name: 'Información de Pago', icon: CreditCard }] : []),
    { id: schema.requierePago ? 2 : 1, name: 'Revisión y Confirmación', icon: CheckCircle }
  ];

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFiles({ ...files, [name]: file });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Formulario enviado:', { formData, files });
    alert('Solicitud enviada exitosamente');
    onClose();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-red-50 pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onClose}
            className="mb-4 hover:bg-red-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div className="bg-linear-to-r from-red-600 via-red-700 to-red-800 text-white p-6 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-2">{tramiteName || schema.tramite}</h1>
            <p className="text-sm opacity-90">{schema.descripcion}</p>
          </div>
        </div>

        {/* Navegación de pasos */}
        <Card className="mb-8 bg-white shadow-lg border border-slate-200">
          <div className="flex items-center justify-between p-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center shadow-md transition-all
                      ${isActive ? 'bg-linear-to-br from-red-600 to-red-700 text-white scale-110' : ''}
                      ${isCompleted ? 'bg-linear-to-br from-emerald-500 to-emerald-600 text-white' : ''}
                      ${!isActive && !isCompleted ? 'bg-slate-100 text-slate-400 border-2 border-slate-300' : ''}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`
                      text-sm hidden md:block font-medium
                      ${isActive ? 'text-red-700' : 'text-slate-500'}
                    `}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      flex-1 h-1 mx-4 rounded-full transition-all
                      ${isCompleted ? 'bg-linear-to-r from-emerald-400 to-emerald-500' : 'bg-slate-200'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Contenido del formulario */}
        <Card className="p-8 bg-white shadow-lg border border-slate-200 mb-6">
          {/* Paso 1: Documentos Adjuntos */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-linear-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Datos del Registro de Nacimiento</h2>
              </div>

              {/* Datos básicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700 font-medium">
                    Fecha de Nacimiento <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={formData.fechaNacimiento || ''}
                    onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                    className="border-2 border-slate-300 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label className="text-slate-700 font-medium">
                    Sexo <span className="text-red-600">*</span>
                  </Label>
                  <Select 
                    value={formData.sexo || ''} 
                    onValueChange={(value) => handleInputChange('sexo', value)}
                  >
                    <SelectTrigger className="border-2 border-slate-300 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-slate-700 font-medium">
                  Lugar de Nacimiento <span className="text-red-600">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Ciudad, Provincia, Departamento"
                  value={formData.lugarNacimiento || ''}
                  onChange={(e) => handleInputChange('lugarNacimiento', e.target.value)}
                  className="border-2 border-slate-300 focus:border-blue-500"
                />
              </div>

              {/* Datos de los Padres */}
              <div className="border-t-2 border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Datos de los Padres</h3>
                
                {/* Madre */}
                <div className="bg-linear-to-br from-pink-50 to-pink-100 border-2 border-pink-200 p-4 rounded-lg mb-4 shadow-sm">
                  <h4 className="text-pink-900 font-semibold mb-3">Madre</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-pink-800">
                        Nombres completos <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="Nombres y apellidos"
                        value={formData.datosPadres?.[0]?.nombres || ''}
                        onChange={(e) => {
                          const newDatos = [...(formData.datosPadres || [])];
                          if (!newDatos[0]) newDatos[0] = { tipo: 'MADRE', nombres: '', dni: '' };
                          newDatos[0].nombres = e.target.value;
                          handleInputChange('datosPadres', newDatos);
                        }}
                        className="border-2 border-pink-300 focus:border-pink-500 bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-pink-800">
                        DNI <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="12345678"
                        maxLength={8}
                        value={formData.datosPadres?.[0]?.dni || ''}
                        onChange={(e) => {
                          const newDatos = [...(formData.datosPadres || [])];
                          if (!newDatos[0]) newDatos[0] = { tipo: 'MADRE', nombres: '', dni: '' };
                          newDatos[0].dni = e.target.value;
                          handleInputChange('datosPadres', newDatos);
                        }}
                        className="border-2 border-pink-300 focus:border-pink-500 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Padre */}
                <div className="bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-200 p-4 rounded-lg shadow-sm">
                  <h4 className="text-blue-900 font-semibold mb-3">Padre</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-blue-800">
                        Nombres completos <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="Nombres y apellidos"
                        value={formData.datosPadres?.[1]?.nombres || ''}
                        onChange={(e) => {
                          const newDatos = [...(formData.datosPadres || [])];
                          if (!newDatos[1]) newDatos[1] = { tipo: 'PADRE', nombres: '', dni: '' };
                          newDatos[1].nombres = e.target.value;
                          handleInputChange('datosPadres', newDatos);
                        }}
                        className="border-2 border-blue-300 focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-blue-800">
                        DNI <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="12345678"
                        maxLength={8}
                        value={formData.datosPadres?.[1]?.dni || ''}
                        onChange={(e) => {
                          const newDatos = [...(formData.datosPadres || [])];
                          if (!newDatos[1]) newDatos[1] = { tipo: 'PADRE', nombres: '', dni: '' };
                          newDatos[1].dni = e.target.value;
                          handleInputChange('datosPadres', newDatos);
                        }}
                        className="border-2 border-blue-300 focus:border-blue-500 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Documentos adjuntos */}
              <div className="border-t-2 border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Documentos de Respaldo</h3>
                
                {schema.documentosAdjuntos.map((doc) => (
                  <div key={doc.name} className="mb-4">
                    <Label className="text-slate-700 font-medium">
                      {doc.label} {doc.required && <span className="text-red-600">*</span>}
                    </Label>
                    <div className="mt-2 flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.onchange = (e: any) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileChange(doc.name, file);
                          };
                          input.click();
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Seleccionar archivo
                      </Button>
                      <span className="text-sm text-slate-600">
                        {files[doc.name]?.name || 'Sin archivos seleccionados'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Label className="text-slate-700 font-medium">Notas adicionales</Label>
                <Textarea
                  placeholder="Agrega cualquier información adicional relevante..."
                  value={formData.notasAdicionales || ''}
                  onChange={(e) => handleInputChange('notasAdicionales', e.target.value)}
                  className="border-2 border-slate-300 focus:border-blue-500 min-h-[120px]"
                />
              </div>
            </div>
          )}

          {/* Paso 2: Información de Pago */}
          {schema.requierePago && currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-linear-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent">Información de Pago</h2>
              </div>

              {schema.montoPago && (
                <div className="bg-linear-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 p-6 rounded-lg shadow-md">
                  <p className="text-sm text-emerald-700 font-medium">Monto a pagar</p>
                  <p className="text-3xl font-bold text-emerald-900">S/ {schema.montoPago.toFixed(2)}</p>
                </div>
              )}

              <div>
                <Label className="text-slate-700 font-medium">Número de tarjeta <span className="text-red-600">*</span></Label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.numeroTarjeta || ''}
                  onChange={(e) => handleInputChange('numeroTarjeta', e.target.value)}
                  className="border-2 border-slate-300 focus:border-emerald-500"
                />
              </div>

              <div>
                <Label className="text-slate-700 font-medium">Nombre del titular <span className="text-red-600">*</span></Label>
                <Input
                  type="text"
                  placeholder="Como aparece en la tarjeta"
                  value={formData.nombreTitular || ''}
                  onChange={(e) => handleInputChange('nombreTitular', e.target.value)}
                  className="border-2 border-slate-300 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700 font-medium">Fecha de vencimiento <span className="text-red-600">*</span></Label>
                  <Input
                    type="text"
                    placeholder="MM/AA"
                    value={formData.fechaVencimiento || ''}
                    onChange={(e) => handleInputChange('fechaVencimiento', e.target.value)}
                    className="border-2 border-slate-300 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">CVV <span className="text-red-600">*</span></Label>
                  <Input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    value={formData.cvv || ''}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className="border-2 border-slate-300 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: Revisión y Confirmación */}
          {currentStep === (schema.requierePago ? 2 : 1) && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-linear-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">Revisión y Confirmación</h2>
              </div>

              {/* Resumen de datos */}
              <div className="space-y-4">
                <div className="bg-linear-to-br from-blue-50 to-blue-100 border-2 border-blue-200 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-blue-900 mb-3">Datos del Registro</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Fecha de Nacimiento:</span>
                      <span className="text-blue-900 font-medium">{formData.fechaNacimiento || '-'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Lugar de Nacimiento:</span>
                      <span className="text-blue-900 font-medium">{formData.lugarNacimiento || '-'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Sexo:</span>
                      <span className="text-blue-900 font-medium">{formData.sexo === 'M' ? 'Masculino' : formData.sexo === 'F' ? 'Femenino' : '-'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-br from-purple-50 to-purple-100 border-2 border-purple-200 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-purple-900 mb-3">Datos de los Padres</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-purple-900 font-medium mb-1">Madre</p>
                      <div className="space-y-1 pl-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-700">Nombres:</span>
                          <span className="text-purple-900 font-medium">{formData.datosPadres?.[0]?.nombres || '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-700">DNI:</span>
                          <span className="text-purple-900 font-medium">{formData.datosPadres?.[0]?.dni || '-'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-purple-900 font-medium mb-1">Padre</p>
                      <div className="space-y-1 pl-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-700">Nombres:</span>
                          <span className="text-purple-900 font-medium">{formData.datosPadres?.[1]?.nombres || '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-700">DNI:</span>
                          <span className="text-purple-900 font-medium">{formData.datosPadres?.[1]?.dni || '-'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-br from-amber-50 to-amber-100 border-2 border-amber-200 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-amber-900 mb-3">Documentos Adjuntos</h3>
                  <div className="space-y-2">
                    {schema.documentosAdjuntos.map((doc) => (
                      <div key={doc.name} className="flex justify-between text-sm">
                        <span className="text-amber-700">{doc.label}:</span>
                        <span className="text-amber-900 font-medium">{files[doc.name]?.name || 'No adjuntado'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {schema.requierePago && (
                  <div className="bg-linear-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-emerald-900 mb-3">Información de Pago</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Tarjeta:</span>
                        <span className="text-emerald-900 font-medium">**** {formData.numeroTarjeta?.slice(-4) || '****'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Monto:</span>
                        <span className="text-emerald-900 font-bold">S/ {schema.montoPago?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Términos y condiciones */}
              <div className="flex items-start space-x-2 p-4 bg-slate-50 border-2 border-slate-300 rounded-lg">
                <Checkbox 
                  id="terms" 
                  checked={formData.aceptaTerminos || false}
                  onCheckedChange={(checked) => handleInputChange('aceptaTerminos', checked)}
                />
                <label htmlFor="terms" className="text-sm text-slate-700 leading-relaxed">
                  Acepto los términos y condiciones. Confirmo que la información proporcionada es correcta 
                  y autorizo el procesamiento de mis datos personales conforme a la Ley de Protección de 
                  Datos Personales del Perú.
                </label>
              </div>
            </div>
          )}

          {/* Navegación */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-slate-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-2 border-slate-600 text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
              >
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.aceptaTerminos}
                className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                Enviar Solicitud
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>

        {/* Ver datos actuales del formulario (collapsible) */}
        <Card className="bg-white shadow-md border border-slate-200">
          <button
            onClick={() => setShowCurrentData(!showCurrentData)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm text-slate-700 font-medium">Ver datos actuales del formulario</span>
            {showCurrentData ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
          </button>
          {showCurrentData && (
            <div className="p-4 border-t-2 border-slate-200">
              <pre className="text-xs bg-slate-900 text-emerald-400 p-4 rounded-lg overflow-auto font-mono">
                {JSON.stringify({ formData, files: Object.keys(files) }, null, 2)}
              </pre>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
