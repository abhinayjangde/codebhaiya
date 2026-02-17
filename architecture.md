# Architecture – CodeBhaiya

> **"The right way to learn coding."**

CodeBhaiya ([codebhaiya.com](https://www.codebhaiya.com)) is an educational platform built by [Abhinay Jangde](https://www.youtube.com/@AbhinayJangde). It offers programming courses, a blogging system with AI-powered features, and a community-oriented learning experience. The application is a full-stack **Next.js 16** project using the App Router, backed by **PostgreSQL** via **Prisma ORM**.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, React Compiler) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4, `@tailwindcss/typography`, `tw-animate-css` |
| UI Components | Radix UI primitives, Lucide icons, custom animated components (Framer Motion) |
| Rich Text Editing | TipTap (rich text) + React Markdown (rendering) |
| Authentication | better-auth (email/password, email verification, password reset) |
| Database | PostgreSQL (via `pg` driver + Prisma with `@prisma/adapter-pg`) |
| ORM | Prisma 7 |
| AI | Vercel AI SDK (`ai`) + Google Generative AI (`@ai-sdk/google`) |
| File Storage | Cloudinary (image uploads & management) |
| Email | Nodemailer (SMTP, verification & password reset emails) |
| Forms | React Hook Form + Zod validation |
| Notifications | Sonner (toast notifications) |
| Theming | next-themes (dark/light/system) |
| Package Manager | pnpm |
| Deployment | Vercel |

---

## Project Structure

```
codebhaiya/
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, API routes)
│   │   ├── layout.tsx          # Root layout (ThemeProvider, Navbar, Footer, Toaster)
│   │   ├── page.tsx            # Homepage
│   │   ├── loading.tsx         # Global loading state
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── sitemap.ts          # Dynamic sitemap generation
│   │   ├── robots.txt          # SEO robots file
│   │   ├── globals.css         # Global styles
│   │   │
│   │   ├── (auth)/             # Auth route group (login, register, verify-email,
│   │   │                       #   forgot-password, reset-password, settings)
│   │   ├── (blogs)/            # Blog route group (blog listing + individual posts)
│   │   ├── (courses)/          # Courses route group
│   │   ├── (policy)/           # Legal pages (privacy, terms, refund)
│   │   │
│   │   ├── api/                # API route handlers (see API section below)
│   │   ├── contact/            # Contact page
│   │   ├── creator/            # Public creator profile pages
│   │   ├── dashboard/          # Dashboard (user, creator, admin)
│   │   ├── feed.xml/           # RSS feed generation
│   │   └── referrals/          # Referral/affiliate links page
│   │
│   ├── components/
│   │   ├── ui/                 # Base UI primitives (Button, Card, Dialog, Input, etc.)
│   │   ├── blog/               # Blog feature components (search, comments, likes,
│   │   │                       #   markdown renderer, post wrapper, chat)
│   │   ├── dashboard/          # Dashboard components (admin sidebar, post actions)
│   │   ├── editor/             # Content editors (Markdown, Rich Text, Post editor)
│   │   ├── Navbar.tsx          # Global navigation bar
│   │   ├── Footer.tsx          # Global footer
│   │   ├── hero-section.tsx    # Homepage hero with animations
│   │   ├── latest-blogs.tsx    # Homepage latest blog posts (server component)
│   │   ├── recommended-courses.tsx
│   │   ├── testimonial.tsx     # Testimonials carousel
│   │   ├── whoami.tsx          # "About the creator" section
│   │   ├── login-form.tsx      # Login form component
│   │   ├── signup-form.tsx     # Signup form component
│   │   └── image-upload.tsx    # Image upload component
│   │
│   ├── config/
│   │   └── env.ts              # Centralized environment variable access
│   │
│   ├── constants/              # Static data (e.g., referral links)
│   ├── generated/prisma/       # Auto-generated Prisma client
│   ├── helpers/                # Utility helpers (e.g., handle generation)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Core shared libraries (see below)
│   ├── prisma/                 # Prisma schema & migrations
│   ├── providers/              # React context providers (ThemeProvider)
│   ├── schemas/                # Zod validation schemas
│   ├── styles/                 # Additional CSS (code highlighting)
│   └── types/                  # TypeScript type definitions
│
├── AGENTS.md                   # Repository guidelines for AI agents
├── prd.md                      # Product requirements document
├── package.json
├── tsconfig.json
├── next.config.ts
├── prisma.config.ts
└── docker-compose.yml          # Local PostgreSQL via Docker
```

---

## Core Libraries (`src/lib/`)

| File | Purpose |
| --- | --- |
| `auth.ts` | Configures `better-auth` with Prisma adapter, email/password auth, email verification, password reset, and session callbacks that include user roles |
| `auth-client.ts` | Client-side auth hooks via `createAuthClient` from `better-auth/react` |
| `auth-utils.ts` | Role-based authorization helper (`requireRole`) for API routes |
| `prisma.ts` | Singleton Prisma client with PostgreSQL connection pooling (`pg` Pool) |
| `cloudinary.ts` | Cloudinary SDK config + helpers to delete images/folders per post or user |
| `email.ts` | Nodemailer transporter + HTML email templates for verification & password reset |
| `rate-limiter.ts` | Rate limiting utilities (planned) |
| `utils.ts` | General utilities (`cn` for Tailwind class merging) |

---

## Data Model

The application uses **PostgreSQL** with the following Prisma models:

```
User ──┬── Profile        (1:1, bio)
       ├── Post[]          (1:N, authored blog posts)
       ├── Comment[]       (1:N, authored comments)
       ├── Like[]          (1:N, post likes)
       ├── Session[]       (1:N, auth sessions)
       └── Account[]       (1:N, auth provider accounts)

Post ──┬── Comment[]       (1:N, post comments)
       └── Like[]          (1:N, post likes)

Verification               (email verification tokens)
ContactSubmission           (contact form submissions)
```

### User Roles

The system supports three roles with a permission hierarchy:

| Role | Capabilities |
| --- | --- |
| **ADMIN** | Full access — manage all users, posts, creators; admin dashboard |
| **CREATOR** | Create, edit, publish own blog posts; creator dashboard |
| **USER** | Read blogs, comment, like, manage own profile |

---

## API Routes (`src/app/api/`)

| Endpoint | Methods | Description |
| --- | --- | --- |
| `/api/auth/[...all]` | ALL | better-auth catch-all handler (login, register, sessions, etc.) |
| `/api/posts` | GET, POST | List published posts (paginated) / Create new post |
| `/api/posts/[id]` | GET, PUT, DELETE | Read / Update / Delete a specific post |
| `/api/comments/[id]` | GET, POST, DELETE | Manage comments on a post |
| `/api/chat` | POST | AI chatbot endpoint (blog post Q&A via Google Generative AI) |
| `/api/summarize` | POST | AI-powered blog post summarization (TL;DR generation) |
| `/api/upload` | POST | General file upload to Cloudinary |
| `/api/upload/post-image` | POST | Blog post image upload to Cloudinary |
| `/api/user/profile` | PUT | Update user profile |
| `/api/user/change-password` | POST | Change user password |
| `/api/user/account` | DELETE | Delete user account |
| `/api/contact` | POST | Submit contact form |

---

## Key Features

### 1. Blog System
- Full CRUD for blog posts with **rich text (TipTap)** and **Markdown** editor options
- Posts support tags, categories, featured images, and video embeds
- Slug-based routing (`/blog/[slug]`)
- View counting, likes, and threaded comments
- Blog search functionality
- Paginated blog listing
- RSS feed (`/feed.xml`) and dynamic sitemap generation

### 2. AI Integration
- **AI Summarization**: Generates and caches TL;DR summaries for blog posts using the Vercel AI SDK with Google Generative AI
- **AI Chat**: Readers can chat with an AI about a blog post's content

### 3. Authentication & Authorization
- Email/password authentication via `better-auth`
- Email verification flow (sends styled HTML emails via Nodemailer)
- Password reset flow with time-limited tokens (10 min expiry)
- Role-based access control (ADMIN > CREATOR > USER)
- Session management with token-based auth

### 4. Image Management
- Cloudinary integration for all image uploads
- Organized folder structure: `codebhaiya/users/{userId}/posts/{postId}/`
- Cleanup utilities for deleting post or user image folders

### 5. Dashboard
- **User Dashboard**: Profile management, account settings
- **Creator Dashboard**: Create/edit/manage blog posts, preview before publishing
- **Admin Dashboard**: Manage all users, posts, and creators; admin sidebar navigation

### 6. SEO & Content Syndication
- Dynamic sitemap generation from published posts
- RSS feed at `/feed.xml`
- OpenGraph and Twitter Card metadata
- Custom `robots.txt`

### 7. Homepage
- Animated hero section with shooting stars and background line effects
- Latest blog posts section (server-rendered with Suspense skeleton)
- Recommended courses section
- Creator "Who Am I" section
- Testimonials carousel (infinite moving cards)

---

## Authentication Flow

```
Register → Send Verification Email → User Clicks Link → Email Verified → Login
                                                                           ↓
                                                              Session Created (token + role)
                                                                           ↓
                                                              Role-gated Access (API + UI)
```

Password reset follows a similar email-link flow with a 10-minute token expiry.

---

## Deployment

- **Hosting**: Vercel (Next.js optimized)
- **Database**: External PostgreSQL (connection via `DATABASE_URL`)
- **Media**: Cloudinary CDN
- **Email**: SMTP (Gmail or custom provider)
- **Local Dev**: Docker Compose for PostgreSQL + `pnpm dev`

---

## Environment Variables

All configuration is centralized in `src/config/env.ts`. Required variables:

- `DATABASE_URL` – PostgreSQL connection string
- `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL` – Auth configuration
- `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` – Image storage
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` – Email delivery
- `NEXT_PUBLIC_BASE_URL` – Application base URL
- Social links: `DISCORD`, `YOUTUBE`, `GITHUB`, `LINKEDIN`, `X`, `INSTAGRAM`
