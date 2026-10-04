"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "./LocaleProvider";
import { localizePath } from "./paths";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

// next/link for internal topic paths: "/data/isr" becomes "/en/data/isr".
export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  return <Link href={localizePath(useLocale(), href)} {...props} />;
}

// A plain <a> (full page load) needs the same prefix.
export function LocalizedAnchor({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  return <a href={localizePath(useLocale(), href)} {...props} />;
}
