import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './styles/globals.css'
import { AuthProvider } from "@/auth/AuthProvider";
import {Amplify} from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            // Your User Pool ID (e.g., us-east-1_xxxxxxxxx)
            userPoolId: import.meta.env.VITE_USER_POOL_ID,
            // Your User Pool Client ID (e.g., 12345abcde...)
            userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);