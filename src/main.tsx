import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Capacitor } from '@capacitor/core'
import { LiveUpdate } from '@capawesome/capacitor-live-update'

async function checkForUpdate() {
  try {
    if (Capacitor.isNativePlatform()) {
      await LiveUpdate.ready();
      console.log("LiveUpdate is ready🚀");
      const { bundleId: currentBundleId } = await LiveUpdate.getCurrentBundle();
      const result = await LiveUpdate.fetchLatestBundle({ channel: `test-1` });
      console.log("LiveUpdate fetchbundle result 💁", result);
      if (result.bundleId && result.downloadUrl && currentBundleId !== result.bundleId) {
        const acceptUpdate = window.confirm('A new update is available. Would you like to install it?');
        if (acceptUpdate) {
          const downloadStart = performance.now();
          await LiveUpdate.downloadBundle({
            bundleId: result.bundleId,
            url: result.downloadUrl,
          });
          const downloadEnd = performance.now();
          console.log(`⬇️ Bundle download: ${(downloadEnd - downloadStart).toFixed(2)} ms`);

          const setStart = performance.now();
          await LiveUpdate.setNextBundle({ bundleId: result.bundleId });
          const setEnd = performance.now();
          console.log(`📦 Set next bundle: ${(setEnd - setStart).toFixed(2)} ms`);

          const reloadStart = performance.now();
          await LiveUpdate.reload();
          const reloadEnd = performance.now();
          console.log(`🔄 Reload time: ${(reloadEnd - reloadStart).toFixed(2)} ms`);

          const totalEnd = reloadEnd; 
          console.log(`⏱️ Total time from confirmation to reload: ${(totalEnd - downloadStart).toFixed(2)} ms`);
        }
      }
    }
  } catch (err) {
    console.warn("LiveUpdate.sync() failed", err);
  }
}

await checkForUpdate();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
