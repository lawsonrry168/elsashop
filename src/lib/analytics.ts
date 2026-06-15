export type ConversionEvent =
  | "generate_lead"
  | "select_promotion"
  | "funnel_step"
  | "funnel_complete";

export type ConversionPayload = {
  cta_id: string;
  step_index?: number;
  step_name?: string;
  intent?: string;
  channel?: string;
  page?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackConversion(
  event: ConversionEvent,
  payload: ConversionPayload,
) {
  if (typeof window === "undefined") return;

  const detail = { event, ...payload, timestamp: Date.now() };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(detail);

  window.dispatchEvent(new CustomEvent("kz:conversion", { detail }));
}

export function trackCtaClick(ctaId: string, extra?: Partial<ConversionPayload>) {
  trackConversion("generate_lead", { cta_id: ctaId, ...extra });
}

export function trackFunnelStep(
  stepIndex: number,
  stepName: string,
  extra?: Partial<ConversionPayload>,
) {
  trackConversion("funnel_step", {
    cta_id: `funnel_step_${stepIndex}`,
    step_index: stepIndex,
    step_name: stepName,
    ...extra,
  });
}
