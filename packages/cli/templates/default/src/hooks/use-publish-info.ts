import { framer, PublishInfo } from "framer-plugin";

import { useEffect, useState } from "react";

export function usePublishInfo() {
  const [publishInfo, setPublishInfo] = useState<PublishInfo>();

  useEffect(() => {
    return framer.subscribeToPublishInfo(setPublishInfo);
  }, []);

  return publishInfo;
}
