/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

// Inyecta el manifiesto de precaching de Workbox.
// Esto asegurará que tu PWA funcione offline.
precacheAndRoute(self.__WB_MANIFEST);

const NOTIFICATION_TAG = "daily-reminder";

self.addEventListener("install", () => {
  console.log("Service Worker instalado");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
  // Inicia el ciclo de notificaciones cuando el SW se activa
  event.waitUntil(scheduleNotification());
});

async function scheduleNotification() {
  // Muestra una notificación inmediatamente al activar
  showNotification();
  // Y luego la programa para que se repita
  setInterval(showNotification, 12 * 60 * 60 * 1000); // Cada 12 horas
}

function showNotification() {
  const permission = Notification.permission;
  if (permission === "granted") {
    self.registration.showNotification("¡No lo olvides!", {
      body: "Registra tus gastos de hoy.",
      icon: "/icon-192.png",
      tag: NOTIFICATION_TAG, // Usar un tag evita que se acumulen notificaciones idénticas
    });
  }
}
