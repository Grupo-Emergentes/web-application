import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

import { ROUTE_PATHS } from "@/utils/constants/routePaths";


interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const auth = useAuth();

    if (auth.isLoading) return <div>Loading...</div>
    if (!auth.isAuthenticated) return <Navigate to={ROUTE_PATHS.INDEX} replace />;
    
    return children;
}

