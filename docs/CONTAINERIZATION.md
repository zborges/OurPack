# Containerization Setup

## Overview
Multi-container Docker setup for Ourpack (Next.js + PostgreSQL). Development-first, production-ready.

## Architecture
```
┌─────────────┐     ┌─────────────┐
│   Next.js   │────▶│  PostgreSQL │
│    App      │    │     DB      │
│  (port 3000)│     │  (port 5432)│
└─────────────┘     └─────────────┘
```

## Files Created/Modified

### `next.config.ts`
Added `output: 'standalone'` for minimal Docker image. Next.js outputs standalone build to `.next/standalone`, reducing image size from ~2GB to ~200MB.

### `.dockerignore`
Excludes unnecessary files from Docker build context:
- `node_modules` - Reinstalled in container
- `.git`, `*.md` - Not needed at runtime
- `.env*` - Security, use docker-compose env
- `__tests__`, `e2e` - Test files not needed in prod
- `.next/cache` - Build artifact, regenerated

### `Dockerfile`
Multi-stage build (3 stages):

1. **deps** - Install production dependencies
2. **deps-dev** - Install dev dependencies (for Drizzle migrations)
3. **builder** - Build Next.js application
4. **runner** - Minimal runtime image with:
   - Non-root user (nextjs:1001)
   - Standalone output
   - Drizzle migrations
   - Custom entrypoint

### `docker-compose.yml`
Two services:

**app**
- Builds from Dockerfile
- Port 3000
- Depends on db (health check)
- Environment variables for DB and auth

**db**
- PostgreSQL 16 Alpine
- Persistent volume (`postgres_data`)
- Health check via `pg_isready`
- Port 5432 exposed for local access

### `.env.example`
Template for required environment variables:
- `BETTER_AUTH_SECRET` - Required for NextAuth
- `DATABASE_URL` - Optional (docker-compose sets default)

### `.env.local`
Local development overrides. Copy and customize for your environment.

### `docker-entrypoint.sh`
Shell script that runs on container start:
1. Executes `drizzle-kit migrate` to apply database migrations
2. Starts the Next.js server

Ensures database schema is up-to-date before app serves requests.

### `package.json`
Added scripts:
- `db:migrate` - Run Drizzle migrations
- `db:push` - Push schema to database (dev-only)

## Usage

### Start Development Environment
```bash
docker-compose up --build
```

### Start in Background
```bash
docker-compose up -d --build
```

### View Logs
```bash
docker-compose logs -f app
```

### Stop Environment
```bash
docker-compose down
```

### Stop and Remove Volumes (fresh start)
```bash
docker-compose down -v
```

### Access Database Locally
```bash
psql -h localhost -p 5432 -U postgres -d ourpack_dev
```

### Run Commands in Container
```bash
# Run migrations manually
docker-compose exec app npx drizzle-kit migrate

# Open shell
docker-compose exec app sh
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BETTER_AUTH_SECRET` | Yes | `dev-secret-change-in-prod` | NextAuth session secret |
| `DATABASE_URL` | No | `postgresql://postgres:postgres@db:5432/ourpack_dev` | Database connection string |

Generate a secure secret:
```bash
openssl rand -base64 32
```

## Production Considerations

This setup is development-first. For production:

### Database
- **Use managed PostgreSQL** (AWS RDS, Google Cloud SQL, Azure Database)
- Do NOT use containerized PostgreSQL for production data
- Update `DATABASE_URL` in docker-compose to point to managed DB

### Add Health Check Endpoint
Create `/health` route for container orchestration:
```typescript
// app/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok' })
}
```

### Production Docker Compose
Create `docker-compose.prod.yml` with:
- Restart policies (`restart: always`)
- Resource limits (memory, CPU)
- Health checks for app service
- Secrets management (Docker secrets, env injection)
- Reverse proxy / ingress

### Secrets Management
- **Development**: `.env.local` file
- **Production**: 
  - Docker secrets
  - AWS Secrets Manager
  - GCP Secret Manager
  - Environment variable injection from CI/CD

### CI/CD Pipeline
1. Build and tag Docker image
2. Push to container registry (ECR, GCR, Docker Hub)
3. Deploy to orchestration platform (ECS, Cloud Run, Kubernetes)

## Troubleshooting

### Migrations Fail
```bash
# Check database is healthy
docker-compose ps

# View migration logs
docker-compose logs app

# Reset database (dev only!)
docker-compose down -v
docker-compose up --build
```

### App Won't Start
```bash
# Check logs
docker-compose logs app

# Verify environment variables
docker-compose exec app env | grep -E "DATABASE|AUTH"
```

### Database Connection Issues
```bash
# Test DB connectivity from app container
docker-compose exec app nc -zv db 5432

# Check DB logs
docker-compose logs db
```

## Next Steps for Production

1. [ ] Add `/health` endpoint
2. [ ] Create `docker-compose.prod.yml` with restart policies
3. [ ] Set up managed PostgreSQL
4. [ ] Configure secrets management
5. [ ] Set up CI/CD pipeline
6. [ ] Add monitoring/logging (Prometheus, Grafana, ELK)
7. [ ] Configure reverse proxy (nginx, ALB, Cloud Run)
