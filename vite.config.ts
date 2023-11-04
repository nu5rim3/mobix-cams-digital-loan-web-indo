import { defineConfig, loadEnv } from 'vite'
import http from "https";
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: "/indo-digital-loan",
    server: {
      cors: {
        origin: true
      },
      proxy: {
        '/indo-digital-loan/oauth2': {
          target: env.VITE_AUTHORIZATION_SERVER,
          changeOrigin: true,
          secure: true,
          agent: new http.Agent(),
          rewrite: (path) => {
            console.log("oauth2");
            return path.replace(/^\/indo-digital-loan/, '')
          },
        },
        '/indo-digital-loan/token': {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          agent: new http.Agent(),
          rewrite: (path) => {
            console.log("token");
            return path.replace(/^\/indo-digital-loan/, '')
          }
        },
        '/indo-digital-loan/mobixCamsCommon': {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            console.log("mobixCamsCommon");
            return path.replace(/^\/indo-digital-loan/, '')
          },
        },
        '/indo-digital-loan/mobixCamsCredit': {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ''),
        },
        '/indo-digital-loan/mobixCamsLoan': {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ''),
        },
        '/indo-digital-loan/mobixCamsStakeholder': {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ''),
        },
        '/indo-digital-loan/mobixCamsDocument': {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ''),
        }
        ,
        '/indo-digital-loan/mobixCamsApproval': {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/indo-digital-loan/, ''),
        }
      },
      port: 3000,
      strictPort: true,
      host: true,
    },
    //  host: true,
    preview: {
      port: 3000,
      strictPort: true,
    },
    plugins: [react()],
  }
})

// 
