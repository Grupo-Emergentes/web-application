import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import {AuthProvider} from "react-oidc-context";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_U2UOXVhrX",
    client_id: "4ih0t549ecd43jp2nmnhakoems",
    redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
    response_type: "code",
    scope: "email openid phone",
};



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider {...cognitoAuthConfig}>
          <App />
      </AuthProvider>
  </React.StrictMode>,
)