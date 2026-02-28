# Flutter Rules — MemoryVault Mobile App
## Instructions for AI Coding Agents (Cursor / Claude Code / Windsurf)

---

## Architecture: Clean Architecture

Follow strict Clean Architecture with three layers per feature. Never import presentation from domain, never import domain from data directly — always go through abstractions.

### Folder Structure
```
lib/
  core/               # Shared utilities, theme, constants, network, DI
    di/               # Injectable module registration
    theme/            # Design system tokens, colors, typography
    network/          # API client (generated), interceptors, error handling
    constants/        # App-wide constants
    widgets/          # Shared reusable widgets
  features/
    auth/
      domain/         # Entities, repository interfaces, use cases
      data/           # Repository implementations, DTOs, data sources
      presentation/   # BLoC, pages, widgets
    conversations/
      domain/
      data/
      presentation/
    vault/
      domain/
      data/
      presentation/
    persona/
      domain/
      data/
      presentation/
    family/
      domain/
      data/
      presentation/
  app.dart            # MaterialApp, router, DI init
  main.dart           # Entry point
```

---

## State Management: BLoC + Freezed + Injectable

Every feature gets its own BLoC. States and events must be Freezed union types. Use Injectable for all dependency injection — never manually construct dependencies.

### BLoC Rules
- One BLoC per feature screen (e.g., VaultBloc, PersonaBloc, ConversationBloc)
- Events are Freezed unions: `@freezed class VaultEvent with _$VaultEvent { ... }`
- States are Freezed unions with explicit states: Initial, Loading, Loaded, Error
- BLoCs receive use cases via constructor injection (Injectable)
- Never put API calls directly in BLoC — always go through a use case then repository
- Emit states, never return values from event handlers

### Injectable Rules
- Annotate all repositories, use cases, data sources, and BLoCs with `@injectable`
- Register singletons with `@lazySingleton` for repositories and data sources
- Register BLoCs as `@injectable` (factory, new instance per request)
- Configure in `core/di/injection.dart` using `@InjectableInit`

---

## API Client Generation

Use `swagger_parser` to generate API client from backend Swagger JSON. Never write API calls manually.

- Backend exposes Swagger at `/api/docs-json`
- Run `dart run swagger_parser` to regenerate client after backend API changes
- Generated client goes into `core/network/generated/`
- Wrap generated client calls in data source classes (never call generated client from BLoC directly)
- Data sources map generated DTOs to domain entities

---

## Auth Flow

Firebase Google Sign-In → get idToken → send to backend `/api/v1/auth/google` → receive JWT → store JWT securely → attach to all subsequent API requests.

- Use `firebase_auth` and `google_sign_in` packages
- Store JWT in `flutter_secure_storage`, never in SharedPreferences
- Create an `AuthInterceptor` that attaches Bearer token to every request
- On 401 response, attempt token refresh via `/api/v1/auth/refresh`
- If refresh fails, emit `AuthBloc.Unauthenticated` and navigate to login
- Auth state drives navigation: unauthenticated → login, authenticated → home

---

## Design System

Build a custom design system in `core/theme/`. Do not use raw Material values anywhere in feature code.

- Define `AppColors`, `AppTypography`, `AppSpacing`, `AppRadius` as static const classes
- Warm, premium palette: deep navy primary, warm gold accent, soft cream backgrounds
- All text uses `AppTypography.headlineLarge`, `.bodyMedium`, etc. — never `TextStyle()` inline
- All spacing uses `AppSpacing.sm`, `.md`, `.lg` — never raw `SizedBox(height: 16)`
- Create reusable widgets: `AppButton`, `AppCard`, `AppTextField`, `AppAvatar`
- Dark mode not required for hackathon — but design system makes it trivial to add later

---

## Navigation

Use `go_router` for declarative routing. Route guards based on auth state.

- Define routes as static const strings in a `Routes` class
- Redirect to login if not authenticated
- Use `ShellRoute` for bottom navigation (Vault, Conversations, Persona, Profile)
- Deep linking not required for hackathon

---

## Conversation Session Flow

The mobile app does NOT handle voice AI directly. Backend provides a session URL.

1. User taps "Start Conversation" in app
2. App calls `POST /api/v1/conversations/start` → receives `{ sessionUrl, conversationId }`
3. App opens ElevenLabs conversation widget/WebView using `sessionUrl`
4. When conversation ends, app calls `POST /api/v1/conversations/:id/end`
5. Backend fetches transcript from ElevenLabs, processes it, extracts stories
6. App polls or receives push notification when processing is complete
7. App navigates to conversation detail showing extracted stories

---

## Vault UI Guidelines

The vault is the emotional core of the app. It must feel warm, personal, and beautiful.

- Default view: vertical timeline with story cards, most recent first
- Each story card shows: title, date/era, theme tag chips, people mentioned, first 2 lines
- Tapping a story opens detail: full text + audio player (cloned voice reads the story)
- Filter bar: by theme, by person, by place, by date range
- Search bar: semantic search powered by backend pgvector endpoint
- Empty state: warm illustration + "Start your first conversation to begin building the vault"

---

## Persona UI Guidelines

The persona chat must feel distinct from a generic chatbot. It is a memory interface.

- Chat bubble UI but with warm styling, not clinical
- Persona responses include source attribution: "Based on a story from March 2024..."
- Tapping attribution opens the source story in the vault
- Audio playback button on each persona response (plays in cloned voice)
- Input: text field + optional voice input (speech-to-text)
- Disclaimer at top: "Responses are generated from [Name]'s recorded stories"

---

## Error Handling

- All API errors come in standard envelope: `{ status, message, errors[] }`
- Map to domain `Failure` types: `ServerFailure`, `NetworkFailure`, `AuthFailure`
- BLoC error states show user-friendly messages, never raw server errors
- Network connectivity: show offline banner, queue actions for retry

---

## Testing (Hackathon Minimum)

- Widget tests for critical flows: auth, conversation start, vault display
- BLoC tests for state transitions
- No integration tests required for hackathon
- Ensure app builds and runs on both iOS and Android simulators

---

## Naming Conventions

- Files: `snake_case.dart`
- Classes: `PascalCase`
- BLoC events: `VaultEvent.loadStories()`, `VaultEvent.searchStories(query: ...)`
- BLoC states: `VaultState.initial()`, `VaultState.loaded(stories: [...])`
- Use cases: verb-noun pattern — `GetStoriesUseCase`, `StartConversationUseCase`
- Repositories: `StoryRepository` (interface in domain), `StoryRepositoryImpl` (in data)
