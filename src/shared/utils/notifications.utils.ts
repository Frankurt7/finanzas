export const sendNotificationToSW = (message: object) => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  } else {
    console.log('Service Worker no está disponible o no está controlando la página.');
  }
};
