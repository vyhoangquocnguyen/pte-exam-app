import {
  ReadAloudExercise,
  RepeatSentenceExercise,
  DescribeImageExercise,
  EssayExercise,
  MCQSingleExercise,
  MCQMultipleExercise,
  ReorderParagraphsExercise,
  ReadingFillBlanksExercise,
  ListeningMCQSingleExercise,
  SummarizeSpokenTextExercise,
  ExerciseSet,
} from "@/types/exercise-schemas";

// ========== SPEAKING MOCK DATA ==========

export const mockReadAloudExercises: ReadAloudExercise[] = [
  {
    id: "ra-1",
    type: "speaking",
    subType: "read-aloud",
    difficulty: "medium",
    title: "Read Aloud - Sustainable Development",
    timeLimit: 40,
    content: {
      text: "The concept of sustainable development has gained significant attention in recent decades. It represents a holistic approach to growth that balances economic progress with environmental protection and social equity. This framework ensures that we meet the needs of the present without compromising the ability of future generations to meet their own needs.",
      preparationTime: 40,
      recordingTime: 40,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ra-2",
    type: "speaking",
    subType: "read-aloud",
    difficulty: "hard",
    title: "Read Aloud - Quantum Computing",
    timeLimit: 40,
    content: {
      text: "Quantum computing represents a paradigm shift in computational capability, leveraging quantum mechanical phenomena such as superposition and entanglement to process information. Unlike classical computers that use bits, quantum computers use quantum bits or qubits, which can exist in multiple states simultaneously, enabling exponentially faster processing for certain types of problems.",
      preparationTime: 40,
      recordingTime: 40,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockRepeatSentenceExercises: RepeatSentenceExercise[] = [
  {
    id: "rs-1",
    type: "speaking",
    subType: "repeat-sentence",
    difficulty: "easy",
    title: "Repeat Sentence #1",
    content: {
      audioUrl: "/audio/repeat-sentence-1.mp3",
      transcript: "The library will be closed next Monday for maintenance.",
      maxPlays: 1,
      recordingTime: 15,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockDescribeImageExercises: DescribeImageExercise[] = [
  {
    id: "di-1",
    type: "speaking",
    subType: "describe-image",
    difficulty: "medium",
    title: "Describe Image - Bar Chart",
    content: {
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

export const mockEssayExercises: EssayExercise[] = [
  {
    id: "essay-1",
    type: "writing",
    subType: "essay",
    difficulty: "medium",
    title: "Essay - Technology in Education",
    timeLimit: 1200, // 20 minutes
    content: {
      prompt:
        "Some people believe that technology has made learning easier and more accessible, while others argue that it has created new challenges. Discuss both views and give your own opinion. Support your answer with relevant examples.",
      minWords: 200,
      maxWords: 300,
      timeLimit: 1200,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "essay-2",
    type: "writing",
    subType: "essay",
    difficulty: "hard",
    title: "Essay - Climate Change",
    timeLimit: 1200,
    content: {
      prompt:
        "Climate change is one of the most pressing issues facing humanity today. What are the main causes of climate change, and what measures can individuals and governments take to address this problem?",
      minWords: 200,
      maxWords: 300,
      timeLimit: 1200,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ========== READING MOCK DATA ==========

export const mockReadingMCQSingle: MCQSingleExercise[] = [
  {
    id: "rmcq-1",
    type: "reading",
    subType: "mcq-single",
    difficulty: "medium",
    title: "Reading MCQ - Climate Research",
    content: {
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

export const mockReadingMCQMultiple: MCQMultipleExercise[] = [
  {
    id: "rmcqm-1",
    type: "reading",
    subType: "mcq-multiple",
    difficulty: "hard",
    title: "Reading MCQ Multiple - Ancient Civilizations",
    content: {
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

export const mockReorderParagraphs: ReorderParagraphsExercise[] = [
  {
    id: "rop-1",
    type: "reading",
    subType: "reorder-paragraphs",
    difficulty: "medium",
    title: "Reorder Paragraphs - Scientific Method",
    content: {
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

export const mockReadingFillBlanks: ReadingFillBlanksExercise[] = [
  {
    id: "rfb-1",
    type: "reading",
    subType: "fill-blanks",
    difficulty: "medium",
    title: "Fill in the Blanks - Photosynthesis",
    content: {
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

export const mockListeningMCQSingle: ListeningMCQSingleExercise[] = [
  {
    id: "lmcq-1",
    type: "listening",
    subType: "mcq-single",
    difficulty: "medium",
    title: "Listening MCQ - University Lecture",
    content: {
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

export const mockSummarizeSpokenText: SummarizeSpokenTextExercise[] = [
  {
    id: "sst-1",
    type: "listening",
    subType: "summarize-spoken-text",
    difficulty: "hard",
    title: "Summarize Spoken Text - Economics Lecture",
    timeLimit: 600, // 10 minutes
    content: {
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
    type: "speaking",
    exercises: mockReadAloudExercises,
    createdAt: new Date().toISOString(),
  },
  "writing-set-1": {
    id: "writing-set-1",
    name: "Writing Practice Set 1",
    type: "writing",
    exercises: mockEssayExercises,
    createdAt: new Date().toISOString(),
  },
  "reading-set-1": {
    id: "reading-set-1",
    name: "Reading Practice Set 1",
    type: "reading",
    exercises: [...mockReadingMCQSingle, ...mockReadingMCQMultiple],
    createdAt: new Date().toISOString(),
  },
  "listening-set-1": {
    id: "listening-set-1",
    name: "Listening Practice Set 1",
    type: "listening",
    exercises: mockListeningMCQSingle,
    createdAt: new Date().toISOString(),
  },
};

// Helper function to get exercises by type
export function getExercisesByType(skillType: string, subType?: string) {
  const allExercises = [
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
