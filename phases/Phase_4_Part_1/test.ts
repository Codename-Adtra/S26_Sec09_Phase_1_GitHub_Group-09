import { LoginUseCase } from "./1_Login/LoginUseCase";
import { LogoutUseCase } from "./2_Logout/LogoutUseCase";
import { BeginTypingTestUseCase } from "./3_Begin_Typing_Test/BeginTypingTestUseCase";
import { CompleteTypingTestUseCase } from "./4_Complete_Typing_Test/CompleteTypingTestUseCase";

console.log("=== STARTING BASIC TESTS ===");

try
{
    const loginUseCase = new LoginUseCase();
    const logoutUseCase = new LogoutUseCase();
    const beginTypingTestUseCase = new BeginTypingTestUseCase();
    const completeTypingTestUseCase = new CompleteTypingTestUseCase();

    console.log("\n--- LOGIN TEST ---");
    const loginSession = loginUseCase.login("daniel@example.com", "password123");
    console.log(loginSession);

    console.log("\n--- BEGIN TYPING TEST ---");
    const testSession = beginTypingTestUseCase.beginTypingTest(
        loginSession.userId,
        60,
        "this is a sample typing test"
    );
    console.log(testSession);

    console.log("\n--- COMPLETE TYPING TEST ---");
    const testResult = completeTypingTestUseCase.completeTypingTest(
        testSession.sessionId,
        50,
        60,
        60
    );
    console.log(testResult);

    console.log("\n--- LOGOUT TEST ---");
    const logoutResult = logoutUseCase.logout(loginSession.userId);
    console.log(logoutResult);

    console.log("\n=== BASIC TESTS FINISHED ===");
}
catch (error)
{
    console.error("Test failed:");
    console.error(error);
}


console.log("\n--- BAD LOGIN TEST ---");

try
{
    const loginUseCase = new LoginUseCase();
    const logoutUseCase = new LogoutUseCase();
    const beginTypingTestUseCase = new BeginTypingTestUseCase();
    const completeTypingTestUseCase = new CompleteTypingTestUseCase();

    loginUseCase.login("wrong@email.com", "password123");
}
catch (error)
{
    console.log(error);
}

console.log("\n--- INVALID BEGIN TEST ---");

try
{
    const loginUseCase = new LoginUseCase();
    const logoutUseCase = new LogoutUseCase();
    const beginTypingTestUseCase = new BeginTypingTestUseCase();
    const completeTypingTestUseCase = new CompleteTypingTestUseCase();

    beginTypingTestUseCase.beginTypingTest("u1", 0, "sample text");
}
catch (error)
{
    console.log(error);
}

console.log("\n--- INVALID COMPLETE TEST ---");

try
{
    const loginUseCase = new LoginUseCase();
    const logoutUseCase = new LogoutUseCase();
    const beginTypingTestUseCase = new BeginTypingTestUseCase();
    const completeTypingTestUseCase = new CompleteTypingTestUseCase();
    
    completeTypingTestUseCase.completeTypingTest("fake-session", 10, 20, 60);
}
catch (error)
{
    console.log(error);
}

