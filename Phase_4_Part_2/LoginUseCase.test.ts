import assert from "assert";
import { LoginUseCase } from "./1_Login/LoginUseCase";
import { store } from "./CommonData";

function resetStore(): void
{
    store.sessions = [];
    store.users = [];
    store.users.push({ id: "u1", email: "daniel@example.com", password: "password123", isLoggedIn: false });
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

const login = new LoginUseCase();

console.log("\n=== LoginUseCase Tests ===\n");

run("valid credentials return an active session", () =>
{
    resetStore();
    const session = login.login("daniel@example.com", "password123");
    assert.strictEqual(session.isActive, true);
    assert.strictEqual(session.userId, "u1");
});

run("valid login marks the user as logged in", () =>
{
    resetStore();
    login.login("daniel@example.com", "password123");
    assert.strictEqual(store.users[0].isLoggedIn, true);
});

run("valid login adds session to the store", () =>
{
    resetStore();
    login.login("daniel@example.com", "password123");
    assert.strictEqual(store.sessions.length, 1);
});

run("empty email throws an error", () =>
{
    resetStore();
    assert.throws(
        () => login.login("", "password123"),
        { message: "Email and password cannot be empty." }
    );
});

run("empty password throws an error", () =>
{
    resetStore();
    assert.throws(
        () => login.login("daniel@example.com", ""),
        { message: "Email and password cannot be empty." }
    );
});

run("whitespace-only email throws an error", () =>
{
    resetStore();
    assert.throws(
        () => login.login("   ", "password123"),
        { message: "Email and password cannot be empty." }
    );
});

run("email not in system throws an error", () =>
{
    resetStore();
    assert.throws(
        () => login.login("unknown@example.com", "password123"),
        { message: "User not found." }
    );
});

run("correct email but wrong password throws an error", () =>
{
    resetStore();
    assert.throws(
        () => login.login("daniel@example.com", "wrongpassword"),
        { message: "Incorrect password." }
    );
});

run("password is case-sensitive", () =>
{
    resetStore();
    assert.throws(
        () => login.login("daniel@example.com", "Password123"),
        { message: "Incorrect password." }
    );
});

run("session id is unique across multiple logins", () =>
{
    resetStore();
    const s1 = login.login("daniel@example.com", "password123");
    resetStore();
    const s2 = login.login("daniel@example.com", "password123");
    assert.notStrictEqual(s1.sessionId, s2.sessionId);
});

console.log();
