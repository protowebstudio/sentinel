import HeroAlpha from "@components/library/marketing/hero/alpha/HeroAlpha.astro";
import OverviewAlpha from "@components/library/marketing/steps/alpha/OverviewAlpha.astro";
import ArchitectureAlpha from "@components/library/marketing/stats/alpha/ArchitectureAlpha.astro";
import FeaturesAlpha from "@components/library/marketing/faq/alpha/FeaturesAlpha.astro";
import MethodAlpha from "@components/library/marketing/steps/alpha/MethodAlpha.astro";
import GalleryAlpha from "@components/shared/patterns/gallery/GalleryAlpha.astro";
import LinksAlpha from "@components/library/marketing/cta/alpha/LinksAlpha.astro";

export type LibraryEntry = {
  slug: string;         // "marketing/hero/alpha"
  domain: "marketing" | "dashboard" | "blog" | "shared";
  category: string;     // "hero", "pricing", "testimonial", ...
  variant: string;      // "alpha", "bravo", ...
  title: string;        // human label
  Component: any;       // Astro component
};

export const LIBRARY: LibraryEntry[] = [
  {
    slug: "marketing/hero/alpha",
    domain: "marketing",
    category: "hero",
    variant: "alpha",
    title: "Hero — Alpha",
    Component: HeroAlpha,
  },
  {
    slug: "marketing/overview/alpha",
    domain: "marketing",
    category: "overview",
    variant: "alpha",
    title: "Overview — Alpha",
    Component: OverviewAlpha,
  },
  {
    slug: "marketing/architecture/alpha",
    domain: "marketing",
    category: "architecture",
    variant: "alpha",
    title: "Architecture — Alpha",
    Component: ArchitectureAlpha,
  },
  {
    slug: "marketing/features/alpha",
    domain: "marketing",
    category: "features",
    variant: "alpha",
    title: "Features — Alpha",
    Component: FeaturesAlpha,
  },
  {
    slug: "marketing/method/alpha",
    domain: "marketing",
    category: "method",
    variant: "alpha",
    title: "Method — Alpha",
    Component: MethodAlpha,
  },
  {
    slug: "marketing/gallery/alpha",
    domain: "marketing",
    category: "gallery",
    variant: "alpha",
    title: "Gallery — Alpha",
    Component: GalleryAlpha,
  },
  {
    slug: "marketing/links/alpha",
    domain: "marketing",
    category: "links",
    variant: "alpha",
    title: "Links — Alpha",
    Component: LinksAlpha,
  },
];

export function getEntry(slug: string) {
  return LIBRARY.find((x) => x.slug === slug);
}

export function groupByDomainAndCategory() {
  const out: Record<string, Record<string, LibraryEntry[]>> = {};
  for (const item of LIBRARY) {
    out[item.domain] ??= {};
    out[item.domain][item.category] ??= [];
    out[item.domain][item.category].push(item);
  }
  return out;
}
