interface ImportMetaEnv {
  readonly VITE_COGNITO_AUTHORITY: string;
  readonly VITE_COGNITO_CLIENT_ID: string;
  readonly VITE_COGNITO_DOMAIN: string;
  readonly VITE_LOGIN_REDIRECT: string;
  readonly VITE_LOGOUT_REDIRECT: string;
  readonly VITE_CHABOT_API_URL: string;
  readonly VITE_PROCEDURE_API_URL: string;
  readonly VITE_USER_POOL_ID: string;
  readonly VITE_WALLET_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
