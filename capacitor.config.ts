/// <reference types="vite/client" />
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'capawesome-live-update-demo',
  webDir: 'dist',
  plugins: {
    LiveUpdate: {
      appId: import.meta.env.VITE_LIVE_UPDATE_APP_ID,
      autoDeleteBundles: true,
      readyTimeout: 10000,
    }
  }
};

export default config;
