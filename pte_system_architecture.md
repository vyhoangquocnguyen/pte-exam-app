# PTE Learning Platform - System Architecture

## Tech Stack Overview

### Frontend Framework
- **Next.js 16** (App Router)
  - Server Components for static content
  - Client Components for interactive features
  - Server Actions for form submissions and mutations
  - API Routes for backend logic

### Styling & UI
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component primitives
- **Framer Motion** - Purposeful animations
- **Heroicons** - Icon system

### State Management
- **React Context** - User session, theme, global settings
- **React Server Components** - Server-side data fetching
- **URL State** - Exercise progress, filters

### Data & Backend
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Primary database
- **Vercel Blob/S3** - Audio file storage
- **OpenAI API** - AI-powered feedback (GPT-4)
- **Deepgram/Whisper** - Speech recognition for speaking tasks

---

## Project Structure

```
pte-platform/
├── app/                          # Next.js 16 App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/              # Protected route group
│   │   ├── dashboard/            # Main dashboard
│   │   ├── practice/             # Practice modules
│   │   │   ├── speaking/
│   │   │   ├── writing/
│   │   │   ├── reading/
│   │   │   └── listening/
│   │   ├── mock-tests/           # Full mock tests
│   │   ├── progress/             # Progress tracking
│   │   ├── profile/              # User settings
│   │   └── layout.tsx            # Dashboard layout with nav
│   ├── api/                      # API Routes
│   │   ├── exercises/
│   │   ├── feedback/
│   │   ├── audio/
│   │   └── progress/
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   └── ...
│   ├── dashboard/                # Dashboard-specific
│   │   ├── hero-stats.tsx
│   │   ├── skill-card.tsx
│   │   ├── activity-timeline.tsx
│   │   └── progress-ring.tsx
│   ├── practice/                 # Exercise components
│   │   ├── question-card.tsx
│   │   ├── mcq-options.tsx
│   │   ├── audio-player.tsx
│   │   ├── essay-editor.tsx
│   │   └── timer.tsx
│   ├── feedback/                 # AI feedback display
│   │   ├── score-card.tsx
│   │   ├── feedback-tabs.tsx
│   │   └── grammar-highlight.tsx
│   ├── layout/                   # Layout components
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── mobile-nav.tsx
│   └── shared/                   # Reusable components
│       ├── loading-spinner.tsx
│       ├── empty-state.tsx
│       └── confirmation-modal.tsx
├── lib/
│   ├── db.ts                     # Prisma client
│   ├── auth.ts                   # Auth utilities
│   ├── ai/                       # AI integration
│   │   ├── openai.ts
│   │   ├── speech-recognition.ts
│   │   └── feedback-generator.ts
│   ├── utils/                    # Utility functions
│   │   ├── score-calculator.ts
│   │   ├── timer.ts
│   │   └── validators.ts
│   └── constants.ts              # App constants
├── hooks/
│   ├── use-timer.ts
│   ├── use-audio-recorder.ts
│   ├── use-exercise-progress.ts
│   └── use-debounce.ts
├── types/
│   ├── exercise.ts
│   ├── user.ts
│   ├── feedback.ts
│   └── index.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
└── public/
    ├── fonts/
    ├── icons/
    └── audio/
```

---

## Database Schema (Prisma)

```prisma
// User & Authentication
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  passwordHash  String
  targetScore   Int       @default(65)
  studyStreak   Int       @default(0)
  createdAt     DateTime  @default(now())
  
  sessions      Session[]
  progress      Progress[]
  testAttempts  TestAttempt[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  expiresAt DateTime
  user      User     @relation(fields: [userId], references: [id])
}

// Exercise Content
model Exercise {
  id          String       @id @default(cuid())
  type        ExerciseType // SPEAKING, WRITING, READING, LISTENING
  subType     String       // e.g., "read_aloud", "essay", "mcq_single"
  difficulty  Difficulty
  content     Json         // Question data (text, audio URL, options, etc.)
  rubric      Json         // Scoring criteria
  timeLimit   Int?         // Seconds
  createdAt   DateTime     @default(now())
  
  attempts    Attempt[]
}

// User Attempts & Scores
model Attempt {
  id          String    @id @default(cuid())
  userId      String
  exerciseId  String
  answer      Json      // User's response
  score       Int       // 0-90
  breakdown   Json      // Grammar, Fluency, Content, Vocabulary scores
  feedback    Json      // AI-generated feedback
  duration    Int       // Time taken in seconds
  createdAt   DateTime  @default(now())
  
  exercise    Exercise  @relation(fields: [exerciseId], references: [id])
  user        User      @relation(fields: [userId], references: [id])
}

// Mock Test Sessions
model TestAttempt {
  id          String    @id @default(cuid())
  userId      String
  status      TestStatus // IN_PROGRESS, COMPLETED
  totalScore  Int?
  breakdown   Json?     // Scores by section
  startedAt   DateTime  @default(now())
  completedAt DateTime?
  
  user        User      @relation(fields: [userId], references: [id])
  sections    TestSection[]
}

model TestSection {
  id            String      @id @default(cuid())
  testAttemptId String
  sectionType   ExerciseType
  score         Int?
  timeSpent     Int         // Seconds
  
  testAttempt   TestAttempt @relation(fields: [testAttemptId], references: [id])
}

// Progress Tracking
model Progress {
  id          String       @id @default(cuid())
  userId      String
  skillType   ExerciseType
  level       Int          @default(1)
  xp          Int          @default(0)
  avgScore    Float        @default(0)
  totalTests  Int          @default(0)
  updatedAt   DateTime     @updatedAt
  
  user        User         @relation(fields: [userId], references: [id])
  
  @@unique([userId, skillType])
}

// Enums
enum ExerciseType {
  SPEAKING
  WRITING
  READING
  LISTENING
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}

enum TestStatus {
  IN_PROGRESS
  COMPLETED
  ABANDONED
}
```

---

## Core Feature Modules

### 1. Authentication System
**Files**: `app/(auth)/*`, `lib/auth.ts`

- Email/password authentication
- JWT session management
- Protected routes with middleware
- Password reset flow

**Tech**: Next-Auth or custom JWT implementation

---

### 2. Dashboard Module
**Files**: `app/(dashboard)/dashboard/*`, `components/dashboard/*`

**Features**:
- Hero stats (Server Component)
- Skill progress cards with progress rings
- Recent activity timeline
- Quick action buttons

**Data Flow**:
```
Server Component → Prisma query → 
  Aggregate user stats → 
    Render hero stats
```

---

### 3. Practice Module
**Files**: `app/(dashboard)/practice/*`, `components/practice/*`

**Exercise Types**:

#### Speaking
- Read Aloud (audio recording + transcription)
- Repeat Sentence
- Describe Image
- Re-tell Lecture
- Answer Short Question

#### Writing
- Summarize Written Text (word counter)
- Essay Writing (with auto-save)

#### Reading
- MCQ Single/Multiple Answer
- Re-order Paragraphs (drag & drop)
- Fill in the Blanks

#### Listening
- Audio-based MCQs
- Fill in the Blanks (audio)
- Highlight Correct Summary

**Component Structure**:
```tsx
<ExerciseContainer>
  <QuestionHeader timer={timer} questionNum={num} />
  <QuestionCard content={exercise.content}>
    {renderQuestionType(exercise.subType)}
  </QuestionCard>
  <AnswerArea>
    <MCQOptions /> | <AudioRecorder /> | <EssayEditor />
  </AnswerArea>
  <NavigationBar onPrev={} onCheck={} onNext={} />
</ExerciseContainer>
```

---

### 4. AI Feedback System
**Files**: `lib/ai/*`, `components/feedback/*`

**Flow**:
1. User submits answer
2. Server Action receives submission
3. Format prompt for OpenAI/Claude API
4. Generate feedback (async)
5. Calculate scores based on rubric
6. Store in database
7. Return feedback to client

**Feedback Structure**:
```typescript
interface Feedback {
  overallScore: number; // 0-90
  breakdown: {
    grammar: number;
    fluency: number;
    content: number;
    vocabulary: number;
  };
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  corrections?: GrammarCorrection[];
}
```

**API Integration**:
- Speaking: Whisper API → transcribe → GPT-4 → evaluate
- Writing: GPT-4 → analyze essay → scoring
- Reading/Listening: Rule-based scoring

---

### 5. Mock Test Module
**Files**: `app/(dashboard)/mock-tests/*`

**Features**:
- Full-length timed tests (3 hours)
- Section-by-section progression
- Persistent timer across refreshes
- Auto-submit on time expiration
- Comprehensive results dashboard

**State Management**:
```typescript
// Store in database + client state
interface TestSession {
  id: string;
  currentSection: number;
  currentQuestion: number;
  answers: Record<string, any>;
  timeRemaining: number;
  startedAt: Date;
}
```

---

### 6. Progress Tracking
**Files**: `app/(dashboard)/progress/*`

**Visualizations**:
- Score history line charts (Recharts)
- Skill breakdown radar chart
- Streak calendar (like GitHub contributions)
- Time spent per skill (bar chart)

**Data Aggregation**:
```sql
-- Example Prisma query
SELECT 
  skillType,
  AVG(score) as avgScore,
  COUNT(*) as attempts,
  MAX(score) as bestScore
FROM Attempt
WHERE userId = ?
GROUP BY skillType
```

---

## API Routes Design

### `/api/exercises`
- `GET /api/exercises?type=SPEAKING&difficulty=MEDIUM` - Fetch exercises
- `POST /api/exercises` - Admin: Create exercise

### `/api/attempts`
- `POST /api/attempts` - Submit answer + generate feedback
- `GET /api/attempts?userId=X` - Get user attempts

### `/api/feedback`
- `POST /api/feedback/generate` - Trigger AI feedback generation
- `GET /api/feedback/:attemptId` - Retrieve feedback

### `/api/audio`
- `POST /api/audio/upload` - Upload audio recording
- `POST /api/audio/transcribe` - Transcribe audio

### `/api/tests`
- `POST /api/tests/start` - Initialize mock test
- `PUT /api/tests/:id` - Update progress
- `POST /api/tests/:id/submit` - Complete test

---

## Performance Optimizations

### Server Components Strategy
- Dashboard stats: Server Component
- Static exercise content: Server Component
- Interactive elements: Client Component with `'use client'`

### Caching
```typescript
// Example: Cache exercise content
export const revalidate = 3600; // 1 hour

export default async function ExercisePage() {
  const exercises = await prisma.exercise.findMany({
    where: { type: 'SPEAKING' },
    cache: 'force-cache'
  });
}
```

### Audio Optimization
- Store audio in Vercel Blob/S3
- Generate pre-signed URLs
- Stream audio instead of full download

### Code Splitting
```typescript
// Lazy load heavy components
const AudioRecorder = dynamic(() => import('@/components/practice/audio-recorder'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

---

## Security Considerations

1. **Authentication**: HTTP-only cookies for session tokens
2. **API Protection**: Middleware to verify user sessions
3. **Rate Limiting**: Limit AI API calls per user (e.g., 50/day)
4. **Input Sanitization**: Validate all user inputs (Zod schemas)
5. **CORS**: Restrict API access to frontend domain
6. **File Upload**: Validate audio file types and sizes

---

## Deployment Architecture

```
User Browser
    ↓
Vercel Edge Network (CDN)
    ↓
Next.js App (Vercel Serverless)
    ↓
    ├─→ PostgreSQL (Vercel Postgres / Supabase)
    ├─→ Vercel Blob (Audio storage)
    ├─→ OpenAI API (Feedback generation)
    └─→ Deepgram API (Speech transcription)
```

**Environment Variables**:
```bash
DATABASE_URL=
NEXTAUTH_SECRET=
OPENAI_API_KEY=
DEEPGRAM_API_KEY=
BLOB_READ_WRITE_TOKEN=
```

---

## Development Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Next.js 16 + Tailwind + shadcn/ui
- [ ] Database schema + Prisma setup
- [ ] Authentication system
- [ ] Basic dashboard layout

### Phase 2: Core Features (Week 3-5)
- [ ] Practice module (all question types)
- [ ] Audio recording + playback
- [ ] Timer system
- [ ] Progress tracking

### Phase 3: AI Integration (Week 6-7)
- [ ] OpenAI integration for writing feedback
- [ ] Speech recognition for speaking tasks
- [ ] Score calculation algorithms
- [ ] Feedback display UI

### Phase 4: Mock Tests (Week 8-9)
- [ ] Full test flow
- [ ] Section navigation
- [ ] Results dashboard
- [ ] Test history

### Phase 5: Polish (Week 10)
- [ ] Animations + micro-interactions
- [ ] Mobile optimization
- [ ] Performance tuning
- [ ] Accessibility audit

---

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Framework** | Next.js 16 (App Router) | Server Components, file-based routing, optimal performance |
| **Database** | PostgreSQL + Prisma | Relational data, type safety, migrations |
| **Styling** | Tailwind + shadcn/ui | Rapid development, consistent design system |
| **AI Provider** | OpenAI GPT-4 | Best-in-class language understanding |
| **Speech-to-Text** | Deepgram/Whisper | Accurate transcription for speaking tasks |
| **Hosting** | Vercel | Seamless Next.js integration, edge network |
| **State** | React Context + URL | Simple, fits use case (avoid Redux complexity) |
| **Forms** | React Hook Form + Zod | Type-safe validation, great DX |

---

## Next Steps

1. **Set up project**: `npx create-next-app@latest pte-platform`
2. **Install dependencies**: Tailwind, shadcn/ui, Prisma, etc.
3. **Initialize database**: Create schema, run migrations
4. **Build component library**: Start with shadcn/ui primitives
5. **Implement auth**: Set up login/register flows
6. **Create first exercise**: Build one complete question type end-to-end

This architecture provides a solid foundation for scaling while maintaining code quality and developer experience. Ready to start building? 🚀