import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
  head: () => {
    const url = import.meta.env.VITE_APP_URL || "http://localhost:5173";

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
      links: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "canonical", href: url },
      ],
    };
  },
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
