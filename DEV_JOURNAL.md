# 📌 Mizan Project Overview
Mizan is a modern AgTech Platform designed for farm management and field monitoring. This monorepo contains the entire stack, built for high performance and scalability using the Bun ecosystem.

---

## 🏗️ Architecture Stack

| Layer | Technology | Details |
|---|---|---|
| **Runtime / Package Manager** | [Bun](https://bun.sh/) | Fast all-in-one JavaScript runtime & workspace manager. |
| **Backend API** | [Hono](https://hono.dev/) | Lightweight, fast web framework running on port `3000`. |
| **Frontend Web** | [React](https://react.dev/) + [Vite](https://vitejs.dev/) | Modern UI stack running on port `5173`. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS with native Vite integration. |
| **Database** | [PostgreSQL 15](https://www.postgresql.org/) | Relational DB running via Docker on port `5434`. |
| **ORM** | [Prisma 7](https://www.prisma.io/) | Type-safe database client with Driver Adapters. |

---

## 🚀 Setup & Run Instructions

### 1. Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- [Bun](https://bun.sh/) installed (`powershell -c "irm bun.sh/install.ps1 | iex"` on Windows).

### 2. Infrastructure Setup
Spin up the PostgreSQL database:
```bash
docker-compose up -d
```
*Note: The database is mapped to port **5434** to avoid conflicts with local PG installations.*

### 3. Database Initialization
Navigate to the API directory and sync the schema:
```bash
cd apps/api
bun install
bunx prisma db push
bunx prisma generate
```

### 4. Running the Development Servers
You can start both applications using Bun's workspace commands from the **root** directory:

**Start Backend (API):**
```bash
bun --filter @mizan/api dev
```

**Start Frontend (Web):**
```bash
bun --filter web dev
```

---

## 🗺️ Development Log / Roadmap

### Phase 1: Infrastructure & Database setup ✅
- [x] Bun Monorepo workspace configuration.
- [x] Docker Compose setup for PostgreSQL 15 (port 5434).
- [x] Prisma 7 initialization with relational schema (User, Farm, Field).

### Phase 2: Backend API Structure ✅
- [x] Hono API scaffolding.
- [x] Refactored to modular architecture (Routes, Lib, Singleton Prisma).
- [x] Implementation of Health Check and User List/Create endpoints.

### Phase 3: Frontend Scaffold ✅
- [x] Vite + React + TypeScript setup.
- [x] Tailwind CSS v4 integration with Vite plugin.
- [x] API Proxy configuration to avoid CORS.
- [x] Dashboard UI with real-time backend health monitoring.

### Phase 4: Core Features ✅
- [x] Full CRUD operations for Users, Farms, and Fields.
- [x] Relational data integrity (Foreign Key verification).
- [x] Geographic data (JSON) and Area calculation support.

### Phase 5: UI Expansion ✅
- [x] Build Frontend UI forms to consume the Users and Farms API.
- [x] Relational selection (Owner dropdown) for Farm creation.
- [x] Real-time data synchronization and status monitoring.

### Phase 6: Fields & Mapping ✅
- [x] Integrated Leaflet + react-leaflet-draw for interactive polygon drawing.
- [x] Connected FieldMap component to the Fields API for spatial data persistence.
- [x] Turf.js used for server-side area calculation (m² → hectares).
- [x] Tabbed dashboard UI (Users / Farms / Fields) with consistent design.
- [x] Leaflet default icon fix applied for Vite bundler compatibility.

### Phase 7: Satellite Imagery ✅
- [x] Integrated Esri World Imagery as high-resolution satellite base layer.
- [x] Added native Leaflet Layer Control for switching between Satellite and Street views.
- [x] Optimized drawing UI contrast for better visibility on dark satellite tiles.

### Phase 8: Security & Insights (In Progress) ⏳
- [x] API Security & Validation (Zod + Hono Validator).
- [x] Phase 7b: User Authentication & Role-Based Access Control (JWT/bcryptjs).
- [x] Frontend JWT Integration (AuthScreen, LocalStorage, Protected Routes).
- [x] Phase 10: Weather Intelligence (Open-Meteo, Turf.js centroid extraction).
### Phase 11: Quality Assurance & Automated Testing ✅
- [x] Bun native test runner configuration (`bun test`).
- [x] Auth API Testing (Validation & Unauthorized flows).
- [x] Weather API Testing (JWT protection & Query validation).

### Phase 12: Continuous Integration (GitHub Actions) ✅
- [x] CI pipeline configured for `push` and `pull_request`.
- [x] Automated Bun setup and dependency installation.
- [x] Backend tests executed securely.
- [x] Frontend TypeScript and Vite build verification.

### Phase 13: API Pagination & Filtering ✅
- [x] Zod query validation for `page`, `limit`, and `search`.
- [x] Offset pagination with Prisma `skip` and `take`.
- [x] Parallel execution of `findMany` and `count`.
- [x] Case-insensitive search integrated securely with user context.

### Phase 13b: Frontend Pagination & Search Controls ✅
- [x] Dynamic state management for `currentPage`, `totalPages`, and `searchQuery`.
- [x] Search input with optimized 500ms debounce to prevent API spam.
- [x] "Previous" and "Next" pagination controls synced with API metadata.
- [x] Unified layout integrating Tailwind glassmorphism.
### Phase 3: Offline-First PWA (Dexie.js) ✅
- [x] IndexedDB initialized with Dexie.
- [x] Background sync logic implemented in UI components.
- [x] `vite-plugin-pwa` integrated to generate service workers.
- [x] Seamless creation of pending entities when offline.
### Phase 4: إيقاظ العقل السري (The Knowledge Graph & AI) ⏳
- [x] Initialized `mizan-memgraph` Docker container (Graph DB).
- [x] Scaffolding Python FastAPI microservice (`apps/ai`).
- [x] Connected FastAPI to Memgraph via Neo4j Bolt driver.

### Phase 4b: Agricultural Ontology Seeding ✅
- [x] Created `seed_graph.py` to programmatically wipe and populate the DB.
- [x] Added Crop, Disease, and GrowthStage nodes.
- [x] Defined contextual Cypher relationships (`VULNERABLE_TO`, `HAS_STAGE`).

### Phase 4c: AI Intelligence Endpoint (Risk Analysis) ✅
- [x] Defined global Neo4j driver and FastAPI `get_db_session` dependency.
- [x] Implemented `GET /analyze-risk` querying the Memgraph database.
- [x] Integrated parameterized Cypher queries to securely calculate disease vulnerabilities.

### Phase 5a: Node.js to Python Microservices Bridge ✅
- [x] Implemented `/api/insights/:fieldId` endpoint on the Hono Node.js backend.
- [x] Fetched secure geospatial field data via Prisma.
- [x] Utilized `@turf/centroid` and Open-Meteo to gather real-time localized environmental context.
- [x] Established synchronous HTTP communication with the FastAPI Brain (`http://localhost:8000`).

### Phase 5b: Frontend AI Insights Integration ✅
- [x] Introduced distinct `insightsData` state management to handle AI payloads.
- [x] Embedded a "🧠 AI Analysis" action button beside specific fields.
- [x] Designed a custom conditional UI alerting users dynamically (⚠️ Red for detected risks, ✅ Green for safe conditions).

### Bugfix: Crop Type & Humidity Unification ✅
- [x] Updated Prisma schema: added `cropType` to the `Field` model.
- [x] Updated `insights.ts` bridge to dynamically pass `field.cropType` to the AI Brain.
- [x] Synced the frontend UI to display dynamic crop types and exact conditions mapped from the backend response.

### Phase 5c: Dynamic Operations Foundation ✅
- [x] Implemented hybrid JSONB schema via Prisma (`Operation` model).
- [x] Built the `/api/operations` backend route with JWT security and Zod validation.
- [x] Designed a sleek Glassmorphic "Log Action" modal.
- [x] Embedded an inline Activity Log timeline under the field row displaying operations history.

### Phase 5d: Precision Agriculture Metadata & Ontology API ✅
- [x] Updated Prisma `Field` model with `equipmentConfig` and `soilMetadata` JSONB columns.
- [x] Expanded backend `zValidator` and frontend TypeScript interfaces to support the new metadata layers for future AI context.
- [x] Seeded Memgraph Knowledge Graph with the base Olive/Irrigation ontology for advanced context mapping.
- [x] Built the `/api/ontology/operation-requirements` FastAPI endpoint to query the Knowledge Graph and return strict UI rendering JSON metadata.
- [x] Context-Aware AI Feedback Loop: Injected historical `Operation` data into the AI Brain to generate historically grounded advice.
- [x] Implemented Hono API Gateway Pattern for FastAPI: The React frontend securely fetches dynamic ontology fields via Node.js instead of hitting the AI microservice directly.
- [x] Automated E2E Integration Testing Suite: Built Node.js tests verifying the Hono -> Postgres -> FastAPI -> Memgraph pipeline.

### Bug Fixes ✅
### Bug Fixes ✅
- [x] Bulletproof JWT Explicit Routing & UI Error Parsing: Switched from global middleware to explicit path-based protection in `index.ts` to prevent proxy rewriting issues, and implemented robust JSON error extraction in the frontend to eliminate `[object Object]` rendering.
- [x] Fixed Hono Middleware Execution Order for Auth Routes: Moved public route registration (Auth/Health) before the protected route `jwt` middleware in `index.ts` and removed redundant `jwt` calls from sub-routers.
- [x] Implemented Future-Proof Route Grouping for JWT Security: Re-architected `index.ts` using a nested `protectedApi` router to guarantee all future agricultural endpoints are secured by default.
- [x] Implemented Offline UI Indicator: Created a global `OfflineBanner` component to notify users of network status and data persistence behavior.
- [x] Completed CRUD Lifecycle (Delete Functionality): Added backend DELETE routes and frontend UI buttons for removing fields and operations with confirmation dialogs.
- [x] Backend Audit Resolution: Eradicated duplicated JWT configurations, fixed unencrypted passwords in tests, resolved auth conflicts in User routes, and implemented AI service resilience with graceful degradation.
- [x] Fixed Delete (CRUD) cascade and API headers: Implemented `onDelete: Cascade` in Prisma schema, verified `Authorization` headers in frontend `DELETE` requests, and fixed state synchronization issues.
- [x] Implemented Strict JSON Typing: Removed `as any` hacks and implemented `Prisma.InputJsonValue` casting for field and operation metadata to ensure end-to-end type safety.
- [x] Hardened IDOR protection with Query-Level Tenant Isolation: Refactored all `findUnique` and `delete` operations to use `findFirst` with nested ownership filters (`farm: { userId }`), ensuring database-level data separation.
- [x] Fixed dynamic parameter fetching from Memgraph in operation modal: Updated `seed_graph.py` with correct `OperationTemplate` relationships and added `Duration` parameter. Implemented enhanced frontend logging in `App.tsx` for better debugging of ontology requirements.
- [x] Implemented Deep Agronomic Metadata (JSONB + Ontology integration): Extended Prisma schema with `plantingDate` and `agronomicData`. Updated Memgraph ontology with field-level requirements. Refactored "Add Field" form to be dynamic based on crop-specific ontology. Hardened AI analysis to provide age-aware and soil-aware advice.
- [x] Integrated Agronomic Profile UI: Added a dedicated technical grid in the Field list to render soil texture, irrigation systems, exposition, and calculated tree age with professional iconography. Implemented "Complete Profile" CTAs for empty states.

### P0 & P1 Architectural Audit (Security, Memgraph Auth, AI Dockerization, Indices) ✅
- [x] Pinned dependencies in `apps/ai/requirements.txt` with strict version ranges.
- [x] Created `apps/ai/.env.example` for environment variable documentation.
- [x] Refactored `apps/ai/database.py` to read Memgraph credentials from env vars via `python-dotenv`.
- [x] Added Cypher index creation (`Crop(name)`, `OperationTemplate(type)`) in `apps/ai/seed_graph.py`.
- [x] Created production `Dockerfile` for the AI microservice (`apps/ai/Dockerfile`).
- [x] Created `docker-compose.prod.yml` with Memgraph authentication, health checks, and AI service orchestration.

### P0 & P1 Resilient Gateway (Circuit Breaker, Timeout, Configurable AI URL) ✅
- [x] Created `apps/api/src/lib/circuit-breaker.ts` — generic circuit breaker (threshold: 3, cooldown: 30s).
- [x] Created `apps/api/.env.example` — documentation for all environment variables.
- [x] Refactored `apps/api/src/routes/insights.ts` — configurable `AI_SERVICE_URL`, `AbortSignal.timeout`, circuit breaker integration.
- [x] Refactored `apps/api/src/routes/ontology.ts` — same resilient patterns with graceful fallback (`[]`).
- [x] Added `AI_SERVICE_URL` and `AI_TIMEOUT_MS` to `apps/api/.env`.

### AI Microservice Testing & Docker CI Integration ✅
- [x] Created `apps/ai/tests/conftest.py` with mock Neo4j session and FastAPI TestClient fixtures.
- [x] Created `apps/ai/tests/test_ontology.py` — 7 test cases covering operation-requirements and field-requirements endpoints.
- [x] Created `apps/ai/tests/test_insights.py` — 7 test cases covering risk analysis, young tree warning, sandy soil, recent operations.
- [x] Created `apps/ai/tests/test_api.py` — health check, 422 validation, pytest-mock spy integration.
- [x] Consolidated test dependencies into `requirements-test.txt` (pytest, pytest-asyncio, pytest-mock, httpx).
- [x] Updated `.github/workflows/ci.yml` — renamed dep file reference + added `build-ai-docker` job.

### Phase 1: Risk Scoring Engine (P0) + Environment Sync (P1) ✅
- [x] Track A: Hono fetches `temperature_2m` from Open-Meteo, sends `temperature` + `humidity` to AI.
- [x] Track B: Scoring algorithm (0-100), `risk_level` (LOW/MODERATE/HIGH/CRITICAL), unfiltered Cypher query, lifespan pattern.
- [x] Track C: AI service in dev `docker-compose.yml`, Memgraph auth synced with prod, AI `.env` created.
- [x] Track D: 6 new scoring tests + updated existing test mock data for `severity`/`trigger_condition`.

### Future Roadmap
- [ ] Phase 8a: Copernicus Sentinel-2 API integration for NDVI analysis.
- [ ] Phase 8b: Field health monitoring dashboard.
- [ ] Mobile responsive layout optimization.


