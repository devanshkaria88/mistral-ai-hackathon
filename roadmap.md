# MemoryVault — Hackathon Build Roadmap
## Saturday Feb 28 – Sunday Mar 1, 2026

---

## Team Roles (Adapt Based on Actual Team)

| Role | Focus | Primary Cursor Projects |
|---|---|---|
| **Dev A (Devansh)** | Backend + Integrations + AI pipelines | NestJS API, Bedrock, ElevenLabs, W&B |
| **Dev B** | Flutter app — all screens and flows | Flutter app, design system, BLoC logic |
| **Dev C** | Voice + Demo + Fine-tuning + Pitch | ElevenLabs setup, voice clone, demo data, pitch prep |

If team of 2: Dev A takes backend + integrations, Dev B takes Flutter + voice/demo prep.

---

## Phase 0: Pre-Hackathon (Friday Night Feb 27)
**Duration: 1-2 hours | Goal: Zero setup friction on Saturday morning**

### All Team Members
- [ ] Clone shared GitHub repo (create fresh monorepo: `/backend`, `/mobile`, `/docs`)
- [ ] Ensure all accounts created and credits claimed:
  - Mistral account + billing + $15 credits
  - AWS account + Bedrock access enabled for Mistral models
  - HuggingFace account + join hackathon org
  - ElevenLabs account + Creator Plan claimed via Discord
  - W&B account + API key
  - Firebase project created + Google Auth enabled
  - NVIDIA build.nvidia.com account
- [ ] Install Mistral Vibe CLI (special prize eligibility — use it for ALL coding)

### Dev A (Backend)
- [ ] Scaffold NestJS project with TypeORM, PostgreSQL, Swagger, Config module
- [ ] Set up `.env.example` with all required keys
- [ ] Create initial migration: users table, base entity pattern
- [ ] Configure Swagger at `/api/docs` with completeness test stub
- [ ] Docker compose for local PostgreSQL + pgvector

### Dev B (Mobile)
- [ ] Scaffold Flutter project with Clean Architecture folder structure
- [ ] Set up `injectable`, `freezed`, `bloc`, `go_router` dependencies
- [ ] Configure Firebase project + Google Sign-In
- [ ] Create design system tokens (colors, typography, spacing)
- [ ] Create `AppButton`, `AppCard`, `AppTextField` base widgets

### Dev C (Voice/Demo)
- [ ] Test ElevenLabs conversational agent API — create a test agent, verify session URL flow works
- [ ] Test Vauxtral STT pipeline — send audio, get transcript
- [ ] Test ElevenLabs IVC API — clone a test voice from 1-min sample
- [ ] Draft the "Margaret" story arc for demo seed data
- [ ] Prepare 2-minute pitch script outline

---

## Phase 1: Saturday Morning (9:00 AM – 1:00 PM)
**Duration: 4 hours | Goal: Auth flow end-to-end + core entities + skeleton screens**

### Dev A — Backend Core
- [ ] Implement Firebase idToken verification service
- [ ] Build auth module: `POST /auth/google` (idToken → JWT), `POST /auth/refresh`, `GET /auth/me`
- [ ] Create all entity files: User, FamilyGroup, Conversation, Story, Person, Place, Theme, VoiceProfile, PersonaMessage
- [ ] Create and run migrations for all entities (including pgvector extension + embedding column)
- [ ] Build users module: basic CRUD
- [ ] Build family module: create group, invite member, list members
- [ ] Swagger annotations on everything built so far
- [ ] Run swagger completeness test — ensure it passes

### Dev B — Mobile Core
- [ ] Implement auth flow: Google Sign-In → Firebase → backend JWT exchange
- [ ] Build auth BLoC with states: Initial, Loading, Authenticated, Unauthenticated
- [ ] Implement secure JWT storage + auth interceptor
- [ ] Set up go_router with auth redirect
- [ ] Build skeleton screens: Login, Home, Vault (empty), Conversations (empty), Persona (empty), Profile
- [ ] Bottom navigation shell with 4 tabs

### Dev C — Voice Pipeline
- [ ] Set up ElevenLabs conversational agent with Mistral-powered system prompt
- [ ] Configure agent personality: warm, curious, patient, story-drawing
- [ ] Test full flow: start session → have conversation → end session → fetch transcript
- [ ] Document the API flow for Dev A to integrate
- [ ] Start recording clean voice samples for demo voice clone (find quiet space)

**Checkpoint 1:00 PM — Auth works end-to-end. App shows logged-in home screen. Voice agent has test conversation.**

---

## Phase 2: Saturday Afternoon (1:00 PM – 7:00 PM)
**Duration: 6 hours | Goal: Conversation flow + Story extraction + Vault display**

### Dev A — Conversations + Extraction Pipeline
- [ ] Build conversations module: `POST /start` (creates ElevenLabs session, returns URL), `POST /:id/end`, `GET /`, `GET /:id`
- [ ] Integrate AWS Bedrock client — test Mistral Large 3 call
- [ ] Build story extraction processor: transcript → Mistral Large 3 with function calling → structured stories
- [ ] Generate embeddings for each story via Mistral Embeddings on Bedrock
- [ ] Save stories with pgvector embeddings
- [ ] Build stories module: `GET /` (with filters), `GET /:id`, `GET /search` (semantic), `GET /timeline`
- [ ] Integrate W&B Weave tracing on extraction pipeline
- [ ] Swagger annotations on all new endpoints

### Dev B — Conversation + Vault Screens
- [ ] Generate API client from backend Swagger JSON (`swagger_parser`)
- [ ] Build conversation list screen (shows past conversations with status)
- [ ] Build "Start Conversation" flow: tap button → call backend → open session URL in WebView
- [ ] Build conversation detail screen (shows extracted stories after processing)
- [ ] Build Vault screen: timeline view with story cards
- [ ] Build story detail screen: full text + theme tags + people mentioned
- [ ] Build search bar with semantic search

### Dev C — Voice Clone + Demo Prep
- [ ] Create IVC voice clone from recorded samples via ElevenLabs API
- [ ] Test TTS with cloned voice — generate audio for a sample story
- [ ] Build story audio generation: backend endpoint that takes story text → ElevenLabs TTS with cloned voice → returns audio URL
- [ ] Seed database with 5-8 "Margaret" stories (write them manually from the story arc)
- [ ] Generate audio versions of seeded stories using cloned voice
- [ ] Begin preparing demo script with specific click-through sequence

**Checkpoint 7:00 PM — Can start a conversation, extract stories, see them in the vault. Voice clone exists and can read stories aloud.**

---

## Phase 3: Saturday Evening (7:00 PM – 12:00 AM)
**Duration: 5 hours | Goal: Persona + Voice playback + Polish**

### Dev A — Persona + Voice Endpoints
- [ ] Build persona module: `POST /ask` (embed question → pgvector search → Mistral Large 3 response with context → TTS audio)
- [ ] Build voice module: `GET /profile`, `POST /clone/update`
- [ ] Add audio URL field to story responses (generated via ElevenLabs TTS)
- [ ] W&B Weave tracing on persona pipeline
- [ ] Self-improvement evaluation: log extraction quality metrics to W&B Models
- [ ] API polish: error handling, edge cases, validation

### Dev B — Persona Screen + Audio + Polish
- [ ] Regenerate API client with new endpoints
- [ ] Build Persona chat screen: message list, text input, send button
- [ ] Add audio playback to persona responses (play in cloned voice)
- [ ] Add audio playback to story detail screen
- [ ] Add source attribution on persona responses (tap to open source story)
- [ ] Add "Based on stories shared by [Name]" disclaimer
- [ ] UI polish pass: transitions, loading states, empty states

### Dev C — Demo Hardening
- [ ] Run full demo flow end-to-end — identify and fix any gaps
- [ ] Record backup demo video (screen recording of full flow)
- [ ] Prepare W&B dashboard: clean Weave traces, extraction metrics, model tracking
- [ ] Write the final 2-minute pitch script
- [ ] Prepare Q&A answers for each judge persona

**Checkpoint 12:00 AM — Full flow works: conversation → vault → persona in cloned voice. Demo script is written.**

---

## Phase 4: Sunday Morning (8:00 AM – 12:00 PM)
**Duration: 4 hours | Goal: W&B self-improvement loop + fine-tuning bonus + final polish**

### Dev A — W&B Self-Improvement + Hardening
- [ ] Implement extraction quality evaluation: compare extracted entities against manually tagged ground truth
- [ ] Log evaluation results to W&B Models
- [ ] Implement prompt improvement loop via W&B MCP (if time allows)
- [ ] Generate W&B Report: training curves / extraction improvement / pipeline traces
- [ ] Backend hardening: error scenarios, rate limiting, deployment stability

### Dev B — Final UI Polish
- [ ] Animation pass: page transitions, card interactions, audio waveform visualization
- [ ] Profile screen: show voice clone quality status, conversation count, story count
- [ ] Family invite flow (if time)
- [ ] Final responsive/sizing checks on multiple devices
- [ ] Build and test on physical device for demo

### Dev C — Fine-Tuning Bonus + Pitch
- [ ] If targeting FT bonus: fine-tune Ministral 8B on persona conversation data using HF Jobs or W&B Training
- [ ] Upload fine-tuned adapter to HuggingFace (required for FT track)
- [ ] Rehearse pitch 3x with timer
- [ ] Prepare demo device: charged, screen brightness max, Do Not Disturb on
- [ ] Ensure backup demo video is accessible

---

## Phase 5: Sunday Afternoon (12:00 PM – 4:00 PM)
**Duration: 4 hours | Goal: Submission + pitch prep + deploy**

### All Team
- [ ] Final deploy: backend on cloud, database seeded, app built
- [ ] Submit on hackathon platform: project description, GitHub link
- [ ] Write README.md: problem, solution, tech stack, screenshots, how to run
- [ ] Final pitch rehearsal with live demo — identify any flaky points
- [ ] Prepare 1 backup plan for each demo step (if X fails, show Y instead)
- [ ] Charge all devices, check wifi, test screen sharing / projection

### Submission Checklist
- [ ] Project registered on hackathon platform
- [ ] GitHub repo public with README
- [ ] If fine-tuning track: model/adapter uploaded to HuggingFace
- [ ] W&B project is public (or shareable link for judges)
- [ ] Demo device ready
- [ ] Backup demo video ready
- [ ] Pitch script memorised (not read)

---

## Critical Path (What MUST Work for Demo)

If you're running low on time, protect these in order:

1. **Voice clone of "Margaret"** — the emotional core. Without this, the persona moment falls flat.
2. **Vault with seeded stories** — shows the product vision even if extraction isn't live.
3. **Persona response in cloned voice** — the goosebump moment. This is the demo climax.
4. **One live conversation → extraction flow** — proves it's real, not just seeded data.
5. **W&B Weave dashboard** — shows technical depth for Junaid + Lakee.

Everything else is polish. Protect the critical path.

---

## Cursor/Vibe Coding Tips

- Use Mistral Vibe CLI for as much coding as possible (documents special prize eligibility)
- When prompting Cursor/Claude Code, paste the relevant rules file as context
- For backend: "Follow backend_rules.md. Build the conversations module with full Swagger annotations."
- For mobile: "Follow flutter_rules.md. Build the Vault screen with timeline view and story cards."
- Generate, don't iterate: if a component is wrong, regenerate from better prompt rather than debugging
- Test after every major component — don't build blind for hours
- Commit frequently with descriptive messages — judges may check GitHub history
