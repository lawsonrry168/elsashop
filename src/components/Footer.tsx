import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { navItems, site, telUrl } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-kz-lilac/60 bg-kz-lilac/30">
      <div className="container-kz section-kz !py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block no-underline">
              <BrandLogo className="brand-logo--footer" />
            </Link>
            <p className="mt-4 font-ui text-[10px] uppercase tracking-[0.18em] text-kz-plum-muted">
              {site.serviceKeywords}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-kz-plum-muted">
              {site.studioTag} · {site.subtitle}
            </p>
          </div>

          <div>
            <p className="font-ui text-xs uppercase tracking-widest text-kz-plum-muted">
              導覽
            </p>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-kz-plum no-underline hover:text-kz-rose"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-kz-plum no-underline hover:text-kz-rose"
                >
                  常見問題
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-ui text-xs uppercase tracking-widest text-kz-plum-muted">
              聯絡
            </p>
            <ul className="mt-4 space-y-2 text-sm text-kz-plum-muted">
              <li>{site.location}</li>
              <li>{site.address}</li>
              <li>
                <a href={telUrl()} className="text-kz-plum no-underline hover:text-kz-rose">
                  {site.phone}
                </a>
              </li>
              <li>{site.hours}</li>
            </ul>
          </div>

          <div>
            <p className="font-ui text-xs uppercase tracking-widest text-kz-plum-muted">
              追蹤我們
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-kz-plum no-underline hover:text-kz-rose"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-kz-plum no-underline hover:text-kz-rose"
                >
                  Threads
                </a>
              </li>
              <li>
                <a
                  href={site.xiaohongshu}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-kz-plum no-underline hover:text-kz-rose"
                >
                  小紅書
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-kz-lilac/60 pt-8 text-center text-xs text-kz-plum-muted">
          <p>
            © {new Date().getFullYear()} {site.name} {site.nameEn}. 屯門量膚定制皮膚管理.
          </p>
        </div>
      </div>
    </footer>
  );
}
