export type ComponentEntry = {
  domain: string;
  category: string;
  variant: string;
  name: string;     // component file name (unique within variant)
  title: string;
  moduleKey: string; // must match import.meta.glob() key
};

export const registry: ComponentEntry[] = [
  {
    domain: "marketing",
    category: "cta",
    variant: "alpha",
    name: "LinksAlpha",
    title: "Cta — Alpha (LinksAlpha)",
    moduleKey: "../../components/library/marketing/cta/alpha/LinksAlpha.astro",
  },
  {
    domain: "marketing",
    category: "faq",
    variant: "alpha",
    name: "FeaturesAlpha",
    title: "Faq — Alpha (FeaturesAlpha)",
    moduleKey: "../../components/library/marketing/faq/alpha/FeaturesAlpha.astro",
  },
  {
    domain: "marketing",
    category: "hero",
    variant: "alpha",
    name: "HeroAlpha",
    title: "Hero — Alpha (HeroAlpha)",
    moduleKey: "../../components/library/marketing/hero/alpha/HeroAlpha.astro",
  },
  {
    domain: "marketing",
    category: "stats",
    variant: "alpha",
    name: "ArchitectureAlpha",
    title: "Stats — Alpha (ArchitectureAlpha)",
    moduleKey: "../../components/library/marketing/stats/alpha/ArchitectureAlpha.astro",
  },
  {
    domain: "marketing",
    category: "steps",
    variant: "alpha",
    name: "MethodAlpha",
    title: "Steps — Alpha (MethodAlpha)",
    moduleKey: "../../components/library/marketing/steps/alpha/MethodAlpha.astro",
  },
  {
    domain: "marketing",
    category: "steps",
    variant: "alpha",
    name: "OverviewAlpha",
    title: "Steps — Alpha (OverviewAlpha)",
    moduleKey: "../../components/library/marketing/steps/alpha/OverviewAlpha.astro",
  },
  {
    domain: "marketing",
    category: "hero",
    variant: "bravo",
    name: "HeroBravo",
    title: "Hero — Bravo (HeroBravo)",
    moduleKey: "../../components/library/marketing/hero/HeroBravo.astro",
  },
  {
    domain: "marketing",
    category: "features",
    variant: "mirror",
    name: "FeaturesMirror",
    title: "Features — Mirror (FeaturesMirror)",
    moduleKey: "../../components/library/marketing/features/FeaturesMirror.astro",
  },
  {
    domain: "marketing",
    category: "features",
    variant: "grid",
    name: "FeaturesGrid",
    title: "Features — Grid (FeaturesGrid)",
    moduleKey: "../../components/library/marketing/features/grid/FeaturesGrid.astro",
  },
];

export function slugOf(e: ComponentEntry) {
  return e.domain + "/" + e.category + "/" + e.variant + "/" + e.name;
}


