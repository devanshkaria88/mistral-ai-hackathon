# Resurrect AI - Backend API

NestJS backend for the Resurrect AI voice-first memory preservation platform.

## Description

Voice-first conversational AI platform that helps elderly users preserve their life stories through natural conversations with an AI companion (Evie), and allows family members to interact with an AI persona of their loved ones using cloned voices.

## Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with pgvector extension
- **ORM**: TypeORM
- **Auth**: Firebase Admin SDK + JWT
- **Voice AI**: ElevenLabs Conversational AI
- **LLM**: Mistral Large 3 (via AWS Bedrock)
- **Embeddings**: Mistral Embed
- **Monitoring**: Weights & Biases (optional)

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16 with pgvector
- Firebase project with service account
- ElevenLabs account with 2 agents (Companion + Persona)
- AWS account with Bedrock access
- Mistral API key (optional)

## Environment Setup

1. **Copy environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Configure required variables** in `.env`:
   - Database credentials
   - JWT secrets
   - Firebase service account details
   - AWS Bedrock credentials (including `AWS_SESSION_TOKEN` if using temporary credentials)
   - ElevenLabs API key and both agent IDs
   - Mistral API key (optional)

3. **Add Firebase service account JSON**:
   - Download from Firebase Console → Project Settings → Service Accounts
   - Place in `backend/` directory (will be gitignored)
   - Update `FIREBASE_PRIVATE_KEY` in `.env`

## Installation

```bash
npm install
```

## Database Setup

### Using Docker (Recommended)

```bash
# Start PostgreSQL with pgvector
docker compose up -d

# Create database
docker exec memoryvault-db psql -U postgres -c "CREATE DATABASE ressurect;"

# Run migrations
npm run migration:run
```

### Manual Setup

```bash
# Install PostgreSQL 16 with pgvector extension
# Create database
createdb ressurect

# Run migrations
npm run migration:run
```

## Running the Application

```bash
# Development with hot reload
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at:
- **API**: http://localhost:3000/api
- **Swagger Docs**: http://localhost:3000/api/docs

## Database Migrations

```bash
# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Generate new migration
npm run migration:generate -- src/migrations/MigrationName

# Create empty migration
npm run migration:create -- src/migrations/MigrationName
```

## AWS Credentials Management

For temporary AWS Workshop Studio credentials:

```bash
# Refresh credentials (paste export commands)
./scripts/refresh-aws-creds.sh

# Or use interactive mode
./scripts/refresh-aws-creds-interactive.sh

# Check credential validity
./scripts/check-aws-creds.sh
```

See `scripts/README.md` for details.

## API Documentation

Once running, visit http://localhost:3000/api/docs for interactive Swagger documentation.

### Key Endpoints

- `POST /api/auth/google` - Sign in with Google
- `POST /api/conversations` - Start Companion or Persona conversation
- `POST /api/conversations/:id/end` - End conversation and process stories
- `GET /api/stories` - List user's stories
- `POST /api/persona/ask` - Ask persona a question
- `GET /api/family/vault/:elderlyUserId` - Get family vault

## Project Structure

```
src/
├── auth/              # Firebase + JWT authentication
├── users/             # User management
├── conversations/     # Conversation lifecycle
├── stories/           # Story management & search
├── persona/           # AI persona interactions
├── family/            # Family groups & invites
├── voice/             # Voice profile & cloning
├── integrations/      # External services
│   ├── elevenlabs/    # ElevenLabs Conversational AI
│   ├── bedrock/       # AWS Bedrock (Mistral)
│   ├── mistral/       # Mistral API
│   ├── firebase/      # Firebase Admin
│   └── wandb/         # Weights & Biases
├── common/            # Shared utilities
├── config/            # Configuration
└── migrations/        # Database migrations
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker compose -f docker-compose.yml up -d

# View logs
docker compose logs -f api

# Stop services
docker compose down
```

## Environment Variables Reference

See `.env.example` for all available configuration options.

**Critical Variables**:
- `ELEVENLABS_COMPANION_AGENT_ID` - Agent for elderly users (Evie)
- `ELEVENLABS_PERSONA_AGENT_ID` - Agent for family members (uses cloned voice)
- `ELEVENLABS_COMPANION_VOICE_ID` - Preset voice for Companion (default: Rachel)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `docker compose ps`
- Check credentials in `.env` match docker-compose.yml
- Verify database exists: `docker exec memoryvault-db psql -U postgres -l`

### AWS Credentials Expired
- Temporary credentials expire after a few hours
- Run `./scripts/refresh-aws-creds.sh` to update
- Check validity with `./scripts/check-aws-creds.sh`

### ElevenLabs Agent Not Working
- Verify both agent IDs are correct in `.env`
- Check API key is valid
- Ensure agents are configured in ElevenLabs dashboard with proper system prompts

## License

MIT
