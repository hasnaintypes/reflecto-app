<p align="center">
  <img src="public/logo.png" alt="Reflecto" width="80" height="80" />
</p>

<h1 align="center">Reflecto</h1>

<p align="center">
  A private, mobile-first journaling app for mindful daily reflection.
</p>

<p align="center">
  <a href="https://github.com/hasnaintypes/reflecto-app/actions"><img src="https://img.shields.io/github/actions/workflow/status/hasnaintypes/reflecto-app/ci.yml?branch=main&label=CI" alt="CI" /></a>
  <a href="https://tryreflecto.vercel.app"><img src="https://img.shields.io/github/deployments/hasnaintypes/reflecto-app/production?label=vercel" alt="Deploy" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.8-blue" alt="TypeScript" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js" /></a>
  <a href="./LICENSE.md"><img src="https://img.shields.io/github/license/hasnaintypes/reflecto-app" alt="License" /></a>
</p>

---

## Overview

Reflecto is a full-stack journaling platform built for people who want a distraction-free space to write, reflect, and build a consistent journaling habit. It ships as a **Progressive Web App** — installable on any device with offline-capable service worker caching.

The app supports six distinct entry types (journal, dreams, highlights, ideas, wisdom, notes), automatic tag and people extraction from content, activity heatmaps, streak tracking, and a rich text editor with inline mentions.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) | Full-stack React framework with RSC, Turbopack |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) | End-to-end type safety |
| **API** | [tRPC 11](https://trpc.io/) + [SuperJSON](https://github.com/flightcontrolhq/superjson) | Type-safe RPC with automatic serialization |
| **Database** | [PostgreSQL](https://www.postgresql.org/) + [Prisma 6](https://www.prisma.io/) | Relational DB with type-safe ORM |
| **Auth** | [NextAuth v5](https://authjs.dev/) (Auth.js) | Credentials + Google + Discord OAuth |
| **Editor** | [TipTap 3](https://tiptap.dev/) (ProseMirror) | Rich text with mentions, links, images |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) | Utility-first CSS with accessible primitives |
| **State** | [Zustand 5](https://zustand-demo.pmnd.rs/) + [React Query 5](https://tanstack.com/query) | Client state + server cache management |
| **Images** | [ImageKit](https://imagekit.io/) | CDN with on-the-fly transforms and thumbnails |
| **Email** | [Resend](https://resend.com/) | Transactional email (verification, password reset) |
| **Jobs** | [Inngest](https://www.inngest.com/) | Background tasks with cron scheduling |
| **Animation** | [Framer Motion 12](https://www.framer.com/motion/) | Page transitions, list animations |
| **PWA** | [Serwist](https://serwist.pages.dev/) (next-pwa successor) | Service worker, precaching, offline support |
| **Docs** | [Nextra 4](https://nextra.site/) | MDX-powered documentation at `/docs` |
| **Deploy** | [Vercel](https://vercel.com/) | Hosting, serverless functions, edge network |

---

## Features

### Journaling
- **Rich text editor** with TipTap — bold, italic, headings, lists, links, images, and inline mentions
- **Six entry types** — Journal (daily log), Dreams, Highlights, Ideas, Wisdom, Notes
- **Automatic extraction** — `#tags` and `@people` are parsed from content and linked automatically
- **Bullet mode** — Rapid-fire journaling with configurable Enter/Shift+Enter behavior
- **Backdating** — Create entries for past dates
- **One journal per day** — Journal entries enforce a single entry per date

### Organization
- **Tags and People** — Auto-extracted with dedicated management pages, search, and entry counts
- **Starred entries** — Mark important entries for quick access
- **Workspace filtering** — Each entry type has its own dedicated view with type-specific features

### Insights & Analytics
- **Activity heatmap** — GitHub-style contribution graph powered by ActivityLog
- **Streak tracking** — Current and longest streak with automatic daily calculation
- **Charts** — Word count trends, top tags, top people, entry distribution by type
- **Stats grid** — Total entries, average word count, and more

### Customization
- **Dark-first design** with theme support (dark/light/system)
- **Font size** — Small, default, large
- **Editor preferences** — Bulleted mode, newline behavior, spell checking, tag highlighting
- **Daily reminders** with configurable time
- **Auto-hide navigation** on desktop

### Data & Privacy
- **Data export** — Download all entries, tags, and people as JSON from Settings
- **Soft deletes** — Entries are never permanently destroyed
- **No third-party analytics** — Your journal stays private
- **PWA** — Installable on mobile and desktop, works offline

### Authentication
- **Email + password** with email verification
- **Google OAuth** and **Discord OAuth**
- **Password reset** via email
- **Rate limiting** — Sliding window (100 req/60s authenticated, 30/60s unauthenticated)

---

## Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── (protected)/          # Auth-required pages
│   │   │   ├── journal/          # Daily journal with rich editor
│   │   │   ├── dreams/           # Dream journal workspace
│   │   │   ├── highlights/       # Highlights workspace
│   │   │   ├── ideas/            # Ideas workspace
│   │   │   ├── wisdom/           # Wisdom workspace
│   │   │   ├── notes/            # Notes workspace
│   │   │   ├── insights/         # Analytics dashboard (heatmap, charts)
│   │   │   ├── reflect/          # Memory lane + highlights review
│   │   │   ├── settings/         # User preferences + data export
│   │   │   ├── tags/             # Tag management
│   │   │   ├── people/           # People management
│   │   │   ├── profile/          # User profile
│   │   │   └── write/            # Universal entry composer
│   │   └── (public)/             # Auth pages (sign-in, sign-up, reset)
│   ├── api/                      # API routes (tRPC, auth, inngest)
│   ├── docs/                     # Nextra documentation route
│   └── sw.ts                     # Service worker (Serwist)
├── server/
│   ├── api/routers/              # 13 tRPC routers
│   ├── services/                 # Business logic layer
│   │   ├── entry/                # Entry CRUD + extraction
│   │   ├── analytics/            # Activity logging + streaks
│   │   └── extraction/           # Tag and person extraction
│   ├── schemas/                  # Zod input validation
│   └── auth/                     # NextAuth configuration
├── components/
│   ├── ui/                       # Radix-based UI primitives
│   ├── editor/                   # TipTap editor components
│   └── layout/                   # Sidebar, navbar, footer
├── stores/                       # Zustand stores
├── types/                        # Shared TypeScript types
└── styles/                       # Global CSS
content/                          # Nextra MDX documentation
prisma/                           # Database schema + migrations
public/                           # Static assets, PWA icons, manifest
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 10
- **PostgreSQL** (local or hosted — Neon, Supabase, etc.)

### Environment Variables

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret (generate with `openssl rand -base64 32`) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth credentials |
| `AUTH_DISCORD_ID` / `AUTH_DISCORD_SECRET` | Discord OAuth credentials |
| `IMAGEKIT_PUBLIC_KEY` / `IMAGEKIT_PRIVATE_KEY` / `IMAGEKIT_URL_ENDPOINT` | ImageKit CDN credentials |
| `RESEND_API_KEY` | Resend email API key |

### Installation

```bash
# Clone and install
git clone https://github.com/hasnaintypes/reflecto-app.git
cd reflecto-app
pnpm install

# Push database schema
pnpm db:push

# Start development server (with Turbopack)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm typecheck` | Run TypeScript compiler checks |
| `pnpm lint` | Run ESLint |
| `pnpm format:check` | Check Prettier formatting |
| `pnpm format:write` | Fix Prettier formatting |
| `pnpm check` | Run lint + typecheck together |
| `pnpm db:push` | Push Prisma schema to database |
| `pnpm db:generate` | Create and apply migrations |
| `pnpm db:studio` | Open Prisma Studio GUI |

---

## Documentation

Full documentation is available at [`/docs`](https://tryreflecto.vercel.app/docs) and covers:

- **[Getting Started](https://tryreflecto.vercel.app/docs/getting-started)** — Account setup, first entry, navigation
- **[Writing & Editor](https://tryreflecto.vercel.app/docs/writing/editor)** — Rich text editor, keyboard shortcuts, formatting
- **[Workspaces](https://tryreflecto.vercel.app/docs/workspaces)** — All six entry types explained
- **[Insights](https://tryreflecto.vercel.app/docs/insights)** — Heatmap, streaks, charts
- **[Customization](https://tryreflecto.vercel.app/docs/customization/settings)** — Appearance and preferences
- **[Developer Guide](https://tryreflecto.vercel.app/docs/developer/architecture)** — Architecture, API reference, database schema

Documentation source lives in the `content/` directory as MDX files.

---

## Architecture

```
Client (React 19)
    │
    ├── Zustand stores (client state)
    └── tRPC React Query hooks
            │
            ▼
    tRPC Router Layer (13 routers)
        │   - Timing middleware
        │   - Rate limiting
        │   - Auth guard
        ▼
    Service Layer
        │   - Entry CRUD with extraction
        │   - Activity logging
        │   - Streak management
        ▼
    Prisma ORM → PostgreSQL
```

Key architectural decisions:
- **Service layer pattern** — Business logic is separated from tRPC routers into testable service classes
- **Automatic extraction** — Tags (`#hashtag`) and people (`@mention`) are extracted from content on every create/update within a transaction
- **ActivityLog table** — Pre-aggregated daily entry counts for O(1) heatmap rendering instead of counting raw entries
- **Soft deletes** — Entries use `deletedAt` timestamps, never hard-deleted

---

## Acknowledgments

Reflecto is inspired by [Journalistic](https://journalisticapp.com/) — a beautifully crafted journaling app that set the standard for what a modern reflection tool should feel like. Full credit to the Journalistic team for the original vision.

---

## Author

**Hasnain** — [GitHub](https://github.com/hasnaintypes) · [Twitter](https://twitter.com/bynainee) · [LinkedIn](https://linkedin.com/in/hasnainx) · [Email](mailto:hasnainoffice2024@gmail.com)

---

## License

MIT License. See [LICENSE](./LICENSE) for details.
