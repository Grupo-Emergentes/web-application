// src/data/mockUser.ts

export const mockUser = {
  name: "Carlos Mendoza",
  dni: "72345678",
  birthDate: "15/03/1990",
  address: "Av. Arequipa 1234, Lima",
  email: "carlos.mendoza@gmail.com",
  phone: "+51 987 654 321",
  civilStatus: "Soltero",
  bloodType: "O+",
  
  // Licencia de Conducir
  licenseNumber: "Q72345678",
  licenseClass: "A-IIIb",
  licenseExpiry: "15/03/2028",
  
  // RUC
  ruc: "10723456789",
  businessName: "MENDOZA CARLOS - PERSONA NATURAL",
  
  // COVID-19
  covidVaccines: [
    { dose: 1, date: "15/05/2021", vaccine: "Pfizer", lot: "FF2589" },
    { dose: 2, date: "15/07/2021", vaccine: "Pfizer", lot: "FF3621" },
    { dose: 3, date: "15/01/2022", vaccine: "Pfizer", lot: "FJ8956" }
  ],
  
  // Blockchain simulation
  blockchainHash: "0x7a3f9b2e4c8d1a5f6e9b3c7d2a8f4e1b9c6d3a7f2e5b8c1a4d7f9e2b5c8a1d4f",
  lastVerified: "21/10/2025 14:30"
};

// Entidades gubernamentales
export const governmentEntities = [
  {
    id: 1,
    name: "SUNAT",
    fullName: "Superintendencia Nacional de Aduanas y de Administración Tributaria",
    color: "#10B981", // Verde
    services: [
      "Consulta RUC",
      "Certificado de no adeudo",
      "Comprobantes electrónicos",
      "Declaración de impuestos"
    ],
    icon: "Building" // Usando iconos de lucide-react
  },
  {
    id: 2,
    name: "RENIEC",
    fullName: "Registro Nacional de Identificación y Estado Civil",
    color: "#1E40AF", // Azul
    services: [
      "DNI Digital",
      "Partida de nacimiento",
      "Certificado de antecedentes",
      "Cambio de domicilio"
    ],
    icon: "User"
  },
  {
    id: 3,
    name: "MTC",
    fullName: "Ministerio de Transportes y Comunicaciones",
    color: "#F59E0B", // Naranja
    services: [
      "Licencia de conducir digital",
      "Certificado de antecedentes de tránsito",
      "Papeleta de infracción",
      "SOAT digital"
    ],
    icon: "Car"
  },
  {
    id: 4,
    name: "MINSA",
    fullName: "Ministerio de Salud",
    color: "#EF4444", // Rojo
    services: [
      "Carnet de vacunación COVID-19",
      "Historia clínica",
      "Citas médicas",
      "Certificado de discapacidad"
    ],
    icon: "Heart"
  },
  {
    id: 5,
    name: "MINEDU",
    fullName: "Ministerio de Educación",
    color: "#8B5CF6", // Morado
    services: [
      "Certificados de estudios",
      "Constancia de egresado",
      "Título profesional",
      "Grados académicos"
    ],
    icon: "GraduationCap"
  },
  {
    id: 6,
    name: "Municipalidades",
    fullName: "Municipalidades de Perú",
    color: "#06B6D4", // Cyan
    services: [
      "Licencia de funcionamiento",
      "Certificado de parámetros",
      "Pago de arbitrios",
      "Certificado de zonificación"
    ],
    icon: "Building"
  },
  {
    id: 7,
    name: "Ministerio de Trabajo",
    fullName: "Ministerio de Trabajo y Promoción del Empleo",
    color: "#6366F1", // Índigo
    services: [
      "Certificado de trabajo",
      "Planilla electrónica",
      "Constancia de pensiones",
      "Certificado laboral"
    ],
    icon: "Briefcase"
  },
  {
    id: 8,
    name: "Poder Judicial",
    fullName: "Poder Judicial del Perú",
    color: "#374151", // Gris oscuro
    services: [
      "Antecedentes penales",
      "Antecedentes judiciales",
      "Certificado de no requisitoria",
      "Consulta de expedientes"
    ],
    icon: "Scale"
  }
];

// Documentos digitales
export const digitalDocuments = [
  {
    id: 1,
    type: "dni",
    name: "DNI Digital",
    number: mockUser.dni,
    expiryDate: "15/03/2030",
    status: "Activo",
    entity: "RENIEC",
    icon: "User"
  },
  {
    id: 2,
    type: "license",
    name: "Licencia de Conducir",
    number: mockUser.licenseNumber,
    expiryDate: mockUser.licenseExpiry,
    status: "Activo",
    entity: "MTC",
    icon: "Car"
  },
  {
    id: 3,
    type: "covid",
    name: "Certificado COVID-19",
    number: "VAC-" + mockUser.dni,
    expiryDate: "No expira",
    status: "Completo",
    entity: "MINSA",
    icon: "Heart"
  },
  {
    id: 4,
    type: "ruc",
    name: "RUC",
    number: mockUser.ruc,
    expiryDate: "No expira",
    status: "Activo",
    entity: "SUNAT",
    icon: "Building"
  }
];

// Solicitudes
export const solicitudes = [
  {
    id: 1,
    title: "Renovación de DNI",
    entity: "RENIEC",
    date: "15/10/2025",
    status: "En proceso",
    description: "Solicitud para renovar DNI próximo a vencer",
    progress: 50
  },
  {
    id: 2,
    title: "Declaración Jurada Anual",
    entity: "SUNAT",
    date: "10/10/2025",
    status: "Completado",
    description: "Declaración de impuesto a la renta 2025",
    progress: 100
  },
  {
    id: 3,
    title: "Certificado de Antecedentes",
    entity: "Poder Judicial",
    date: "05/10/2025",
    status: "Pendiente",
    description: "Solicitud de certificado de antecedentes penales",
    progress: 10
  },
  {
    id: 4,
    title: "Cambio de domicilio",
    entity: "RENIEC",
    date: "01/10/2025",
    status: "Rechazado",
    description: "Actualización de dirección en DNI",
    progress: 100,
    reason: "Documentación incompleta"
  }
];

// FAQs para la sección de Ayuda
export const faqs = [
  {
    id: 1,
    question: "¿Cómo actualizo mi dirección en el DNI digital?",
    answer: "Para actualizar tu dirección, debes ir a la sección de RENIEC, seleccionar 'Cambio de domicilio' y seguir las instrucciones. Necesitarás adjuntar un documento que pruebe tu nuevo domicilio como un recibo de servicios.",
    category: "Documentos"
  },
  {
    id: 2,
    question: "¿Qué es la verificación blockchain?",
    answer: "La verificación blockchain es un sistema que garantiza la autenticidad e integridad de tus documentos digitales mediante una cadena de bloques descentralizada. Cada documento tiene un hash único que puede ser verificado por entidades autorizadas.",
    category: "Seguridad"
  },
  {
    id: 3,
    question: "¿Cómo puedo compartir mi DNI digital con una entidad?",
    answer: "Puedes compartir tu DNI digital seleccionándolo en tu billetera, presionando el botón 'Compartir' y generando un código QR temporal o un enlace seguro que podrás enviar a la entidad que lo solicita.",
    category: "Documentos"
  },
  {
    id: 4,
    question: "¿Qué hago si no puedo completar un trámite?",
    answer: "Si tienes problemas para completar un trámite, puedes ir a la sección de 'Ayuda', seleccionar la categoría correspondiente y enviar una solicitud de asistencia. Un representante te contactará en un máximo de 24 horas hábiles.",
    category: "Trámites"
  }
];

// Datos para el panel admin
export const adminStats = {
  totalUsers: 2584692,
  documentsIssued: 9845631,
  todayTransactions: 158743,
  activeUsers: 1245789,
  popularServices: [
    { name: "DNI Digital", count: 452367 },
    { name: "Certificado COVID-19", count: 325478 },
    { name: "Antecedentes Penales", count: 198563 },
    { name: "Licencia de Conducir", count: 156982 }
  ],
  recentUsers: [
    { id: 1, name: "Ana Lucía Mendoza", dni: "45678912", lastAccess: "21/10/2025 13:45" },
    { id: 2, name: "Jorge Luis Pérez", dni: "35791245", lastAccess: "21/10/2025 12:32" },
    { id: 3, name: "María Elena Santos", dni: "56123478", lastAccess: "21/10/2025 11:20" },
    { id: 4, name: "Roberto Carlos Gómez", dni: "67891234", lastAccess: "21/10/2025 10:15" }
  ]
};