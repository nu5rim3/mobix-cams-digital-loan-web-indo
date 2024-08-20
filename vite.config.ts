import { defineConfig, loadEnv } from "vite";
import http from "https";
import react from "@vitejs/plugin-react-swc";
// import dns from 'dns'

// dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    optimizeDeps: {
      exclude: ["blip-ds/loader"],
    },
    base: "/indo-digital-loan",
    server: {
      // cors: {
      //   origin: true
      // },
      proxy: {
        "/indo-digital-loan/oauth2": {
          target: env.VITE_AUTHORIZATION_SERVER,
          changeOrigin: true,
          secure: true,
          agent: new http.Agent(),
          rewrite: (path) => {
            return path.replace(/^\/indo-digital-loan/, "");
          },
        },
        "/indo-digital-loan/token": {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          agent: new http.Agent(),
          rewrite: (path) => {
            return path.replace(/^\/indo-digital-loan/, "");
          },
        },
        "/indo-digital-loan/oidc": {
          target: "https://indoauthdev.lolc.com",
          changeOrigin: true,
          secure: false,
          agent: new http.Agent(),
          rewrite: (path) => {
            return path.replace(/^\/indo-digital-loan/, "");
          },
        },
        "/indo-digital-loan/mobixCamsCommon": {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            return path.replace(/^\/indo-digital-loan/, "");
          },
        },
        "/indo-digital-loan/mobixCamsCredit": {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ""),
        },
        "/indo-digital-loan/mobixCamsLoan": {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ""),
        },
        "/indo-digital-loan/mobixCamsStakeholder": {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ""),
        },
        "/indo-digital-loan/mobixCamsDocument": {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ""),
        },
        "/indo-digital-loan/mobixCamsApproval": {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ""),
        },
      },
      port: 3000,
      strictPort: true,
      host: true,
    },
    //  host: true,
    host: "indodigitalmeuat.lolc.com",
    strictPort: true,
    cors: {
      origin: "https://apiuatindo.lolc.com",
    },
    preview: {
      port: 3000,
      strictPort: true,
      cors: {
        origin: "https://apiuatindo.lolc.com",
      },
    },
    plugins: [react()],
  };
});

//
