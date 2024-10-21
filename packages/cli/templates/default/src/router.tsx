import { QueryClientProvider } from "@tanstack/react-query";
import { usePluginResizeObserver } from "./hooks/use-plugin-resize";
import { useRef } from "react";
import { queryClient } from "./lib/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getRoutes } from "@/lib/get-routes";
import { AnimatePresence } from "framer-motion";

const router = createBrowserRouter(getRoutes());

export const Router = () => {
  const ref = useRef<HTMLDivElement>(null);
  usePluginResizeObserver(ref);

  return (
    <main ref={ref} className="w-fit min-w-[200px]">
      <AnimatePresence mode="wait">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AnimatePresence>
    </main>
  )
}