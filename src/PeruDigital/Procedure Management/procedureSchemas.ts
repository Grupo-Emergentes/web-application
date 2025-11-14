// Tipos para los schemas de procedimientos
export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea' | 'file';

export interface ProcedureField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // Para type='select'
  accept?: string; // Para type='file' (ej: '.pdf,.jpg,.png')
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface ProcedureAttachment {
  name: string;
  label: string;
  required?: boolean;
  accept?: string; // '.pdf', '.jpg,.png', etc.
}

export interface ProcedureSchema {
  id: string;
  type: string; // ProcedureType del backend
  name: string;
  description: string;
  requiredAmount: number; // Monto requerido
  data: ProcedureField[]; // Campos dinámicos del formulario
  attachments: ProcedureAttachment[]; // Archivos adjuntos
}

// Schemas de todos los trámites disponibles
export const PROCEDURE_SCHEMAS: Record<string, ProcedureSchema> = {
  'acta-nacimiento': {
    id: 'acta-nacimiento',
    type: 'ACTA_NACIMIENTO',
    name: 'Registro de Acta de Nacimiento',
    description: 'Inscripción oficial del nacimiento ante RENIEC para obtener el DNI del recién nacido',
    requiredAmount: 35.50,
    data: [
      { name: 'nombreCompleto', label: 'Nombres completos del recién nacido', type: 'text', required: true },
      { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date', required: true },
      { name: 'lugarNacimiento', label: 'Lugar de nacimiento (Hospital/Centro de Salud)', type: 'text', required: true },
      { name: 'sexo', label: 'Sexo', type: 'select', required: true, options: ['Masculino', 'Femenino'] },
      { name: 'nombreMadre', label: 'Nombres completos de la madre', type: 'text', required: true },
      { name: 'dniMadre', label: 'DNI de la madre', type: 'text', required: true, maxLength: 8 },
      { name: 'nombrePadre', label: 'Nombres completos del padre', type: 'text', required: true },
      { name: 'dniPadre', label: 'DNI del padre', type: 'text', required: true, maxLength: 8 },
      { name: 'direccion', label: 'Dirección del domicilio', type: 'text', required: true },
      { name: 'distrito', label: 'Distrito', type: 'text', required: true },
      { name: 'provincia', label: 'Provincia', type: 'text', required: true },
      { name: 'departamento', label: 'Departamento', type: 'text', required: true },
    ],
    attachments: [
      { name: 'certificadoMedico', label: 'Certificado médico de nacimiento', required: true, accept: '.pdf' },
      { name: 'dniMadre', label: 'Copia de DNI de la madre', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'dniPadre', label: 'Copia de DNI del padre', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'matrimonio', label: 'Certificado de matrimonio (si aplica)', required: false, accept: '.pdf' },
    ]
  },

  'renovacion-dni': {
    id: 'renovacion-dni',
    type: 'RENOVACION_DNI',
    name: 'Renovación de DNI',
    description: 'Actualización del Documento Nacional de Identidad por vencimiento o deterioro',
    requiredAmount: 45.00,
    data: [
      { name: 'dniActual', label: 'Número de DNI actual', type: 'text', required: true, maxLength: 8 },
      { name: 'motivo', label: 'Motivo de renovación', type: 'select', required: true, options: ['Vencimiento', 'Deterioro', 'Pérdida', 'Robo'] },
      { name: 'telefono', label: 'Teléfono de contacto', type: 'tel', required: true, placeholder: '+51 999 999 999' },
      { name: 'email', label: 'Correo electrónico', type: 'email', required: true },
      { name: 'direccionActual', label: 'Dirección actual', type: 'text', required: true },
      { name: 'distrito', label: 'Distrito', type: 'text', required: true },
      { name: 'provincia', label: 'Provincia', type: 'text', required: true },
      { name: 'departamento', label: 'Departamento', type: 'text', required: true },
    ],
    attachments: [
      { name: 'fotografia', label: 'Fotografía reciente (fondo blanco)', required: true, accept: '.jpg,.png' },
      { name: 'dniAnterior', label: 'Copia del DNI anterior', required: false, accept: '.pdf,.jpg,.png' },
      { name: 'denuncia', label: 'Denuncia policial (en caso de robo/pérdida)', required: false, accept: '.pdf' },
    ]
  },

  'matrimonio': {
    id: 'matrimonio',
    type: 'MATRIMONIO_CIVIL',
    name: 'Registro de Matrimonio Civil',
    description: 'Inscripción legal del matrimonio ante la municipalidad y registro civil',
    requiredAmount: 120.00,
    data: [
      { name: 'nombreContrayente1', label: 'Nombres completos del primer contrayente', type: 'text', required: true },
      { name: 'dniContrayente1', label: 'DNI del primer contrayente', type: 'text', required: true, maxLength: 8 },
      { name: 'fechaNacimiento1', label: 'Fecha de nacimiento', type: 'date', required: true },
      { name: 'nombreContrayente2', label: 'Nombres completos del segundo contrayente', type: 'text', required: true },
      { name: 'dniContrayente2', label: 'DNI del segundo contrayente', type: 'text', required: true, maxLength: 8 },
      { name: 'fechaNacimiento2', label: 'Fecha de nacimiento', type: 'date', required: true },
      { name: 'fechaMatrimonio', label: 'Fecha deseada para el matrimonio', type: 'date', required: true },
      { name: 'lugarMatrimonio', label: 'Lugar del matrimonio', type: 'text', required: true },
      { name: 'regimenPatrimonial', label: 'Régimen patrimonial', type: 'select', required: true, options: ['Sociedad de gananciales', 'Separación de patrimonios'] },
    ],
    attachments: [
      { name: 'certificadoSolteria1', label: 'Certificado de soltería del primer contrayente', required: true, accept: '.pdf' },
      { name: 'certificadoSolteria2', label: 'Certificado de soltería del segundo contrayente', required: true, accept: '.pdf' },
      { name: 'dniContrayente1', label: 'Copia de DNI del primer contrayente', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'dniContrayente2', label: 'Copia de DNI del segundo contrayente', required: true, accept: '.pdf,.jpg,.png' },
    ]
  },

  'cambio-domicilio': {
    id: 'cambio-domicilio',
    type: 'CAMBIO_DOMICILIO',
    name: 'Cambio de Domicilio',
    description: 'Actualización de dirección legal en RENIEC para documentos oficiales',
    requiredAmount: 15.00,
    data: [
      { name: 'dni', label: 'Número de DNI', type: 'text', required: true, maxLength: 8 },
      { name: 'direccionAnterior', label: 'Dirección anterior', type: 'text', required: true },
      { name: 'direccionNueva', label: 'Nueva dirección', type: 'text', required: true },
      { name: 'distrito', label: 'Distrito', type: 'text', required: true },
      { name: 'provincia', label: 'Provincia', type: 'text', required: true },
      { name: 'departamento', label: 'Departamento', type: 'text', required: true },
      { name: 'referencia', label: 'Referencia del domicilio', type: 'textarea', required: false },
      { name: 'telefono', label: 'Teléfono de contacto', type: 'tel', required: true },
    ],
    attachments: [
      { name: 'reciboServicio', label: 'Recibo de servicio (luz, agua o teléfono)', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'dniCopia', label: 'Copia de DNI', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'declaracionJurada', label: 'Declaración jurada de domicilio', required: true, accept: '.pdf' },
    ]
  },

  'solicitud-ruc': {
    id: 'solicitud-ruc',
    type: 'SOLICITUD_RUC',
    name: 'Solicitud de RUC',
    description: 'Inscripción en el Registro Único de Contribuyentes para actividades económicas',
    requiredAmount: 0, // Gratuito
    data: [
      { name: 'dni', label: 'Número de DNI', type: 'text', required: true, maxLength: 8 },
      { name: 'nombreCompleto', label: 'Nombres completos', type: 'text', required: true },
      { name: 'tipoContribuyente', label: 'Tipo de contribuyente', type: 'select', required: true, options: ['Persona Natural', 'Persona Jurídica'] },
      { name: 'actividadEconomica', label: 'Actividad económica principal', type: 'text', required: true },
      { name: 'nombreComercial', label: 'Nombre comercial (si aplica)', type: 'text', required: false },
      { name: 'direccionFiscal', label: 'Dirección fiscal', type: 'text', required: true },
      { name: 'distrito', label: 'Distrito', type: 'text', required: true },
      { name: 'provincia', label: 'Provincia', type: 'text', required: true },
      { name: 'departamento', label: 'Departamento', type: 'text', required: true },
      { name: 'telefono', label: 'Teléfono', type: 'tel', required: true },
      { name: 'email', label: 'Correo electrónico', type: 'email', required: true },
    ],
    attachments: [
      { name: 'dniCopia', label: 'Copia de DNI', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'reciboServicio', label: 'Recibo de servicio del domicilio fiscal', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'autorizacion', label: 'Autorización del propietario (si es inquilino)', required: false, accept: '.pdf' },
    ]
  },

  'estado-tributario': {
    id: 'estado-tributario',
    type: 'CONSULTA_TRIBUTARIA',
    name: 'Consulta de Estado Tributario',
    description: 'Verificación de situación fiscal, deudas y comprobantes ante SUNAT',
    requiredAmount: 0, // Gratuito
    data: [
      { name: 'ruc', label: 'Número de RUC', type: 'text', required: true, maxLength: 11 },
      { name: 'dni', label: 'Número de DNI', type: 'text', required: true, maxLength: 8 },
      { name: 'periodoConsulta', label: 'Período de consulta', type: 'select', required: true, options: ['Último mes', 'Últimos 3 meses', 'Últimos 6 meses', 'Último año'] },
      { name: 'tipoConsulta', label: 'Tipo de consulta', type: 'select', required: true, options: ['Estado de deudas', 'Comprobantes emitidos', 'Declaraciones presentadas', 'Todo'] },
      { name: 'email', label: 'Correo electrónico para recibir resultados', type: 'email', required: true },
    ],
    attachments: []
  },

  'transferencia-vehicular': {
    id: 'transferencia-vehicular',
    type: 'TRANSFERENCIA_VEHICULAR',
    name: 'Transferencia Vehicular Digital',
    description: 'Cambio de propietario vehicular con validación notarial electrónica',
    requiredAmount: 250.00,
    data: [
      { name: 'placa', label: 'Número de placa del vehículo', type: 'text', required: true },
      { name: 'marca', label: 'Marca del vehículo', type: 'text', required: true },
      { name: 'modelo', label: 'Modelo del vehículo', type: 'text', required: true },
      { name: 'anio', label: 'Año de fabricación', type: 'number', required: true, min: 1900, max: 2025 },
      { name: 'dniVendedor', label: 'DNI del vendedor (propietario actual)', type: 'text', required: true, maxLength: 8 },
      { name: 'nombreVendedor', label: 'Nombres completos del vendedor', type: 'text', required: true },
      { name: 'dniComprador', label: 'DNI del comprador (nuevo propietario)', type: 'text', required: true, maxLength: 8 },
      { name: 'nombreComprador', label: 'Nombres completos del comprador', type: 'text', required: true },
      { name: 'montoVenta', label: 'Monto de la venta (S/)', type: 'number', required: true },
      { name: 'telefonoVendedor', label: 'Teléfono del vendedor', type: 'tel', required: true },
      { name: 'telefonoComprador', label: 'Teléfono del comprador', type: 'tel', required: true },
    ],
    attachments: [
      { name: 'tarjetaPropiedad', label: 'Copia de la tarjeta de propiedad', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'dniVendedor', label: 'Copia de DNI del vendedor', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'dniComprador', label: 'Copia de DNI del comprador', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'certificadoSoat', label: 'Certificado SOAT vigente', required: true, accept: '.pdf' },
      { name: 'revisionTecnica', label: 'Certificado de revisión técnica vigente', required: true, accept: '.pdf' },
    ]
  },

  'arrendamiento': {
    id: 'arrendamiento',
    type: 'CONTRATO_ARRENDAMIENTO',
    name: 'Contrato de Arrendamiento',
    description: 'Formalización digital de contrato de alquiler con firma notarial electrónica',
    requiredAmount: 180.00,
    data: [
      { name: 'dniArrendador', label: 'DNI del arrendador (propietario)', type: 'text', required: true, maxLength: 8 },
      { name: 'nombreArrendador', label: 'Nombres completos del arrendador', type: 'text', required: true },
      { name: 'dniArrendatario', label: 'DNI del arrendatario (inquilino)', type: 'text', required: true, maxLength: 8 },
      { name: 'nombreArrendatario', label: 'Nombres completos del arrendatario', type: 'text', required: true },
      { name: 'direccionInmueble', label: 'Dirección del inmueble', type: 'text', required: true },
      { name: 'distrito', label: 'Distrito', type: 'text', required: true },
      { name: 'provincia', label: 'Provincia', type: 'text', required: true },
      { name: 'departamento', label: 'Departamento', type: 'text', required: true },
      { name: 'montoMensual', label: 'Monto de alquiler mensual (S/)', type: 'number', required: true },
      { name: 'duracionMeses', label: 'Duración del contrato (meses)', type: 'number', required: true },
      { name: 'fechaInicio', label: 'Fecha de inicio del contrato', type: 'date', required: true },
      { name: 'depositoGarantia', label: 'Monto del depósito en garantía (S/)', type: 'number', required: true },
      { name: 'tipoInmueble', label: 'Tipo de inmueble', type: 'select', required: true, options: ['Casa', 'Departamento', 'Local comercial', 'Oficina', 'Otro'] },
      { name: 'condicionesEspeciales', label: 'Condiciones especiales (opcional)', type: 'textarea', required: false },
    ],
    attachments: [
      { name: 'dniArrendador', label: 'Copia de DNI del arrendador', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'dniArrendatario', label: 'Copia de DNI del arrendatario', required: true, accept: '.pdf,.jpg,.png' },
      { name: 'propiedadInmueble', label: 'Documento que acredita propiedad del inmueble', required: true, accept: '.pdf' },
      { name: 'reciboServicio', label: 'Recibo de servicio reciente', required: true, accept: '.pdf,.jpg,.png' },
    ]
  }
};

// Función helper para obtener un schema por ID
export function getProcedureSchema(procedureId: string): ProcedureSchema | undefined {
  return PROCEDURE_SCHEMAS[procedureId];
}

// Función helper para obtener todos los IDs de procedimientos
export function getAllProcedureIds(): string[] {
  return Object.keys(PROCEDURE_SCHEMAS);
}
