import { WelcomeSection } from './WelcomeSection';
import { QuickActions } from './QuickActions';
import { WalletSection } from './WalletSection';
import { ServicesGrid } from './ServicesGrid';
import { SecuritySection } from './SecuritySection';
import { Footer } from './Footer';

interface DashboardProps {
  onViewChange: (view: any) => void;
  onStartTramite?: (tramiteId: string, tramiteName: string) => void;
}

export function Dashboard({ onViewChange, onStartTramite }: DashboardProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Sección de bienvenida */}
        <WelcomeSection onViewChange={onViewChange} />
        
        {/* Acciones rápidas */}
        <QuickActions onViewChange={onViewChange} />
        
        {/* Mi billetera digital */}
        <WalletSection onViewChange={onViewChange} />
        
        {/* Servicios disponibles */}
        <ServicesGrid onViewChange={onViewChange} onStartTramite={onStartTramite} />
        
        {/* Seguridad y privacidad */}
        <SecuritySection />
      </div>
      
      {/* Footer */}
      <Footer onViewChange={onViewChange} />
    </div>
  );
}