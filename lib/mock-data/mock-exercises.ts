import {
  Exercise,
  ExerciseSet,
  SpeakingExercise,
  WritingExercise,
  ReadingExercise,
  ListeningExercise,
  ExerciseType,
  Difficulty,
} from "@/types/exercise-schemas";

// ========== SPEAKING MOCK DATA ==========

export const mockReadAloudExercises: SpeakingExercise[] = [
  {
    id: "ra-1",
    type: "speaking" as ExerciseType,
    subType: "read-aloud",
    difficulty: "medium" as Difficulty,
    title: "Read Aloud - Sustainable Development",
    timeLimit: 40,
    content: {
      type: "read-aloud",
      text: "The concept of sustainable development has gained significant attention in recent decades. It represents a holistic approach to growth that balances economic progress with environmental protection and social equity. This framework ensures that we meet the needs of the present without compromising the ability of future generations to meet their own needs.",
      preparationTime: 40,
      recordingTime: 40,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ra-2",
    type: "speaking" as ExerciseType,
    subType: "read-aloud",
    difficulty: "hard" as Difficulty,
    title: "Read Aloud - Quantum Computing",
    timeLimit: 40,
    content: {
      type: "read-aloud",
      text: "Quantum computing represents a paradigm shift in computational capability, leveraging quantum mechanical phenomena such as superposition and entanglement to process information. Unlike classical computers that use bits, quantum computers use quantum bits or qubits, which can exist in multiple states simultaneously, enabling exponentially faster processing for certain types of problems.",
      preparationTime: 40,
      recordingTime: 40,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockRepeatSentenceExercises: SpeakingExercise[] = [
  {
    id: "rs-1",
    type: "speaking" as ExerciseType,
    subType: "repeat-sentence",
    difficulty: "easy" as Difficulty,
    title: "Repeat Sentence #1",
    content: {
      type: "repeat-sentence",
      audioUrl: "/audio/repeat-sentence-1.mp3",
      transcript: "The library will be closed next Monday for maintenance.",
      maxPlays: 1,
      preparationTime: 5,
      recordingTime: 15,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockDescribeImageExercises: SpeakingExercise[] = [
  {
    id: "di-1",
    type: "speaking" as ExerciseType,
    subType: "describe-image",
    difficulty: "medium" as Difficulty,
    title: "Describe Image - Bar Chart",
    content: {
      type: "describe-image",
      imageUrl: "/images/bar-chart-example.jpg",
      imageAlt: "Bar chart showing sales data",
      preparationTime: 25,
      recordingTime: 40,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ========== WRITING MOCK DATA ==========

export const mockEssayExercises: WritingExercise[] = [
  {
    id: "essay-1",
    type: "writing" as ExerciseType,
    subType: "essay",
    difficulty: "medium" as Difficulty,
    title: "Essay - Technology in Education",
    timeLimit: 1200, // 20 minutes
    content: {
      type: "essay",
      prompt:
        "Some people believe that technology has made learning easier and more accessible, while others argue that it has created new challenges. Discuss both views and give your own opinion. Support your answer with relevant examples.",
      wordLimit: { min: 200, max: 300 },
      timeLimit: 1200,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "essay-2",
    type: "writing" as ExerciseType,
    subType: "essay",
    difficulty: "hard" as Difficulty,
    title: "Essay - Climate Change",
    timeLimit: 1200,
    content: {
      type: "essay",
      prompt:
        "Climate change is one of the most pressing issues facing humanity today. What are the main causes of climate change, and what measures can individuals and governments take to address this problem?",
      wordLimit: { min: 200, max: 300 },
      timeLimit: 1200,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ========== READING MOCK DATA ==========

export const mockReadingMCQSingle: ReadingExercise[] = [
  {
    id: "rmcq-1",
    type: "reading" as ExerciseType,
    subType: "mcq-single",
    difficulty: "medium" as Difficulty,
    title: "Reading MCQ - Climate Research",
    content: {
      type: "mcq-single",
      passage:
        "Recent studies in climate science have revealed significant changes in global weather patterns. Researchers have observed an increase in extreme weather events, including more frequent hurricanes, droughts, and floods. These changes are primarily attributed to rising global temperatures caused by greenhouse gas emissions. Scientists warn that without immediate action, these trends will continue to accelerate, leading to more severe consequences for ecosystems and human societies worldwide.",
      question: "According to the passage, what is the primary cause of the changes in global weather patterns?",
      options: [
        { id: "a", text: "Natural climate cycles", isCorrect: false },
        { id: "b", text: "Greenhouse gas emissions", isCorrect: true },
        { id: "c", text: "Ocean currents", isCorrect: false },
        { id: "d", text: "Solar radiation", isCorrect: false },
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockReadingMCQMultiple: ReadingExercise[] = [
  {
    id: "rmcqm-1",
    type: "reading" as ExerciseType,
    subType: "mcq-multiple",
    difficulty: "hard" as Difficulty,
    title: "Reading MCQ Multiple - Ancient Civilizations",
    content: {
      type: "mcq-multiple",
      passage:
        "Ancient civilizations developed sophisticated systems of governance, architecture, and social organization. The Egyptians built monumental pyramids, the Romans created extensive road networks, and the Chinese invented paper and gunpowder. These innovations had lasting impacts on human development. Many of these early societies also developed complex writing systems, enabling them to record history, laws, and literature for future generations.",
      question: "Which of the following innovations are mentioned in the passage? (Select all that apply)",
      options: [
        { id: "a", text: "Pyramids", isCorrect: true },
        { id: "b", text: "Road networks", isCorrect: true },
        { id: "c", text: "Paper", isCorrect: true },
        { id: "d", text: "The wheel", isCorrect: false },
        { id: "e", text: "Telescope", isCorrect: false },
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockReorderParagraphs: ReadingExercise[] = [
  {
    id: "rop-1",
    type: "reading" as ExerciseType,
    subType: "reorder-paragraphs",
    difficulty: "medium" as Difficulty,
    title: "Reorder Paragraphs - Scientific Method",
    content: {
      type: "reorder-paragraphs",
      paragraphs: [
        {
          id: "p1",
          text: "The scientific method begins with observation and the identification of a problem or question.",
          correctOrder: 1,
        },
        {
          id: "p2",
          text: "After forming a hypothesis, researchers design and conduct experiments to test their predictions.",
          correctOrder: 3,
        },
        {
          id: "p3",
          text: "Based on these observations, scientists formulate a hypothesis—a testable explanation for the phenomenon.",
          correctOrder: 2,
        },
        {
          id: "p4",
          text: "Finally, the results are analyzed, conclusions are drawn, and the findings are communicated to the scientific community.",
          correctOrder: 4,
        },
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockReadingFillBlanks: ReadingExercise[] = [
  {
    id: "rfb-1",
    type: "reading" as ExerciseType,
    subType: "fill-blanks",
    difficulty: "medium" as Difficulty,
    title: "Fill in the Blanks - Photosynthesis",
    content: {
      type: "fill-blanks",
      text: "Photosynthesis is the process by which plants convert {{blank1}} energy into chemical energy. During this process, plants absorb {{blank2}} dioxide from the atmosphere and release {{blank3}} as a byproduct. This process is essential for life on Earth as it produces the {{blank4}} we breathe.",
      blanks: [
        { id: "blank1", correctAnswer: "light", options: ["light", "heat", "sound", "electrical"] },
        { id: "blank2", correctAnswer: "carbon", options: ["carbon", "nitrogen", "hydrogen", "sulfur"] },
        { id: "blank3", correctAnswer: "oxygen", options: ["oxygen", "nitrogen", "helium", "methane"] },
        { id: "blank4", correctAnswer: "air", options: ["air", "water", "food", "shelter"] },
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ========== LISTENING MOCK DATA ==========

export const mockListeningMCQSingle: ListeningExercise[] = [
  {
    id: "lmcq-1",
    type: "listening" as ExerciseType,
    subType: "mcq-single",
    difficulty: "medium" as Difficulty,
    title: "Listening MCQ - University Lecture",
    content: {
      type: "listening-mcq-single",
      audioUrl: "/audio/lecture-biology.mp3",
      question: "What is the main topic of the lecture?",
      options: [
        { id: "a", text: "Cell division", isCorrect: false },
        { id: "b", text: "Genetic mutation", isCorrect: true },
        { id: "c", text: "Evolution theory", isCorrect: false },
        { id: "d", text: "Ecosystem balance", isCorrect: false },
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockSummarizeSpokenText: ListeningExercise[] = [
  {
    id: "sst-1",
    type: "listening" as ExerciseType,
    subType: "summarize-spoken-text",
    difficulty: "hard" as Difficulty,
    title: "Summarize Spoken Text - Economics Lecture",
    timeLimit: 600, // 10 minutes
    content: {
      type: "summarize-spoken-text",
      audioUrl: "/audio/economics-lecture.mp3",
      transcript: "The global economy has experienced significant transformations...",
      maxPlays: 2,
      minWords: 50,
      maxWords: 70,
      timeLimit: 600,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ========== EXERCISE SETS ==========

export const mockExerciseSets: Record<string, ExerciseSet> = {
  "speaking-set-1": {
    id: "speaking-set-1",
    name: "Speaking Practice Set 1",
    type: "speaking" as ExerciseType,
    exercises: mockReadAloudExercises,
    createdAt: new Date().toISOString(),
  },
  "writing-set-1": {
    id: "writing-set-1",
    name: "Writing Practice Set 1",
    type: "writing" as ExerciseType,
    exercises: mockEssayExercises,
    createdAt: new Date().toISOString(),
  },
  "reading-set-1": {
    id: "reading-set-1",
    name: "Reading Practice Set 1",
    type: "reading" as ExerciseType,
    exercises: [...mockReadingMCQSingle, ...mockReadingMCQMultiple],
    createdAt: new Date().toISOString(),
  },
  "listening-set-1": {
    id: "listening-set-1",
    name: "Listening Practice Set 1",
    type: "listening" as ExerciseType,
    exercises: mockListeningMCQSingle,
    createdAt: new Date().toISOString(),
  },
};

// Helper function to get exercises by type
export function getExercisesByType(skillType: string, subType?: string): Exercise[] {
  const allExercises: Exercise[] = [
    ...mockReadAloudExercises,
    ...mockRepeatSentenceExercises,
    ...mockDescribeImageExercises,
    ...mockEssayExercises,
    ...mockReadingMCQSingle,
    ...mockReadingMCQMultiple,
    ...mockReorderParagraphs,
    ...mockReadingFillBlanks,
    ...mockListeningMCQSingle,
    ...mockSummarizeSpokenText,
  ];

  return allExercises.filter((ex) => {
    if (subType) {
      return ex.type === skillType && ex.subType === subType;
    }
    return ex.type === skillType;
  });
}