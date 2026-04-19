import { WordBank, GeneratedTestText, DEFAULT_WORD_BANK } from "../CommonData";

// Generates typing test text by randomly picking words from a word bank.

export class GenerateTestTextUseCase {
    private wordBank: WordBank;

    // Uses the default seeded word bank unless a custom one is passed in.
    constructor(wordBank: WordBank = DEFAULT_WORD_BANK) {
        this.wordBank = wordBank;
    }

    generateTestText(wordCount: number): GeneratedTestText {
        // Validate inputs
        if (wordCount <= 0) {
            throw new Error("wordCount must be greater than 0.");
        }
        if (this.wordBank.words.length === 0) {
            throw new Error("Word bank is empty.");
        }

        // Randomly pick words from the word bank
        const selectedWords: string[] = [];
        for (let i = 0; i < wordCount; i++) {
            const randomIndex = Math.floor(Math.random() * this.wordBank.words.length);
            selectedWords.push(this.wordBank.words[randomIndex]);
        }

        const result: GeneratedTestText = {
            textId: `text-${Date.now()}`,
            content: selectedWords.join(" "),
            wordCount: wordCount,
            createdAt: new Date()
        };

        return result;
    }
}
