"use client";
import { useState, useEffect } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("App installed");
    }

    setDeferredPrompt(null);
  };

  return (
    <button
      onClick={installApp}
      style={{
        padding: "10px 20px",
        background: "#1a73e8",
        color: "white",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Install App
    </button>
  );
}