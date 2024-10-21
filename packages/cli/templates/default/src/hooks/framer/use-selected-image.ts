import { framer, ImageAsset } from "framer-plugin";
import { useEffect, useState } from "react";

export function useSelectedImage() {
  const [image, setImage] = useState<ImageAsset | null>(null);
  useEffect(() => {
    return framer.subscribeToImage(setImage);
  }, []);
  return image;
}
