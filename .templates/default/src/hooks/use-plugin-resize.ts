import { useEffect, useState } from "react";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";
import { framer } from "framer-plugin";

interface Size {
  width?: number;
  height?: number;
}

export const usePluginResizeObserver = (
  ref: React.RefObject<HTMLDivElement>,
) => {
  const [{ width, height }, setSize] = useState<Size>({
    width: 300,
    height: 300,
  });

  const onResize = useDebounceCallback(setSize, 0);

  useResizeObserver({
    ref,
    onResize,
  });

  useEffect(() => {
    
    framer.showUI({
      width,
      height
    });
  }, [width, height]);
};
