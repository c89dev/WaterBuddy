// Initialize Service Worker
if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js?v=${APP_VERSION}')
        .then(() => console.log('SW registered'))
        .catch(console.error);
    }