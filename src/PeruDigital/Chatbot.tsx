import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Minimize2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  userName?: string;
}

export function Chatbot({ userName = "Carlos Mendoza" }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Mensaje de bienvenida inicial
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: `¡Hola ${userName}! 👋 Soy tu asistente virtual de Perú Digital. ¿En qué puedo ayudarte hoy?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userName, messages.length]);

  // Respuestas automáticas del bot
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hola') || message.includes('buenos') || message.includes('buenas')) {
      return `¡Hola de nuevo ${userName}! ¿Cómo puedo asistirte con los servicios de Perú Digital?`;
    }
    
    if (message.includes('dni') || message.includes('documento')) {
      return 'Puedes gestionar tu DNI digital desde la sección "Mi Billetera". ¡Es completamente seguro y válido oficialmente!';
    }
    
    if (message.includes('certificado') || message.includes('nacimiento')) {
      return 'Para solicitar un certificado de nacimiento, ve a "Servicios" y selecciona "Certificado de Nacimiento Digital". Te guiaré paso a paso.';
    }
    
    if (message.includes('sunat') || message.includes('ruc')) {
      return 'Los trámites de SUNAT están disponibles en nuestra sección de servicios. Puedes consultar tu RUC y realizar gestiones tributarias.';
    }
    
    if (message.includes('reniec')) {
      return 'RENIEC está integrado con nuestra plataforma. Puedes realizar consultas de identidad y solicitar documentos oficiales.';
    }
    
    if (message.includes('ayuda') || message.includes('help') || message.includes('soporte')) {
      return 'Estoy aquí para ayudarte. Puedes preguntarme sobre:\n• Gestión de DNI digital\n• Certificados y documentos\n• Trámites SUNAT/RENIEC\n• Estado de solicitudes\n• Problemas técnicos';
    }
    
    if (message.includes('gracias') || message.includes('thank')) {
      return '¡De nada! Es un placer ayudarte. Si tienes más consultas, no dudes en preguntar. 😊';
    }
    
    // Respuesta por defecto
    return 'Entiendo tu consulta. Para obtener ayuda más específica, puedes contactar a nuestro equipo de soporte o explorar las diferentes secciones de Perú Digital. ¿Hay algo específico en lo que pueda ayudarte?';
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular delay de respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 segundos de delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-PE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón flotante del chatbot */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-linear-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-2xl hover:shadow-3xl transition-all hover:scale-110 animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Ventana del chatbot */}
      {isOpen && (
        <Card className="w-80 h-96 bg-white shadow-2xl border-2 border-black flex flex-col overflow-hidden">
          {/* Header del chat */}
          <div className="bg-white text-black p-4 flex items-center justify-between border-b-2 border-black">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Asistente Virtual</h3>
                <p className="text-xs text-gray-600">Perú Digital</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-100 w-8 h-8 p-0"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  setMessages([]);
                }}
                className="text-black hover:bg-gray-100 w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[75%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {/* Avatar */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-linear-to-br from-red-600 to-red-700' 
                      : 'bg-linear-to-br from-black to-gray-900'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                  
                  {/* Mensaje */}
                  <div>
                    <div className={`p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-red-600 text-white font-medium'
                        : 'bg-white border-2 border-black text-black shadow-sm'
                    }`}>
                      {message.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-linear-to-br from-black to-gray-900 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-white border-2 border-black p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input del chat */}
          <div className="p-3 border-t-2 border-black bg-white">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm border-2 border-black focus:border-red-600 font-medium"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}