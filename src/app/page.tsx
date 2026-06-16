import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/home/HomeSections";
import { getFeaturedTreatments, getJournalPosts, getShopVideos } from "@/lib/cms/queries";
import { getHeroContent } from "@/lib/cms/hero";
import { getHomeSections } from "@/lib/cms/home-sections";
import { getNarrativeChapters } from "@/lib/cms/site-content";
import { getSite } from "@/lib/cms/site";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return buildPageMetadata({
    title: "量膚定制 · 皮膚管理 · 痛症理療",
    description: site.description,
    path: "/",
  });
}

export default async function HomePage() {
  const [journalPosts, featuredTreatments, shopVideos, heroContent, homeSections, narrativeChapters] =
    await Promise.all([
      getJournalPosts(),
      getFeaturedTreatments(),
      getShopVideos(),
      getHeroContent(),
      getHomeSections(),
      getNarrativeChapters(),
    ]);

  return (
    <>
      <Hero content={heroContent} />
      <HomeSections
        sections={homeSections}
        journalPosts={journalPosts}
        featuredTreatments={featuredTreatments}
        shopVideos={shopVideos}
        narrativeChapters={narrativeChapters}
      />
    </>
  );
}
