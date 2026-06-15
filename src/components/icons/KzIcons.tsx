"use client";

import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  List,
  X,
} from "@phosphor-icons/react";

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

export function IconMenu({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <List size={size} weight={weight} className={className} aria-hidden />;
}

export function IconClose({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <X size={size} weight={weight} className={className} aria-hidden />;
}
