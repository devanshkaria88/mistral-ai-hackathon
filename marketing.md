# MemoryVault — Marketing & Pitch Playbook
## Mistral AI Hackathon 2026 · London Edition

---

## Positioning Statement

**MemoryVault** is the AI companion that preserves your loved one's life stories, wisdom, and voice — forever. Every conversation becomes a memory. Every memory becomes a legacy.

---

## The Pitch (2 Minutes)

### Hook — 0:00 to 0:15
"Every year, thousands of life stories disappear. Not because they weren't worth telling — but because nobody asked. MemoryVault is an AI companion that calls your loved ones, draws out their stories, and preserves their voice and wisdom for generations."

*Pause. Let it land.*

### Live Demo — 0:15 to 0:50
Show a conversation in progress on the app. The AI companion is mid-conversation:

> "Last time you mentioned meeting Arthur at the dance hall in 1962. That sounds wonderful — what was that night like?"

The elderly person responds (pre-recorded for demo reliability). Show the real-time transcript appearing. Show the story extraction happening in the background — names, dates, places being tagged automatically.

**Key moment:** The voice is warm, patient, unhurried. It sounds like a kind friend, not a robot interviewer. This is the ElevenLabs quality moment.

### The Vault — 0:50 to 1:15
"Every conversation builds this."

Switch to the Vault view. Show a beautiful timeline of Margaret's life — stories arranged by decade. Tap into a story about meeting Arthur. Show the full text, the tagged people and places.

**The moment:** Press play. The story is read back — in Margaret's own voice. The cloned voice is recognisable, warm, real. Let the judges hear it for 5-10 seconds.

"Her family can explore her entire life story — organised by people, places, and themes."

### The Persona — 1:15 to 1:40
"And here's what makes this different from any memoir."

Show the Persona screen. Type: "Grandma, what was your advice about love?"

The persona responds — in Margaret's voice — drawing from the Arthur story and other relationship stories she shared. The response includes attribution: "Based on stories Margaret shared in March 2026..."

**This is the goosebump moment.** Let the voice play. Let the room go quiet.

"She's not here anymore. But her stories are. Her voice is. Her wisdom is."

### Business & Tech — 1:40 to 1:55
"Built on Mistral Large 3 via AWS Bedrock for conversation and story extraction. Fine-tuned Ministral 8B for persona modelling. Vauxtral for transcription. ElevenLabs for voice cloning and conversational AI. Every pipeline traced in Weights & Biases Weave."

"StoryWorth proved families pay $100/year for text-based story preservation. We do it in their actual voice. We sell B2C to families and B2B to care platforms as a companion layer between carer visits."

### Close — 1:55 to 2:00
"MemoryVault. Because every life is worth remembering — in their own words, in their own voice."

---

## Judge-Specific Talking Points

Use these naturally during Q&A, not scripted in the pitch.

### If Francesco (VC) asks about the business model:
"We see three channels: direct-to-family subscription at £8/month, B2B integration with home care platforms — companies like Gladys who already have the elderly customer base but not the AI companion layer — and local council partnerships for preventive care. NHS spends roughly £1.4 billion annually on emergency admissions from elderly falls. Early cognitive detection alone could justify commissioning."

### If Lakee (ML founder) asks about the technical depth:
"The story extraction isn't just NER. We're building conversational cognitive fingerprints — vocabulary richness, response latency, topic coherence, sentence complexity — as feature vectors across sessions. Over time, that longitudinal embedding detects cognitive drift before clinical symptoms appear. The persona model is fine-tuned Ministral 8B on the person's actual conversational patterns, not just their stories. And all of this is evaluated through W&B Weave with real metrics."

### If Anicet (hacker/creative) asks what makes this special:
"Most AI products optimise for productivity. We optimise for dignity. The elderly person isn't a user being monitored — they're a storyteller being honoured. And the Memory Vault isn't a database — it's a living portrait of someone's inner world that grows with every conversation. We think that's a kind of technology that matters."

### If Junaid (W&B) asks about the self-improvement loop:
"Every story extraction gets traced in Weave — the full pipeline from transcript to structured output. We evaluate extraction quality: did we correctly identify people, places, time periods? Did we miss any stories? That evaluation feeds back into prompt optimisation through the W&B MCP Server. Over time, the extraction gets more accurate and more nuanced. We track this in W&B Models."

### If Henry (Mistral) asks about model usage:
"We use the full Mistral stack. Vauxtral for speech-to-text. Mistral Large 3 via Bedrock for the heavy lifting — conversation management with function calling, story extraction, persona response generation. Mistral Embeddings for the semantic search that powers both the vault and persona retrieval. And we fine-tuned Ministral 8B for persona personality matching — it generates responses in the person's style, vocabulary, and cadence."

---

## Social Media Copy (for post-hackathon / public vote)

### Twitter/X — Primary Post
"We built an AI that calls your grandmother, listens to her stories, and preserves her voice forever.

Her grandchildren can explore her life story in a vault — and talk to her persona, in her actual voice, even after she's gone.

Built at @MistralAI hackathon London 🧵"

### Thread (Key beats)
1. Problem: 2M+ people aged 75+ live alone in England. Their stories are disappearing.
2. Solution: MemoryVault — an AI companion that has warm daily conversations and builds a family legacy.
3. Demo: [video clip of persona speaking in cloned voice]
4. Tech: Mistral Large 3, ElevenLabs voice cloning, W&B tracing, AWS Bedrock
5. CTA: Vote for us in the Mistral hackathon global finals! [link]

### LinkedIn — For Francesco/VC audience
"At the Mistral AI hackathon, we built MemoryVault — an AI companion that preserves elderly people's life stories and voice for their families.

The insight: care platforms like Gladys connect families with carers. But between visits, elderly people are alone. MemoryVault fills that gap with meaningful AI companionship that creates lasting value.

Every conversation builds a browseable archive of life stories. Every story is playable in the person's own cloned voice. Families don't just get peace of mind — they get a legacy.

Built with Mistral Large 3 via AWS Bedrock, ElevenLabs voice AI, and W&B for evaluation.

#MistralHackathon #AIforGood #HealthTech #VoiceAI"

---

## Demo Preparation Checklist

### Pre-Record (Do Saturday Evening)
- [ ] Record 2 minutes of clean voice sample in quiet space (for IVC clone)
- [ ] Create the ElevenLabs instant voice clone from sample
- [ ] Pre-record a simulated conversation (AI companion + elderly person) as backup
- [ ] Pre-generate 5-8 extracted stories in the vault from simulated conversations
- [ ] Pre-generate 2-3 persona responses with voice audio
- [ ] Test all audio playback works on demo device

### Demo Environment
- [ ] App running on physical phone (not simulator — judges notice)
- [ ] Backend deployed (Render/Railway/EC2) — not localhost
- [ ] Database seeded with demo data (Margaret's story arc)
- [ ] W&B dashboard loaded in browser tab, ready to switch to
- [ ] ElevenLabs voice clone tested and working
- [ ] Backup: screen recording of full demo flow in case live demo fails

### The "Margaret" Story Arc (Seed Data)
Build a coherent character for the demo. Margaret, 82, from Bath:
- Meeting Arthur at a dance hall in 1962
- Their wedding in the rain, her mother's dress
- Moving to London for Arthur's work at the Post Office
- Raising three children in a Hackney terrace
- Arthur's passing in 2019, learning to live alone
- Her garden, her cat Biscuit, her love of Radio 4
- Her advice: "Never go to bed angry" / "Always keep a clean kitchen"

This narrative thread makes the demo feel real, not synthetic.

---

## Name Alternatives (If MemoryVault Doesn't Land)

- **Echoes** — "Their voice echoes through generations"
- **Storykeep** — Simple, clear, .com likely available
- **Hearthstone** — Warm, legacy-feeling (check trademark)
- **Kindred Voice** — Emphasises family + voice
- **Loom** — Stories woven together (check trademark conflict with screen recorder)

Recommendation: **MemoryVault** is strong. Clear, memorable, descriptive. Keep it.
