# MIT — Muszlim Ifjúság Társaság

The website of the Muslim Youth Association of Hungary: a volunteer-run community
organisation in Budapest. Built with **Next.js 16** and **React 19**, it publishes the
association's events, highlights and volunteer programme in three languages.

**Live:** [mit-hu.eu](https://mit-hu.eu)

## Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation:** CSS-driven reveals with an IntersectionObserver, [Framer Motion](https://www.framer.com/motion/) for the mobile menu
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Caching / view counts:** [Upstash Redis](https://upstash.com/)
- **Auth:** [NextAuth.js v5](https://authjs.dev/) (admin only)
- **i18n:** [next-intl](https://next-intl-docs.vercel.app/) — English, Hungarian, Arabic (RTL)
- **Media:** [Cloudinary](https://cloudinary.com/) for admin uploads

## Features

- **Three locales, one layout.** English, Hungarian and Arabic share the same components;
  direction-aware utilities handle the RTL flip.
- **Events & highlights.** Editable through the admin dashboard, rendered as statically
  generated pages that revalidate hourly, with search, countdowns and per-event detail pages.
- **Volunteer flow.** `/join-mit` guides an applicant through what to tell us, then composes
  a ready-to-send email to `muszlimifjusag@gmail.com` — no third-party form, no fake backend.
- **Newsletter.** Subscription endpoint backed by MongoDB with duplicate handling.
- **Admin dashboard.** Protected routes for events, highlights and newsletter subscribers.

## Project Structure

- **`app/[locale]`** — public routes (home, about, events, highlights, join)
- **`app/admin`** — protected admin dashboard
- **`app/api`** — auth, events, highlights, newsletter, uploads, view counts
- **`components`** — feature sections plus shared building blocks in `components/reusable`
- **`lib`** — services, SEO helpers, i18n utilities and the `media` registry of site photography
- **`messages`** — `en` / `hu` / `ar` translation files, kept at key parity
- **`models`** — Mongoose schemas
- **`public/imgs/community`** — the association's own photography

## Development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

Environment variables (see `.env.local`): MongoDB, Upstash Redis, Cloudinary and NextAuth
credentials.

## License

Private, for the MIT community.
