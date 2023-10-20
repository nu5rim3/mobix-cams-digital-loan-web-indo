import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      // cors: {
      //   origin : false
      // },
      proxy: {
        '/token':  {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mobixCamsCommon':  {
          target: env.VITE_INDO_BASE_URL,
          changeOrigin: true,
          secure: false,
        }
      },
      port: 3000,
    },
     host: true,
    plugins: [react()],
  }
})
