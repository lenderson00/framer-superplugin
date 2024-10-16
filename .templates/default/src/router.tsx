import React, { useRef } from "react";
import {  Switch } from "wouter";
import { AnimatePresence } from "framer-motion";
import { useRoutes } from "./hooks/use-router";
import { usePluginResizeObserver } from "./hooks/use-plugin-resize";


export function Router() {
  const page = useRoutes();
  const ref = useRef<HTMLDivElement>(null);
  
  usePluginResizeObserver(ref);

  return (
    <main ref={ref} className="w-fit min-w-[200px]">
      <AnimatePresence>
        <Switch>
          {page && React.cloneElement(page, { key: location.pathname })}
        </Switch>
      </AnimatePresence>
    </main>
  );
}

