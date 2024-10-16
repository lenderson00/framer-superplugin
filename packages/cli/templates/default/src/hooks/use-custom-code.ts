import { useEffect, useState } from "react";
import { CustomCode, CustomCodeLocation, framer } from "framer-plugin";

interface CustomCodeOptions {
  html: string | null;
  location: CustomCodeLocation;
}

export function useCustomCode(): [
  (location: CustomCodeLocation) => CustomCodeOptions | null,
  (code: CustomCodeOptions) => void
] {
  const [customCode, setCustomCodeState] = useState<CustomCode | null>(null);

  useEffect(() => {
    const unsubscribe = framer.subscribeToCustomCode(setCustomCodeState);
    return () => unsubscribe();
  }, []);

  const getCustomCode = (
    location: CustomCodeLocation
  ): CustomCodeOptions | null => {
    if (!customCode || !customCode[location] || customCode[location].disabled) {
      return null;
    }

    return {
      html: customCode[location].html,
      location: location,
    };
  };

  const setCustomCode = (code: CustomCodeOptions) => {
    framer.setCustomCode(code);
  };

  return [getCustomCode, setCustomCode];
}
