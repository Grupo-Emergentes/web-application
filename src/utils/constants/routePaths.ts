
export const ROUTE_PATHS = {
    INDEX: '/',
    LOGIN: '/login',

    DASHBOARD: '/dashboard',
    BIRTH_CERTIFICATE: '/birth-certificate',
    DIGITAL_DNI: '/digital-dni',
    ADMIN: '/admin',
    WALLET: '/wallet',
    SERVICES: '/services',
    REPORT: '/report',
    REPORTS_SUMMARY: '/reports-summary',
    SOLICITUDES: '/solicitudes',
    AYUDA: '/ayuda',
    TRAMITE_FORM: '/tramite-form',

    NOT_FOUND: '/not-found',

    USER_PROFILE_TEMPLATE: '/users/:id',
} as const;

export const buildUserProfilePath = (id: string | number): string => {
    return ROUTE_PATHS.USER_PROFILE_TEMPLATE.replace(':id', String(id));
};