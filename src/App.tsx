import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { WalletSection } from './components/WalletSection';
import { ServicesGrid } from './components/ServicesGrid';
import { Solicitudes } from './components/Solicitudes';
import { Ayuda } from './components/Ayuda';
import { AdminPanel } from './components/AdminPanel';
import { DigitalDNI } from './components/DigitalDNI';
import { DynamicForm } from './components/DynamicForm';

type ViewType = 
  | "dashboard" 
  | "birth-certificate" 
  | "digital-dni" 
  | "admin" 
  | "wallet" 
  | "services" 
  | "report" 
  | "reports-summary" 
  | "solicitudes" 
  | "ayuda"
  | "tramite-form";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [currentTramite, setCurrentTramite] = useState<{ id: string; name: string } | null>(null);

  const handleStartTramite = (tramiteId: string, tramiteName: string) => {
    setCurrentTramite({ id: tramiteId, name: tramiteName });
    setCurrentView('tramite-form');
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onViewChange={setCurrentView} onStartTramite={handleStartTramite} />;
      case "wallet":
        return <WalletSection onViewChange={setCurrentView} fullView={true} />;
      case "services":
        return <ServicesGrid onViewChange={setCurrentView} fullView={true} onStartTramite={handleStartTramite} />;
      case "solicitudes":
        return <Solicitudes onViewChange={setCurrentView} />;
      case "ayuda":
        return <Ayuda onViewChange={setCurrentView} />;
      case "admin":
        return <AdminPanel onViewChange={setCurrentView} />;
      case "digital-dni":
        return <DigitalDNI onViewChange={setCurrentView} />;
      case "tramite-form":
        return <DynamicForm 
          onClose={() => setCurrentView('services')} 
          tramiteName={currentTramite?.name}
        />;
      default:
        return <Dashboard onViewChange={setCurrentView} onStartTramite={handleStartTramite} />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-red-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="pt-16">
        {renderView()}
      </main>
    </div>
  );
}