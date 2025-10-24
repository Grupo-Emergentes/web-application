import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, HelpCircle, BookOpen, Video } from 'lucide-react';

interface AyudaProps {
  onViewChange: (view: any) => void;
}

export function Ayuda({ onViewChange }: AyudaProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: '¿Cómo puedo obtener mi DNI digital?',
      answer: 'Para obtener tu DNI digital, debes dirigirte a la sección "Mi Billetera" y seguir el proceso de verificación de identidad. Necesitarás tu DNI físico y seguir los pasos de autenticación biométrica.'
    },
    {
      question: '¿Qué validez legal tienen los documentos digitales?',
      answer: 'Los documentos digitales emitidos a través de Perú Digital tienen la misma validez legal que los documentos físicos, según la Ley de Firmas y Certificados Digitales del Perú.'
    },
    {
      question: '¿Cómo puedo renovar mi licencia de conducir?',
      answer: 'Puedes renovar tu licencia accediendo al servicio del MTC en la sección "Servicios". Necesitarás presentar tu examen médico vigente y cumplir con los requisitos correspondientes.'
    },
    {
      question: '¿Es seguro almacenar mis documentos en la plataforma?',
      answer: 'Sí, utilizamos cifrado de extremo a extremo y tecnología blockchain para garantizar la seguridad de tus documentos. Todos los datos están protegidos según estándares internacionales de seguridad.'
    },
    {
      question: '¿Cómo puedo contactar con SUNAT a través de la plataforma?',
      answer: 'En la sección de servicios SUNAT encontrarás enlaces directos para consultas tributarias, declaraciones y atención al contribuyente.'
    },
    {
      question: '¿Qué hago si olvido mi contraseña?',
      answer: 'Puedes recuperar tu contraseña utilizando la opción "Olvidé mi contraseña" en la pantalla de inicio de sesión. Recibirás un enlace de recuperación en tu correo registrado.'
    }
  ];

  const tutorials = [
    {
      title: 'Introducción a Perú Digital',
      duration: '5 min',
      description: 'Aprende a navegar por la plataforma y conoce sus principales funcionalidades.'
    },
    {
      title: 'Cómo configurar tu billetera digital',
      duration: '8 min',
      description: 'Paso a paso para configurar y personalizar tu billetera de documentos digitales.'
    },
    {
      title: 'Realizar trámites en SUNAT',
      duration: '12 min',
      description: 'Guía completa para realizar declaraciones y consultas tributarias.'
    },
    {
      title: 'Seguridad y privacidad',
      duration: '6 min',
      description: 'Configuraciones de seguridad y mejores prácticas para proteger tu información.'
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Teléfono',
      description: 'Línea gratuita 24/7',
      contact: '0-800-1-PERU (73788)',
      color: 'gray'
    },
    {
      icon: Mail,
      title: 'Correo Electrónico',
      description: 'Respuesta en menos de 24 horas',
      contact: 'soporte@perudigital.gob.pe',
      color: 'gray'
    },
    {
      icon: MessageCircle,
      title: 'Chat en Vivo',
      description: 'Atención inmediata',
      contact: 'Disponible de 8:00 a 20:00',
      color: 'gray'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => onViewChange('dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Centro de Ayuda</h1>
              <p className="text-gray-600">Encuentra respuestas y obtén soporte técnico</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList>
            <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
            <TabsTrigger value="tutorials">Tutoriales</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
            <TabsTrigger value="support">Soporte Técnico</TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            {/* Búsqueda de FAQs */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar en preguntas frecuentes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* FAQ Accordion */}
            <Card className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{tutorial.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{tutorial.duration}</span>
                        <Button size="sm" variant="outline">
                          Ver Tutorial
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className={`w-16 h-16 bg-${method.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 text-${method.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                    <p className="font-medium text-gray-900">{method.contact}</p>
                  </Card>
                );
              })}
            </div>

            {/* Horarios de atención */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Horarios de Atención</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Soporte General</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Lunes a Viernes: 8:00 - 20:00</li>
                    <li>Sábados: 9:00 - 17:00</li>
                    <li>Domingos: 10:00 - 14:00</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Emergencias Técnicas</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Disponible 24/7</li>
                    <li>Tiempo de respuesta: &lt; 2 horas</li>
                    <li>Prioridad alta para servicios críticos</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Reportar Problema Técnico</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo
                    </label>
                    <Input placeholder="Tu nombre completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo Electrónico
                    </label>
                    <Input type="email" placeholder="tu@email.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de DNI
                  </label>
                  <Input placeholder="Tu número de DNI" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Problema
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Selecciona el tipo de problema</option>
                    <option>Error en la aplicación</option>
                    <option>Problema con documentos digitales</option>
                    <option>Error en servicios de entidades</option>
                    <option>Problema de seguridad</option>
                    <option>Otro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción del Problema
                  </label>
                  <Textarea 
                    placeholder="Describe detalladamente el problema que estás experimentando..."
                    rows={4}
                  />
                </div>
                
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Enviar Reporte
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}