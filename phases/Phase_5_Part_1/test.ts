// Simple manual test file for both use cases.
// Run with: npx ts-node test.ts

import { GenerateTestTextUseCase } from "./1_Generate_Test_Text/GenerateTestTextUseCase";
import { DisplayTestResultsUseCase } from "./2_Display_Test_Results/DisplayTestResultsUseCase";
import { TestResult } from "./CommonData";

console.log("=== TypeShi Phase 2 Part 1 - Manual Tests ===\n");

// -----------------------------------------------
// Use Case 1: Generate Test Text
// -----------------------------------------------
console.log("--- Use Case 1: Generate Test Text ---");

const generateUseCase = new GenerateTestTextUseCase();

// Test 1: Normal case
const text1 = generateUseCase.generateTestText(10);
console.log("Generated 10-word text:");
console.log("  textId   :", text1.textId);
console.log("  content  :", text1.content);
console.log("  wordCount:", text1.wordCount);
console.log("  createdAt:", text1.createdAt);

// Test 2: Larger word count
const text2 = generateUseCase.generateTestText(25);
console.log("\nGenerated 25-word text:");
console.log("  content  :", text2.content);

// Test 3: Invalid word count (should throw)
console.log("\nTest with wordCount = 0 (expect error):");
try {
    generateUseCase.generateTestText(0);
} catch (e: any) {
    console.log("  Error caught:", e.message);
}

// -----------------------------------------------
// Use Case 2: Display Test Results
// -----------------------------------------------
console.log("\n--- Use Case 2: Display Test Results ---");

const displayUseCase = new DisplayTestResultsUseCase();

// Test 4: High performer
const result1: TestResult = {
    sessionId: "session-001",
    wpm: 95,
    accuracy: 98.5,
    totalChars: 430,
    completedAt: new Date()
};
const displayed1 = displayUseCase.displayTestResults(result1);
console.log("Result 1 (high performer):");
console.log("  sessionId     :", displayed1.sessionId);
console.log("  wpm           :", displayed1.wpm);
console.log("  accuracy      :", displayed1.accuracy);
console.log("  totalChars    :", displayed1.totalChars);
console.log("  summaryMessage:", displayed1.summaryMessage);

// Test 5: Beginner
const result2: TestResult = {
    sessionId: "session-002",
    wpm: 20,
    accuracy: 74.0,
    totalChars: 90,
    completedAt: new Date()
};
const displayed2 = displayUseCase.displayTestResults(result2);
console.log("\nResult 2 (beginner):");
console.log("  summaryMessage:", displayed2.summaryMessage);

// Test 6: Invalid accuracy (should throw)
console.log("\nTest with accuracy = 110 (expect error):");
try {
    displayUseCase.displayTestResults({
        sessionId: "session-003",
        wpm: 60,
        accuracy: 110,
        totalChars: 200,
        completedAt: new Date()
    });
} catch (e: any) {
    console.log("  Error caught:", e.message);
}

// Test 7: Negative WPM (should throw)
console.log("\nTest with wpm = -5 (expect error):");
try {
    displayUseCase.displayTestResults({
        sessionId: "session-004",
        wpm: -5,
        accuracy: 80,
        totalChars: 150,
        completedAt: new Date()
    });
} catch (e: any) {
    console.log("  Error caught:", e.message);
}

console.log("\n=== All tests complete ===");
