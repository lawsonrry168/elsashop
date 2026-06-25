import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "療程總覽",
  description:
    "康姿健療程總覽 — 激光祛斑、膠原提升、微針射頻、果酸煥膚、等離子淨痘。先量膚、再建議；單次收費。",
  path: "/treatments",
});

export default function TreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
