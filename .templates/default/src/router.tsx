import React, { cloneElement, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useRoute, RouteComponentProps } from "wouter";
import { AnimatePresence, MotionProps, motion } from "framer-motion";
import { PluginPage } from "./components/plugin-page";
import { PageErrorBoundaryFallback } from "./components/page-error-bondary-fallback";
import { framer } from "framer-plugin";

interface PluginRoute {
  path: string;
  component: React.ComponentType<RouteComponentProps>;
  title?: string;
  children?: PluginRoute[];
}

interface Match {
  match: ReturnType<typeof useRoute>;
  route: PluginRoute;
}


framer.showUI({

  width: 500,
  height: 500,
});

function useRoutes() {
  const [location] = useLocation();
  const [animationDirection, setAnimationDirection] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  

  const routes = useMemo(() => {
    const pages = import.meta.glob("./app/**/*.tsx", { eager: true });
    const pluginRoutes: PluginRoute[] = [];
  
    for (const path in pages) {

      let pathname = path 
                    .replace("./app/", "/")   // Remover o prefixo ./app/
                    .replace(/\/(page|index)\.tsx$/, "") // Remover o sufixo /page.tsx ou /index.tsx
                    .replace(".tsx", ""); // Remover a extensão .tsx

      const dynamicSegments = pathname.match(/\[([^\]]+)\]/g);
      if (dynamicSegments) {
        dynamicSegments.forEach((segment) => {
          const paramName = segment.replace("[", "").replace("]", "");
          pathname = pathname.replace(segment, `:${paramName}`);
        });
      }

      const PageImport = pages[path] as { default: React.ComponentType<any>, title: string | undefined };

      pluginRoutes.push({
        path: pathname ,
        component: (props: RouteComponentProps) => {
          const Component = PageImport.default;
          const dynamicValue = getDynamicRouteValue(pathname, location);
          return <Component {...props} {...dynamicValue} />;
        },
        title: PageImport.title
      });
    }

    console.log(pluginRoutes)
  
    return pluginRoutes;
  }, [location])
  
  // Save the length of the `routes` array that we receive on the first render
  const [routesLen] = useState(() => routes.length);

  // because we call `useRoute` inside a loop the number of routes can't be changed
  if (routesLen !== routes.length) {
    throw new Error(
      "The length of `routes` array provided to `useRoutes` must be constant"
    );
  }

  useEffect(() => {
    setIsFirstPage(false);
  }, []);

  useEffect(() => {
    const originalHistoryBack = history.back;

    history.back = () => {
      setAnimationDirection(-1);
      originalHistoryBack.call(history);
    };

    return () => {
      history.back = originalHistoryBack;
    };
  }, []);

  useEffect(() => {
    setAnimationDirection(1);
  }, [location]);

  const matches: Match[] = [];

  const addToMatch = (route: PluginRoute, parentPath = "") => {
    const fullPath = parentPath + route.path;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const match = useRoute(fullPath);
    console.log(match)
 
    matches.push({ match, route: { ...route, path: fullPath } });

    if (route.children) {
      for (const child of route.children) {
        addToMatch(child, fullPath);
      }
    }
  };

  for (const route of routes) {
    addToMatch(route);
  }

  for (const { match, route } of matches) {
    const [isMatch, params] = match;
    const { title, component: Component } = route;

    if (!isMatch) continue;

    const animationProps = isFirstPage
      ? {}
      : {
          initial: {
            x: `${animationDirection * 100}vw`,
            opacity: 0,
            position: "absolute",
          },
          animate: { x: 0, opacity: 1, position: "relative" },
          exit: {
            x: `${animationDirection * -100}vw`,
            opacity: 0,
            position: "absolute",
          },
          transition: { ease: "easeInOut", duration: 0.28 },
        };

        //console.log(params)
    return (
      <motion.div {...(animationProps as MotionProps)}>
        <PluginPage title={title} animateForward={animationDirection === 1}>
          <PageErrorBoundaryFallback>
            <Component params={params} />
          </PageErrorBoundaryFallback>
        </PluginPage>
      </motion.div>
    );
  }
}



export function Router() {
  const page = useRoutes();

  return (
    <AnimatePresence>
      {page ? (
        cloneElement(page, { key: location.pathname })
      ) : (
        <PluginPage title="404">
          <p className="text-tertiary min-h-[280px] h-full  flex items-center justify-center">
            Yikes! Looks like we lost that page.
          </p>
        </PluginPage>
      )}
    </AnimatePresence>
  );
}
function getDynamicRouteValue(routePattern: string, path: string) {
  if (!routePattern || !path) return null;

  // checke if is dynamic [ ]
  const isDynamic = routePattern.includes("[") && routePattern.includes("]");
  if (!isDynamic) return null;
  
  const routeSegments = routePattern.replace("[", "").replace("]", "")
  const pathSegments = path.includes(routeSegments) ? path.split(routeSegments)[1] : null;

  // identify valor between []
  const dynamicValue = routePattern.match(/\[([^\]]+)\]/);
  if (!dynamicValue) return null;

  const param = dynamicValue[1];


  return {
    [param]: pathSegments,
    path: pathSegments
  };
}
