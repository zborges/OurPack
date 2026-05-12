# Containerization Plan

## Context
Next.js 16 app with PostgreSQL/Drizzle ORM and NextAuth v5. No existing Docker setup. Need multi-container setup for app + database.

## Approach

### Multi-stage Dockerfile (app)
- **Stage 1 (deps)**: Install all dependencies
- **Stage 2 (builder)**: Build Next.js with `output: "standalone"` enabled
- **Stage 3 (runner)**: Minimal Node.js runtime, copy only standalone output

### docker-compose.yml
- **app**: Next.js container, port 3000, depends on db
- **db**: PostgreSQL 16, persistent volume

### Required changes
1. `next.config.ts` - Add `output: "standalone"` for minimal Docker image
2. `.dockerignore` - Exclude node_modules, .git, test files, .env
3. `Dockerfile` - Multi-stage build
4. `docker-compose.yml` - App + PostgreSQL services
5. `.env.example` - Template for required env vars

### Critical files
- `next.config.ts` - Add standalone output config
- `Dockerfile` - New
- `docker-compose.yml` - New
- `.dockerignore` - New
- `.env.example` - New

## Verification
1. `docker-compose up --build` - Services start
2. App responds on http://localhost:3000
3. Database migrations run successfully
4. Auth flow works (signin/signout)
5. `docker-compose down` - Clean shutdown

## Production Notes
- **Database**: Use managed PostgreSQL (RDS, Cloud SQL) for production. Replace `db` service connection string with managed DB endpoint.
- **Dockerfile**: Multi-stage build is production-ready as-is.
- **Production additions needed later**:
  - Health check endpoint (`/health` route)
  - `docker-compose.prod.yml` with restart policies, resource limits
  - Secrets management (AWS Secrets Manager, GCP Secret Manager, or env injection)
  - Reverse proxy / ingress (nginx, ALB, Cloud Run)
  - CI/CD pipeline for image build + deploy
