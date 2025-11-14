import { useState } from 'react';
import { Header } from './PeruDigital/Header'
import { Dashboard } from './PeruDigital/Dashboard';
import { WalletSection } from './PeruDigital/Wallet/WalletSection';
import { ServicesGrid } from './PeruDigital/Procedure Management/ServicesGrid';
import { Solicitudes } from './PeruDigital/Solicitudes';
import { Ayuda } from './PeruDigital/Ayuda';
import { AdminPanel } from './PeruDigital/AdminPanel';
import { DigitalDNI } from './PeruDigital/Wallet/DigitalDNI';
import { DynamicForm } from './PeruDigital/Procedure Management/DynamicForm';

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
      {/* Chatbot flotante */}
      <Chatbot userName="Carlos Mendoza" />
    </div>
  );
}