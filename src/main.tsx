import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContext, AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"
import { BrowserRouter } from "react-router-dom";

const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  authorizationEndpoint: import.meta.env.VITE_AUTHORIZATION_ENDPOINT,
  tokenEndpoint: 'https://indodigitalmedev.lolc.com/indo-digital-loan/oauth2/token',
  redirectUri: 'https://indodevlb1/indo-digital-loan/redirect1',
  scope: 'someScope openid',
  onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
