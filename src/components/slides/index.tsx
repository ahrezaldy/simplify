"use client";

import type { ComponentType } from "react";
import { BadReasons, DinoDivider, DinoSteps, DinoStructure, WarningSigns } from "./Dino";
import { Playground, Recap, Thanks } from "./Finale";
import { AssemblyLine, FordDivider, FordQuote, ModelT } from "./Ford";
import { FlatPack, IkeaExperience, Kamprad, KampradDivider, SupplyLine } from "./Ikea";
import { PriceDivider, PriceLevers, PropDivider, PropositionLevers } from "./HowTo";
import { McDivider, McMenu, OtherSimplifiers, OthersDivider, Speedee } from "./McDonalds";
import { Agenda, Book, CorePrinciples, HowToSimplify, Title } from "./Opening";
import { Benefits, TradeDivider, Virtuous } from "./TradeOffs";

export type SlideDef = {
  id: string;
  title: string;
  section?: string;
  kind: "divider" | "content";
  Component: ComponentType;
};

export const slides: SlideDef[] = [
  { id: "title", title: "Simplify", kind: "divider", Component: Title },
  { id: "agenda", title: "What we'll cover", kind: "content", Component: Agenda },
  { id: "book", title: "The book", section: "The core idea", kind: "content", Component: Book },
  { id: "how", title: "How to simplify", section: "The core idea", kind: "content", Component: HowToSimplify },
  { id: "core", title: "Core principles", section: "The core idea", kind: "content", Component: CorePrinciples },
  { id: "div-ford", title: "Henry Ford", section: "Great simplifiers", kind: "divider", Component: FordDivider },
  { id: "ford-quote", title: "Ford's promise", section: "Great simplifiers", kind: "content", Component: FordQuote },
  { id: "model-t", title: "Ford Model T", section: "Great simplifiers", kind: "content", Component: ModelT },
  { id: "assembly", title: "The moving assembly line", section: "Great simplifiers", kind: "content", Component: AssemblyLine },
  { id: "div-ikea", title: "Ingvar Kamprad", section: "Great simplifiers", kind: "divider", Component: KampradDivider },
  { id: "kamprad", title: "Ingvar Kamprad", section: "Great simplifiers", kind: "content", Component: Kamprad },
  { id: "flatpack", title: "Flat-packed furniture", section: "Great simplifiers", kind: "content", Component: FlatPack },
  { id: "supply", title: "Shorter line, flat packs", section: "Great simplifiers", kind: "content", Component: SupplyLine },
  { id: "ikea", title: "IKEA", section: "Great simplifiers", kind: "content", Component: IkeaExperience },
  { id: "div-mc", title: "Mac and Dick", section: "Great simplifiers", kind: "divider", Component: McDivider },
  { id: "mcmenu", title: "McDonald's", section: "Great simplifiers", kind: "content", Component: McMenu },
  { id: "speedee", title: "Speedee Service System", section: "Great simplifiers", kind: "content", Component: Speedee },
  { id: "div-others", title: "… others", section: "Great simplifiers", kind: "divider", Component: OthersDivider },
  { id: "others", title: "Other simplifiers", section: "Great simplifiers", kind: "content", Component: OtherSimplifiers },
  { id: "div-tradeoffs", title: "Trade-Offs", section: "Trade-offs", kind: "divider", Component: TradeDivider },
  { id: "benefits", title: "Who benefits?", section: "Trade-offs", kind: "content", Component: Benefits },
  { id: "virtuous", title: "Virtuous trade-off", section: "Trade-offs", kind: "content", Component: Virtuous },
  { id: "div-proposition", title: "How To: Proposition Simplify", section: "How to", kind: "divider", Component: PropDivider },
  { id: "proposition", title: "Proposition simplify", section: "How to", kind: "content", Component: PropositionLevers },
  { id: "div-price", title: "How To: Price Simplify", section: "How to", kind: "divider", Component: PriceDivider },
  { id: "price", title: "Price simplify", section: "How to", kind: "content", Component: PriceLevers },
  { id: "div-dino", title: "Save the Dino", section: "Save the dino", kind: "divider", Component: DinoDivider },
  { id: "warning", title: "Warning signs", section: "Save the dino", kind: "content", Component: WarningSigns },
  { id: "traps", title: "Bad reasons not to simplify", section: "Save the dino", kind: "content", Component: BadReasons },
  { id: "dino-steps", title: "How a dino simplifies", section: "Save the dino", kind: "content", Component: DinoSteps },
  { id: "dino-structure", title: "Adopt the right structure", section: "Save the dino", kind: "content", Component: DinoStructure },
  { id: "recap", title: "Recap", section: "Wrap-up", kind: "content", Component: Recap },
  { id: "playground", title: "Simplifier playground", section: "Wrap-up", kind: "content", Component: Playground },
  { id: "thanks", title: "Thanks!", kind: "divider", Component: Thanks },
];
