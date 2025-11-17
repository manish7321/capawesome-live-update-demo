import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Capacitor } from '@capacitor/core'
import { LiveUpdate } from '@capawesome/capacitor-live-update'
import { SplashScreen } from '@capacitor/splash-screen'

async function checkForUpdate() {
  try {
    if (Capacitor.isNativePlatform()) {
      await LiveUpdate.ready();
      console.log("LiveUpdate is ready🚀");
      const { versionName } = await LiveUpdate.getVersionName();
      const majorVersion = versionName.split(".")[0];
      console.log("majorVersion: 👮‍♀️👮", majorVersion);
      const { bundleId: currentBundleId } = await LiveUpdate.getCurrentBundle();
      const result = await LiveUpdate.fetchLatestBundle({ channel: `${import.meta.env.REACT_APP_ENV}-${majorVersion}` });
      console.log("LiveUpdate fetch latest bundle result 💁", result);
      if (result.bundleId && result.downloadUrl && currentBundleId !== result.bundleId) {
        await SplashScreen.hide();
        const acceptUpdate =window.confirm("A new update is available. Do you want to download and install it now?");
        if (acceptUpdate) {
          await SplashScreen.show({ autoHide: false });
          const downloadStart = performance.now();
          await LiveUpdate.sync({channel: `${import.meta.env.REACT_APP_ENV}-${majorVersion}`});
          await LiveUpdate.reload();
          const totalEnd = performance.now(); 
          console.log(`🚀 LiveUpdate: Update applied successfully to bundle ${result.bundleId}`);
          console.log(`⏱️ Total time from confirmation to reload: ${(totalEnd - downloadStart).toFixed(2)} ms`);
        }
      }
    }
  } catch (err) {
    console.error("LiveUpdate failed❌", err);
  } finally {
    await SplashScreen.hide();
  }
}

await checkForUpdate();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
