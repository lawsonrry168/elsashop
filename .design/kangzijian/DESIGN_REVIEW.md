# Design Review: 康姿健 Kang Zi Jian 官方網站

Reviewed against: `.design/kangzijian/DESIGN_BRIEF.md`
Philosophy: Korean Soft Luxury（韓系少女感 × 私人皮膚管理工作室）
Date: 2026-06-16
Method: 全站 10 頁掃描（首頁、療程總覽、療程詳情、量膚、男賓、知識、文章詳情、關於、預約、FAQ），桌機 1280 / 手機 375，含自動化水平溢出、觸控目標、WCAG 對比稽核。

## Summary

整體 SSR 結構健康（每頁 200、單一 h1、有 `<main>`），韓系奶白 + 粉紫 + Noto Serif 標題方向落實到位。本文件兼作**審查＋變更紀錄**：經數輪逐頁修整，已修復 8 項（2 個手機結構性 bug、功能性連結對比、footer 觸控、首頁 title、圖片完整顯示與比例一致、入場縮放重置、全站 focus ring 對比、stacked 卡片陰影 token 化），全部於預覽量測驗證。

**尚餘開放（依品牌取捨，未動）**：eyebrow 小標（cr 2.89）、Trust Sage 小字（cr 2.4）、卡片裝飾大數字（cr ~1.5）— 屬刻意柔和低對比，是否加深由你決定。

## 已修復（已驗證）

1. **首頁 Hero 三顆賣點徽章在手機重疊** — `editorial-hero__sell--device` 在手機 flex 排列下仍套用桌機含 `translateX(-50%)` 的 `kz-hero-sell-float-neutral` 動畫，把「醫美級儀器」往左拖、壓住「絕無硬銷」。
   _Fix:_ 在 `@media (max-width: 1023px)` 內將 device/neutral/custom 徽章動畫改為不含 `-50%` 的 `kz-hero-sell-float-device-mirror`（`src/app/globals.css`）。量測：三顆膠囊 23–115 / 120–212 / 224–329，無重疊。

2. **首頁手機水平捲動 169px（畫面可左右拖動）** — `.moana-news-card--stacked .moana-news-card__link` 設 `content-visibility:auto` + `contain-intrinsic-size: auto 520px`；尚未進視窗時卡片 min-content 寬度=520px，而 `.moana-news-grid` 軌道為 `1fr`（最小值=auto/min-content），把單欄撐到 520px。
   _Fix:_ `.moana-news-grid` 三個斷點軌道改用 `minmax(0, 1fr)`，軌道最小值歸零（`src/app/globals.css`）。量測：首頁手機溢出 169px → 0；/treatments、/journal 同步受惠。

## 本次後續套用（已驗證）

3. **功能性連結對比** — 新增 token `--kz-color-rose-strong: #a14c66`（+ Tailwind `text-kz-rose-strong`），套用到「← 返回療程」「← 返回醫美知識」「查看大地圖」。實測 **2.01 → 5.28:1**（過 AA），仍屬粉色家族、不破壞韓系調。裝飾性 Soft Rose 全部保留。
4. **Footer 連結觸控區** — `src/components/Footer.tsx` 連結加 `inline-block py-1`，高度 **20px → 28px**（過 WCAG 2.5.8 的 24px）。
5. **首頁 `<title>`** — 改為「量膚定制 · 皮膚管理 · 痛症理療」，主敘事前置；痛症理療為實際服務故保留（`src/app/page.tsx`）。
6. **首頁圖片 alt（釐清，無需更動）** — 35 張 `alt=""` 全為 `ShopVideoReels` 影片縮圖，所在 `<button>` 已有 `aria-label="播放：{標題}"` 且卡片有可見標題；空 alt 為**正確的裝飾性用法**，補 alt 反而造成報讀器重複。

## 圖片一致性與完整顯示（已套用，已驗證）

促銷海報/插圖被裁切：來源海報皆為 **~4:5（320×400）**，但顯示框是 **3:4** 且 `object-fit: cover`，加上 `.promo-poster__img` / 卡片圖永久套用 `transform: scale(1.08)`（`--loaded` 只改 opacity 沒重置），導致海報邊緣文字被切（如「一轉季塊面…」左字、BIOSKIN 海報左右）。

- **Promo poster**（`.promo-poster__frame`）：aspect `3/4 → 4/5`；`--loaded` 補 `transform: scale(1)` 讓入場縮放結束後完整呈現。最大殘留裁切 0.7%（比例微差，無感）。
- **療程／文章卡片**（`.moana-news-card__media` 與 `--stacked`）：aspect `3/4 → 4/5`、靜止 `scale(1.08) → scale(1)`（hover 微縮放保留）。裁切 6.6% → 0.7%。
- **全站稽核結果**：promo / card 全部框 0.8、裁切 ≤0.7%；shop video 縮圖本為 `9/16` 對齊直式影片封面（正常）；narrative 為真實照片，cover 裁切屬刻意，保留。手機水平溢出無回歸（home / treatments / journal 皆 0）。
- **敘事照片入場縮放**（`.narrative-figure__img`）：同款 `scale(1.08)` 永久放大未重置 — `--loaded` 補 `transform: scale(1)`，與 promo/卡片行為統一（`/about` 驗證 `scaleX=1`）。

## 鍵盤可見性與內部整理（已套用，已驗證）

7. **Focus ring 對比不足（全站）** — 全域 `:focus-visible { outline: 2px solid var(--color-border-focus) }` 原指向 soft-rose `#d4a5b5`，在奶白上僅 ~2:1，鍵盤聚焦環太淡（不符 WCAG 3:1 非文字對比）。
   _Fix:_ `--color-border-focus` 改用 `--kz-color-rose-strong (#a14c66)`。實測對比 — 奶白 **5.28**、白 **5.61**、淡紫 **4.54**（皆 ≥3:1）。一處 token 改動即提升全站所有可聚焦元素（卡片/連結/按鈕）的鍵盤聚焦可見性；無 `outline:none` 抑制。
8. **Stacked 卡片陰影 token 化（視覺不變）** — 原硬寫 `0 12px 40px deep-plum/8%` 與 hover `0 18px 48px brand-pink/12%`。以**完全相同值**建立 `--shadow-card` / 重用未被引用的 `--shadow-card-hover`（`tokens.css`），`globals.css` 改引用。computed box-shadow 逐位相同（`rgba(74,63,85,0.08) 0 12px 40px`），零視覺變化。

> **圓角／陰影一致性結論**：圖框圓角全站已統一 `var(--radius-xl)`（1.5rem），無需更動；圖框本身無陰影、陰影僅在卡片本體且依類型合理；敘事照片比例（portrait/landscape/auto）為內容驅動，刻意保留彈性，不硬統一。

## Must Fix

（無新增；上述兩項即原本的 must-fix，已處理。）

## Should Fix — 對比/可及性（需品牌取捨）

> Brief 要求「正文 contrast ≥ 4.5:1（Deep Plum on Skin Base）」。實測 **Deep Plum (#4A3F55) 正文在奶白上 ~9:1，合格**。以下為設計性低對比，皆為刻意的柔和調，但部分用在「功能性元素」上：

1. ~~**功能性連結用 Soft Rose (#D4A5B5) → cr 2.01。**~~ **✅ 已修**（見上「鍵盤可見性與內部整理」前的套用 #3）：改用 `text-kz-rose-strong` → 5.28:1。

2. **Eyebrow 小標 `text-kz-plum-muted`（#9A8FA3, 154,143,163）→ cr 2.89。**〔仍開放，依你決定〕站內 "BOOKING / FEATURED / PROCESS" 等 10–12px 大寫小標。
   _建議:_ 將 plum-muted 加深一階（仍是柔和灰紫）即可達標，影響面廣但安全。

3. **Trust Sage 文字 (#8FA89A) 在奶白上 → cr 2.4。**〔仍開放，依你決定〕用於小段說明/標籤文字（關於頁「唔綁套票」等）。
   _建議:_ 作為大面積文字時加深；純色塊上的白字不受影響。

## Could Improve

1. **卡片裝飾大數字（Blush Pink #E8C4D4，cr 1.49–1.58）**〔仍開放〕 — `moana-news-card__index`「01/02/55」。屬裝飾，但可略加深或降透明以增層次。
2. ~~**Footer 導覽連結觸控高度 ~20px。**~~ **✅ 已修**（套用 #4）：加 `inline-block py-1` → 28px。
3. ~~**首頁 `<title>` 與品牌主敘事不一致。**~~ **✅ 已調整**（套用 #5）：改為「量膚定制 · 皮膚管理 · 痛症理療」，痛症理療為實際服務保留。
4. ~~**首頁 35 張 `alt=""`。**~~ **✅ 已釐清**（套用 #6）：為影片縮圖的正確裝飾性用法，無需更動。

## What Works Well

- 韓系 soft luxury 落地完整：奶白留白、粉/紫/sage 點綴、Noto Serif TC 大標題、Cormorant 英文標語層級清楚。
- Hero「量膚 / 定制 / 更安心」階層 + 賣點膠囊 + WhatsApp 主 CTA / IG 次 CTA，符合 brief 的「安心優於炫技、預約主渠道」。
- 手機底部固定預約條（WhatsApp / IG / 致電）符合 brief 響應式要求。
- Footer 三欄資訊（導覽/聯絡/追蹤）結構清楚；療程卡 hover 微浮柔影到位。
- 全站 9/10 頁手機零水平溢出、語意結構（單一 h1、main、landmark）良好。

## Screenshots Captured

於預覽中即時擷取（未存檔；本機 Claude Preview 回傳 inline JPEG）：首頁桌機/手機 Hero、首頁精選療程、療程總覽頁尾 + 預約 CTA + Footer。手機 Hero 已確認三徽章修正後並排無重疊。
