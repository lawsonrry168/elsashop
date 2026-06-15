import { verticalTaglines } from "@/data/images";

type Props = {
  items?: readonly string[];
  className?: string;
};

export function VerticalTagline({
  items = verticalTaglines,
  className = "",
}: Props) {
  return (
    <div className={`vertical-tagline ${className}`} aria-hidden="true">
      {items.map((text, i) => (
        <span key={text} className="vertical-tagline__item">
          {i > 0 && <span className="vertical-tagline__dot">·</span>}
          {text}
        </span>
      ))}
    </div>
  );
}
