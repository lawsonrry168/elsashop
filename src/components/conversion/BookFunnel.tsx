"use client";

import { useMemo, useState } from "react";
import { BusinessHours } from "@/components/BusinessHours";
import { LocationMap } from "@/components/LocationMap";
import { InstagramCta, TelCta, WhatsAppCta } from "@/components/conversion/CtaLinks";
import { TappableOption } from "@/components/conversion/TappableOption";
import { trackFunnelStep } from "@/lib/analytics";
import { whatsappMessages } from "@/lib/whatsapp-messages";
import { site } from "@/data/site";

type Intent = "first" | "treatment" | "men" | "other";
type Channel = "whatsapp" | "instagram" | "phone";

const intents: { id: Intent; label: string; desc: string }[] = [
  { id: "first", label: "首次量膚", desc: "想了解膚況與建議療程" },
  { id: "treatment", label: "預約療程", desc: "已心儀療程，想直接預約" },
  { id: "men", label: "男賓護理", desc: "男士專屬療程諮詢" },
  { id: "other", label: "其他查詢", desc: "價格、時間或其他問題" },
];

const channels: { id: Channel; label: string; desc: string; primary?: boolean }[] = [
  { id: "whatsapp", label: "WhatsApp", desc: "推薦 · 回覆最快", primary: true },
  { id: "instagram", label: "Instagram DM", desc: "習慣用 IG 私訊" },
  { id: "phone", label: "致電預約", desc: site.phone },
];

function messageForIntent(intent: Intent) {
  switch (intent) {
    case "first":
      return whatsappMessages.firstVisit;
    case "treatment":
      return whatsappMessages.treatmentBooking;
    case "men":
      return whatsappMessages.menBooking;
    default:
      return whatsappMessages.other;
  }
}

export function BookFunnel() {
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);

  const waMessage = useMemo(
    () => (intent ? messageForIntent(intent) : whatsappMessages.default),
    [intent],
  );

  const goStep = (next: number, name: string) => {
    setStep(next);
    trackFunnelStep(next, name);
  };

  const selectIntent = (id: Intent) => {
    setIntent(id);
    goStep(1, "select_intent");
  };

  const selectChannel = (id: Channel) => {
    setChannel(id);
    goStep(2, "select_channel");
  };

  const reset = () => {
    setStep(0);
    setIntent(null);
    setChannel(null);
  };

  return (
    <div className="conversion-funnel">
      <div className="conversion-funnel__progress" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`conversion-funnel__dot ${step >= i ? "conversion-funnel__dot--active" : ""}`}
          />
        ))}
      </div>
      <p className="conversion-funnel__step-label">
        步驟 {step + 1} / 3
      </p>

      {step === 0 && (
        <fieldset className="conversion-funnel__fieldset">
          <legend className="conversion-funnel__legend">你想預約什麼？</legend>
          <div className="conversion-funnel__options" role="radiogroup" aria-label="預約意向">
            {intents.map((item) => (
              <TappableOption
                key={item.id}
                ctaId={`funnel_intent_${item.id}`}
                label={item.label}
                description={item.desc}
                selected={intent === item.id}
                onSelect={() => selectIntent(item.id)}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && intent && (
        <fieldset className="conversion-funnel__fieldset">
          <legend className="conversion-funnel__legend">偏好聯絡方式</legend>
          <div className="conversion-funnel__options" role="radiogroup" aria-label="聯絡方式">
            {channels.map((item) => (
              <TappableOption
                key={item.id}
                ctaId={`funnel_channel_${item.id}`}
                label={item.label}
                description={item.desc}
                selected={channel === item.id}
                onSelect={() => selectChannel(item.id)}
              />
            ))}
          </div>
          <button
            type="button"
            className="conversion-funnel__back"
            data-cta-id="funnel_back_step1"
            onClick={() => goStep(0, "back_to_intent")}
          >
            ← 上一步
          </button>
        </fieldset>
      )}

      {step === 2 && intent && channel && (
        <div className="conversion-funnel__confirm">
          <p className="conversion-funnel__summary">
            已選：<strong>{intents.find((i) => i.id === intent)?.label}</strong>
            {" · "}
            <strong>{channels.find((c) => c.id === channel)?.label}</strong>
          </p>
          <p className="conversion-funnel__hint">
            單次收費、絕無硬銷 — 點擊下方按鈕開始聯絡。
          </p>

          <div className="conversion-funnel__actions">
            {channel === "whatsapp" && (
              <WhatsAppCta
                ctaId="funnel_complete_whatsapp"
                message={waMessage}
                className="moana-pill-btn moana-pill-btn--dark conversion-funnel__primary"
                funnelStep={{ index: 3, name: "funnel_complete" }}
              >
                WhatsApp 開始對話
                <span aria-hidden>→</span>
              </WhatsAppCta>
            )}
            {channel === "instagram" && (
              <InstagramCta
                ctaId="funnel_complete_instagram"
                className="moana-pill-btn moana-pill-btn--dark conversion-funnel__primary"
              >
                前往 Instagram
                <span aria-hidden>→</span>
              </InstagramCta>
            )}
            {channel === "phone" && (
              <TelCta
                ctaId="funnel_complete_phone"
                className="moana-pill-btn moana-pill-btn--dark conversion-funnel__primary"
              >
                致電 {site.phone}
              </TelCta>
            )}
          </div>

          <button
            type="button"
            className="conversion-funnel__back"
            data-cta-id="funnel_back_step2"
            onClick={() => goStep(1, "back_to_channel")}
          >
            ← 上一步
          </button>
        </div>
      )}

      <article className="moana-panel moana-panel--tip conversion-funnel__tips">
        <p className="moana-panel__title">預約小提示</p>
        <ul className="moana-panel__list">
          <li>首次建議預約「量膚分析」</li>
          <li>男賓請註明「男賓療程」</li>
          <li>部分療程需諮詢後報價</li>
        </ul>
      </article>

      <div className="moana-about__extras">
        <BusinessHours />
        <LocationMap />
      </div>

      {step > 0 && (
        <button
          type="button"
          className="conversion-funnel__reset"
          data-cta-id="funnel_reset"
          onClick={reset}
        >
          重新選擇
        </button>
      )}
    </div>
  );
}
