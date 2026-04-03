import assert from "assert";
import { BeginTypingTestUseCase } from "./3_Begin_Typing_Test/BeginTypingTestUseCase";
import { CompleteTypingTestUseCase } from "./4_Complete_Typing_Test/CompleteTypingTestUseCase";
import { store } from "./CommonData";

function resetStore(): void
{
    store.sessions = [];
    store.users = [];
    store.typingTests = [];
    store.typingSessions = [];
    store.results = [];
}

function run(label: string, fn: () => void): void
{
    try
    {
        fn();
        console.log(`  PASS  ${label}`);
    }
    catch (e: any)
    {
        console.log(`  FAIL  ${label}: ${e.message}`);
    }
}

const begin = new BeginTypingTestUseCase();
const complete = new CompleteTypingTestUseCase();

console.log("\n=== CompleteTypingTestUseCase Tests ===\n");

run("valid inputs return a TestResult", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    const result = complete.completeTypingTest(session.sessionId, 50, 60, 60);
    assert.ok(result);
    assert.strictEqual(result.sessionId, session.sessionId);
});

run("wpm is calculated correctly", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    const result = complete.completeTypingTest(session.sessionId, 60, 60, 60);
    assert.strictEqual(result.wpm, 12);
});

run("accuracy is calculated correctly", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    const result = complete.completeTypingTest(session.sessionId, 50, 100, 60);
    assert.strictEqual(result.accuracy, 50);
});

run("100 percent accuracy when all chars are correct", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    const result = complete.completeTypingTest(session.sessionId, 60, 60, 60);
    assert.strictEqual(result.accuracy, 100);
});

run("zero accuracy when no chars are correct", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    const result = complete.completeTypingTest(session.sessionId, 0, 60, 60);
    assert.strictEqual(result.accuracy, 0);
});

run("result is stored in the store", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    complete.completeTypingTest(session.sessionId, 50, 60, 60);
    assert.strictEqual(store.results.length, 1);
});

run("typing test status is set to COMPLETED", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    complete.completeTypingTest(session.sessionId, 50, 60, 60);
    assert.strictEqual(store.typingTests[0].status, "COMPLETED");
});

run("invalid session id throws an error", () =>
{
    resetStore();
    assert.throws(
        () => complete.completeTypingTest("fake-session", 50, 60, 60),
        { message: "Typing session not found." }
    );
});

run("duration of zero throws an error", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    assert.throws(
        () => complete.completeTypingTest(session.sessionId, 50, 60, 0),
        { message: "Duration must be greater than 0." }
    );
});

run("negative duration throws an error", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    assert.throws(
        () => complete.completeTypingTest(session.sessionId, 50, 60, -1),
        { message: "Duration must be greater than 0." }
    );
});

run("negative correctChars throws an error", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    assert.throws(
        () => complete.completeTypingTest(session.sessionId, -1, 60, 60),
        { message: "Character counts cannot be negative." }
    );
});

run("negative totalChars throws an error", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    assert.throws(
        () => complete.completeTypingTest(session.sessionId, 0, -1, 60),
        { message: "Character counts cannot be negative." }
    );
});

run("correctChars greater than totalChars throws an error", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    assert.throws(
        () => complete.completeTypingTest(session.sessionId, 80, 60, 60),
        { message: "Correct characters cannot be greater than total characters." }
    );
});

run("zero totalChars produces zero accuracy", () =>
{
    resetStore();
    const session = begin.beginTypingTest("u1", 60, "sample text");
    const result = complete.completeTypingTest(session.sessionId, 0, 0, 60);
    assert.strictEqual(result.accuracy, 0);
});

console.log();
