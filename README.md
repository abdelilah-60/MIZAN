# Mizan AgTech Platform

Welcome to the Mizan monorepo. This project is a full-stack AgTech platform built with Bun, Hono, React, and Prisma.

## 🏁 Quick Start

1. **Docker**: `docker-compose up -d`
2. **API**: `cd apps/api && bunx prisma db push && bun dev`
3. **Web**: `cd apps/web && bun dev`

## 📖 Documentation

For detailed architecture details, step-by-step setup guides, and the development roadmap, please refer to the:

👉 **[DEV_JOURNAL.md](./DEV_JOURNAL.md)**

---

## 📂 Project Structure

- `apps/api`: Hono backend service.
- `apps/web`: React frontend application.
- `packages/*`: Shared configurations and utilities (future).
