import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const observeTheme = () => {
      const currentTheme = document.body.dataset.framerTheme as
        | "light"
        | "dark";
      if (currentTheme) {
        setTheme(currentTheme);
      }
    };

    observeTheme();

    const observer = new MutationObserver(observeTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-framer-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};
