"use client";

import { site } from "@/data/site";

const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

function getHongKongWeekday(): number {
  const hk = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }),
  );
  return hk.getDay();
}

export function BusinessHours() {
  const today = getHongKongWeekday();
  const scheduleByDay = Object.fromEntries(
    site.businessHours.schedule.map((item) => [item.day, item]),
  );

  return (
    <section className="info-card" aria-labelledby="business-hours-title">
      <header className="info-card__header">
        <h2 id="business-hours-title" className="info-card__title">
          營業時間
        </h2>
      </header>

      <ul className="business-hours__list">
        {WEEK_ORDER.map((day) => {
          const item = scheduleByDay[day];
          if (!item) return null;
          const isToday = day === today;

          return (
            <li
              key={day}
              className={`business-hours__row${isToday ? " business-hours__row--today" : ""}`}
            >
              <span className="business-hours__day">
                {item.label}
                {isToday && (
                  <span className="business-hours__today">（今天）</span>
                )}
              </span>
              <span className="business-hours__time">{item.hours}</span>
            </li>
          );
        })}
      </ul>

      <p className="info-card__note">{site.businessHours.note}</p>
    </section>
  );
}
