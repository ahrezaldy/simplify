"use client";

import dynamic from "next/dynamic";

const Deck = dynamic(() => import("./Deck").then((m) => m.Deck), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-bg" />,
});

export function DeckLoader() {
  return <Deck />;
}
