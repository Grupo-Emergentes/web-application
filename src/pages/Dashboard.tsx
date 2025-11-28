// import React from "react";
// solo seria ejemplo de como importar componentes y usarlos en la página

import { Dashboard } from "@/components/Dashboard";
import { SignOutButton } from "@/components/SignOutButton";
import { useAuth } from 'react-oidc-context';


type ViewType = 'home' | 'settings' | 'wallet';

const handleViewChange = (view: ViewType) => {
  console.log(`Cambiando de vista a: ${view}`);
};

const handleStartTramite = (id: string, name: string) => {
  console.log(`Iniciando trámite: ${name} (ID: ${id})`);
};

export const DashboardPage = () => {
  const auth = useAuth();
  const handleSignOut = () => {
    auth
    .removeUser()
    .then(() => {
        void auth.signoutRedirect();
    })
  }
  return (
    <div>
      <SignOutButton onClick={handleSignOut} />
      <Dashboard
        onViewChange={handleViewChange}
        onStartTramite={handleStartTramite} />
    </div>
  )
}