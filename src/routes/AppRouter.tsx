import { Routes, Route, Navigate } from 'react-router-dom';
import { RoleRoute } from '@/auth/RoleRoute';

import { ROLES } from '@/utils/constants/roles';
import { ROUTE_PATHS } from '@/utils/constants/routePaths';

// Páginas públicas
import { IndexPage } from '@/pages/Index';
import { LoginPage } from '@/pages/Login';
import { NotFoundPage } from '@/pages/NotFound';

// Páginas protegidas
import { DashboardPage } from '@/pages/Dashboard';
import { SuperAdminPanelPage } from '@/pages/SuperAdminPanel';

export const AppRouter = () => {

    return (        

        <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path={ROUTE_PATHS.INDEX} element={<IndexPage />} />
            <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
            <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFoundPage />} />

            {/* RUTAS PROTEGIDAS */}
            <Route
                path={ROUTE_PATHS.DASHBOARD}
                element={
                    <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}>
                        <DashboardPage />
                    </RoleRoute>
                }
            />
            <Route
                path={ROUTE_PATHS.ADMIN}
                element={
                    <RoleRoute allowedRoles={[ROLES.CITIZEN]}>
                        <div>Ruta Protegida con vista para el usuario</div>
                    </RoleRoute>
                }
            />
            {/* <Route
                path={ROUTE_PATHS.SUPER_ADMIN_PANEL}
                element={
                    <RoleRoute allowedRoles={[ROLES.SUPERADMIN]}>
                        <SuperAdminPanelPage />
                    </RoleRoute>
                }
            /> */}
            <Route
                path={ROUTE_PATHS.SUPER_ADMIN_PANEL}
                element={<SuperAdminPanelPage />}
            />

            <Route path="*" element={<Navigate to={ROUTE_PATHS.NOT_FOUND} replace />} />


        </Routes>
    )
}