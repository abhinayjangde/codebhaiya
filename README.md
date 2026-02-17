<div align="center">

# [CodeBhaiya](https://www.codebhaiya.com)

> **The right way to learn coding.**

An open-source educational platform featuring programming courses, an AI-powered blog system, and a community-driven learning experience — built with Next.js 16 and the App Router.

[![YouTube](https://img.shields.io/badge/YouTube-@AbhinayJangde-red?logo=youtube)](https://www.youtube.com/@AbhinayJangde)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?logo=discord&logoColor=white)](https://discord.com/invite/CxPBRSZut7)
[![GitHub](https://img.shields.io/badge/GitHub-abhinayjangde-181717?logo=github)](https://github.com/abhinayjangde)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abhinay%20Jangde-0A66C2?logo=linkedin)](https://www.linkedin.com/in/abhinay-jangde-a195011b9/)

</div>

---

## ✨ Features

- **Blog System** — Full CRUD with rich text (TipTap) and Markdown editors, tags, categories, featured images, view counts, likes, and threaded comments
- **AI Integration** — AI-powered blog post summarization and an in-context chat assistant (Google Generative AI via Vercel AI SDK)
- **Authentication** — Email/password auth with email verification, password reset, and role-based access control (Admin / Creator / User)
- **Creator Dashboard** — Create, edit, preview, and publish blog posts
- **Admin Dashboard** — Manage all users, posts, and creators
- **Image Management** — Cloudinary-backed uploads with organized per-user/per-post folder structure
- **SEO** — Dynamic sitemap, RSS feed (`/feed.xml`), OpenGraph & Twitter Card metadata, `robots.txt`
- **Responsive UI** — Dark/light theme, animated hero section, testimonials carousel, skeleton loading states

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router, React 19, React Compiler) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4, `@tailwindcss/typography` |
| **UI Components** | shadcn/ui (Radix primitives), Aceternity UI, Lucide icons, Framer Motion |
| **Rich Text Editor** | TipTap |
| **Markdown** | react-markdown + rehype-highlight + remark-gfm |
| **Authentication** | better-auth (email/password, verification, password reset) |
| **Database** | PostgreSQL + Prisma 7 (with `@prisma/adapter-pg`) |
| **AI** | Vercel AI SDK + Google Generative AI |
| **File Storage** | Cloudinary |
| **Email** | Nodemailer (SMTP) |
| **Forms** | React Hook Form + Zod |
| **Notifications** | Sonner |
| **Deployment** | Vercel |
| **Package Manager** | pnpm |

---

## 📁 Project Structure

```
codebhaiya/
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (ThemeProvider, Navbar, Footer)
│   │   ├── page.tsx            # Homepage
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── sitemap.ts          # Dynamic sitemap generation
│   │   ├── (auth)/             # Auth pages (login, register, verify, reset)
│   │   ├── (blogs)/            # Blog listing + individual post pages
│   │   ├── (courses)/          # Courses pages
│   │   ├── (policy)/           # Legal pages (privacy, terms, refund)
│   │   ├── api/                # API route handlers
│   │   ├── contact/            # Contact page
│   │   ├── creator/            # Public creator profiles
│   │   ├── dashboard/          # User / Creator / Admin dashboards
│   │   ├── feed.xml/           # RSS feed
│   │   └── referrals/          # Referral links page
│   │
│   ├── components/
│   │   ├── ui/                 # Base UI primitives (shadcn/ui + custom)
│   │   ├── blog/               # Blog feature components
│   │   ├── dashboard/          # Dashboard components
│   │   └── editor/             # Content editors (Markdown, Rich Text)
│   │
│   ├── lib/                    # Core shared libraries
│   ├── config/                 # Centralized env variable access
│   ├── prisma/                 # Prisma schema & migrations
│   ├── schemas/                # Zod validation schemas
│   ├── hooks/                  # Custom React hooks
│   ├── helpers/                # Utility helpers
│   ├── providers/              # React context providers
│   ├── types/                  # TypeScript type definitions
│   └── styles/                 # Additional CSS
│
├── architecture.md             # Detailed architecture documentation
├── AGENTS.md                   # AI agent/contributor guidelines
├── docker-compose.yml          # Local PostgreSQL via Docker
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) (package manager)
- [Docker](https://www.docker.com/) (for local PostgreSQL) — or access to an external PostgreSQL instance
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/abhinayjangde/codebhaiya.git
cd codebhaiya
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start PostgreSQL

Using Docker (recommended):

```bash
docker compose up -d
```

This starts a PostgreSQL instance with the default credentials configured in `docker-compose.yml`.

### 4. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

See the [Environment Variables](#-environment-variables) section below for details on each variable.

### 5. Set up the database

```bash
pnpm db:migrate
```

### 6. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`. Below is a reference for all required variables:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_BASE_URL` | Application base URL (e.g. `http://localhost:3000`) |
| `BETTER_AUTH_SECRET` | Secret key for better-auth session signing |
| `BETTER_AUTH_URL` | Auth base URL (same as `NEXT_PUBLIC_BASE_URL`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `MAIL_SERVICE` | Email service provider (e.g. `mailtrap`) |
| `MAIL_HOST` | SMTP host |
| `MAIL_PORT` | SMTP port |
| `MAIL_USER` | SMTP username |
| `MAIL_PASSWORD` | SMTP password |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key (for AI features) |
| `OPENAI_API_KEY` | OpenAI API key (optional) |
| `PERPLEXITY_API_KEY` | Perplexity API key (optional) |
| `GROQ_API_KEY` | Groq API key (optional) |
| `DISCORD` | Discord invite link |
| `YOUTUBE` | YouTube channel URL |
| `GITHUB` | GitHub profile URL |
| `LINKEDIN` | LinkedIn profile URL |
| `X` | X (Twitter) profile URL |
| `INSTAGRAM` | Instagram profile URL |

For third-party service setup:
- **Google OAuth**: [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
- **Cloudinary**: [cloudinary.com](https://cloudinary.com/) → Dashboard → Account Details
- **Email (Mailtrap)**: [mailtrap.io](https://mailtrap.io/) for development, or use any SMTP provider
- **Google AI**: [Google AI Studio](https://aistudio.google.com/) → Get API Key

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Generate Prisma client and create a production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint checks |
| `pnpm db:generate` | Regenerate the Prisma client |
| `pnpm db:migrate` | Run Prisma database migrations |
| `pnpm db:push` | Push schema changes directly to the database |
| `pnpm db:studio` | Open Prisma Studio (database GUI) |

---

## 🗄 Data Model

The database uses the following core entities:

```
User ──┬── Profile         (1:1 — bio)
       ├── Post[]           (1:N — authored blog posts)
       ├── Comment[]        (1:N — authored comments)
       ├── Like[]           (1:N — post likes)
       └── Session[]        (1:N — auth sessions)

Post ──┬── Comment[]        (1:N — post comments)
       └── Like[]           (1:N — post likes)
```

### User Roles

| Role | Capabilities |
| --- | --- |
| **Admin** | Full access — manage all users, posts, and creators |
| **Creator** | Create, edit, and publish own blog posts |
| **User** | Read blogs, comment, like, and manage own profile |

---

## 🔌 API Routes

| Endpoint | Methods | Description |
| --- | --- | --- |
| `/api/auth/[...all]` | ALL | better-auth handler (login, register, sessions) |
| `/api/posts` | GET, POST | List published posts (paginated) / Create post |
| `/api/posts/[id]` | GET, PUT, DELETE | Read / Update / Delete a post |
| `/api/comments/[id]` | GET, POST, DELETE | Manage comments on a post |
| `/api/chat` | POST | AI chatbot (blog post Q&A) |
| `/api/summarize` | POST | AI blog post summarization |
| `/api/upload` | POST | General file upload (Cloudinary) |
| `/api/upload/post-image` | POST | Blog post image upload |
| `/api/user/profile` | PUT | Update user profile |
| `/api/user/change-password` | POST | Change user password |
| `/api/user/account` | DELETE | Delete user account |
| `/api/contact` | POST | Submit contact form |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make** your changes following the project conventions:
   - TypeScript with strict mode
   - Prettier formatting (2-space indent, semicolons, double quotes, trailing commas)
   - kebab-case filenames, PascalCase component names
4. **Validate** your changes:
   ```bash
   pnpm lint
   pnpm build
   ```
5. **Commit** with [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push** and open a **Pull Request**

### PR Checklist

- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] Manually tested affected flows
- [ ] Screenshots/video included for UI changes
- [ ] Clear description of the problem and solution

See [AGENTS.md](./AGENTS.md) for detailed coding conventions and guidelines.

---

## 📄 Documentation

- [architecture.md](./architecture.md) — Detailed architecture, data model, and feature documentation
- [AGENTS.md](./AGENTS.md) — Repository guidelines and coding conventions
- [prd.md](./prd.md) — Product requirements document

---

## 🔗 Links

- **Website**: [codebhaiya.com](https://www.codebhaiya.com)
- **YouTube**: [@AbhinayJangde](https://www.youtube.com/@AbhinayJangde)
- **Discord**: [Join Community](https://discord.com/invite/CxPBRSZut7)
- **GitHub**: [abhinayjangde](https://github.com/abhinayjangde)
- **LinkedIn**: [Abhinay Jangde](https://www.linkedin.com/in/abhinay-jangde-a195011b9/)
- **X (Twitter)**: [@AbhinayJangde](https://x.com/AbhinayJangde)
- **Instagram**: [@abhinayjangde](https://www.instagram.com/abhinayjangde)

---

## 🗺 Roadmap

- Git & GitHub Course
- Docker Course
- GenAI Course
- API Rate Limiting
- CSRF Protection

---

## 📝 License

This project is open source.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/abhinayjangde">Abhinay Jangde</a> and the CodeBhaiya community.</sub>
</div>
