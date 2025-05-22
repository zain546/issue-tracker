# 🐞 Issue Tracker

A modern, full-stack issue tracking application built with [Next.js 15](https://nextjs.org/), [Prisma ORM](https://www.prisma.io/), and [React 18](https://react.dev/). This project helps teams manage, assign, and track issues efficiently with a beautiful, responsive UI and robust authentication.

---

## ✨ Features

- **Dashboard Overview:** Visual summary and charts for open, in-progress, and closed issues.
- **Issue Management:** Create, edit, delete, and assign issues to users.
- **Dynamic Filtering & Sorting:** Filter issues by status and sort by columns.
- **Authentication:** Secure login with Google OAuth via NextAuth.js.
- **User Assignment:** Assign issues to registered users.
- **Pagination:** Efficiently browse large lists of issues.
- **Error Monitoring:** Integrated with Sentry for real-time error tracking.
- **Responsive UI:** Built with Radix UI and Tailwind CSS for a seamless experience on all devices.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 18, Tailwind CSS, Radix UI
- **Backend:** Next.js API routes, Prisma ORM, MySQL
- **Authentication:** NextAuth.js (Google OAuth)
- **State Management:** React Query
- **Validation:** Zod
- **Error Monitoring:** Sentry
- **Other:** Axios, React Hook Form, Recharts

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/issue-tracker.git
cd issue-tracker
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Set up the following variables:
- `DATABASE_URL` (MySQL connection string)
- `NEXTAUTH_URL` (e.g., http://localhost:3000)
- `AUTH_SECRET` (generate with `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (from Google Cloud Console)

### 4. Set up the database

Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📝 Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint
- `prepare` – Husky git hooks
- `commit` – Commitizen for conventional commits

---

## 📦 Folder Structure

```
app/
  api/           # API routes (Next.js App Router)
  auth/          # Auth config and provider
  components/    # Reusable UI components
  issues/        # Issue pages and components
  ...
prisma/          # Prisma schema and migrations
public/          # Static assets
```

---

## 🛡️ Security & Error Monitoring

- **Authentication:** Only authenticated users can create, edit, or delete issues.
- **Sentry:** All server and client errors are reported to Sentry for monitoring.

---

## 📄 License

MIT

---

## 🙋‍♂️ Author

**Zain Ali**  
[zainali187483@gmail.com](mailto:zainali187483@gmail.com)

---

## 🌐 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Radix UI](https://www.radix-ui.com/)
- [Sentry](https://sentry.io/)

---

> **Feel free to open issues or contribute!**
