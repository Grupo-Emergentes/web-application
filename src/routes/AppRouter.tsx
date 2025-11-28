import { Routes, Route, Navigate } from 'react-router-dom';
import { RoleRoute } from '@/auth/RoleRoute';
import { useAuth } from 'react-oidc-context';

import { ROLES } from '@/utils/constants/roles';
import { ROUTE_PATHS } from '@/utils/constants/routePaths';

// Páginas públicas
import { LoginPage } from '@/pages/Login';
import { NotFoundPage } from '@/pages/NotFound';

// Páginas protegidas
import { DashboardPage } from '@/pages/Dashboard';
import { SuperAdminPanelPage } from '@/pages/SuperAdminPanel';

export const AppRouter = () => {
    const auth = useAuth();

    return (

        <Routes>
            {/* RUTAS PUBLICAS */}
            <Route
                path={ROUTE_PATHS.INDEX}
                element={
                    auth.isAuthenticated ?
                        <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}>
                            <DashboardPage />
                        </RoleRoute> : <LoginPage />
                }
            />
            <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFoundPage />} />

            {/* RUTAS PROTEGIDAS */}
            <Route
                path={ROUTE_PATHS.ADMIN}
                element={
                    <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                        <div>Ruta Protegida con vista para el usuario</div>
                    </RoleRoute>
                }
            />
            <Route
                path={ROUTE_PATHS.SUPER_ADMIN_PANEL}
                element={
                    <RoleRoute allowedRoles={[ROLES.ADMIN]}>
                        <SuperAdminPanelPage />
                    </RoleRoute>
                }
            />

            <Route path="*" element={<Navigate to={ROUTE_PATHS.NOT_FOUND} replace />} />


        </Routes>
    )
}