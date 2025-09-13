# Reflecto

> **Reflecto** is a private, mobile-first journaling app designed to help individuals build a consistent reflective habit with a polished writing experience, contextual prompts, and lightweight AI assistance — while keeping user data private and exportable.

---

## Badges

[![License](https://img.shields.io/github/license/hasnaintypes/reflecto-app)](./LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/hasnaintypes/reflecto-app/ci.yml?branch=main)](https://github.com/hasnaintypes/reflecto-app/actions)
[![Vercel Deploy](https://img.shields.io/github/deployments/hasnaintypes/reflecto-app/production?label=vercel)](https://reflecto.vercel.app)
[![Tech Stack](https://img.shields.io/badge/stack-T3-blueviolet)](https://create.t3.gg)
[![Made with TypeScript](https://img.shields.io/badge/language-TS-blue)](https://www.typescriptlang.org/)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [License](#license)

---

## Overview

Reflecto delivers a secure, distraction-free journaling experience focused on privacy and habit-building.  
It is built as a **Progressive Web App (PWA)** with mobile-first UX, supporting rich-text + markdown journaling, daily prompts, tagging, search, and AI-assisted reflection.  

The project follows a modular, scalable architecture designed for a smooth Alpha launch and future feature growth.

---

## Tech Stack

| Layer            | Technology |
|------------------|------------|
| Framework        | [Next.js (App Router)](https://nextjs.org/) |
| Language         | [TypeScript](https://www.typescriptlang.org/) |
| UI Components    | [shadcn/ui](https://ui.shadcn.com/), [TailwindCSS](https://tailwindcss.com/) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) |
| Auth             | [NextAuth](https://next-auth.js.org/) |
| API Layer        | [tRPC](https://trpc.io/) |
| ORM              | [Prisma](https://www.prisma.io/) |
| Database         | [Neon (Postgres)](https://neon.tech/) + [pgvector](https://github.com/pgvector/pgvector) |
| Queue            | [Redis + BullMQ](https://docs.bullmq.io/) |
| Workers          | Node.js worker processes |
| Storage          | [S3-compatible object storage](https://aws.amazon.com/s3/) |
| AI Integration   | External provider (e.g. Gemini, OpenAI, etc.) |
| Monitoring       | [Sentry](https://sentry.io/), [Prometheus](https://prometheus.io/), [PostHog](https://posthog.com/) |
| CI/CD            | [GitHub Actions](https://github.com/features/actions), [Vercel](https://vercel.com/) |

---

## Features

- **Rich-text & Markdown editor** with safe round-trip conversion.  
- **Daily prompts & reminders** to encourage consistent journaling.  
- **Tagging & full-text search** for easy organization and discovery.  
- **AI-assisted reflections**: summaries, suggested tags, and insights.  
- **Offline-first PWA** with background sync and responsive UI.  
- **Secure authentication** and row-level security (RLS) defense-in-depth.  
- **Export & backup** to Markdown/PDF, with S3-based storage.  
- **Streaks & mood tracking** for engagement and long-term reflection.  

---

## Getting Started

### Prerequisites

- Node.js (>=18.x)
- pnpm (preferred) or npm/yarn
- PostgreSQL (Neon or local instance)
- Redis (for job queue)
- S3-compatible storage provider
- API key for AI provider (stub acceptable during local dev)

### Installation

```bash
# Clone repository
git clone https://github.com/hasnaintypes/reflecto-app.git
cd reflecto-app

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Run database migrations
pnpm prisma migrate dev

# Start dev server
pnpm dev
````

App should now be available at `http://localhost:3000`.

---

## Development

* **Code style:** enforced via ESLint + Prettier.
* **Type safety:** full end-to-end typing with tRPC + Prisma.
* **Tests:** unit & integration tests with Vitest/Playwright.
* **Commits:** follow conventional commits for consistency.


For internal team members, see internal documentation for contribution and workflow guidelines.

---



## License

This project is proprietary and not open for public use, modification, or distribution. All rights reserved. For details, see the [LICENSE.md](./LICENSE.md) file.

---

