import { AuthProvider as OidcProvider } from "react-oidc-context";
import { cognitoAuthConfig } from "./cognitoAuthConfig";
import { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = (({ children }: AuthProviderProps) => {
    return (
        <OidcProvider {...cognitoAuthConfig}>
            {children}
        </OidcProvider>
    )
})