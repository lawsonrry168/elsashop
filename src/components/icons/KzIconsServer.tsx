import {
  ArrowRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";

const weight = "regular" as const;

export function IconArrowRight({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <ArrowRight size={size} weight={weight} className={className} aria-hidden />;
}

export function IconCaretLeft({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <CaretLeft size={size} weight={weight} className={className} aria-hidden />;
}

export function IconCaretRight({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <CaretRight size={size} weight={weight} className={className} aria-hidden />;
}
