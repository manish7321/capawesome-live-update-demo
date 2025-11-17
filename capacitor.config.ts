import type { CapacitorConfig } from '@capacitor/cli';
import * as dotenv from "dotenv";

dotenv.config();

console.log("process.env.VITE_LIVE_UPDATE_APP_ID:😍😍😍 ", process.env.VITE_CAPACITOR_HOT_UPDATE_APP_ID);
const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'capawesome-live-update-demo',
  webDir: 'dist',
  plugins: {
    LiveUpdate: {
      appId: process.env.VITE_CAPACITOR_HOT_UPDATE_APP_ID,
      autoDeleteBundles: true,
      readyTimeout: 10000,
    }
  }
};

export default config;
