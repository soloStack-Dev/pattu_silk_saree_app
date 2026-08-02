"use client";

import dynamic from "next/dynamic";

const HomeStage = dynamic(() => import("@/components/home/home-stage"), {
  ssr: false,
  loading: () => null,
});

export function HomeLoader() {
  return <HomeStage />;
}
