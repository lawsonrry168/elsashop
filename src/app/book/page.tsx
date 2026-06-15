import type { Metadata } from "next";
import { BookFunnel } from "@/components/conversion/BookFunnel";
import { MoanaPageHero } from "@/components/MoanaPageHero";

export const metadata: Metadata = {
  title: "預約",
  description: "預約康姿健 — 三步引導，WhatsApp、Instagram 或致電。",
};

export default function BookPage() {
  return (
    <section className="moana-page">
      <div className="container-kz moana-page__narrow">
        <MoanaPageHero
          watermark="Book"
          eyebrow="Booking"
          title="預約方式"
          lead={
            <p>
              <strong className="text-kz-brand-pink">單次收費</strong>、
              <strong className="text-kz-sage">絕無硬銷</strong>
              — 三步選好意向，一鍵聯絡我們。
            </p>
          }
        />

        <BookFunnel />
      </div>
    </section>
  );
}
