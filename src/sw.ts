/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

const REMINDER_NOTIFICATION_TAG = "daily-reminder";
const ANALYSIS_NOTIFICATION_TAG = "new-analysis";

self.addEventListener("install", () => {
  console.log("Service Worker instalado");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
  event.waitUntil(scheduleReminderNotification());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_ANALYSIS_NOTIFICATION") {
    showAnalysisNotification();
  }
});

async function scheduleReminderNotification() {
  showReminderNotification();
  setInterval(showReminderNotification, 12 * 60 * 60 * 1000); // Cada 12 horas
}

function showReminderNotification() {
  if (Notification.permission === "granted") {
    self.registration.showNotification("¡No lo olvides!", {
      body: "Registra tus gastos de hoy.",
      icon: "/icon-192.png",
      tag: REMINDER_NOTIFICATION_TAG,
    });
  }
}

function showAnalysisNotification() {
  if (Notification.permission === "granted") {
    self.registration.showNotification("¡Un nuevo análisis ha llegado!", {
      body: "Entra a la sección de Resumen para ver tus nuevos patrones y tips.",
      icon: "/icon-192.png",
      tag: ANALYSIS_NOTIFICATION_TAG,
    });
  }
}
