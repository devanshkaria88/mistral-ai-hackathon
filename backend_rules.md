# Backend Rules — MemoryVault API
## Instructions for AI Coding Agents (Cursor / Claude Code / Windsurf)

---

## Architecture: NestJS Hybrid Modules

Use domain modules for business logic plus a shared/common module for cross-cutting concerns. Every module is self-contained with its own controllers, services, entities, and DTOs.

### Folder Structure
```
src/
  common/              # Shared module — guards, filters, interceptors, decorators
    guards/            # JwtAuthGuard, RolesGuard
    filters/           # GlobalExceptionFilter
    interceptors/      # TransformInterceptor, LoggingInterceptor
    decorators/        # @CurrentUser(), @Public()
    dto/               # Shared DTOs (PaginationDto, ErrorResponseDto)
    types/             # Shared TypeScript types and interfaces
  auth/
    auth.controller.ts
    auth.service.ts
    auth.module.ts
    dto/
    strategies/        # Firebase verification strategy
  users/
    user.entity.ts
    users.service.ts
    users.module.ts
    dto/
  conversations/
    conversation.entity.ts
    conversations.controller.ts
    conversations.service.ts
    conversations.module.ts
    dto/
    processors/        # Transcript processing, story extraction
  stories/
    story.entity.ts
    stories.controller.ts
    stories.service.ts
    stories.module.ts
    dto/
    entities/          # Person, Place, Theme sub-entities
  persona/
    persona.controller.ts
    persona.service.ts
    persona.module.ts
    dto/
  family/
    family-group.entity.ts
    family.controller.ts
    family.service.ts
    family.module.ts
    dto/
  voice/
    voice-profile.entity.ts
    voice.controller.ts
    voice.service.ts
    voice.module.ts
    dto/
  integrations/        # External service wrappers
    elevenlabs/        # ElevenLabs API client (agents, TTS, cloning)
    bedrock/           # AWS Bedrock client (Mistral models)
    wandb/             # W&B Weave tracing integration
    firebase/          # Firebase Admin SDK
  database/
    migrations/        # TypeORM migrations — NEVER use sync mode
    seeds/             # Seed data for demo
  config/              # Configuration module (env validation)
  app.module.ts
  main.ts
```

---

## Database: TypeORM + PostgreSQL + pgvector

CRITICAL: TypeORM synchronize must be FALSE from day zero. Every schema change goes through migrations.

### Migration Rules
- Generate migrations: `npx typeorm migration:generate src/database/migrations/MigrationName`
- Run migrations: `npx typeorm migration:run`
- Never edit a migration after it has been run — create a new one
- Name migrations descriptively: `CreateUsersTable`, `AddEmbeddingToStories`, `CreateFamilyGroups`

### pgvector Rules
- Install pgvector extension in initial migration: `CREATE EXTENSION IF NOT EXISTS vector`
- Story embeddings column: `vector(1024)` type (Mistral embedding dimension)
- Create HNSW index on embedding column for fast similarity search
- Semantic search uses cosine distance: `ORDER BY embedding <=> query_embedding LIMIT n`

### Entity Rules
- Every entity extends a `BaseEntity` with `id` (UUID), `createdAt`, `updatedAt`
- Use UUID v4 for all primary keys, never auto-increment integers
- Relations use decorators: `@ManyToOne`, `@OneToMany`, `@ManyToMany`
- Soft delete on stories and conversations: `@DeleteDateColumn()` for `deletedAt`
- JSONB columns for flexible metadata (e.g., extracted entities, raw LLM output)

---

## Auth Flow: Firebase → JWT

The mobile app authenticates with Google via Firebase, sends the idToken to our backend, and we verify it then issue our own JWT.

- Firebase Admin SDK verifies the idToken in `auth.service.ts`
- On first login, create user record from Firebase claims (email, name, photo)
- Issue access token (15min expiry) + refresh token (7 day expiry)
- Store refresh token hash in database, not the raw token
- `JwtAuthGuard` validates access token on every protected route
- `@Public()` decorator exempts routes from auth (e.g., health check)
- `@CurrentUser()` param decorator extracts user from JWT payload

---

## API Design: REST + Standard Error Envelope

All API routes are prefixed with `/api/v1/`. Every response follows a consistent shape.

### Success Response
Return the data directly. NestJS serialisation handles the rest. Use `class-transformer` decorators on DTOs for shaping output.

### Error Response (Global Exception Filter)
Every error returns:
```
{
  "status": 400,
  "message": "Human readable error description",
  "errors": [
    { "field": "email", "message": "Email is required" }
  ]
}
```
- `GlobalExceptionFilter` catches all exceptions and formats them consistently
- Use `class-validator` on all incoming DTOs — validation errors auto-format into `errors[]`
- Throw `BadRequestException`, `NotFoundException`, `UnauthorizedException` etc.
- Never return raw 500 errors — catch, log, return generic "Internal server error"

---

## Swagger Documentation: Mandatory and Tested

Every single controller endpoint must have complete Swagger annotations. A custom test enforces this.

### Swagger Rules
- Decorate every controller with `@ApiTags('module-name')`
- Decorate every endpoint with `@ApiOperation({ summary: '...' })`
- Decorate every endpoint with `@ApiResponse({ status: 200, type: ResponseDto })`
- All request DTOs use `@ApiProperty()` on every field
- All response DTOs use `@ApiProperty()` on every field
- Configure Swagger in `main.ts` at path `/api/docs` and JSON at `/api/docs-json`

### Swagger Completeness Test
Create a test in `test/swagger-completeness.spec.ts` that:
- Bootstraps the app module
- Scans all controllers and their method decorators
- Asserts every endpoint has `@ApiOperation` and at least one `@ApiResponse`
- Asserts every DTO property referenced in controllers has `@ApiProperty`
- Fails the test suite if any annotation is missing
- This test runs on every build — non-negotiable

---

## ElevenLabs Integration: Voice Agent Sessions

Backend manages the ElevenLabs voice agent lifecycle. Mobile never talks to ElevenLabs directly.

### Conversation Start Flow
1. Mobile calls `POST /api/v1/conversations/start`
2. Backend creates ElevenLabs agent session via their API
3. Backend configures the agent with the elderly user's conversation context (previous stories, what to ask about next)
4. Backend stores `conversationId` + `elevenLabsSessionId` in DB
5. Backend returns `{ conversationId, sessionUrl }` to mobile
6. Mobile opens session URL for voice interaction

### Conversation End Flow
1. Mobile calls `POST /api/v1/conversations/:id/end`
2. Backend calls ElevenLabs API to fetch full transcript + audio
3. Backend triggers async story extraction pipeline (queue/background job)
4. Story extraction calls Mistral Large 3 via AWS Bedrock
5. Extracted stories get embeddings (Mistral Embeddings via Bedrock) and are saved with pgvector
6. Backend updates conversation status to "processed"

---

## AWS Bedrock Integration

All LLM calls go through AWS Bedrock using Mistral models. Never call Mistral API directly.

- Use `@aws-sdk/client-bedrock-runtime` package
- Wrap in `integrations/bedrock/bedrock.service.ts`
- Models: `mistral.mistral-large-2` for conversation/extraction, `mistral.mistral-embed` for embeddings
- Implement retry logic with exponential backoff for Bedrock rate limits
- Log all LLM calls to W&B Weave for tracing

---

## Story Extraction Pipeline

After each conversation, extract structured stories from the transcript.

- Send transcript to Mistral Large 3 with function calling schema
- Extract: story title, narrative text, people mentioned, places, time period, themes, emotional tone
- Generate embedding for each story using Mistral Embeddings
- Save stories with relations to Person, Place, Theme entities
- Deduplicate people/places across conversations (fuzzy match on name)
- Trace full pipeline in W&B Weave

---

## Persona Service

When family asks the persona a question:
- Embed the question using Mistral Embeddings via Bedrock
- Retrieve top-k relevant stories from pgvector semantic search
- Construct prompt with relevant stories as context
- Call Mistral Large 3 via Bedrock with persona system prompt
- Return response + source story IDs for attribution
- Generate audio response using ElevenLabs TTS with cloned voice ID
- Trace in W&B Weave

---

## W&B Integration

- Initialise W&B Weave in app bootstrap: `weave.init("memoryvault")`
- Wrap story extraction pipeline calls with Weave tracing
- Wrap persona response generation with Weave tracing
- Log extraction quality metrics: stories extracted per conversation, entity counts, coherence scores
- Self-improvement: evaluate extraction accuracy, feed results back to improve prompts

---

## Naming Conventions

- Files: `kebab-case.ts` (NestJS convention)
- Classes: `PascalCase`
- Controllers: `StoriesController` (plural)
- Services: `StoriesService` (plural)
- Entities: `Story` (singular)
- DTOs: `CreateStoryDto`, `StoryResponseDto`, `UpdateStoryDto`
- Modules: `StoriesModule` (plural)

---

## Environment Config

Use `@nestjs/config` with Joi validation. Required env vars:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET`, `JWT_EXPIRY`, `REFRESH_TOKEN_EXPIRY`
- `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- `ELEVENLABS_API_KEY`, `ELEVENLABS_AGENT_ID`
- `WANDB_API_KEY`, `WANDB_PROJECT`

Never commit `.env` files. Provide `.env.example` with all required keys listed.
