// Shared data and simple types used across both use cases.

// --- Shared Types ---

export interface WordBank {
    words: string[];
}

export interface GeneratedTestText {
    textId: string;
    content: string;
    wordCount: number;
    createdAt: Date;
}

export interface TestResult {
    sessionId: string;
    wpm: number;
    accuracy: number;   // 0 to 100
    totalChars: number;
    completedAt: Date;
}

export interface DisplayedTestResult {
    sessionId: string;
    wpm: number;
    accuracy: number;
    totalChars: number;
    completedAt: Date;
    summaryMessage: string;
}

// --- Seeded Word Bank ---
// Used by GenerateTestTextUseCase as the default word source.

export const DEFAULT_WORD_BANK: WordBank = {
    words: [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
        "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
        "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
        "an", "will", "my", "one", "all", "would", "there", "their", "what",
        "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
        "type", "fast", "word", "key", "press", "speed", "test", "score", "time", "run"
    ]
};
