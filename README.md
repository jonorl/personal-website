# Personal Website – Jonathan Orlowski

My portfolio site, live at **https://jonathan-orlowski.dev**. It started as a static page for [The Odin Project](https://www.theodinproject.com/) and now covers my AI/ML, full-stack and IoT projects, along with the VPS they all run on.

## What's on it

- **Hero and About**: who I am, and the move from business intelligence to MLOps.
- **Infrastructure & DevOps**: the three Docker Compose stacks behind the projects, with live CPU, memory, disk and uptime figures from the VPS. They're polled every 10 seconds from `stats.jonathan-orlowski.dev` ([metrics-personal-website](https://github.com/jonorl/metrics-personal-website)).
- **AI/ML projects** and **Full-Stack projects**: cards linking to each live demo and its source. My three original projects (Where in the World?, the air-quality monitor and Teatro Dislocador) span the full width and play a short clip.
- **CV and Contact**: a downloadable PDF and email.

## Tech stack

- React 19, TypeScript, Vite and Tailwind CSS 4
- Motion for the animations; lucide-react and react-icons for icons
- Hosted on Cloudflare Pages, which deploys every push to `main`

## Running it locally

```bash
git clone https://github.com/jonorl/personal-website.git
cd personal-website
npm install
npm run dev
```

The live metrics come from `http://localhost:3002/api/metrics` in development, so that section shows an error unless the metrics service is running locally.

Other scripts:

- `npm run typecheck` checks the TypeScript.
- `npm run lint` runs ESLint.
- `npm test` runs the Jest tests in `src/__tests__/`.
- `npm run build` builds the site into `dist/`.
- `npm run preview` serves that build.

## Editing the content

- Projects live in `src/const/`: `fullStackProjects.ts` and `aiProjects.ts`. A card takes a title, description, tech tags and links. It can also take:
  - `image`: a 960 × 600 screenshot in `public/projects/`
  - `video`: a muted looping clip, which uses the image as its poster
  - `featured: true`: the card spans both columns
- The infrastructure cards are in `src/const/infraStacks.ts`.
- `public/llms.txt` describes the site for AI agents. It's written by hand, so update it when projects change.
- `public/CV.pdf` is the downloadable CV.

## Maintenance

- **CI** (`.github/workflows/ci.yml`) runs `npm ci`, the type check, lint, the tests and build on every push and pull request. The `main` branch ruleset requires it to pass before a pull request can merge.
- **Dependabot** (`.github/dependabot.yml`) checks npm packages and GitHub Actions weekly:
  - minor and patch updates arrive as one pull request
  - Vite and its plugins are upgraded together
  - other major upgrades come one by one
