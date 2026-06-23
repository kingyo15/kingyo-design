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
  // Explicit image order (file names only, not paths). Matches the layout in
  // the Figma source. Files not listed here fall to the end, alphabetically.
  imageOrder?: string[];
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
    imageOrder: [
      "b95b5c96806061.5eb6ae6d46e70.jpg", // Brand concept — icons + person + logo equation
      "45352896806061.5eb6ae6d47ea4.jpg", // Big logo embossed on paper texture
      "69d43896806061.5eb6ae6d45c90.jpg", // Logo color variants (white/teal/sage/dark)
      "8f6e7896806061.5eb6ae6c970b4.jpg", // Logo construction grid
      "c8f8f496806061.5eb6ae6d453ba.jpg", // Minimal line logo variants
      "afec3896806061.5eb6ae6d465a0.jpg", // Business cards on teal
      "a6b1e096806061.5eb6ae6d4775e.jpg", // Outdoor brick wall + Namaste Yoga sign
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
    imageOrder: [
      "334e4b193767893.65f159d4b59b2.png", // Logos hero (orange/slate/onyx blocks)
      "c2ba0d193767893.65f153c2020ee.png", // Color palette (Pumpkin/Slate/Onyx)
      "bbb88f193767893.65f159d4b8920.png", // Logo construction grid
      "d14e95193767893.65f159d4b67ab.png", // Typography (Nunito Sans / 文鼎圓體)
      "b2d4d0193767893.65f159d4b9714.png", // Business cards
      "c6cc9a193767893.65f159d4ba772.png", // SuperWall brochure
      "2e5186193767893.65f159d4b7857.png", // Branded coffee cup
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
    imageOrder: [
      "c23c4e71360035.5bc2ef87293a0.jpg", // Logo variants (black / gold / line)
      "50eedf71360035.5bc2ef875b12a.jpg", // Logo badges / buttons
      "34bc2971360035.5bc2ef877fbd1.jpg", // Tube packaging + logo squares
      "b2aa2a71360035.5bc2ef87bb4db.jpg", // Hand stamp + Nid stamp on paper
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
    imageOrder: [
      "d33b0e123194913.60e94526dfe55.jpg", // Hero — sió-tó ê niau-á + 4 cat heads
      "f41bfc123194913.60e94526e0ed6.jpg", // 9-cat grid (first set)
      "f53148123194913.60e94526e155f.jpg", // 9-cat grid (second set)
      "6676b0123194913.60e94526df43b.jpg", // Small items (crown / heart / jar / star)
      "fbcbfb123194913.60e94526e0378.jpg", // Black circular badge with 2 standing cats
      "2d563f123194913.60e94526e0823.jpg", // Horizontal cat-with-checkered-tail strips
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
    imageOrder: [
      "af08ff147501361.62c6531b18b35.png", // Hero — CDP 數據整合分析平台
      "1488f8147501361.62c4f434651a1.png", // Color palette
      "12ff78147501361.62c50a462a500.png", // Buttons / components
      "af3541147501361.62c535bc46f03.png", // Charts (bar/line/pie)
      "7280c3147501361.62c535bc467ec.png", // Desktop screens
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
    imageOrder: [
      "25634d71474693.5c18a4957c71e.jpg", // Hero — multi-device mockups (RFID system)
      "326c9871474693.5bee27cd8baf5.jpg", // A 帳密或感應登入 illustration
      "56eab471474693.5c18a4957bb35.jpg", // Workflow diagram (horizontal flow)
      "62c56471474693.5c19b5c08ad41.jpg", // Login page laptop + phone mockup
      "ae627e71474693.5c18a4957c320.jpg", // Accordion + Tables design system
      "c617e671474693.5c18a4957beaa.jpg", // Color palette (Primary / Secondary / Grey / Additional)
      "e5251971474693.5c18a4957b6ff.jpg", // Hospital logo + system name
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
    imageOrder: [
      "5bc04f155158091.634f6afd5becb.png", // Hero — city skyline + tagline
      "a85a0c155158091.634f6afd5ce01.png", // Color palette (Primary/Neutral)
      "28e021155158091.634f73b176fed.png", // One2DIRECT big wordmark
      "81c769155158091.634f6afd590c4.png", // Logo construction grid
      "f4663e155158091.634fb3cb88794.jpg", // Logo on letter cards
      "b27363155158091.634fb2b6b9199.png", // Lifestyle photo strips
      "7e8895155158091.634fb134e3868.jpg", // Desktop mockup
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
    imageOrder: [
      "94bcf3180508631.651e64b938013.png", // Hero — SuperWall wordmark + tagline
      "2c4ba0180508631.652f5ff02f978.png", // Logo construction + brand keywords
      "d09b2c180508631.650beb9de6054.png", // Color palette
      "da5105180508631.650beb9de17cb.png", // Clear Space
      "05f9bd180508631.652f443f58b04.png", // Brand attributes circles
      "c5c02c180508631.650beb9de8b62.png", // Stacked notebooks pattern
      "1413af180508631.652f5ff0323ee.png", // Website mockups
      "1d20ae180508631.650bfd1a9a392.png", // Website on iPad/laptop
      "60febb180508631.652f5ff03165d.png", // Task List Page mobile
      "c7053e180508631.652f5ff0306c4.png", // Admin dashboard
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
    imageOrder: [
      "34bead123882909.60f814a95ec66.jpg", // 3-step process illustrations (01/02/03)
      "de1d5b123882909.60fb86bb18c8f.jpg", // Dark admin screens
      "26d0c5123882909.60fb86bb17de1.jpg", // Desktop mockups
      "4903cf123882909.60fb99533afef.jpg", // Person holding phone in cafe (lifestyle)
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
    imageOrder: [
      "14d28871359619.5bc2e8c32741d.jpg", // Owl logo + brand info / color palette
      "06d77271359619.5bc2e8c363df9.jpg", // Phone screen + brand block
      "12419371359619.614d52a4c2b16.jpg", // OwlPass logo tiles (orange/teal variants)
      "8c65be71359619.5bc2e8c3b7bd6.jpg", // 3 app screens (cyan/teal)
      "e596b271359619.5bc2e8c3e9dc9.jpg", // 3 app screens with map (orange)
      "fad2bb71359619.5bc2e8c429b9f.jpg", // 2 phones over map
      "7a6ee771359619.614d52a4c339f.jpg", // Desktop monitor mockup
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
    imageOrder: [
      "fe6d5b147244421.62c3e6e25897d.jpg", // Hero — desktop monitor + iPad mockup
      "0dc516147244421.62c2544cb5269.png", // Color palette (Primary/Secondary/Neutral + Accents)
      "6ef9f1147244421.62c2544cb3cc8.png", // Buttons / Icons / Typography
      "9d1150147244421.62c3b3b7ad467.png", // App mobile screens
      "7459c1147244421.62c3eb9d69e14.jpg", // Web versions
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
    imageOrder: [
      "ab39d472972967.5bfbab5293d62.png", // Color palette + fonts + icons (design system)
      "2dc5c472972967.5bfce8a56a31d.png", // App phone screens
      "5d73a272972967.5bfa5962980ba.png", // Desktop dashboard + mobile mockups
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
    imageOrder: [
      "fc2ed9123587403.60f39f8a702f9.jpg", // Hero — Bank / ARS / Support service cards
      "3c2b8a123587403.60f3916b08f19.jpg", // Apple Rewards Store logo
      "d88892123587403.60f419d918437.jpg", // Wireframe / page layout flow
      "1728f5123587403.60fcd764608cb.jpg", // Sitemap (首頁 / 結帳 / 會員中心)
      "02d497123587403.60f143fa0f800.jpg", // Multi-screen perspective mockup
      "e9f985123587403.60f813d047527.jpg", // AirPods Max laptop + iPhone
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
    imageOrder: [
      "6d4d18124088155.60fcdd74cc758.jpg", // Hero — mountain landscape + Eye Love Nature Life
      "59ec53124088155.6103cbde95a62.jpg", // Multiple website pages perspective
      "b7a680124088155.6103bf429a865.jpg", // ABC qualification cards over lifestyle photo
      "236859124088155.610609c60d85c.jpg", // Final laptop + phone setup mockup
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
    imageOrder: [
      "476db4123239865.60ea75129bd63.jpg", // Hero — CATHAY FAMILY VIP + family photo
      "ca9e06123239865.60eab19a7d09a.jpg", // 3 orange service icons
      "82565b123239865.60ed76f95d00d.jpg", // Page mockups perspective
      "8b8dc4123239865.60f023964a254.jpg", // Detailed page mockups + annotations
      "9766fd123239865.60f1432ce5ab1.jpg", // Final laptop + lamp + phone mockup
    ],
  },
};

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// Display order — matches the Figma layout (file Rclt5HJ9J5bi0x1QepJJ3B, node 70:346).
// Folders not listed here fall back to the end, in their original directory order.
const FOLDER_ORDER: string[] = [
  "Design System-02-ViaPoint",
  "Product Design-04-Superwall ",
  "Product Design-03-One2DIRECT",
  "Product Design-01-CDP ",
  "Product Design-App-02-Joinger",
  "Website Design-01-apple store",
  "Product Design-App-01-owlpass app",
  "Product Design-05-Smart Tickets",
  "Website Design-04-Cathay Life Insurance",
  "Product Design-02-NTUH",
  "Website Design-02-NanshanLife",
  "Product Design-App-03-DailyCare  Handheld ECG Monitor",
  "Illustration-01-cats",
  "Design System-01-Namaste Yoga",
  "Design System-03-Nid design",
];

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

  const orderIndex = new Map(FOLDER_ORDER.map((name, i) => [name, i]));
  folders.sort((a, b) => {
    const ai = orderIndex.has(a) ? orderIndex.get(a)! : Number.MAX_SAFE_INTEGER;
    const bi = orderIndex.has(b) ? orderIndex.get(b)! : Number.MAX_SAFE_INTEGER;
    if (ai !== bi) return ai - bi;
    return a.localeCompare(b);
  });

  const list: Project[] = folders
    .map((folder) => {
      const meta = META[folder];
      if (!meta) return null;

      const files = fs
        .readdirSync(path.join(root, folder))
        .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
        .sort();

      if (files.length === 0) return null;

      if (meta.imageOrder && meta.imageOrder.length > 0) {
        const orderIdx = new Map(meta.imageOrder.map((n, i) => [n, i]));
        files.sort((a, b) => {
          const ai = orderIdx.has(a) ? orderIdx.get(a)! : Number.MAX_SAFE_INTEGER;
          const bi = orderIdx.has(b) ? orderIdx.get(b)! : Number.MAX_SAFE_INTEGER;
          if (ai !== bi) return ai - bi;
          return a.localeCompare(b);
        });
      }

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
