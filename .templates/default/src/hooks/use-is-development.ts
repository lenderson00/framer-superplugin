import { useState, useEffect } from "react";

export function useIsDevelopment() {
  const [isDevelopment, setIsDevelopment] = useState(false);

  useEffect(() => {
    const checkIsDevelopment = () => {
      const host = window.location.host;
      return host.includes("localhost") || host.startsWith("127.0.0.1") || host.endsWith(".local");
    };

    setIsDevelopment(checkIsDevelopment());
  }, []);

  return isDevelopment;
}
