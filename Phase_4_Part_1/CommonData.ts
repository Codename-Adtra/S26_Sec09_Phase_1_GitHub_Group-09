/**
 * Represents the lifecycle status of a typing test.
 * - "NOT_STARTED": test created but not yet begun
 * - "ACTIVE": test currently in progress
 * - "COMPLETED": test finished
 */
export type TestStatus = "NOT_STARTED" | "ACTIVE" | "COMPLETED";

/**
 * Simple user record used for authentication demos.
 * Fields:
 * - `id`: unique user identifier
 * - `email`: login email
 * - `password`: raw password (demo only)
 * - `isLoggedIn`: session state
 */
export class User
{
    id: string;
    email: string;
    password: string;
    isLoggedIn: boolean;

    /**
     * Create a new user record.
     * @param id Unique id for the user
     * @param email User's email address
     * @param password User's password (plaintext in this simple demo)
     */
    constructor(id: string, email: string, password: string)
    {
        this.id = id;
        this.email = email;
        this.password = password;
        this.isLoggedIn = false;
    }
}

/**
 * Lightweight session object representing a user's active login.
 */
export class Session
{
    sessionId: string;
    userId: string;
    isActive: boolean;

    /**
     * @param sessionId Unique session id
     * @param userId Associated user id
     */
    constructor(sessionId: string, userId: string)
    {
        this.sessionId = sessionId;
        this.userId = userId;
        this.isActive = true;
    }
}

/**
 * Represents a typing test definition (text + duration + status).
 */
export class TypingTest
{
    testId: string;
    duration: number;
    text: string;
    status: TestStatus;

    /**
     * @param testId Unique id for the typing test
     * @param duration Duration in seconds
     * @param text The text participants will type
     */
    constructor(testId: string, duration: number, text: string)
    {
        this.testId = testId;
        this.duration = duration;
        this.text = text;
        this.status = "NOT_STARTED";
    }
}

/**
 * Represents a single user's attempt at a TypingTest.
 * Tracks start/end times and character counts.
 */
export class TypingTestSession
{
    sessionId: string;
    testId: string;
    userId: string | null;
    startTime: Date;
    endTime: Date | null;
    correctChars: number;
    incorrectChars: number;
    totalCharsTyped: number;

    /**
     * Initialize a typing session for a test.
     * @param sessionId Unique session id
     * @param testId Related `TypingTest` id
     * @param userId Optional user id (null for anonymous)
     */
    constructor(sessionId: string, testId: string, userId: string | null)
    {
        this.sessionId = sessionId;
        this.testId = testId;
        this.userId = userId;
        this.startTime = new Date();
        this.endTime = null;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.totalCharsTyped = 0;
    }

    /**
     * Record a correctly typed character.
     */
    markCorrect(): void
    {
        this.correctChars += 1;
        this.totalCharsTyped += 1;
    }

    /**
     * Record an incorrectly typed character.
     */
    markIncorrect(): void
    {
        this.incorrectChars += 1;
        this.totalCharsTyped += 1;
    }
}

/**
 * Result summary produced when a typing session completes.
 */
export class TestResult
{
    sessionId: string;
    wpm: number;
    accuracy: number;
    totalChars: number;
    completedAt: Date;

    /**
     * @param sessionId Session id this result belongs to
     * @param wpm Words-per-minute rounded to 2 decimals
     * @param accuracy Percentage accuracy (0-100)
     * @param totalChars Total chars typed in the session
     */
    constructor(sessionId: string, wpm: number, accuracy: number, totalChars: number)
    {
        this.sessionId = sessionId;
        this.wpm = wpm;
        this.accuracy = accuracy;
        this.totalChars = totalChars;
        this.completedAt = new Date();
    }
}

/**
 * In-memory demo data store used by the use cases. Not persistent.
 */
export class SimpleDataStore
{
    users: User[];
    sessions: Session[];
    typingTests: TypingTest[];
    typingSessions: TypingTestSession[];
    results: TestResult[];

    /**
     * Construct an empty store and add a seeded user for demos.
     */
    constructor()
    {
        this.users = [];
        this.sessions = [];
        this.typingTests = [];
        this.typingSessions = [];
        this.results = [];

        // Seed user so login/logout can be demonstrated quickly by teammates.
        this.users.push(new User("u1", "daniel@example.com", "password123"));
    }

    /**
     * Generate a short pseudo-random id using the provided prefix.
     */
    makeId(prefix: string): string
    {
        const randomPart = Math.random().toString(36).slice(2, 8);
        return `${prefix}-${randomPart}`;
    }
}

export const store = new SimpleDataStore();
