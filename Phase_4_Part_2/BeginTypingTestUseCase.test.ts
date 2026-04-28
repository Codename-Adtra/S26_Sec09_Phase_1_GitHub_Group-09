import { BeginTypingTestUseCase } from "../usecases/BeginTypingTestUseCase";
import { store } from "../CommonData";

describe("BeginTypingTestUseCase", () => {

    let useCase: BeginTypingTestUseCase;

    beforeEach(() => {
        store.typingTests.length = 0;
        store.typingSessions.length = 0;
        useCase = new BeginTypingTestUseCase();
    });

    // TC-1: Valid inputs with authenticated user (happy path)
    // userId: "user-1", duration: 60, text: valid string
    // Expected: returns a valid TypingTestSession
    test("TC-1: Valid inputs with authenticated user returns a session", () => {
        const session = useCase.beginTypingTest("user-1", 60, "the quick brown fox jumps over the lazy dog");

        expect(session).toBeDefined();
        expect(session.userId).toBe("user-1");
        expect(session.sessionId).toBeTruthy();
        expect(session.testId).toBeTruthy();
    });

    // TC-2: Valid inputs with anonymous user
    // userId: null, duration: 30, text: valid string
    // Expected: returns a session with null userId
    test("TC-2: Anonymous user (null userId) creates a valid session", () => {
        const session = useCase.beginTypingTest(null, 30, "the quick brown fox jumps over the lazy dog");

        expect(session).toBeDefined();
        expect(session.userId).toBeNull();
    });

    // TC-3: Duration = 0 (boundary invalid)
    // userId: "user-1", duration: 0, text: valid string
    // Expected: throws "Duration must be greater than 0."
    test("TC-3: Duration of 0 throws an error", () => {
        expect(() => {
            useCase.beginTypingTest("user-1", 0, "the quick brown fox jumps over the lazy dog");
        }).toThrow("Duration must be greater than 0.");
    });

    // TC-4: Negative duration (invalid)
    // userId: "user-1", duration: -5, text: valid string
    // Expected: throws "Duration must be greater than 0."
    test("TC-4: Negative duration throws an error", () => {
        expect(() => {
            useCase.beginTypingTest("user-1", -5, "the quick brown fox jumps over the lazy dog");
        }).toThrow("Duration must be greater than 0.");
    });

    // TC-5: Empty text string (invalid)
    // userId: "user-1", duration: 60, text: ""
    // Expected: throws "Typing test text cannot be empty."
    test("TC-5: Empty text string throws an error", () => {
        expect(() => {
            useCase.beginTypingTest("user-1", 60, "");
        }).toThrow("Typing test text cannot be empty.");
    });

    // TC-6: Whitespace-only text (invalid)
    // userId: "user-1", duration: 60, text: "     "
    // Expected: throws "Typing test text cannot be empty."
    test("TC-6: Whitespace-only text throws an error", () => {
        expect(() => {
            useCase.beginTypingTest("user-1", 60, "     ");
        }).toThrow("Typing test text cannot be empty.");
    });

    // TC-7: Session is correctly linked to the stored TypingTest
    // userId: "user-1", duration: 60, text: valid string
    // Expected: session.testId matches a test in the store with status "ACTIVE"
    test("TC-7: Created session is linked to the correct stored TypingTest", () => {
        const session = useCase.beginTypingTest("user-1", 60, "the quick brown fox jumps over the lazy dog");

        const matchingTest = store.typingTests.find(t => t.testId === session.testId);
        expect(matchingTest).toBeDefined();
        expect(matchingTest!.status).toBe("ACTIVE");
        expect(matchingTest!.duration).toBe(60);
    });

    // TC-8: Two consecutive tests produce different session and test IDs (R7.3)
    // Expected: each call yields unique sessionId and testId
    test("TC-8: Two consecutive tests produce unique session and test IDs", () => {
        const session1 = useCase.beginTypingTest("user-1", 60, "the quick brown fox jumps over the lazy dog");
        const session2 = useCase.beginTypingTest("user-1", 60, "pack my box with five dozen liquor jugs");

        expect(session1.sessionId).not.toBe(session2.sessionId);
        expect(session1.testId).not.toBe(session2.testId);
    });

    // TC-9: Store contains exactly one test and one session after a valid call
    // userId: "user-2", duration: 30, text: valid string
    // Expected: store.typingTests.length === 1, store.typingSessions.length === 1
    test("TC-9: Store contains the new test and session after a valid call", () => {
        useCase.beginTypingTest("user-2", 30, "the quick brown fox jumps over the lazy dog");

        expect(store.typingTests.length).toBe(1);
        expect(store.typingSessions.length).toBe(1);
    });

});
