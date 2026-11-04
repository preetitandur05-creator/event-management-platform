# Event Management Platform — SAMANVAYA 2027

A complete, reusable full-stack Event Management Website built for college students.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Prisma · Neon PostgreSQL · Resend · Vercel

---

## What is already working

| Feature | Status |
|---------|--------|
| Public multi-page event website (Home, About, Agenda, Partners, Contact, Privacy, Terms) | ✅ Working |
| Event details driven from database (no hard-coded event name after setup) | ✅ Working |
| Open Registration form with server-side validation | ✅ Working |
| Unique Registration ID + Ticket Number + Secure QR code | ✅ Working |
| Ticket details page (mobile-friendly) | ✅ Working |
| Confirmation email via Resend (when API key is set) | ✅ Working |
| One-time browser setup page (`/setup`) — creates Super Admin + seeds SAMANVAYA 2027 | ✅ Working |
| Admin login + basic dashboard with live registration counts | ✅ Working |
| Role-based auth foundation (SUPER_ADMIN) | ✅ Working |
| Full Prisma schema for registrations, tickets, SPOCs, sponsors, emails, reminders, RBAC, audit logs | ✅ Schema ready |
| Student-friendly deploy (GitHub web upload → Vercel → env vars) | ✅ Ready |
| Duplicate registration prevention | ✅ Working |

**Scaffolded in schema / ready for extension:** Form builder, RSVP & Invitation modes, full RBAC UI, SPOC assignment on tickets, email campaigns, scheduled reminders, QR scanner check-in UI, CSV exports, page CMS.

---

## Student Deployment Guide (NO terminal required)

### Step 1 — Download & Extract
Download the project ZIP and extract it on your computer.

### Step 2 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it e.g. `samanvaya-2027` (public or private).
4. **Do not** add README / .gitignore / license (we already have them).
5. Click **Create repository**.
6. On the empty repo page click **uploading an existing file**.
7. Drag **all** the extracted project files and folders into the browser window.
8. Commit the files.

### Step 3 — Create a Neon Database (free)
1. Go to [console.neon.tech](https://console.neon.tech) and sign up / log in.
2. Create a new project (choose a region close to India if available).
3. After creation, click **Connect**.
4. Copy the **Pooled connection** string → this is `DATABASE_URL`.
5. Copy the **Direct connection** string → this is `DATABASE_URL_UNPOOLED`.

### Step 4 — Create a Resend account (for emails)
1. Go to [resend.com](https://resend.com) and create a free account.
2. Create an API key.
3. For testing you can use `onboarding@resend.dev` as the from address.
4. Later, verify your own domain for production emails.

### Step 5 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New… → Project**.
3. Import the GitHub repository you just created.
4. Before deploying, open **Environment Variables** and add:

| Name | Value | Notes |
|------|-------|-------|
| `DATABASE_URL` | (Neon pooled string) | Required |
| `DATABASE_URL_UNPOOLED` | (Neon direct string) | Required |
| `AUTH_SECRET` | any long random string (≥ 32 chars) | Required |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` | Update after first deploy if needed |
| `RESEND_API_KEY` | `re_...` | Required for emails |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` | or your verified domain |
| `RESEND_FROM_NAME` | `SAMANVAYA 2027` | Optional |

5. Click **Deploy**.

Vercel will automatically run `prisma generate` + `prisma db push` + `next build`. Tables are created for you.

### Step 6 — First-time Setup
1. After the deployment succeeds, open:  
   `https://your-project.vercel.app/setup`
2. Enter your admin name, email and a strong password.
3. Click **Create Super Admin & Seed Event**.
4. You will be redirected to the login page.
5. Log in at `/admin/login`.

The public website is now live with the SAMANVAYA 2027 content and registration working.

### Step 7 — Update App URL (optional)
In Vercel → Settings → Environment Variables, set `NEXT_PUBLIC_APP_URL` to your real production URL and redeploy so QR codes and emails contain the correct links.

---

## Local development (only if you have Node.js)

```bash
npm install
cp .env.example .env.local
# fill in DATABASE_URL etc.
npx prisma db push
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```
event-management-platform/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages
│   │   ├── admin/             # Admin login + dashboard
│   │   ├── api/               # API routes
│   │   └── setup/             # First-time setup
│   ├── components/
│   ├── lib/
│   └── emails/
├── .env.example
├── package.json
└── vercel.json
```

## License

MIT — free for student & educational use.
