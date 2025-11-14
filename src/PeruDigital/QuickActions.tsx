import { Card } from './ui/card';
import { Button } from './ui/button';
import { Wallet, FileText, MessageCircle, Calendar, Plus } from 'lucide-react';

interface QuickActionsProps {
  onViewChange: (view: any) => void;
}

export function QuickActions({ onViewChange }: QuickActionsProps) {
  const actions = [
    {
      id: 'wallet',
      title: 'Mi Billetera',
      description: 'Documentos digitales',
      icon: Wallet,
      gradient: 'from-red-600 to-red-700',
      onClick: () => onViewChange('wallet')
    },
    {
      id: 'report',
      title: 'Ver Reporte',
      description: 'Actividad reciente',
      icon: FileText,
      gradient: 'from-red-600 to-red-700',
      onClick: () => onViewChange('report')
    },
    {
      id: 'support',
      title: 'Contactar Soporte',
      description: 'Ayuda personalizada',
      icon: MessageCircle,
      gradient: 'from-red-600 to-red-700',
      onClick: () => onViewChange('ayuda')
    },
    {
      id: 'appointments',
      title: 'Citas',
      description: 'Programar trámites',
      icon: Calendar,
      gradient: 'from-red-600 to-red-700',
      onClick: () => onViewChange('solicitudes')
    },
    {
      id: 'new-request',
      title: 'Nueva Solicitud',
      description: 'Iniciar trámite',
      icon: Plus,
      gradient: 'from-red-600 to-red-700',
      onClick: () => onViewChange('solicitudes')
    }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Acciones Rápidas
        </h2>
        <p className="text-slate-600 mt-2">Accede rápidamente a las funciones más utilizadas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Card 
              key={action.id}
              className="p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 bg-white"
              onClick={action.onClick}
            >
              <div className="text-center space-y-3">
                <div className={`w-14 h-14 bg-linear-to-br ${action.gradient} rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-slate-900">{action.title}</h3>
                  <p className="text-sm text-slate-600">{action.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
