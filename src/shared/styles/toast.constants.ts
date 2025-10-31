import { DefaultToastOptions } from "react-hot-toast";

export const NEUMORPHIC_TOAST_OPTIONS: DefaultToastOptions = {
  style: {
    borderRadius: "12px",
    background: "#e0e0e0",
    boxShadow: "9px 9px 16px #bebebe, -9px -9px 16px #ffffff",
    padding: "16px",
    color: "#333",
  },
  success: {
    iconTheme: {
      primary: "#8a8a8a",
      secondary: "#e0e0e0",
    },
  },
  error: {
    iconTheme: {
      primary: "#dc3545",
      secondary: "#e0e0e0",
    },
  },
};
