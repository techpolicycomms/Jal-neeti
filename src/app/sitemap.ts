import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jalneeti.in";

  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/csr", priority: 0.9 },
    { path: "/product", priority: 0.8 },
    { path: "/for-industry", priority: 0.8 },
    { path: "/impact-calculator", priority: 0.8 },
    { path: "/government", priority: 0.8 },
    { path: "/invest", priority: 0.8 },
    { path: "/transparency", priority: 0.8 },
    { path: "/sustainability", priority: 0.8 },
    { path: "/challenge", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/careers", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
