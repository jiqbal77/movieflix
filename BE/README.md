# Movie Search & Favorites API

A NestJS backend REST API for searching movies via OMDb and managing favorites with in-memory storage.

## Features

- **Movie Search** - Query movies by title with pagination
- **Favorites Management** - Add, view, and remove favorites
- **In-Memory Storage** - Fast access, resets on restart
- **CORS Enabled** - Ready for frontend integration
- **Docker Support** - Containerized deployment included
- **Environment-Based Config** - Separate configs for dev/staging/prod
- **Input Validation** - Request validation with class-validator
- **Error Handling** - Structured error responses and logging

## Prerequisites

- Node.js 20+
- pnpm (or npm)
- OMDb API Key
- Docker & Docker Compose (optional)

## Setup

**1. Install dependencies**

```bash
pnpm install
```

**2. Configure environment**

This project uses environment-specific config files:

```bash
cp .env.example .env
```

Create environment files:
- `.env` - contains only `NODE_ENV` (development/staging/production)
- `.env.development` - dev-specific vars
- `.env.staging` - staging-specific vars
- `.env.production` - prod-specific vars

The app loads `.env` first, then the environment-specific file based on `NODE_ENV`.

Example `.env.development`:
```env
PORT=3000
OMDB_API_KEY=your_key_here
ALLOWED_ORIGINS=http://localhost:3000
SWAGGER_USER=admin
SWAGGER_PASSWORD=admin
```

## Running

**Development**
```bash
pnpm run start:dev
```
API runs at `http://localhost:3000`

**Production**
```bash
pnpm run build
pnpm run start:prod
```

**Docker**
```bash
docker-compose up --build
docker-compose down
```

## API

All endpoints are versioned under `/v1/api/`

**Search Movies**
```http
GET /v1/api/movies?query=batman&page=1
```
- `query` (required) - search term
- `page` (optional) - default: 1

Returns: `{ results: Movie[], totalResults: number }`

**Get Favorites**
```http
GET /v1/api/favorites
```
Returns: `Movie[]`

**Add Favorite**
```http
POST /v1/api/favorites
Content-Type: application/json

{ "imdbID": "tt0372784" }
```
Returns: `Movie` with full details

**Remove Favorite**
```http
DELETE /v1/api/favorites/:imdbID
```
Returns: `{ success: boolean, message: string }`

**Example with cURL:**
```bash
curl 'http://localhost:3000/v1/api/movies?query=batman&page=1'
curl -X POST http://localhost:3000/v1/api/favorites -H "Content-Type: application/json" -d '{"imdbID":"tt0372784"}'
curl http://localhost:3000/v1/api/favorites
curl -X DELETE http://localhost:3000/v1/api/favorites/tt0372784
```

## API Documentation

Interactive Swagger/OpenAPI documentation is available at:
```
http://localhost:3000/api/docs
```

**Authentication:** The docs are protected with HTTP Basic Auth. Use credentials from your env file:
- Username: Value of `SWAGGER_USER` (default: admin)
- Password: Value of `SWAGGER_PASSWORD` (default: admin)

## Testing

### Running Tests

```bash
pnpm run test              # run all unit tests
pnpm run test:watch        # watch mode (re-run on changes)
pnpm run test:cov          # generate coverage report
```

### Unit Test Coverage

All service layer business logic is thoroughly tested with 17 test cases:

**MoviesService** (`movies.service.spec.ts`)
- ✅ Search returns results when OMDb API responds successfully
- ✅ Search returns empty array when no movies found (graceful degradation)
- ✅ Search throws error for empty/whitespace queries
- ✅ Search handles network failures gracefully
- ✅ Search handles missing API key configuration
- ✅ GetById returns complete movie details for valid IMDb ID
- ✅ GetById returns null for invalid/non-existent IMDb ID
- ✅ GetById validates empty IMDb IDs
- ✅ GetById handles network errors

**FavoritesService** (`favorites.service.spec.ts`)
- ✅ Add movie to favorites fetches from OMDb and stores in Map
- ✅ Adding duplicate favorite returns existing movie (idempotent)
- ✅ Add throws NotFoundException when movie not found in OMDb
- ✅ Get all favorites returns empty array initially
- ✅ Get all favorites returns multiple movies in correct order
- ✅ Remove favorite deletes from Map and returns success
- ✅ Remove non-existent favorite returns graceful success message

**Coverage Results:**
```
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
movies.service.ts     |   97.72 |    82.85 |     100 |   97.56 |
favorites.service.ts  |     100 |       90 |     100 |     100 |
```

**What's Tested:**
- Happy paths (successful operations)
- Edge cases (empty inputs, duplicates)
- Error scenarios (network failures, missing data)
- Business logic validation

## Architecture

```
src/
├── app.module.ts              # Root module, env config
├── main.ts                    # Entry point, CORS setup
├── movies/
│   ├── movies.service.ts      # OMDb API integration
│   ├── movies.controller.ts
│   └── movie.interface.ts
└── favorites/
    ├── favorites.service.ts   # In-memory Map storage
    ├── favorites.controller.ts
    └── dto/
        └── add-favorite.dto.ts
```

**Tech Stack**
- NestJS + TypeScript
- Axios for OMDb calls
- class-validator for DTOs
- @nestjs/config for environment management

## Design Decisions

**Code Simplicity & Readability**
- Single responsibility: each service does one thing well
- Clear function names that describe what they do (`addFavorite`, `removeFavorite`)
- Minimal abstractions - no unnecessary layers or patterns
- Direct API response mapping without complex transformations
- Comments only where logic needs explanation

**Reliability & Error Handling**
- Graceful degradation: OMDb API failures return empty results instead of crashes
- Proper HTTP status codes (404 for not found, 400 for bad input)
- Validation at the entry point prevents bad data from propagating
- Idempotent operations: adding the same favorite twice doesn't cause errors

**Logging Strategy**
- Logged operations: API calls, favorites modified, errors
- Debug level for routine operations, error level for failures
- Service context automatically included (helps trace issues)
- Minimal overhead, no verbose logging in hot paths

**Validation with Pipes**
- Global `ValidationPipe` catches bad requests before they hit controllers
- DTOs define the contract clearly with decorators
- Automatic transformation and validation (whitelist: true strips unknown fields)
- Client gets actionable error messages

**Environment-Based Configuration**
- Separate config files per environment (dev/staging/prod)
- Base `.env` only contains `NODE_ENV` - everything else is environment-specific
- No hardcoded values - all config comes from env vars
- Easy to add new environments without code changes

**API Versioning**
- URI-based versioning (`/v1/api/`) for clear version identification
- Default version set to v1 in main.ts
- Each endpoint decorated with `@Version('1')`
- Makes it easy to introduce breaking changes in v2 without affecting v1 clients
- Version is part of the URL, making it explicit and easy to document

**Swagger/OpenAPI Documentation**
- Interactive API docs at `/api/docs` using Swagger UI
- Protected with HTTP Basic Auth to prevent public access and allow only restricted users
- Prevents exposing internal API structure to unauthorized users
- Auth credentials stored in env vars for easy rotation per environment
- All endpoints, DTOs, and responses documented with decorators
- Auto-generated from code annotations - stays in sync with implementation

**Unit Testing with Jest**
- Jest testing framework with @nestjs/testing utilities
- Mock external dependencies (HttpService, ConfigService) to isolate tests
- Tests run fast (no network calls) and are deterministic
- Focus on service layer business logic - 97-100% coverage
- Test structure: describe blocks for grouping, it blocks for individual cases
- Three-phase pattern: Arrange (setup), Act (execute), Assert (verify)
- Error scenarios tested alongside happy paths
- Mocking prevents real API calls and ensures consistent test results

## Production Readiness

To deploy safely:

**1. Persistence**
- Switch to PostgreSQL/MongoDB for data persistence
- Add migrations and connection pooling

**2. Security**
- JWT authentication for protected routes
- Add helmet for security headers
- Implement rate limiting (e.g., @nestjs/throttler)
- Use secrets manager (AWS Secrets Manager, Vault)
- Enable HTTPS/TLS

**3. Observability**
- Add Winston for structured logging
- Integrate APM (New Relic, DataDog)
- Prometheus metrics + Grafana dashboards
- Health check endpoints

**4. Performance**
- Redis caching for OMDb responses
- Compression middleware
- Load balancing with multiple instances
- CDN for static assets (if any)

**5. Reliability**
- CI/CD pipeline (GitHub Actions, GitLab CI)
- Automated testing in pipeline
- Blue-green or rolling deployments
- Database backups and disaster recovery

## License

MIT
