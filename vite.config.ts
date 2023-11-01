import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: "/indo-digital-loan",
    server: {
      cors: {
        origin : true
      },
      proxy: {
        '/oauth2': {
          target: 'https://indoauthdev.lolc.com',
          changeOrigin: true,
          secure: true,
        },
        '/redirect': {
          target: env.VITE_INDO_BASE_AUTH_URL,
          changeOrigin: true,
          secure: true,
        },
        '/token': {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mobixCamsCommon': {
          target: env.VITE_INDO_BASE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mobixCamsCredit':  {
          target: env.VITE_INDO_BASE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mobixCamsLoan':  {
          target: env.VITE_INDO_BASE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mobixCamsStakeholder':  {
          target: env.VITE_INDO_BASE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mobixCamsDocument':  {
          target: env.VITE_INDO_BASE_API_URL,
          changeOrigin: true,
          secure: false,
        }
        ,
        '/mobixCamsApproval':  {
          target: env.VITE_INDO_BASE_API_URL,
          changeOrigin: true,
          secure: false,
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
