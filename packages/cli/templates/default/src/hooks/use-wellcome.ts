import { createPluginDB } from "@/lib/plugin-db";

export const useWellcome = createPluginDB<boolean>("wellcome", false);
