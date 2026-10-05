"use client";

import { use } from "react";

type PromiseReaderProps = {
  promise: Promise<string>;
  label: string;
};

// use() reads a promise that a Server Component started and passed down;
// the surrounding Suspense boundary shows a fallback until it resolves.
export function PromiseReader({ promise, label }: PromiseReaderProps) {
  const value = use(promise);

  return <span>{label}: {value}</span>;
}
