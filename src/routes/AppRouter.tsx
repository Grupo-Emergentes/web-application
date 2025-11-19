import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { RoleRoute } from '@/auth/RoleRoute';

// componente aparte (moverlo a otro archivo /dashboard)
import { useAuth } from 'react-oidc-context';
import { SignOutButton } from '@/components/SignOutButton';


import { ROLES } from '@/utils/constants/roles';
import { ROUTE_PATHS } from '@/utils/constants/routePaths';

// Páginas públicas
import { IndexPage } from '@/pages/Index';
import { LoginPage } from '@/pages/Login';
import { NotFoundPage } from '@/pages/NotFound';

export const AppRouter = () => {
    const auth = useAuth();

    const handleSignOut = () => {
        auth.removeUser();
        // auth
        // .removeUser()
        // .then(() => {
        //     void auth.signoutRedirect();
        // })
    }

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
                    <ProtectedRoute>
                        <div>
                            Ruta Protegida
                            <SignOutButton onClick={handleSignOut} />
                        </div>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dadwa"
                element={
                    <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}>
                        <div>Ruta Protegida con vista para el admin</div>
                    </RoleRoute>
                }
            />
            <Route
                path="/rol2"
                element={
                    <RoleRoute allowedRoles={[ROLES.CITIZEN]}>
                        <div>Ruta Protegida con vista para el usuario</div>
                    </RoleRoute>
                }
            />

            <Route path="*" element={<Navigate to={ROUTE_PATHS.NOT_FOUND} replace />} />


        </Routes>
    )
}