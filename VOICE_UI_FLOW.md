# Voice-First UI Flow

## Overview

The entire app is voice-driven. Users navigate and interact purely through voice with ElevenLabs Conversational AI agents handling all interactions.

## Two Conversation Modes

### 1. Companion Mode (Evie)
**Who**: Elderly users  
**Purpose**: Story collection through natural conversation  
**Agent**: Companion agent with warm preset voice (Rachel)

**Flow**:
```
1. Elderly user opens app
2. App auto-authenticates via Firebase
3. App calls: POST /api/conversations
   Body: { "mode": "companion" }
4. Backend:
   - Fetches user profile (name, age)
   - Retrieves previously collected stories
   - Generates exploration suggestions (via Mistral)
   - Builds dynamic variables
   - Calls ElevenLabs with Companion agent ID
5. Returns: { conversationId, sessionUrl }
6. App opens ElevenLabs session (WebRTC or embedded widget)
7. Evie greets user: "Hello Margaret! How are you today?"
8. User talks naturally - Evie guides conversation
9. When done, user says "I'm tired" or similar
10. App calls: POST /api/conversations/{id}/end
11. Backend triggers story extraction pipeline
```

### 2. Persona Mode
**Who**: Family members  
**Purpose**: Talk to elderly relative's AI persona  
**Agent**: Persona agent with elderly person's cloned voice

**Flow**:
```
1. Family member opens app
2. App shows list of elderly relatives (voice command: "Show my family")
3. User says: "I want to talk to Grandma"
4. App calls: POST /api/conversations
   Body: { 
     "mode": "persona",
     "elderlyUserId": "uuid-of-grandma"
   }
5. Backend:
   - Fetches Grandma's VoiceProfile (cloned voice ID)
   - Retrieves all Grandma's stories
   - Fetches personality profile, people, speech patterns
   - Builds dynamic variables
   - Calls ElevenLabs with Persona agent ID + voice override
6. Returns: { conversationId, sessionUrl }
7. App opens ElevenLabs session
8. Grandma's voice: "Hello love! What would you like to know?"
9. Family member asks questions about Grandma's life
10. Persona responds using only collected stories
11. When done: POST /api/conversations/{id}/end
```

## API Endpoints

### Start Conversation
```http
POST /api/conversations
Authorization: Bearer {jwt}
Content-Type: application/json

{
  "mode": "companion" | "persona",
  "elderlyUserId": "uuid" // Required only for persona mode
}

Response:
{
  "conversationId": "uuid",
  "sessionUrl": "https://elevenlabs.io/convai/session/xyz"
}
```

### End Conversation
```http
POST /api/conversations/{id}/end
Authorization: Bearer {jwt}

Response:
{
  "status": "processing"
}
```

## Mobile App Implementation

### Flutter/React Native Integration

```dart
// Example: Starting Companion conversation
Future<void> startCompanionCall() async {
  final response = await http.post(
    Uri.parse('$apiUrl/conversations'),
    headers: {'Authorization': 'Bearer $token'},
    body: jsonEncode({'mode': 'companion'}),
  );
  
  final data = jsonDecode(response.body);
  
  // Open ElevenLabs session in WebView or native widget
  await launchUrl(Uri.parse(data['sessionUrl']));
}

// Example: Starting Persona conversation
Future<void> talkToGrandma(String elderlyUserId) async {
  final response = await http.post(
    Uri.parse('$apiUrl/conversations'),
    headers: {'Authorization': 'Bearer $token'},
    body: jsonEncode({
      'mode': 'persona',
      'elderlyUserId': elderlyUserId,
    }),
  );
  
  final data = jsonDecode(response.body);
  await launchUrl(Uri.parse(data['sessionUrl']));
}
```

## Voice Navigation

Since the entire UI is voice-driven, the mobile app should:

1. **Minimal Visual UI**: Just show current state (listening, speaking, processing)
2. **Voice Commands**:
   - "Start a conversation" → Companion mode
   - "Talk to [name]" → Persona mode
   - "Show my stories" → Navigate to stories view
   - "Show my family" → Navigate to family view
   - "I'm done" → End conversation

3. **ElevenLabs Handles Everything**: 
   - Speech recognition
   - Natural language understanding
   - Voice synthesis
   - Turn-taking
   - Interruption handling

## Backend Responsibilities

The backend's job is to:

1. **Prepare Dynamic Variables**:
   - Companion: User context, story summaries, exploration suggestions
   - Persona: Elderly person's stories, personality, speech patterns

2. **Manage Sessions**:
   - Create ElevenLabs sessions with correct agent + variables
   - Track conversation state in database
   - Return session URL to mobile app

3. **Post-Conversation Processing**:
   - Fetch transcript from ElevenLabs
   - Extract stories using Mistral
   - Generate embeddings
   - Update voice clone with new audio samples
   - Update personality profile

## Key Design Principles

1. **No Manual Input**: Users never type. Everything is voice.
2. **Context-Aware**: Backend knows user role and automatically selects correct mode.
3. **Seamless Handoff**: Mobile app just opens ElevenLabs session URL.
4. **Smart Defaults**: 
   - Elderly users → Always Companion mode
   - Family users → Default to last talked-to relative
5. **Voice-First Navigation**: Use voice commands to switch between modes.

## Example User Journeys

### Journey 1: Elderly User (Margaret)
```
1. Opens app → Auto-starts Companion session
2. Evie: "Hello Margaret! How are you today?"
3. Margaret: "I'm well, thank you."
4. Evie: "Last time you mentioned Arthur. Tell me more about him?"
5. [15 minute conversation]
6. Margaret: "I'm getting tired now."
7. Evie: "Thank you for sharing, Margaret. Rest well!"
8. App ends session → Backend processes stories
```

### Journey 2: Family Member (Sarah)
```
1. Opens app
2. App: "Welcome Sarah. Say 'talk to Mum' to start."
3. Sarah: "Talk to Mum"
4. App starts Persona session
5. Mum's voice: "Hello love! What would you like to know?"
6. Sarah: "Tell me about when you met Dad."
7. Mum's voice: "Oh, that was 1962 at the Palais dance hall..."
8. [10 minute conversation]
9. Sarah: "Thanks Mum, I love you."
10. Mum's voice: "I love you too, dear."
```

## Implementation Checklist

- [x] Backend: Companion mode endpoint
- [x] Backend: Persona mode endpoint
- [x] Backend: Dynamic variable assembly
- [x] Backend: ElevenLabs integration
- [ ] Mobile: Voice command recognition
- [ ] Mobile: ElevenLabs session embedding
- [ ] Mobile: Auto-mode selection based on user role
- [ ] Backend: Story extraction pipeline
- [ ] Backend: Voice clone updates
- [ ] Backend: Personality profile generation
