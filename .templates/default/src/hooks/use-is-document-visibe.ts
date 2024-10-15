import { useState, useEffect } from "react";

export function useIsDocumentVisible() {
  const [isVisible, setIsVisible] = useState(
    document.visibilityState === "visible"
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
