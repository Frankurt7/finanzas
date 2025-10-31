import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    "default"
  );

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Este navegador no soporta notificaciones de escritorio.");
      return;
    }

    const currentPermission = await Notification.requestPermission();
    setPermission(currentPermission);

    if (currentPermission === "granted") {
      toast.success("¡Genial! Recibirás recordatorios para registrar tus gastos.");
    } else if (currentPermission === "denied") {
      toast.error("Has bloqueado las notificaciones. Puedes activarlas en la configuración de tu navegador.");
    }
  };

  return { permission, requestNotificationPermission };
};