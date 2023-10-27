import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: "/indo-digital-loan",
    server: {
      // cors: {
      //   origin : false
      // },
      proxy: {
        '/oauth2/token': {
          target: env.VITE_INDO_BASE_AUTH_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mobixCamsCommon': {
          target: env.VITE_INDO_BASE_URL,
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
