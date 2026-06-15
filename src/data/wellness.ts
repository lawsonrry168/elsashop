import { promo } from "./promo-images";

export type WellnessService = {
  id: string;
  title: string;
  body: string[];
  image: { src: string; alt: string };
};

export const wellnessServices: WellnessService[] = [
  {
    id: "dr-rainbow",
    title: "Dr. Rainbow 醫療級遠紅外線焗倉",
    body: [
      "釋放 4–14 微米遠紅外線，深入皮下約 5 cm，引發細胞共振與微血管擴張。",
      "30 分鐘躺平即可深層排汗，排走重金屬、化妝品殘留與體內老廢物。",
      "改善手腳冰冷、宮寒、濕重與疲勞 — 獲 KFDA、FDA、CE 等多國認證。",
    ],
    image: promo.drRainbow,
  },
  {
    id: "wellness-detox",
    title: "養生排毒 · 遠紅外線理療",
    body: [
      "香港人長吹冷氣、飲凍飲，濕氣與毒素容易積聚，令身體沉重、氣色暗沉。",
      "遠紅外線由內暖到外，並非一般表面發熱的汗蒸。",
      "做完後氣色紅潤，護膚品吸收亦會更好 — 與 Facial 相輔相成。",
    ],
    image: promo.wellnessDetox,
  },
  {
    id: "dr-face",
    title: "Dr. Face 遠紅外線童顏機",
    body: [
      "針對面部與頸部循環，配合遠紅外線能量，改善暗啞與浮腫感。",
      "適合想同時兼顧美容與身體調理的你。",
      "單次收費、絕不硬銷 — 可先 WhatsApp 查詢是否適合。",
    ],
    image: promo.drFace,
  },
];

export const traditionalTherapies = [
  "退背 — 疏通經絡、舒緩肩頸背腰疲勞",
  "拔罐 — 祛濕散寒、促進局部循環",
  "刮痧 — 排毒去火、改善氣滯血瘀",
] as const;
