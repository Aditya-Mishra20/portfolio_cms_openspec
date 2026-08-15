"use client";

import dynamic from "next/dynamic";
import { Suspense, useSyncExternalStore } from "react";

import config from "../../../sanity/sanity.config";

const emptySubscribe = () => () => {};

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

function StudioFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101112] text-white">
      Loading Studio…
    </div>
  );
}

export default function StudioClient() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) return <StudioFallback />;

  return (
    <Suspense fallback={<StudioFallback />}>
      <NextStudio config={config} />
    </Suspense>
  );
}
