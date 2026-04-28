import { TypingTest, TypingTestSession, store } from "../CommonData";

/**
 * Use case that starts a new typing test and creates a corresponding session.
 * Used by tests to create predictable sessions and test flows.
 */
export class BeginTypingTestUseCase
{
    /**
     * Create a new `TypingTest` and `TypingTestSession` for the given user.
     * @param userId Optional user id (null for anonymous)
     * @param duration Duration of the test in seconds (must be > 0)
     * @param text The text to be typed in the test
     * @returns the newly created `TypingTestSession`
     * @throws Error for invalid input
     */
    beginTypingTest(userId: string | null, duration: number, text: string): TypingTestSession
    {
        if (duration <= 0)
        {
            throw new Error("Duration must be greater than 0.");
        }

        if (text.trim() === "")
        {
            throw new Error("Typing test text cannot be empty.");
        }

        const typingTest = new TypingTest(store.makeId("test"), duration, text);
        typingTest.status = "ACTIVE";
        store.typingTests.push(typingTest);

        const typingSession = new TypingTestSession(
            store.makeId("typing-session"),
            typingTest.testId,
            userId
        );

        store.typingSessions.push(typingSession);

        return typingSession;
    }
}
