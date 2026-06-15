# Design Brief: 康姿健 Kang Zi Jian 官方網站

## Problem

屯門客人想找一間可信、不會被硬銷的美容工作室，但多數美容院網站要麼像連鎖促銷頁、要麼像冷峻醫院，難以在瀏覽幾秒內判斷「這裡適不適合我、價格透不透明、療程專不專業」。康姿健的優勢——量膚定制、單次收費、韓系少女感、醫美級儀器——在社群有曝光，卻缺少一個能承接 IG/小紅書流量、完整說明療程與建立信任的官網。

## Solution

建立一個**更韓系**的官網：奶白留白、柔和粉紫、精緻字體層級，以「療程服務 + 醫美知識」雙主軸引導客人。首屏傳達安心感（單次收費、無硬銷、量膚定制），透過療程卡片與知識文章幫助比較與決策，最終以 **WhatsApp** 或 **IG DM** 完成預約。男賓服務設獨立入口，不與女賓主視覺混雜。

## Confirmed Decisions

| 決策項 | 選擇 |
|--------|------|
| 品牌英文名 | 維持拼音 **Kang Zi Jian**（康姿健） |
| 價格策略 | **部分明碼、部分諮詢後報價**（高客製／複合療程） |
| 店主曝光 | **首頁不大幅露出個人照**；信任以資歷徽章、評價、專業內容呈現 |
| 預約主渠道 | **WhatsApp**、**Instagram DM** |
| 男賓服務 | **官網獨立入口**（`/men` 或導覽「男賓護理」） |
| 視覺方向 | **更韓系** — Maylin / EcoJardin 式留白、少女感粉紫、輕奢細線 icon |

## Experience Principles

1. **安心優於炫技** — 先傳達單次收費、無硬銷，再展示儀器；避免促銷倒數與壓力式 CTA。
2. **定制優於套餐** — 視覺與文案強調量膚分析後建議；未分析前以「諮詢報價」標示彈性價格。
3. **韓系質感優於醫院感** — 醫美科技以溫柔專業呈現：柔光、留白、精緻排版，非白袍冷光海報。

## Aesthetic Direction

- **Philosophy**: Korean Soft Luxury — 韓系少女感 × 私人皮膚管理工作室
- **Tone**: 溫柔、可信、精緻、不推銷
- **Reference points**: Maylin Clinic（留白奢感）、EcoJardin（模組清晰）、GOKU JAPAN（明碼透明）、現有 tuenmunbeauty 雙主軸
- **Anti-references**: ID Hospital 冷峻醫療感、TBC 連鎖促銷海報、SoonSiki 電商雜訊、俗氣粉紫漸層假模特

### Color Palette (Korean Soft)

| Token | Value | Role |
|-------|-------|------|
| Skin Base | `#FBF7F8` | 主背景 |
| Mist Lilac | `#EDE4F3` | 區塊底 |
| Blush Pink | `#E8C4D4` | 少女感點綴 |
| Soft Rose | `#D4A5B5` | 強調、標籤 |
| Deep Plum | `#4A3F55` | 標題正文 |
| Trust Sage | `#8FA89A` | 認證、專業 |
| Accent Gold | `#C9A96E` | 獎項 highlight |

### Typography

- 中文標題：Noto Serif TC（輕奢）
- 中文內文：Noto Sans TC
- 英文：Cormorant Garamond（標語）+ DM Sans（UI）

## Information Architecture

```
/                     首頁
/treatments           療程總覽（問題 + 類型篩選）
/treatments/[slug]    療程詳情
/skin-analysis        量膚定制
/men                  男賓護理（獨立入口）
/journal              醫美知識
/about                關於康姿健
/book                 預約（WhatsApp / IG DM）
/faq                  常見問題
```

## Component Inventory

| Component | Status | Notes |
|-----------|--------|-------|
| Header / Nav | New | 含男賓入口、預約 CTA |
| Hero | New | 無大幅店主照 |
| TrustBar | New | IBDR、ITEC、單次收費 |
| USP Grid | New | 4 格價值主張 |
| TreatmentCard | New | 明碼或「諮詢報價」 |
| ProcessSteps | New | 量膚 4 步 |
| JournalCard | New | 知識文章預覽 |
| Testimonial | New | 客人評價 |
| BookingCTA | New | WhatsApp + IG DM |
| Footer | New | 社群、地址 |

## Key Interactions

- 療程卡 hover：微上浮 + 柔影
- 「了解療程」→ 詳情頁；價格為「諮詢報價」者 → 引導 `/book`
- 預約按鈕：WhatsApp deep link（主）、IG DM（次）
- 男賓：導覽獨立項，進入 `/men` 專區

## Responsive Behavior

- Mobile：單欄卡片、底部固定預約條（WhatsApp）
- Tablet：療程 2 欄
- Desktop：Hero 左右分欄、療程 3 欄、最大寬度 ~1200px

## Accessibility Requirements

- 正文 contrast ≥ 4.5:1（Deep Plum on Skin Base）
- 所有 CTA 可鍵盤聚焦、可見 focus ring
- 圖片 alt 描述療程而非裝飾
- 價格與「諮詢報價」需語意清楚（非僅顏色區分）

## Out of Scope (Phase 1)

- 線上付款、會員系統
- IG API 即時嵌入（改用手動精選或靜態連結）
- 多語言（僅繁中 + 英文標語）
- 後台 CMS（內容以程式內 data 檔維護）

## Content Notes

### 價格顯示規則

- **明碼**：微針射頻 $880、等離子抗痘 $680 等已有定價
- **諮詢報價**：TEGODER 量膚果酸、PLASER、COLLAZEN、HIFU、外泌體等需量膚／組合後報價

### 男賓入口

- 導覽標示「男賓護理」
- `/men` 獨立 Hero + 男賓相關療程（針清、激光等，對齊 IG 內容）
