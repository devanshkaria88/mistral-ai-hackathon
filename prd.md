# MemoryVault — Product Requirements Document
## Mistral AI Hackathon 2026 · London Edition

---

## One-Liner
An AI voice companion that calls elderly loved ones, listens to their life stories, preserves their wisdom in a browseable vault, and lets family talk to their persona — in their own voice — forever.

---

## Problem
- 2M+ people aged 75+ live alone in England, facing loneliness and cognitive decline
- Life stories, wisdom, and family history are lost every day because nobody records them
- Existing solutions (StoryWorth, memoirs) are text-only, require effort from the elderly person, and don't preserve voice or personality
- Families feel guilty about not visiting enough and disconnected from aging relatives

## Solution
MemoryVault is a voice-first platform with three modes:

### Mode 1: Companion Calls (Recording)
- AI companion has warm, curious daily conversations with elderly users via phone/app
- Draws out life stories using guided prompts ("You mentioned Arthur last time — tell me about meeting him")
- Extracts structured data: stories, people, places, dates, themes, emotions
- Saves audio for progressive voice cloning
- Tracks conversation patterns for optional cognitive health signals

### Mode 2: The Vault (Family Archive)
- Beautiful, browseable archive of extracted stories
- Organised by: timeline, people, places, themes (love, work, childhood, war, lessons)
- Each story is readable as text AND playable in the person's cloned voice
- Family members can explore, bookmark, and share stories
- Exportable as auto-biography PDF or audio memoir

### Mode 3: The Persona (Interactive Legacy)
- Family asks questions and gets responses drawn from real stories the person told
- Responds in the person's cloned voice (ElevenLabs IVC, progressively improving)
- Persona is explicit about sourcing: "Based on what Margaret shared with me about..."
- Not a resurrection — a memory interface with dignity and transparency

---

## Target Users
| User | Role | Key Need |
|---|---|---|
| Elderly person (75+) | Storyteller | Companionship, feeling heard, legacy |
| Adult children (40-60) | Vault explorer, payer | Peace of mind, connection, preservation |
| Grandchildren (15-35) | Persona user | Understanding heritage, hearing stories |

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Mobile | Flutter (BLoC + Freezed + Injectable) | Cross-platform, fast iteration |
| Backend | NestJS + TypeORM + PostgreSQL + pgvector | Structured + vector search |
| LLM (Conversation) | Mistral Large 3 via AWS Bedrock | Hackathon track requirement |
| LLM (Persona) | Fine-tuned Ministral 8B | Persona personality matching |
| STT | Vauxtral (Mistral) | Hackathon track alignment |
| TTS + Voice Clone | ElevenLabs (IVC API) | Best-in-class voice, special prize |
| Voice Agent | ElevenLabs Conversational Agent | Manages call flow, turn-taking |
| Experiment Tracking | W&B Models + Weave + MCP | Self-improvement loop, special prize |
| Auth | Firebase (Google) → Backend JWT | Fast, reliable, mobile-native |
| Embeddings | Mistral Embeddings via Bedrock | Semantic story search |

---

## Hackathon Track Alignment

| Track/Prize | How We Qualify |
|---|---|
| **Agents Track (API)** | Multi-agent pipeline: conversation → extraction → persona |
| **AWS Bedrock** | Mistral models served via Bedrock for all LLM calls |
| **ElevenLabs Voice Prize** | Vauxtral STT + ElevenLabs TTS + Voice Cloning + Conversational Agent |
| **Mistral Vibe Prize** | Built using Mistral Vibe CLI as coding tool |
| **W&B Self-Improvement** | Agent evaluates extraction quality, improves via W&B MCP loop |
| **London Podium** | High usefulness + creativity + technical depth + emotional demo |

---

## Core Data Entities

- **User** — auth, profile, role (elderly/family), family group linkage
- **FamilyGroup** — links elderly person to their family members
- **Conversation** — session metadata, transcript, audio URL, extracted data
- **Story** — extracted narrative unit with title, text, audio, embedding, tags
- **Person** — entity mentioned in stories (name, relationship, linked stories)
- **Place** — location entity (name, coordinates if known, linked stories)
- **Theme** — categorical tag (love, work, childhood, war, faith, lessons, etc.)
- **VoiceProfile** — ElevenLabs voice clone ID, audio samples count, quality tier
- **PersonaMessage** — family member query + persona response + source stories

---

## API Surface (Key Endpoints)

### Auth: `/api/v1/auth`
- `POST /google` — Firebase idToken → JWT exchange
- `POST /refresh` — Refresh JWT
- `GET /me` — Current user profile

### Conversations: `/api/v1/conversations`
- `POST /start` — Generate ElevenLabs session URL for mobile
- `POST /:id/end` — End session, trigger transcript fetch + processing
- `GET /` — List user's conversations
- `GET /:id` — Conversation detail with extracted stories

### Stories: `/api/v1/stories`
- `GET /` — List stories (filterable by person, place, theme, date range)
- `GET /:id` — Story detail with audio playback URL
- `GET /search` — Semantic search across stories (pgvector)
- `GET /timeline` — Stories organised chronologically
- `POST /:id/bookmark` — Family member bookmarks a story

### Persona: `/api/v1/persona`
- `POST /ask` — Send question, get persona response + source stories
- `GET /history` — Persona conversation history

### Family: `/api/v1/family`
- `POST /invite` — Invite family member (link/code)
- `GET /members` — List family group members
- `GET /vault` — Full vault view for family member

### Voice: `/api/v1/voice`
- `GET /profile` — Voice clone status and quality metrics
- `POST /clone/update` — Trigger voice clone update with new audio samples

---

## MVP Scope (Hackathon Weekend)

### Must Have (Demo-critical)
- [ ] Auth flow (Google → Firebase → JWT)
- [ ] Start companion conversation (ElevenLabs agent session via backend URL)
- [ ] Fetch + store transcript after conversation ends
- [ ] Extract stories from transcript (Mistral Large 3 via Bedrock)
- [ ] Display stories in Vault view (timeline + theme filters)
- [ ] Semantic search across stories (pgvector)
- [ ] Persona: ask a question, get response from persona voice
- [ ] Voice clone from conversation audio (ElevenLabs IVC)
- [ ] W&B Weave tracing on extraction + persona pipelines

### Nice to Have
- [ ] People/places entity extraction with relationship graph
- [ ] Auto-biography export (PDF)
- [ ] Cognitive health signals dashboard
- [ ] Progressive voice clone quality tracking
- [ ] W&B self-improvement eval loop

### Out of Scope (Post-hackathon)
- Professional voice cloning (PVC) — requires person to verify themselves
- Real phone call integration (Twilio/etc.) — app-only for hackathon
- Multi-language support
- Payment/subscription flow

---

## Success Metrics (Demo Day)
1. Judge says "I want to try this" — the emotional reaction test
2. End-to-end flow works live: conversation → vault → persona in cloned voice
3. W&B dashboard shows real traces and evaluation metrics
4. Pitch lands the "goosebump moment" when persona speaks in cloned voice
