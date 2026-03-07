export type TeacherAccent = "yellow" | "slate" | "violet" | "green" | "sky";
export type TeacherLane = "left" | "right";
export type TeacherSize = "sm" | "md" | "lg";

export type Teacher = {
  name: string;
  role: string;
  image: string;         // /people/<file>
  accent: TeacherAccent;
  lane: TeacherLane;
  y: `${number}%`;        // css top %
  xOffsetPx: number;      // scatter within lane (px)
  size: TeacherSize;
  showInHero: boolean;    // lg+ only (hero bubbles)
};

export const teachers: ReadonlyArray<Teacher> = [
  // HERO (6 total) — scattered + varied sizes
  { name: "Carlos Azaustre", role: "Ingeniero de Software", image: "/people/carlos-azaustre.png", accent: "slate", lane: "left",  y: "14%", xOffsetPx: 40, size: "lg", showInHero: true },
  { name: "Alan Buscaglia", role: "Lead Front-End Architect", image: "/people/alan-buscaglia.png", accent: "green", lane: "left",  y: "46%", xOffsetPx: 10, size: "md", showInHero: true },
  { name: "Xavi Portilla", role: "Head of Cloud Infrastructure", image: "/people/xavi-portilla.png", accent: "slate", lane: "left",  y: "78%", xOffsetPx: 70, size: "md", showInHero: true },

  { name: "Brais Moure", role: "Ingeniero de Software y Desarrollador Fullstack", image: "/people/brais-moure.jpg", accent: "sky", lane: "right", y: "10%", xOffsetPx: 30, size: "lg", showInHero: true },
  { name: "Nerea Luis", role: "Doctora en IA", image: "/people/nerea-luis.png", accent: "violet", lane: "right", y: "50%", xOffsetPx: 0,  size: "md", showInHero: true },
  { name: "Daniela Maissi", role: "Security Researcher", image: "/people/daniela-maissi.png", accent: "slate", lane: "right", y: "82%", xOffsetPx: 60, size: "lg", showInHero: true },

  // NOT IN HERO (available for a full “Teachers” section later)
  { name: "Martin Cristobal", role: "CTO", image: "/people/martin-cristobal.png", accent: "yellow", lane: "left",  y: "0%", xOffsetPx: 0, size: "sm", showInHero: false },
  { name: "Aris Guimerá", role: "Mobile Tech Lead", image: "/people/aris-guimera.png", accent: "slate",  lane: "right", y: "0%", xOffsetPx: 0, size: "sm", showInHero: false },
  { name: "Kiko Palomares", role: "VP of Engineering", image: "/people/kiko-palomares.png", accent: "slate",  lane: "right", y: "0%", xOffsetPx: 0, size: "sm", showInHero: false },
] as const;
