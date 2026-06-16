import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/JsonLd";
import { getSite } from "@/lib/cms/site";

export async function LocalBusinessJsonLd() {
  const site = await getSite();
  const siteUrl = getSiteUrl();

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        name: site.name,
        alternateName: site.nameEn,
        description: site.description,
        url: siteUrl,
        telephone: `+${site.phoneTel}`,
        image: `${siteUrl}/brand/icon-512.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressLocality: "屯門",
          addressRegion: "新界",
          addressCountry: "HK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 22.3919,
          longitude: 113.9715,
        },
        openingHoursSpecification: site.businessHours.schedule.map((row) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][row.day],
          opens: "09:00",
          closes: "21:00",
        })),
        sameAs: [
          site.instagram,
          site.threads,
          site.facebook,
          site.xiaohongshu,
        ],
        priceRange: "$$",
      }}
    />
  );
}
