import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // define: {
    //   'process.env.REACT_ETHERSCAN_APP_API_KEY': JSON.stringify(env.REACT_APP_ETHERSCAN_API_KEY),
    //   'env.REACT_APP_GOOGLE_API_KEY': JSON.stringify(env.REACT_APP_GOOGLE_API_KEY)
    // },
    plugins: [react()],
  }
})
