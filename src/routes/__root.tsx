import Header from "@/components/layout/header";
import "@/lib/i18n";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as z from "zod";

export interface MyRouterContext {
  queryClient: QueryClient;
}

const searchSchema = z.object({
  q: z.string().optional(),
});

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <div>Not found</div>,
  validateSearch: searchSchema,
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
      <Header />
      <main className="min-h-screen bg-background px-4 py-6 pt-32 md:pt-24">
        <Outlet />
      </main>
      <ReactQueryDevtools position="left" buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
