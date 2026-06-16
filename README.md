# YUYA — Portfolio

Personal portfolio site built with Next.js 14 (App Router) + Tailwind CSS.

## Pages

- `/` — Homepage (Profile, Work preview, Process, Services, Contact)
- `/work` — Work gallery with category filters
- `/work/[slug]` — Individual project detail pages (auto-generated from `public/gallery/`)

## Project structure

```
app/
  layout.tsx
  page.tsx                    # Homepage
  globals.css
  work/
    page.tsx                  # Work list page
    [slug]/page.tsx           # Work detail page
components/
  Header.tsx  Footer.tsx
  Profile.tsx Work.tsx Process.tsx Services.tsx
  ProjectCard.tsx WorkGallery.tsx Reveal.tsx SectionLabel.tsx
lib/
  projects.ts                 # Project metadata (reads public/gallery)
public/
  gallery/                    # Project image folders (one per project)
  images/  icons/
```

## Adding a new project

1. Create a folder in `public/gallery/` following the pattern `<Category>-<NN>-<Name>` (e.g. `Website Design-05-NewClient`).
2. Drop the project's images (`.jpg`, `.jpeg`, `.png`, `.webp`) into the folder. The first file (sorted alphabetically) becomes the cover image.
3. Add a matching entry in `lib/projects.ts` under `META`, keyed by the exact folder name. Required fields: `title`, `category`, `year`, `brief`, `client`, `scope`, `intro`, `body`.
4. Run `npm run dev` — the new project will appear in `/work` and at `/work/<slug>`.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve production build
```

## Deploy to GitHub + Vercel (recommended)

The fastest way to get a shareable URL.

1. Create a new repo on GitHub (e.g. `yuya-portfolio`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/yuya-portfolio.git
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects Next.js automatically — just click **Deploy**.
4. Your site goes live at `https://<repo-name>.vercel.app`. You can attach a custom domain later in the project settings.

## Deploy to GitHub Pages (static export)

Next.js supports static export. To deploy on GitHub Pages instead:

1. Add to `next.config.js`:
   ```js
   const nextConfig = {
     reactStrictMode: true,
     output: "export",
     images: { unoptimized: true },
     basePath: "/<repo-name>",
   };
   ```
2. Build:
   ```bash
   npm run build
   ```
3. Push the generated `out/` folder to a `gh-pages` branch (or use the [actions/deploy-pages](https://github.com/actions/deploy-pages) workflow).

> Note: GitHub Pages serves under `/<repo-name>`. Vercel doesn't need `basePath`. Pick one path and stick with it.
