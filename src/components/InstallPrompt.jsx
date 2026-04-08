import { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";

export function InstallPrompt() {
  const [showButton, setShowButton] = useState(false);
  const deferredPrompt = useRef(null);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt.current) return;
    deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    if (outcome === "accepted") setShowButton(false);
    deferredPrompt.current = null;
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleInstall}
      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-night-700 transition-colors group relative"
      aria-label="Install App"
    >
      <Download className="w-5 h-5" />
      <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Install App
      </span>
    </button>
  );
}