import { TestResult, TypingTest, TypingTestSession, store } from "../CommonData";

/**
 * Finalizes typing sessions, computes WPM and accuracy, and stores results.
 * Designed for use in tests and simple demo flows.
 */
export class CompleteTypingTestUseCase
{
    /**
     * Complete the session identified by `typingSessionId` and record a `TestResult`.
     * @param typingSessionId Session id to finalize
     * @param correctChars Number of correctly typed characters
     * @param totalChars Total characters typed during the session
     * @param duration Duration in seconds (must be > 0)
     * @throws Error when inputs are invalid or session not found
     */
    completeTypingTest(typingSessionId: string, correctChars: number, totalChars: number, duration: number): TestResult
    {
        const typingSession = this.findTypingSessionById(typingSessionId);

        if (typingSession === null)
        {
            throw new Error("Typing session not found.");
        }

        if (duration <= 0)
        {
            throw new Error("Duration must be greater than 0.");
        }

        if (totalChars < 0 || correctChars < 0)
        {
            throw new Error("Character counts cannot be negative.");
        }

        if (correctChars > totalChars)
        {
            throw new Error("Correct characters cannot be greater than total characters.");
        }

        typingSession.correctChars = correctChars;
        typingSession.incorrectChars = totalChars - correctChars;
        typingSession.totalCharsTyped = totalChars;
        typingSession.endTime = new Date();

        const typingTest = this.findTypingTestById(typingSession.testId);

        if (typingTest !== null)
        {
            typingTest.status = "COMPLETED";
        }

        const wpm = this.calculateWpm(totalChars, duration);
        const accuracy = this.calculateAccuracy(correctChars, totalChars);
        const result = new TestResult(typingSessionId, wpm, accuracy, totalChars);

        store.results.push(result);

        return result;
    }

    /** Calculate words-per-minute using 5 chars per word. */
    private calculateWpm(totalChars: number, duration: number): number
    {
        const minutes = duration / 60;
        const wordsTyped = totalChars / 5;

        if (minutes === 0)
        {
            return 0;
        }

        return Number((wordsTyped / minutes).toFixed(2));
    }

    /** Compute percentage accuracy (0-100) with two decimals. */
    private calculateAccuracy(correctChars: number, totalChars: number): number
    {
        if (totalChars === 0)
        {
            return 0;
        }

        return Number(((correctChars / totalChars) * 100).toFixed(2));
    }

    /** Find a typing session by id in the demo store, or `null` if not found. */
    private findTypingSessionById(typingSessionId: string): TypingTestSession | null
    {
        for (const typingSession of store.typingSessions)
        {
            if (typingSession.sessionId === typingSessionId)
            {
                return typingSession;
            }
        }

        return null;
    }

    /** Find a typing test by id in the demo store, or `null` if not found. */
    private findTypingTestById(testId: string): TypingTest | null
    {
        for (const typingTest of store.typingTests)
        {
            if (typingTest.testId === testId)
            {
                return typingTest;
            }
        }

        return null;
    }
}
