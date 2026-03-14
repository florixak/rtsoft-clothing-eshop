import "@/lib/i18n";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <div>Not found</div>,
  head: () => {
    return {
      meta: [
        { title: "RTSoft Clothing Eshop" },
        {
          name: "description",
          content: "Modern clothing e-shop with curated collections.",
        },
        { name: "robots", content: "index,follow" },
        { name: "theme-color", content: "#ffffff" },

        { property: "og:type", content: "website" },
        { property: "og:title", content: "RTSoft Clothing Eshop" },
        {
          property: "og:description",
          content: "Modern clothing e-shop with curated collections.",
        },
        { property: "og:image", content: "/og-image.jpg" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "RTSoft Clothing Eshop" },
        {
          name: "twitter:description",
          content: "Modern clothing e-shop with curated collections.",
        },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],
      links: [{ rel: "icon", href: "/favicon.ico" }],
    };
  },
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <ReactQueryDevtools position="left" buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
