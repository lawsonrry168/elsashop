"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { IconClose, IconMenu } from "@/components/icons/KzIcons";
import { navItems } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const nav = mobileNavRef.current;
    const focusable = nav?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  return (
    <header className="header-editorial sticky top-0 z-50">
      <div className="container-kz flex h-[var(--header-height)] items-center justify-between">
        <Link href="/" className="brand-logo-link group no-underline">
          <BrandLogo priority />
          <span className="sr-only">康姿健 Kang Zi Jian</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="主導覽">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cta-id={`cta_nav_${item.href.replace(/\//g, "") || "home"}`}
              className={`font-ui text-[11px] uppercase tracking-[0.12em] no-underline transition-colors ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-kz-plum border-b border-kz-brand-navy pb-0.5"
                  : "text-kz-plum-muted hover:text-kz-brand-navy"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="btn-primary conversion-touch-target"
            data-cta-id="cta_header_book_desktop"
          >
            預約
          </Link>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/book"
            className="conversion-touch-target font-ui text-[11px] uppercase tracking-widest text-kz-brand-navy no-underline px-2 py-2"
            data-cta-id="cta_header_book_mobile"
          >
            預約
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="conversion-touch-target flex h-11 w-11 items-center justify-center border border-kz-brand-navy/20 text-kz-brand-navy"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "關閉選單" : "開啟選單"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          ref={mobileNavRef}
          id="mobile-nav"
          className="border-t border-kz-plum/10 px-5 py-4 lg:hidden"
          aria-label="手機導覽"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-kz-plum/10">
                <Link
                  href={item.href}
                  className="conversion-touch-target block py-4 font-ui text-xs uppercase tracking-widest text-kz-plum no-underline"
                  data-cta-id={`cta_mobile_nav_${item.href.replace(/\//g, "")}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
