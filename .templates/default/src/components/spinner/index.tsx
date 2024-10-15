import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import styles from "./style.module.css";

export interface SpinnerProps {
  /** Size of the spinner */
  size?: "normal" | "medium" | "large";
  /** Set the spinner to have a static position inline with other content */
  inline?: boolean;
  className?: string;
  inheritColor?: boolean;
}

function styleForSize(size: SpinnerProps["size"]) {
  switch (size) {
    case "normal":
      return styles.normalStyle;
    case "medium":
      return styles.mediumStyle;
    case "large":
      return styles.largeStyle;
  }
}

function spinnerClassNames(size: SpinnerProps["size"] = "normal") {
  return cn(styles.spin, styles.baseStyle, styleForSize(size));
}

export const Spinner = ({
  size,
  inline = false,
  inheritColor,
  className,
  ...rest
}: SpinnerProps) => {
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

  return (
    <div
      className={cn(
        className,
        spinnerClassNames(size),
        inheritColor && styles.buttonWithDepthSpinner,
        !inline && styles.centeredStyle,
        theme === "light" ? "invert" : ""
      )}
      {...rest}
    />
  );
};
