import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from "dotenv"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0"
  },
  define:{
     'VITE_WEATHER_API_KEY': JSON.stringify(process.env.VITE_WEATHER_API_KEY)
  }
})
