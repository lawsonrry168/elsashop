import { site } from "@/data/site";

const socialLinks = [
  { href: site.instagram, label: "Instagram", short: "IG" },
  { href: site.threads, label: "Threads", short: "TH" },
  { href: site.xiaohongshu, label: "小紅書", short: "紅" },
  { href: site.facebook, label: "Facebook", short: "FB" },
] as const;

export function HeaderSocialLinks() {
  return (
    <div className="header-social" aria-label="社群連結">
      {socialLinks.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="header-social__link"
          aria-label={item.label}
          title={item.label}
        >
          <span aria-hidden="true">{item.short}</span>
        </a>
      ))}
    </div>
  );
}
