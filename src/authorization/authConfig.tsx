import {TAuthConfig, TRefreshTokenExpiredEvent} from "react-oauth2-code-pkce"

export const authConfig: TAuthConfig = {
clientId: import.meta.env.VITE_CLIENT_ID,
authorizationEndpoint: import.meta.env.VITE_AUTHORIZATION_ENDPOINT,
tokenEndpoint: import.meta.env.VITE_TOKEN_ENDPOINT,
redirectUri: import.meta.env.VITE_REDIRECT_URI,
scope: import.meta.env.VITE_SCOPE,
extraTokenParameters: {
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret : import.meta.env.VITE_CLIENT_SECRET,
  grant_type : import.meta.env.VITE_GRANT_TYPE
},
  onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
}


