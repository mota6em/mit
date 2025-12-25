# MIT Website

A modern, multilingual web platform built with **Next.js 16** and **React 19**. This project is designed for community engagement, featuring event management, newsletter distribution, and a secure administrative backend.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Core Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Caching/KV:** [Upstash Redis](https://upstash.com/)
- **Authentication:** [NextAuth.js (v5 Beta)](https://authjs.dev/)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
- **Media Hosting:** [Cloudinary](https://cloudinary.com/)

## ✨ Key Features

- **Multilingual Support:** Fully localized experience for English and Hungarian users.
- **Event Management:** Dynamic event listings with dedicated detail pages and location mapping.
- **Admin Dashboard:** Secure interface for managing events, newsletters, and viewing site analytics.
- **Newsletter System:** Integrated subscription service with automated management.
- **Modern UI:** Responsive design using Radix UI primitives and custom interactive components like Aurora backgrounds and infinite moving cards.

## Live Demo

[MIT](https://mit-hu.eu)

## 📁 Project Structure

- **`/app/[locale]`**: Localized application routes for the frontend (About, Events, Join MIT).
- **`/app/admin`**: Protected administrative dashboard routes.
- **`/app/api`**: Backend API routes for auth, events, newsletters, and uploads.
- **`/components`**: Organized UI components including feature-specific sections.
- **`/messages`**: JSON translation files for English and Hungarian.
- **`/models`**: Mongoose data schemas for Events and Newsletters.
- **`/lib`**: Shared utility functions and service layers.

## 📄 License

This project is private and intended for the MIT community.
