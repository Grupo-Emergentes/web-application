import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  ArrowLeft, 
  FileText, 
  CreditCard, 
  CheckCircle,
  Upload,
  X
} from 'lucide-react';
import { ProcedureSchema } from './procedureSchemas';
import { useAuth } from 'react-oidc-context';
import { PROCEDURE_API_URL } from '@/config';
import axios from 'axios';

interface DynamicFormProps {
  schema: ProcedureSchema;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export function DynamicForm({ schema, onClose, onSubmit }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [currentStep, setCurrentStep] = useState(0);


  const auth = useAuth();
  const userEmail = auth.user?.profile?.email as any;

  const calculateDateOfNext30Days = () => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Definir pasos del formulario
  const steps = [
    { id: 0, name: 'Datos del Trámite', icon: FileText },
    ...(schema.attachments.length > 0 ? [{ id: 1, name: 'Documentos Adjuntos', icon: FileText }] : []),
    ...(schema.requiredAmount > 0 ? [{ id: schema.attachments.length > 0 ? 2 : 1, name: 'Pago', icon: CreditCard }] : []),
    { id: schema.attachments.length > 0 ? (schema.requiredAmount > 0 ? 3 : 2) : (schema.requiredAmount > 0 ? 2 : 1), name: 'Confirmación', icon: CheckCircle }
  ];

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleFileChange = (fileName: string, file: File | null) => {
    if (file) {
      setFiles(prev => ({ ...prev, [fileName]: file }));
    } else {
      const newFiles = { ...files };
      delete newFiles[fileName];
      setFiles(newFiles);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    
    const citizenId = encodeURIComponent(userEmail);

    const dataArray = schema.data
      .map(field => formData[field.name])
      .filter(value => value !== undefined && value !== null && value !== '');

    const submitData = {
      procedureType: schema.type,
      procedureStatus: "STARTED",
      endDate: calculateDateOfNext30Days(),
      paymentId: 1,
      requiredAmount: schema.requiredAmount || 0,
      officialId: 1,
      data: dataArray,
    }

    try{
      const formDataToSend = new FormData();

      formDataToSend.append("data", JSON.stringify(submitData));

      if (Object.keys(files).length > 0) {
        Object.values(files).forEach(file => {
          formDataToSend.append("attachments", file);
        });
      }

      const response = await axios.post(
        `${PROCEDURE_API_URL}/api/v1/procedure/procedures/${citizenId}`, 
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
      console.log("Respuesta del servidor:", response);

    }catch(error){
      console.error("Error al enviar el formulario:", error);
    }
    
    if (onSubmit) {
      onSubmit(submitData);
    } else {
      alert(`Solicitud de ${schema.name} enviada exitosamente`);
      onClose();
    }
  };

  // Renderizar campo según tipo
  const renderField = (field: any) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            maxLength={field.maxLength}
            min={field.min}
            max={field.max}
            required={field.required}
            className="border-2 border-black focus:border-red-600 font-medium"
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className="border-2 border-black focus:border-red-600 font-medium"
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className="border-2 border-black focus:border-red-600 min-h-[100px] font-medium"
          />
        );

      case 'select':
        return (
          <Select 
            value={value} 
            onValueChange={(val) => handleInputChange(field.name, val)}
          >
            <SelectTrigger className="border-2 border-black focus:border-red-600 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onClose}
            className="mb-4 hover:bg-gray-100 border-2 border-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div className="bg-white border-2 border-black p-6 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold text-black mb-2">{schema.name}</h1>
            <p className="text-sm text-gray-600">{schema.description}</p>
            {schema.requiredAmount > 0 && (
              <p className="text-sm text-red-600 font-bold mt-2">
                Costo: S/ {schema.requiredAmount.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Navegación de pasos */}
        <Card className="mb-8 bg-white shadow-lg border-2 border-black">
          <div className="flex items-center justify-between p-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center shadow-md transition-all border-2
                      ${isActive ? 'bg-red-600 text-white border-red-700 scale-110' : ''}
                      ${isCompleted ? 'bg-black text-white border-black' : ''}
                      ${!isActive && !isCompleted ? 'bg-white text-gray-400 border-gray-300' : ''}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`
                      text-sm hidden md:block font-medium
                      ${isActive ? 'text-red-600' : isCompleted ? 'text-black' : 'text-gray-500'}
                    `}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      flex-1 h-1 mx-4 rounded-full transition-all
                      ${isCompleted ? 'bg-black' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Contenido del formulario */}
        <Card className="p-8 bg-white shadow-lg border-2 border-black mb-6">
          {/* Paso 1: Datos del Trámite */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black mb-6">Datos del Trámite</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schema.data.map((field) => (
                  <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <Label className="text-black font-medium mb-2 block">
                      {field.label} {field.required && <span className="text-red-600">*</span>}
                    </Label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paso 2: Documentos Adjuntos (si existen) */}
          {schema.attachments.length > 0 && currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black mb-6">Documentos Adjuntos</h2>
              
              {schema.attachments.map((attachment) => (
                <div key={attachment.name} className="border-2 border-gray-200 rounded-lg p-4">
                  <Label className="text-black font-medium mb-2 block">
                    {attachment.label} {attachment.required && <span className="text-red-600">*</span>}
                  </Label>
                  <p className="text-xs text-gray-500 mb-3">
                    Formatos permitidos: {attachment.accept || '*'}
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 border-black text-black hover:bg-gray-100"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = attachment.accept || '*';
                        input.onchange = (e: any) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileChange(attachment.name, file);
                        };
                        input.click();
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Seleccionar archivo
                    </Button>
                    
                    {files[attachment.name] && (
                      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                        <span className="text-sm text-black font-medium">
                          {files[attachment.name].name}
                        </span>
                        <button
                          onClick={() => handleFileChange(attachment.name, null)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Paso 3: Pago (si requiere) */}
          {schema.requiredAmount > 0 && currentStep === (schema.attachments.length > 0 ? 2 : 1) && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black mb-6">Información de Pago</h2>
              
              <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg mb-6">
                <p className="text-sm text-black font-medium">Monto a pagar</p>
                <p className="text-3xl font-bold text-red-600">S/ {schema.requiredAmount.toFixed(2)}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-black font-medium">Número de tarjeta <span className="text-red-600">*</span></Label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="border-2 border-black focus:border-red-600 font-medium"
                  />
                </div>

                <div>
                  <Label className="text-black font-medium">Nombre del titular <span className="text-red-600">*</span></Label>
                  <Input
                    type="text"
                    placeholder="Como aparece en la tarjeta"
                    className="border-2 border-black focus:border-red-600 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-black font-medium">Vencimiento <span className="text-red-600">*</span></Label>
                    <Input
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      className="border-2 border-black focus:border-red-600 font-medium"
                    />
                  </div>
                  <div>
                    <Label className="text-black font-medium">CVV <span className="text-red-600">*</span></Label>
                    <Input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      className="border-2 border-black focus:border-red-600 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paso Final: Confirmación */}
          {currentStep === steps[steps.length - 1].id && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black mb-6">Revisión y Confirmación</h2>
              
              {/* Resumen de datos */}
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-black mb-4">Datos ingresados</h3>
                <div className="space-y-2">
                  {schema.data.map((field) => (
                    <div key={field.name} className="flex justify-between text-sm">
                      <span className="text-gray-600">{field.label}:</span>
                      <span className="text-black font-medium">
                        {formData[field.name] || '-'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen de archivos */}
              {schema.attachments.length > 0 && (
                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
                  <h3 className="font-bold text-black mb-4">Documentos adjuntos</h3>
                  <div className="space-y-2">
                    {schema.attachments.map((attachment) => (
                      <div key={attachment.name} className="flex justify-between text-sm">
                        <span className="text-gray-600">{attachment.label}:</span>
                        <span className="text-black font-medium">
                          {files[attachment.name]?.name || 'No adjuntado'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resumen de pago */}
              {schema.requiredAmount > 0 && (
                <div className="bg-red-50 border-2 border-red-600 rounded-lg p-6">
                  <h3 className="font-bold text-black mb-4">Resumen de pago</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Total a pagar:</span>
                    <span className="text-2xl font-bold text-red-600">
                      S/ {schema.requiredAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Términos y condiciones */}
              <div className="bg-white border-2 border-black rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Al enviar esta solicitud, confirmas que la información proporcionada es correcta y 
                  autorizas el procesamiento de tus datos personales conforme a la Ley de Protección de 
                  Datos Personales del Perú.
                </p>
              </div>
            </div>
          )}

          {/* Navegación */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-2 border-black text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="bg-black text-white hover:bg-gray-800"
              >
                Siguiente
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Enviar Solicitud
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>

        {/* Debug: Ver datos del formulario */}
        <Card className="bg-white border-2 border-gray-200 p-4">
          <details>
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-black">
              🔍 Ver datos del formulario (Debug)
            </summary>
            <pre className="text-xs bg-black text-green-400 p-4 rounded-lg overflow-auto font-mono mt-3">
              {JSON.stringify({ 
                formData, 
                files: Object.keys(files).reduce((acc, key) => ({ ...acc, [key]: files[key].name }), {}),
                schema: { id: schema.id, type: schema.type, amount: schema.requiredAmount }
              }, null, 2)}
            </pre>
          </details>
        </Card>
      </div>
    </div>
  );
}