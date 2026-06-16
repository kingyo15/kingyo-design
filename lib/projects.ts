import fs from "node:fs";
import path from "node:path";

export type Category =
  | "Product Design"
  | "Mobile App Design"
  | "Design System"
  | "Website Design"
  | "Branding Design"
  | "Illustration";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: string;
  brief: string;
  client: string;
  scope: string;
  intro: string;
  body: string[];
  cover: string;
  images: string[];
  folder: string;
};

type Meta = {
  title: string;
  category: Category;
  year: string;
  brief: string;
  client: string;
  scope: string;
  intro: string;
  body: string[];
};

const META: Record<string, Meta> = {
  "Design System-01-Namaste Yoga": {
    title: "Namaste Yoga",
    category: "Design System",
    year: "2020",
    brief: "Wellness Design System",
    client: "Namaste Studio",
    scope: "Design System",
    intro:
      "Namaste Yoga is a calm and balanced design system created for a holistic wellness brand. The system pairs warm neutrals with soft typography to support a mindful, approachable experience across every touch-point.",
    body: [
      "From colour tokens to reusable layout primitives, every decision is rooted in the brand's promise of stillness and care. The system scales across web and mobile while keeping the visual rhythm consistent.",
      "Component variants, iconography, and motion guidelines were defined together so the team could ship new screens without losing the brand's gentle character.",
    ],
  },
  "Design System-02-ViaPoint": {
    title: "ViaPoint",
    category: "Design System",
    year: "2024",
    brief: "Enterprise Design System",
    client: "ViaPoint Inc.",
    scope: "Design System",
    intro:
      "ViaPoint is a modular design system built for a fast-growing logistics product. Tokens, components, and patterns are aligned so multiple squads can ship in parallel without diverging from the core experience.",
    body: [
      "We mapped the existing UI library, deduplicated patterns, and introduced a clear three-layer token architecture (primitive → semantic → component) so theming and dark mode could land without rework.",
      "Documentation and Figma-to-code bindings shipped together, giving designers and engineers a single source of truth from day one.",
    ],
  },
  "Design System-03-Nid design": {
    title: "Nid Design",
    category: "Design System",
    year: "2019",
    brief: "Foundation Library",
    client: "Nid Studio",
    scope: "Design System",
    intro:
      "Nid is a foundational design library for a boutique studio. It is small by design — just the right amount of primitives to keep their work consistent without slowing down craft.",
    body: [
      "We focused on typography, spacing, and shadow scales first, then introduced a curated set of components covering the studio's most common screens.",
      "The library doubles as an onboarding tool, giving new collaborators a quick way to understand the studio's visual language.",
    ],
  },
  "Illustration-01-cats": {
    title: "Cats Collection",
    category: "Illustration",
    year: "2021",
    brief: "Editorial Illustration",
    client: "Personal Project",
    scope: "Illustration",
    intro:
      "A playful editorial illustration series featuring cats in everyday moments. The set explores texture, posture, and personality across a tight, expressive colour palette.",
    body: [
      "Each piece started as a quick gestural sketch before being refined in vector. The aim was to keep the energy of the first stroke while polishing composition and balance.",
      "The series has since been used in editorial pieces, prints, and merchandise — a good reminder that a small idea can travel a long way.",
    ],
  },
  "Product Design-01-CDP ": {
    title: "CDP",
    category: "Product Design",
    year: "2022",
    brief: "Customer Data Platform",
    client: "Enterprise SaaS",
    scope: "Product Design",
    intro:
      "A Customer Data Platform that unifies audience data across channels. The redesign focused on turning a dense analytics tool into a confident, decision-ready workspace.",
    body: [
      "We restructured the information architecture around three core jobs: explore audiences, build segments, and ship campaigns. Each lane received its own visual rhythm and dedicated patterns.",
      "Charts, tables, and filters share a unified language, so users can move through complex flows without losing context.",
    ],
  },
  "Product Design-02-NTUH": {
    title: "NTUH",
    category: "Product Design",
    year: "2018",
    brief: "Hospital Information System",
    client: "National Taiwan University Hospital",
    scope: "Product Design",
    intro:
      "A clinical workflow tool built for the hospital's front-line staff. The goal was to reduce cognitive load during high-pressure shifts while keeping data fully accountable.",
    body: [
      "Shadowing on the ward shaped the priorities: fewer clicks, more glanceable status, and clearer hand-offs between teams. The design pares the screen down to the few things that matter for the next decision.",
      "Accessibility, keyboard navigation, and offline resilience were treated as first-class requirements rather than late-stage additions.",
    ],
  },
  "Product Design-03-One2DIRECT": {
    title: "One2DIRECT",
    category: "Product Design",
    year: "2022",
    brief: "Direct Marketing Suite",
    client: "One2DIRECT",
    scope: "Product Design",
    intro:
      "One2DIRECT is a direct marketing suite that helps growth teams plan, launch, and learn from campaigns in a single workspace. The redesign joined three legacy tools into one calm canvas.",
    body: [
      "We mapped the team's full lifecycle and rebuilt the navigation around it. Status, ownership, and next steps are surfaced wherever they're needed, so the tool feels like a partner instead of a checklist.",
      "Reusable patterns for tables, drawers, and inline editing make new modules feel familiar from day one.",
    ],
  },
  "Product Design-04-Superwall ": {
    title: "Superwall",
    category: "Product Design",
    year: "2023",
    brief: "Paywall Optimisation",
    client: "Superwall",
    scope: "Product Design",
    intro:
      "Superwall is a no-code paywall platform for mobile apps. The new design shifts the centre of gravity from configuration to outcomes — the screens you see and the metrics you grow.",
    body: [
      "The editor is now driven by a live preview, so every change is reviewed in context. Variants, experiments, and metrics live a click away without overwhelming the canvas.",
      "Empty states and onboarding were rewritten to teach the model — what a paywall is, why variants matter, how to read the data — so first-time users feel confident, not lost.",
    ],
  },
  "Product Design-05-Smart Tickets": {
    title: "Smart Tickets",
    category: "Product Design",
    year: "2021",
    brief: "Mobile Ticketing",
    client: "Smart Tickets",
    scope: "Product Design",
    intro:
      "A mobile-first ticketing experience that focuses on the moments around the show — finding seats, sharing with friends, and arriving at the venue without friction.",
    body: [
      "We treated the ticket itself as the hero, not the checkout. Every step earns its place by removing a decision the user used to carry.",
      "Wallet, calendar, and venue integrations are built directly into the flow so the experience continues even after the app is closed.",
    ],
  },
  "Product Design-ad-01-location": {
    title: "Location Ad",
    category: "Product Design",
    year: "2024",
    brief: "Ad Campaign",
    client: "Internal Marketing",
    scope: "Art Direction",
    intro:
      "A short ad concept exploring how location-aware messaging can feel personal instead of intrusive. The piece pairs typography with a single, grounded photograph.",
    body: [
      "Restraint is the brief: one image, one idea, one call to action. The layout system lets the same template carry many different stories without redesigning each one.",
    ],
  },
  "Product Design-ad-02-messages": {
    title: "Messages Ad",
    category: "Product Design",
    year: "2024",
    brief: "Ad Campaign",
    client: "Internal Marketing",
    scope: "Art Direction",
    intro:
      "A second piece in the ad series, this time framed around messaging. The composition uses negative space to spotlight a single line of copy.",
    body: [
      "The set was designed to feel native on social, in print, and in motion — a quiet system that bends to the format without losing its voice.",
    ],
  },
  "Product Design-ad-03-poster": {
    title: "Poster Ad",
    category: "Product Design",
    year: "2024",
    brief: "Ad Campaign",
    client: "Internal Marketing",
    scope: "Art Direction",
    intro:
      "The closing piece in the ad set leans into large-format posters. Bold type, a confident colour block, and a single image carry the whole concept.",
    body: [
      "The poster also acts as a brand exercise — proving the system holds together when stretched across a very different surface.",
    ],
  },
  "Product Design-App-01-owlpass app": {
    title: "OwlPass App",
    category: "Mobile App Design",
    year: "2018",
    brief: "Travel Companion App",
    client: "OwlPass",
    scope: "Mobile App Design",
    intro:
      "OwlPass is a travel companion app that bundles transit, tickets, and discovery into a single, calm interface. The design quietly takes care of the logistics so users can focus on the trip.",
    body: [
      "Onboarding was rebuilt around progressive disclosure — users only see what they need at each step, with everything else tucked one tap away.",
      "Maps, lists, and tickets share a single visual language so the experience feels continuous from search to arrival.",
    ],
  },
  "Product Design-App-02-Joinger": {
    title: "Joinger",
    category: "Mobile App Design",
    year: "2022",
    brief: "Community App",
    client: "Joinger",
    scope: "Mobile App Design",
    intro:
      "Joinger is a community app for interest-based groups. The design balances the energy of social feeds with the calm of a focused workspace.",
    body: [
      "We split the experience into discovery and home: discovery surfaces new communities; home becomes a quiet base for the ones you've joined.",
      "Notifications, threads, and events follow the same primitives, so the app feels predictable as the feature set grows.",
    ],
  },
  "Product Design-App-03-DailyCare  Handheld ECG Monitor": {
    title: "DailyCare Handheld ECG",
    category: "Mobile App Design",
    year: "2018",
    brief: "Health Monitoring App",
    client: "DailyCare",
    scope: "Mobile App Design",
    intro:
      "A companion app for a handheld ECG monitor. The design pairs medical accuracy with a friendly tone so users feel informed without feeling alarmed.",
    body: [
      "Measurement, history, and sharing live as three distinct lanes — each one reduced to the essentials so first-time users can complete a reading in under a minute.",
      "Edge cases (low battery, signal noise, irregular rhythm) were given clear, honest empty states rather than hidden behind warnings.",
    ],
  },
  "Website Design-01-apple store": {
    title: "Apple Store",
    category: "Website Design",
    year: "2021",
    brief: "Retail Experience",
    client: "Apple",
    scope: "Website Design",
    intro:
      "A web concept for an Apple Store retail flow. The piece explores how a confident editorial layout can shorten the path from browsing to buying.",
    body: [
      "Product pages let the hardware breathe — large imagery, generous spacing, and a single, decisive call to action.",
      "Comparison and configuration use a shared system so the user never feels they've left the product they came for.",
    ],
  },
  "Website Design-02-NanshanLife": {
    title: "NanshanLife",
    category: "Website Design",
    year: "2021",
    brief: "Insurance Website",
    client: "Nan Shan Life",
    scope: "Website Design",
    intro:
      "A redesign for a national life insurance site. The goal was to make a category that's traditionally cold feel approachable, calm, and useful.",
    body: [
      "We focused on the moments that matter: pricing a policy, finding an agent, filing a claim. Each of those flows got its own dedicated, jargon-free experience.",
      "Editorial content, calculators, and forms share a single grid so the site reads as one place, not three different products glued together.",
    ],
  },
  "Website Design-03-DBSVISA": {
    title: "DBS VISA",
    category: "Website Design",
    year: "2021",
    brief: "Credit Card Campaign",
    client: "DBS Bank",
    scope: "Website Design",
    intro:
      "A landing experience for a DBS VISA credit card programme. The site pairs lifestyle photography with confident card art to make the offer feel premium and clear.",
    body: [
      "Benefit modules are arranged so the most rewarding stories come first — travel, dining, and everyday spending — each linked directly to its application flow.",
      "The system is designed to host future cards in the same family without redesigning the page from scratch.",
    ],
  },
  "Website Design-04-Cathay Life Insurance": {
    title: "Cathay Life Insurance",
    category: "Website Design",
    year: "2021",
    brief: "Corporate Website",
    client: "Cathay Life",
    scope: "Website Design",
    intro:
      "A corporate website for one of the region's largest life insurers. The redesign makes a heavy product catalogue feel orderly, modern, and easy to navigate.",
    body: [
      "We introduced a three-column foundation that adapts gracefully from desktop down to phone, with editorial moments allowed to break the grid when the content calls for it.",
      "Search, glossary, and contact paths were rebuilt around the most common questions, taking pressure off the navigation and giving the homepage room to breathe.",
    ],
  },
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function toSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

let cached: Project[] | null = null;

export function getProjects(): Project[] {
  if (cached) return cached;

  const root = path.join(process.cwd(), "public", "gallery");
  const folders = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const list: Project[] = folders
    .map((folder) => {
      const meta = META[folder];
      if (!meta) return null;

      const files = fs
        .readdirSync(path.join(root, folder))
        .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
        .sort();

      if (files.length === 0) return null;

      const images = files.map(
        (f) => `/gallery/${encodeURIComponent(folder)}/${encodeURIComponent(f)}`
      );

      return {
        slug: toSlug(folder),
        title: meta.title,
        category: meta.category,
        year: meta.year,
        brief: meta.brief,
        client: meta.client,
        scope: meta.scope,
        intro: meta.intro,
        body: meta.body,
        cover: images[0],
        images,
        folder,
      } satisfies Project;
    })
    .filter((p): p is Project => p !== null);

  cached = list;
  return list;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export const CATEGORIES: { label: string; value: Category | "All" }[] = [
  { label: "All Projects", value: "All" },
  { label: "Product Design", value: "Product Design" },
  { label: "Mobile App Design", value: "Mobile App Design" },
  { label: "Design System", value: "Design System" },
  { label: "Website Design", value: "Website Design" },
  { label: "Branding Design", value: "Branding Design" },
  { label: "Illustration", value: "Illustration" },
];
