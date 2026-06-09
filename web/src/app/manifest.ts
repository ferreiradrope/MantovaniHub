import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MantovaniHub — Charcutaria Mantovani",
    short_name: "MantovaniHub",
    description:
      "Gestão integrada e cardápio digital da Charcutaria Mantovani: produção por lote, estoque, validade e pedidos.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#5e121a",
    theme_color: "#8a1c24",
    lang: "pt-BR",
    categories: ["food", "business", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
