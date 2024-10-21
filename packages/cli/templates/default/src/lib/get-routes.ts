import { createElement } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { framer } from "framer-plugin";

const processPathname = (path: string): string => {

  let pathname = path
    .replace("../app/", "/")
    .replace(/\/(page|index)\.tsx$/, "")
    .replace(".tsx", "");

  const dynamicSegmentPattern = /\[\[?\.\.\.([^\]]+)\]\]?|\[([^\]]+)\]/g;

  pathname = pathname.replace(dynamicSegmentPattern, (_, restParam, param) => {
    return restParam ? `:${restParam}/*` : `:${param}`;
  });

  return pathname || "/";
};

const createRouteObject = (pathname: string, PageImport: any): RouteObject => ({
  path: pathname,
  element: createElement(PageImport.default),
  loader: async () => {
    const project = await framer.getProjectInfo()
    const user = await framer.getCurrentUser()
    return { project, user };
  },
});


export const getRoutes = (): RouteObject[] => {
  const pages = import.meta.glob("../app/**/*.tsx", { eager: true });
  const erroPage = import.meta.glob("../app/global-error.tsx", { eager: true });
  const notFoundPage = import.meta.glob("../app/not-found.tsx", { eager: true });
  const layout = import.meta.glob("../app/layout.tsx", { eager: true });

  const pluginRoutes: RouteObject[] = [];

  for (const [path, PageImport] of Object.entries(pages)) {
    if (!path.endsWith('/page.tsx') || path.includes('/_')) continue;
    const pathname = processPathname(path);
    pluginRoutes.push(createRouteObject(pathname, PageImport));
  }

  const router = [
    {
      path: "/",
      // @ts-ignore
      element: createElement(Object.values(layout)[0].default, { children: createElement(Outlet) }),
      // @ts-ignore
      errorElement: createElement(Object.values(erroPage)[0].default),
      children: pluginRoutes,
    }, {
      path: "*",
      // @ts-ignore
      element: createElement(Object.values(notFoundPage)[0].default),
    }
  ]
  return router;
};
