import assert from "assert";
import { LoginUseCase } from "./1_Login/LoginUseCase";
import { LogoutUseCase } from "./2_Logout/LogoutUseCase";
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
const logout = new LogoutUseCase();

console.log("\n=== LogoutUseCase Tests ===\n");

run("valid logout returns true", () =>
{
    resetStore();
    login.login("daniel@example.com", "password123");
    const result = logout.logout("u1");
    assert.strictEqual(result, true);
});

run("valid logout marks session as inactive", () =>
{
    resetStore();
    login.login("daniel@example.com", "password123");
    logout.logout("u1");
    assert.strictEqual(store.sessions[0].isActive, false);
});

run("valid logout marks user as logged out", () =>
{
    resetStore();
    login.login("daniel@example.com", "password123");
    logout.logout("u1");
    assert.strictEqual(store.users[0].isLoggedIn, false);
});

run("logout with unknown userId throws an error", () =>
{
    resetStore();
    assert.throws(
        () => logout.logout("nonexistent-id"),
        { message: "User not found." }
    );
});

run("logout with no active session throws an error", () =>
{
    resetStore();
    assert.throws(
        () => logout.logout("u1"),
        { message: "Active session not found." }
    );
});

run("logout after already logging out throws an error", () =>
{
    resetStore();
    login.login("daniel@example.com", "password123");
    logout.logout("u1");
    assert.throws(
        () => logout.logout("u1"),
        { message: "Active session not found." }
    );
});

run("only the active session is deactivated, not all sessions", () =>
{
    resetStore();
    login.login("daniel@example.com", "password123");
    resetStore();
    store.users.push({ id: "u1", email: "daniel@example.com", password: "password123", isLoggedIn: true });
    login.login("daniel@example.com", "password123");
    logout.logout("u1");
    const activeSessions = store.sessions.filter(s => s.isActive);
    assert.strictEqual(activeSessions.length, 0);
});

console.log();
